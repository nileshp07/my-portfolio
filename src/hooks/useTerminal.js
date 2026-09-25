import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CAREER_START,
  EMAIL,
  RESUME_URL,
  profile,
  skillGroups,
  socials,
} from '../data/portfolio.js';
import { experienceYears } from '../lib/dates.js';

// tone → CSS class suffix in Terminal.css
const line = (tone, text, prompt = false) => ({ tone, text, prompt });
const cmdLine = (text) => line('cmd', text, true);

const SECTIONS = {
  about: 'about',
  experience: 'experience',
  work: 'projects',
  projects: 'projects',
  github: 'github',
  gh: 'github',
  certs: 'about',
  education: 'about',
  contact: 'contact',
};

const COMMANDS = [
  'help',
  'whoami',
  'ls',
  'skills',
  'resume',
  'theme',
  'email',
  'socials',
  'clear',
  'sudo hire-me',
  ...Object.keys(SECTIONS),
];

const LS_OUTPUT = 'about/  experience/  projects/  github/  certs/  contact/';

const pause = (ms) => new Promise((r) => setTimeout(r, ms));

export function useTerminal({ theme, setTheme }) {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState('');
  const [booted, setBooted] = useState(false);

  const aliveRef = useRef(true);
  const bootStartedRef = useRef(false);
  const historyRef = useRef([]);
  const histIdxRef = useRef(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const themeRef = useRef(theme);
  const setThemeRef = useRef(setTheme);

  useEffect(() => {
    themeRef.current = theme;
    setThemeRef.current = setTheme;
  }, [theme, setTheme]);

  // Keep the terminal pinned to its newest line.
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  const push = useCallback((next) => setLines((prev) => prev.concat(next)), []);

  const jump = useCallback((id, label) => {
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 350);
    return [line('ok', `→ cd ./${label} — taking you there…`)];
  }, []);

  const runCommand = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase().replace(/\s+/g, ' ');
      if (cmd === '') return [];

      if (cmd === 'help')
        return [
          line('txt', 'available commands'),
          line('out', '  about · experience · projects · github · certs · contact'),
          line('out', '  whoami    who is this guy'),
          line('out', '  skills    the toolbox'),
          line('out', '  resume    open resume.pdf'),
          line('out', '  email     copy my email'),
          line('out', '  socials   all the links'),
          line('out', '  theme     toggle dark / light'),
          line('out', '  clear     wipe the session'),
          line('warn', '  sudo hire-me   (recruiters only)'),
          line('dim', '  tip: ↑/↓ for history, tab to autocomplete'),
        ];

      if (cmd === 'whoami')
        return [
          line('txt', `${profile.name.toLowerCase()} — ${profile.role.toLowerCase()} @ ${profile.company.toLowerCase()}`),
          line('out', `${experienceYears(CAREER_START)}+ yrs in production · multi-tenant saas · rbac · llm pipelines`),
        ];

      if (cmd === 'ls' || cmd === 'ls -la' || cmd === 'ls ./portfolio') return [line('ok', LS_OUTPUT)];

      if (cmd === 'skills' || cmd === 'stack')
        return skillGroups.map((g) =>
          line('out', `${g.label.toLowerCase().padEnd(10)} ${g.items.join(' · ')}`)
        );

      if (SECTIONS[cmd]) return jump(SECTIONS[cmd], cmd);

      if (['resume', 'cv', 'open resume', 'cat resume'].includes(cmd)) {
        window.open(RESUME_URL, '_blank', 'noopener');
        return [line('ok', 'opening resume.pdf ⤓')];
      }

      if (cmd === 'theme' || cmd === 'theme toggle') {
        const next = themeRef.current === 'dark' ? 'light' : 'dark';
        setThemeRef.current(next);
        return [line('ok', `theme → ${next} mode`)];
      }

      if (cmd === 'email') {
        navigator.clipboard?.writeText(EMAIL).catch(() => {});
        return [line('ok', `${EMAIL} — copied to clipboard ✓`)];
      }

      if (cmd === 'socials' || cmd === 'links')
        return [
          line('out', `github    → ${socials.github.replace('https://', '')}`),
          line('out', `linkedin  → ${socials.linkedin.replace('https://', '')}`),
          line('out', `x         → ${socials.twitter.replace('https://', '')}`),
        ];

      if (cmd === 'clear' || cmd === 'cls') {
        setTimeout(() => setLines([]), 0);
        return [];
      }

      if (['sudo hire-me', 'sudo hire me', 'hire-me', 'hire me', 'hire'].includes(cmd)) {
        jump('contact', 'contact');
        return [
          line('dim', '[sudo] password for recruiter: ••••••••'),
          line('ok', 'access granted ✓ — opening a direct line…'),
        ];
      }

      if (cmd === 'exit') return [line('warn', 'nice try. there is no escape from good engineering.')];
      if (cmd.startsWith('sudo')) return [line('err', 'recruiter is not in the sudoers file. try `sudo hire-me`')];

      return [line('err', `zsh: command not found: ${cmd}`), line('dim', 'type `help` for the full list')];
    },
    [jump]
  );

  // Runs a command as if it had been typed, including history.
  const execute = useCallback(
    (raw) => {
      if (raw.trim()) {
        historyRef.current.push(raw);
        histIdxRef.current = historyRef.current.length;
      }
      push([cmdLine(raw)].concat(runCommand(raw)));
      setInput('');
    },
    [push, runCommand]
  );

  // Boot sequence — types the intro commands character by character.
  useEffect(() => {
    aliveRef.current = true;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const seq = [
      [
        'whoami',
        [
          line('txt', `${profile.name.toLowerCase()} — ${profile.role.toLowerCase()}`),
          line('out', 'react · typescript · node · firebase — pune, in'),
        ],
      ],
      ['ls ./portfolio', [line('ok', LS_OUTPUT)]],
    ];
    const outro = line('dim', 'type `help` to explore — or just scroll ↓');

    const typeCmd = async (text) => {
      setLines((prev) => prev.concat(cmdLine('')));
      for (let i = 1; i <= text.length; i++) {
        if (!aliveRef.current) return;
        await pause(38);
        setLines((prev) => {
          const next = prev.slice();
          next[next.length - 1] = cmdLine(text.slice(0, i));
          return next;
        });
      }
    };

    const boot = async () => {
      if (reduced) {
        setLines(seq.flatMap(([cmd, outs]) => [cmdLine(cmd), ...outs]).concat(outro));
        setBooted(true);
        return;
      }
      await pause(1100);
      for (const [cmd, outs] of seq) {
        if (!aliveRef.current) return;
        await typeCmd(cmd);
        await pause(200);
        push(outs);
        await pause(450);
      }
      push([outro]);
      setBooted(true);
    };

    // StrictMode double-invokes effects in dev; only ever boot once.
    if (!bootStartedRef.current) {
      bootStartedRef.current = true;
      boot();
    }
    return () => {
      aliveRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        execute(input);
      } else if (e.key === 'Tab') {
        const partial = input.trim().toLowerCase();
        if (!partial) return;
        e.preventDefault();
        const matches = COMMANDS.filter((c) => c.startsWith(partial));
        if (matches.length === 1) setInput(matches[0]);
        else if (matches.length > 1) push([cmdLine(input), line('dim', matches.join('   '))]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyRef.current.length) {
          histIdxRef.current = Math.max(0, histIdxRef.current - 1);
          setInput(historyRef.current[histIdxRef.current] || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        histIdxRef.current = Math.min(historyRef.current.length, histIdxRef.current + 1);
        setInput(historyRef.current[histIdxRef.current] || '');
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [execute, input, push]
  );

  const focus = useCallback(() => {
    // Don't steal focus from a text selection inside the terminal.
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  return { lines, input, setInput, booted, bodyRef, inputRef, onKeyDown, focus, execute };
}

import { useCallback, useEffect, useRef, useState } from 'react';
import { EMAIL, RESUME_URL, socials } from '../data/portfolio.js';

const COLORS = {
  cmd: 'var(--t-text)',
  out: 'var(--t-dim)',
  ok: 'var(--t-green)',
  warn: 'var(--t-amber)',
  err: 'var(--t-red)',
  txt: 'var(--t-text)',
};

function line(kind, text) {
  return { p: kind === 'cmd' ? '➜ ~ ' : '', t: text, c: COLORS[kind] || COLORS.out };
}

const SECTIONS = {
  about: 'about',
  skills: 'about',
  experience: 'experience',
  work: 'projects',
  projects: 'projects',
  github: 'github',
  gh: 'github',
  certs: 'certs',
  certifications: 'certs',
  contact: 'contact',
};

export function useTerminal({ theme, setTheme, bootAnimation = true }) {
  const [termLines, setTermLines] = useState([]);
  const [termInput, setTermInput] = useState('');
  const [booted, setBooted] = useState(false);
  const [booting, setBooting] = useState(true);

  const aliveRef = useRef(true);
  const bootStartedRef = useRef(false);
  const historyRef = useRef([]);
  const histIdxRef = useRef(-1);
  const bodyRef = useRef(null);
  const inputRef = useRef(null);
  const themeRef = useRef(theme);
  const setThemeRef = useRef(setTheme);
  const scrollPendingRef = useRef(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);
  useEffect(() => {
    setThemeRef.current = setTheme;
  }, [setTheme]);

  // Keep the terminal scrolled to the bottom after new lines render.
  useEffect(() => {
    if (scrollPendingRef.current && bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      scrollPendingRef.current = false;
    }
  });

  const push = useCallback((lines) => {
    scrollPendingRef.current = true;
    setTermLines((prev) => prev.concat(lines));
  }, []);

  const jump = useCallback((id, label) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 74;
      setTimeout(() => window.scrollTo({ top: y, behavior: 'smooth' }), 350);
    }
    return [line('ok', '→ cd ./' + label + '  — taking you there…')];
  }, []);

  const runCommand = useCallback(
    (raw) => {
      const cmd = raw.trim().toLowerCase();
      if (cmd === '') return [];
      if (cmd === 'help')
        return [
          line('txt', 'available commands:'),
          line('out', '  about · experience · projects · github · certs · contact'),
          line('out', '  whoami     — who is this guy'),
          line('out', '  resume     — open resume.pdf'),
          line('out', '  theme      — toggle dark / light'),
          line('out', '  email      — copy my email'),
          line('out', '  socials    — all the links'),
          line('out', '  clear      — wipe the session'),
          line('warn', '  sudo hire-me   (recruiters only)'),
        ];
      if (cmd === 'whoami')
        return [
          line('txt', 'nilesh parmar — full-stack developer'),
          line('out', '1+ yr production experience · multi-tenant SaaS · RBAC · LLM pipelines'),
        ];
      if (cmd === 'ls' || cmd === 'ls ./portfolio' || cmd === 'ls -la')
        return [line('ok', 'about/  experience/  projects/  github/  certs/  contact/')];
      if (SECTIONS[cmd]) return jump(SECTIONS[cmd], cmd);
      if (cmd === 'resume' || cmd === 'cv' || cmd === 'open resume' || cmd === 'cat resume') {
        window.open(RESUME_URL, '_blank');
        return [line('ok', 'opening resume.pdf ⤓')];
      }
      if (cmd === 'theme' || cmd === 'theme toggle') {
        const next = themeRef.current === 'dark' ? 'light' : 'dark';
        setThemeRef.current(next);
        return [line('ok', 'theme → ' + next + ' mode ' + (next === 'dark' ? '☾' : '☀'))];
      }
      if (cmd === 'email') {
        try {
          navigator.clipboard.writeText(EMAIL);
        } catch (e) {
          /* ignore */
        }
        return [line('ok', EMAIL + ' — copied to clipboard ✓')];
      }
      if (cmd === 'socials' || cmd === 'links')
        return [
          line('out', 'github    → ' + socials.github.replace('https://', '')),
          line('out', 'linkedin  → ' + socials.linkedin.replace('https://', '')),
          line('out', 'x/twitter → ' + socials.twitter.replace('https://', '')),
        ];
      if (cmd === 'clear' || cmd === 'cls') {
        setTimeout(() => setTermLines([]), 0);
        return [];
      }
      if (cmd === 'sudo hire-me' || cmd === 'sudo hire me' || cmd === 'hire-me' || cmd === 'hire') {
        jump('contact', 'contact');
        return [
          line('out', '[sudo] password for recruiter: ••••••••'),
          line('ok', 'access granted ✓ — opening contact channel…'),
        ];
      }
      if (cmd === 'exit')
        return [line('warn', 'nice try. there is no escape from good engineering.')];
      return [
        line('err', 'zsh: command not found: ' + cmd),
        line('out', 'type `help` for the full list'),
      ];
    },
    [jump]
  );

  // Boot sequence — types the intro commands character by character.
  useEffect(() => {
    aliveRef.current = true;
    const reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const instant = reduced || bootAnimation === false;

    const seq = [
      [
        'whoami',
        [
          line('txt', 'nilesh parmar — full-stack developer'),
          line('out', 'react · typescript · node · firebase — pune, IN'),
        ],
      ],
      ['ls ./portfolio', [line('ok', 'about/  experience/  projects/  github/  certs/  contact/')]],
    ];

    const typeCmd = async (text) => {
      scrollPendingRef.current = true;
      setTermLines((prev) => prev.concat([line('cmd', '')]));
      for (let i = 1; i <= text.length; i++) {
        if (!aliveRef.current) return;
        await new Promise((r) => setTimeout(r, 34));
        scrollPendingRef.current = true;
        setTermLines((prev) => {
          const lines = prev.slice();
          lines[lines.length - 1] = line('cmd', text.slice(0, i));
          return lines;
        });
      }
    };

    const boot = async () => {
      if (instant) {
        const all = [];
        seq.forEach(([cmd, outs]) => {
          all.push(line('cmd', cmd));
          outs.forEach((o) => all.push(o));
        });
        all.push(line('out', 'type `help` to explore — or just scroll ↓'));
        push(all);
        setBooted(true);
        setBooting(false);
        return;
      }
      await new Promise((r) => setTimeout(r, 900));
      for (const [cmd, outs] of seq) {
        if (!aliveRef.current) return;
        await typeCmd(cmd);
        await new Promise((r) => setTimeout(r, 180));
        push(outs);
        await new Promise((r) => setTimeout(r, 420));
      }
      push([line('out', 'type `help` to explore — or just scroll ↓')]);
      setBooted(true);
      setBooting(false);
    };

    // Guard against React StrictMode's double-invoke in dev so the boot
    // sequence only runs (and prints) once. aliveRef is reset to true above on
    // every invoke, so the single in-flight boot survives the remount.
    if (!bootStartedRef.current) {
      bootStartedRef.current = true;
      boot();
    }

    return () => {
      aliveRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTermKey = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        const raw = termInput;
        historyRef.current.push(raw);
        histIdxRef.current = historyRef.current.length;
        const out = runCommand(raw);
        push([line('cmd', raw)].concat(out));
        setTermInput('');
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyRef.current.length) {
          histIdxRef.current = Math.max(0, histIdxRef.current - 1);
          setTermInput(historyRef.current[histIdxRef.current] || '');
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        histIdxRef.current = Math.min(historyRef.current.length, histIdxRef.current + 1);
        setTermInput(historyRef.current[histIdxRef.current] || '');
      }
    },
    [termInput, runCommand, push]
  );

  const focusTerm = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return {
    termLines,
    termInput,
    setTermInput,
    booted,
    booting,
    bodyRef,
    inputRef,
    onTermKey,
    focusTerm,
  };
}

import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '../data/portfolio.js';
import { MONTHS } from '../lib/dates.js';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  Python: '#3572a5',
  Rust: '#dea584',
  Pug: '#a86454',
  EJS: '#a91e50',
};

const FALLBACK_LANGS = [
  { name: 'JavaScript', pct: 46, color: LANG_COLORS.JavaScript },
  { name: 'TypeScript', pct: 30, color: LANG_COLORS.TypeScript },
  { name: 'CSS', pct: 14, color: LANG_COLORS.CSS },
  { name: 'HTML', pct: 10, color: LANG_COLORS.HTML },
];

const toDate = (iso) => new Date(`${iso}T00:00:00`);

async function loadContributions(signal) {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
    { signal }
  );
  if (!res.ok) throw new Error(`contributions ${res.status}`);
  const data = await res.json();
  const days = data.contributions || [];
  if (!days.length) throw new Error('no contribution data');

  const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);

  // Pad the first week so rows line up with weekdays (Sun → Sat).
  const cells = Array(toDate(days[0].date).getDay()).fill(null).concat(days);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  // A month label sits above the first week in which that month appears.
  const months = [];
  let last = -1;
  weeks.forEach((week, index) => {
    const first = week.find(Boolean);
    if (!first) return;
    const m = toDate(first.date).getMonth();
    if (m !== last) {
      months.push({ index, label: MONTHS[m] });
      last = m;
    }
  });
  // Drop a leading label that would collide with the next one.
  if (months.length > 1 && months[1].index - months[0].index < 3) months.shift();

  const busiest = days.reduce((max, d) => (d.count > max.count ? d : max), days[0]);

  return { status: 'ok', weeks, months, total, busiest };
}

async function loadLanguages(signal) {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
    signal,
  });
  const repos = await res.json();
  if (!Array.isArray(repos)) throw new Error('rate limited');

  const bySize = {};
  repos.forEach((r) => {
    if (r.language) bySize[r.language] = (bySize[r.language] || 0) + Math.max(r.size || 0, 1);
  });
  const totalSize = Object.values(bySize).reduce((a, b) => a + b, 0) || 1;

  const langs = Object.entries(bySize)
    .map(([name, size]) => ({ name, pct: (size / totalSize) * 100 }))
    .filter((l) => l.pct >= 1)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5)
    .map((l) => ({ ...l, color: LANG_COLORS[l.name] || 'var(--accent)' }));

  return { status: 'ok', langs };
}

export function useGitHub() {
  const [contributions, setContributions] = useState({ status: 'loading' });
  const [languages, setLanguages] = useState({ status: 'loading', langs: [] });

  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;

    loadContributions(signal)
      .then(setContributions)
      .catch(() => !signal.aborted && setContributions({ status: 'error' }));

    loadLanguages(signal)
      .then(setLanguages)
      .catch(() => !signal.aborted && setLanguages({ status: 'fallback', langs: FALLBACK_LANGS }));

    return () => ctrl.abort();
  }, []);

  return { contributions, languages };
}

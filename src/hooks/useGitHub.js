import { useEffect, useState } from 'react';
import { GITHUB_USERNAME } from '../data/portfolio.js';

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#663399',
  SCSS: '#c6538c',
  Python: '#3572A5',
  Rust: '#dea584',
  Pug: '#a86454',
  EJS: '#a91e50',
};

const FALLBACK_LANGS = [
  { name: 'JavaScript', pct: '', w: '46%', color: '#f1e05a' },
  { name: 'TypeScript', pct: '', w: '30%', color: '#3178c6' },
  { name: 'CSS', pct: '', w: '14%', color: '#663399' },
  { name: 'HTML', pct: '', w: '10%', color: '#e34c26' },
];

const INITIAL_STATS = [
  { label: 'PUBLIC REPOS', v: '—' },
  { label: 'CONTRIBUTIONS / YR', v: '—' },
  { label: 'STARS EARNED', v: '—' },
  { label: 'FOLLOWERS', v: '—' },
];

export function useGitHub() {
  const [state, setState] = useState({
    ok: false,
    failed: false,
    weeks: [],
    totalLabel: 'contributions — last 12 months',
    langs: [],
    stats: INITIAL_STATS,
  });

  useEffect(() => {
    let alive = true;
    const patch = (fn) => {
      if (alive) setState((s) => (typeof fn === 'function' ? { ...s, ...fn(s) } : { ...s, ...fn }));
    };

    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`
        );
        const data = await res.json();
        const days = data.contributions || [];
        if (!days.length) throw new Error('empty');
        const total =
          (data.total && (data.total.lastYear ?? Object.values(data.total)[0])) ||
          days.reduce((a, d) => a + d.count, 0);

        const cells = [];
        const offset = new Date(days[0].date + 'T00:00:00').getDay();
        for (let i = 0; i < offset; i++) cells.push(null);
        days.forEach((d) => cells.push(d));

        const weeks = [];
        for (let i = 0; i < cells.length; i += 7) {
          weeks.push({
            days: cells.slice(i, i + 7).map((d) =>
              d
                ? {
                    bg: 'var(--gh' + Math.min(d.level, 4) + ')',
                    tip: d.count + ' contributions · ' + d.date,
                  }
                : { bg: 'transparent', tip: '' }
            ),
          });
        }

        patch((s) => ({
          ok: true,
          weeks,
          totalLabel: total.toLocaleString() + ' contributions — last 12 months',
          stats: s.stats.map((st) =>
            st.label === 'CONTRIBUTIONS / YR' ? { ...st, v: total.toLocaleString() } : st
          ),
        }));
      } catch (e) {
        patch({ failed: true, ok: false });
      }
    }

    async function fetchReposAndUser() {
      try {
        const [reposRes, userRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        ]);
        const repos = await reposRes.json();
        const user = await userRes.json();
        if (!Array.isArray(repos)) throw new Error('rate limited');

        const stars = repos.reduce((a, r) => a + (r.stargazers_count || 0), 0);
        const agg = {};
        repos.forEach((r) => {
          if (r.language) agg[r.language] = (agg[r.language] || 0) + Math.max(r.size || 0, 1);
        });
        const totalSize = Object.values(agg).reduce((a, b) => a + b, 0) || 1;
        const langs = Object.entries(agg)
          .sort((a, b) => b[1] - a[1])
          .filter(([, size]) => (size / totalSize) * 100 >= 1)
          .slice(0, 4)
          .map(([name, size]) => ({
            name,
            pct: ((size / totalSize) * 100).toFixed(1) + '%',
            w: Math.max((size / totalSize) * 100, 2).toFixed(1) + '%',
            color: LANG_COLORS[name] || 'var(--accent)',
          }));

        patch((s) => ({
          langs,
          stats: s.stats.map((st) => {
            if (st.label === 'PUBLIC REPOS' && user.public_repos != null)
              return { ...st, v: String(user.public_repos) };
            if (st.label === 'STARS EARNED') return { ...st, v: String(stars) };
            if (st.label === 'FOLLOWERS' && user.followers != null)
              return { ...st, v: String(user.followers) };
            return st;
          }),
        }));
      } catch (e) {
        patch({ langs: FALLBACK_LANGS });
      }
    }

    fetchContributions();
    fetchReposAndUser();

    return () => {
      alive = false;
    };
  }, []);

  // Hide any stat that resolved to exactly "0", matching the source design.
  const visibleStats = state.stats.filter((st) => st.v !== '0');

  return { ...state, visibleStats };
}

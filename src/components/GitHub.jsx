import { useEffect, useRef } from 'react';
import { GITHUB_USERNAME, socials } from '../data/portfolio.js';
import { ArrowUpRight } from './ui/Icons.jsx';
import { Reveal } from './ui/Reveal.jsx';
import { SectionHeader } from './ui/SectionHeader.jsx';
import { TechIcon } from './ui/TechIcon.jsx';
import './GitHub.css';

const WEEKDAYS = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

const formatDay = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

function Heatmap({ data }) {
  const scrollRef = useRef(null);

  // On narrow screens the graph scrolls; start at the most recent weeks.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [data]);

  return (
    <div className="heatmap" ref={scrollRef}>
      <div className="heatmap__grid" style={{ '--weeks': data.weeks.length }}>
        <div className="heatmap__months" aria-hidden="true">
          {data.months.map((m) => (
            <span key={`${m.label}-${m.index}`} style={{ gridColumn: `${m.index + 1} / span 4` }}>
              {m.label}
            </span>
          ))}
        </div>
        <div className="heatmap__days" aria-hidden="true">
          {WEEKDAYS.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
        <div
          className="heatmap__cells"
          role="img"
          aria-label={`${data.total} GitHub contributions in the last year`}
        >
          {data.weeks.flatMap((week, wi) =>
            week.map((day, di) =>
              day ? (
                <span
                  key={day.date}
                  className="heatmap__cell"
                  data-level={Math.min(day.level, 4)}
                  title={`${day.count} contribution${day.count === 1 ? '' : 's'} · ${formatDay(day.date)}`}
                />
              ) : (
                <span key={`pad-${wi}-${di}`} className="heatmap__cell heatmap__cell--pad" />
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="heatmap__legend" aria-hidden="true">
      Less
      {[0, 1, 2, 3, 4].map((l) => (
        <span key={l} className="heatmap__cell" data-level={l} />
      ))}
      More
    </div>
  );
}

function ContributionsPanel({ contributions }) {
  const { status } = contributions;

  return (
    <div className="panel gh-contrib">
      <div className="gh-contrib__head">
        <div>
          {status === 'loading' && <span className="skeleton gh-skel-number" />}
          {status === 'ok' && (
            <p className="gh-contrib__total">{contributions.total.toLocaleString()}</p>
          )}
          <p className="gh-contrib__label">contributions in the last 12 months</p>
        </div>
        {status === 'ok' && contributions.busiest.count > 0 && (
          <p className="gh-contrib__busiest">
            <span className="label">Busiest day</span>
            {formatDay(contributions.busiest.date)} · {contributions.busiest.count} contributions
          </p>
        )}
      </div>

      {status === 'loading' && <div className="skeleton gh-skel-graph" />}
      {status === 'ok' && (
        <>
          <Heatmap data={contributions} />
          <Legend />
        </>
      )}
      {status === 'error' && (
        <img
          className="gh-contrib__fallback"
          src={`https://ghchart.rshah.org/7fae2e/${GITHUB_USERNAME}`}
          alt="GitHub contribution chart"
          loading="lazy"
        />
      )}
    </div>
  );
}

function LanguagesPanel({ languages }) {
  const { status, langs } = languages;
  return (
    <div className="panel gh-langs">
      <h3 className="gh-panel-title">Top languages</h3>
      <p className="gh-panel-sub">By code volume across public repos</p>

      {status === 'loading' ? (
        <div className="skeleton gh-skel-bar" />
      ) : (
        <>
          <div className="gh-langs__bar" role="img" aria-label={langs.map((l) => `${l.name} ${Math.round(l.pct)}%`).join(', ')}>
            {langs.map((l) => (
              <span key={l.name} style={{ flexGrow: l.pct, background: l.color }} />
            ))}
          </div>
          <ul className="gh-langs__list">
            {langs.map((l) => (
              <li key={l.name}>
                <span className="gh-langs__swatch" style={{ background: l.color }} />
                <span>{l.name}</span>
                <span className="gh-langs__pct">{l.pct.toFixed(1)}%</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function ProfilePanel() {
  return (
    <div className="panel gh-profile">
      <div className="gh-profile__id">
        <img
          src={`https://github.com/${GITHUB_USERNAME}.png?size=112`}
          alt=""
          width="56"
          height="56"
          loading="lazy"
        />
        <div>
          <p className="gh-profile__handle">@{GITHUB_USERNAME}</p>
          <p className="gh-panel-sub">github.com/{GITHUB_USERNAME}</p>
        </div>
      </div>
      <p className="gh-profile__note">
        Most of my production work lives in private company repos. Public repos hold side projects,
        course work and experiments.
      </p>
      <a className="btn btn--ghost btn--sm gh-profile__cta" href={socials.github} target="_blank" rel="noreferrer">
        <TechIcon slug="github" size={14} mono />
        View profile
        <ArrowUpRight />
      </a>
    </div>
  );
}

export function GitHub({ github }) {
  return (
    <section id="github" className="section" aria-labelledby="github-title">
      <div className="container">
        <SectionHeader
          id="github-title"
          kicker="GitHub"
          title="Proof of work."
          subtitle="Pulled live from the GitHub API."
        />

        <Reveal>
          <ContributionsPanel contributions={github.contributions} />
        </Reveal>

        <div className="gh-row">
          <Reveal delay={60}>
            <LanguagesPanel languages={github.languages} />
          </Reveal>
          <Reveal delay={140}>
            <ProfilePanel />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Hover } from './Hover.jsx';
import { TechIcon, slugFor } from './TechIcon.jsx';
import { skillGroups, socials, GITHUB_USERNAME } from '../data/portfolio.js';

export function About() {
  return (
    <div
      id="about"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}
    >
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
        $ cat ./about.md
      </div>
      <div
        className="np-about-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          marginTop: 22,
          alignItems: 'start',
        }}
      >
        <div data-reveal>
          <h2
            style={{
              font: "700 clamp(30px, 3.4vw, 42px)/1.15 'Space Grotesk', sans-serif",
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Comfortable across the stack — schema to screen.
          </h2>
          <p
            style={{
              font: "400 15.5px/1.75 'Space Grotesk', sans-serif",
              color: 'var(--fg2)',
              margin: '18px 0 0',
              textWrap: 'pretty',
            }}
          >
           I work across the full stack, though I've been gravitating toward
           backend and system design lately. Most of what I build day-to-day is
           web-based — forms, dashboards, data-heavy tools. Outside of work, I'm
           picking up DevOps and Web3, with the long-term goal of being able to
           take a product from idea to production by myself.
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              marginTop: 26,
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: '14px 16px',
              background: 'var(--panel)',
            }}
          >
            <img
              src={`https://github.com/${GITHUB_USERNAME}.png`}
              alt="Nilesh Parmar"
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                border: '2px solid var(--accent-40)',
              }}
            />
            <div>
              <div style={{ font: "600 14.5px 'Space Grotesk', sans-serif" }}>Nilesh Parmar</div>
              <div
                style={{
                  font: "400 12px 'IBM Plex Mono', monospace",
                  color: 'var(--fg3)',
                  marginTop: 2,
                }}
              >
                Pune, IN · UTC+5:30 · BCA, CGPA 8.5
              </div>
            </div>
            <div style={{ flex: 1 }} />
            <Hover
              as="a"
              href={socials.github}
              target="_blank"
              rel="noreferrer"
              style={{
                font: "500 12px 'IBM Plex Mono', monospace",
                color: 'var(--fg2)',
                border: '1px solid var(--line2)',
                borderRadius: 8,
                padding: '7px 12px',
              }}
              hoverStyle={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              @{GITHUB_USERNAME} ↗
            </Hover>
          </div>
        </div>

        <div data-reveal style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {skillGroups.map((g) => (
            <div
              key={g.label}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 12,
                background: 'var(--panel)',
                padding: '14px 18px',
              }}
            >
              <div
                style={{
                  font: "600 10.5px 'IBM Plex Mono', monospace",
                  color: 'var(--fg3)',
                  letterSpacing: '0.14em',
                }}
              >
                {g.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
                {g.items.map((s) => (
                  <Hover
                    key={s}
                    as="span"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: slugFor(s) ? 7 : 0,
                      font: "500 12px 'IBM Plex Mono', monospace",
                      color: 'var(--fg2)',
                      border: '1px solid var(--line2)',
                      borderRadius: 99,
                      padding: '4px 11px',
                      transition: 'all 0.15s',
                    }}
                    hoverStyle={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                  >
                    <TechIcon label={s} size={13} />
                    {s}
                  </Hover>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

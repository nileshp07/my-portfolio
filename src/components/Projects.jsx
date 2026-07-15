import { Hover } from './Hover.jsx';
import { TechIcon, slugFor } from './TechIcon.jsx';
import { featuredProject, projects, socials } from '../data/portfolio.js';

function Tag({ children }) {
  const hasIcon = Boolean(slugFor(children));
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: hasIcon ? 6 : 0,
        font: "500 11.5px 'IBM Plex Mono', monospace",
        color: 'var(--accent)',
        background: 'var(--accent-12)',
        borderRadius: 6,
        padding: '4px 10px',
      }}
    >
      <TechIcon label={children} size={12} />
      {children}
    </span>
  );
}

export function Projects() {
  return (
    <div
      id="projects"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}
    >
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
        $ ls ./projects --sort=impact
      </div>
      <h2
        data-reveal
        style={{
          font: "700 clamp(30px, 3.4vw, 42px)/1.15 'Space Grotesk', sans-serif",
          letterSpacing: '-0.02em',
          margin: '14px 0 0',
        }}
      >
        Selected work
      </h2>

      {/* Featured project */}
      <Hover
        data-reveal
        style={{
          marginTop: 38,
          border: '1px solid var(--line)',
          borderRadius: 16,
          background: 'var(--panel)',
          overflow: 'hidden',
          transition: 'border-color 0.25s, transform 0.25s',
        }}
        hoverStyle={{ borderColor: 'var(--accent-40)', transform: 'translateY(-3px)' }}
      >
        <div className="np-featured-grid" style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr' }}>
          <div style={{ padding: '34px 36px' }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <span
                style={{
                  font: "600 10.5px 'IBM Plex Mono', monospace",
                  color: 'var(--accent-ink)',
                  background: 'var(--accent)',
                  borderRadius: 99,
                  padding: '4px 11px',
                  letterSpacing: '0.08em',
                }}
              >
                {featuredProject.badges[0]}
              </span>
              <span
                style={{
                  font: "500 10.5px 'IBM Plex Mono', monospace",
                  color: 'var(--fg2)',
                  border: '1px solid var(--line2)',
                  borderRadius: 99,
                  padding: '4px 11px',
                  letterSpacing: '0.08em',
                }}
              >
                {featuredProject.badges[1]}
              </span>
            </div>
            <div style={{ font: "700 32px 'Space Grotesk', sans-serif", marginTop: 16 }}>
              {featuredProject.name}
            </div>
            <p
              style={{
                font: "400 14.5px/1.7 'Space Grotesk', sans-serif",
                color: 'var(--fg2)',
                margin: '10px 0 0',
                textWrap: 'pretty',
              }}
            >
              {featuredProject.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 18 }}>
              {featuredProject.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </div>
          <div
            style={{
              borderLeft: '1px solid var(--line)',
              background: 'var(--t-bg)',
              padding: '26px 28px',
              font: "400 12px/1.9 'IBM Plex Mono', monospace",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ color: 'var(--t-dim)' }}>// what shipped</div>
            {featuredProject.shipped.map((s, i) => (
              <div key={i} style={{ color: 'var(--t-text)', marginTop: i === 0 ? 8 : 0 }}>
                {s}
              </div>
            ))}
            <div style={{ color: 'var(--t-dim)', marginTop: 14 }}>// stack depth</div>
            <div style={{ color: 'var(--t-green)' }}>{featuredProject.stackDepth}</div>
          </div>
        </div>
      </Hover>

      <div
        className="np-two-col"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}
      >
        {projects.map((p) => (
          <Hover
            key={p.name}
            data-reveal
            style={{
              border: '1px solid var(--line)',
              borderRadius: 16,
              background: 'var(--panel)',
              padding: '30px 32px',
              transition: 'border-color 0.25s, transform 0.25s',
            }}
            hoverStyle={{ borderColor: 'var(--accent-40)', transform: 'translateY(-3px)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ font: "700 24px 'Space Grotesk', sans-serif" }}>{p.name}</div>
              {p.status && (
                <span
                  style={{
                    font: "500 10.5px 'IBM Plex Mono', monospace",
                    color: 'var(--amber)',
                    border: '1px solid var(--amber)',
                    borderRadius: 99,
                    padding: '3px 10px',
                    letterSpacing: '0.08em',
                  }}
                >
                  {p.status}
                </span>
              )}
              {p.link && (
                <Hover
                  as="a"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    font: "500 11.5px 'IBM Plex Mono', monospace",
                    color: 'var(--fg2)',
                    border: '1px solid var(--line2)',
                    borderRadius: 99,
                    padding: '3px 10px',
                  }}
                  hoverStyle={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
                >
                  github ↗
                </Hover>
              )}
            </div>
            <p
              style={{
                font: "400 14px/1.68 'Space Grotesk', sans-serif",
                color: 'var(--fg2)',
                margin: '10px 0 0',
                textWrap: 'pretty',
              }}
            >
              {p.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 16 }}>
              {p.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Hover>
        ))}
      </div>
      <div
        data-reveal
        style={{ marginTop: 22, font: "400 13px 'IBM Plex Mono', monospace", color: 'var(--fg3)' }}
      >
        more experiments →{' '}
        <a href={`${socials.github}?tab=repositories`} target="_blank" rel="noreferrer">
          github.com/nileshp07
        </a>
      </div>
    </div>
  );
}

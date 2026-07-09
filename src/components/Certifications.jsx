import { Hover } from './Hover.jsx';
import { certifications } from '../data/portfolio.js';

export function Certifications() {
  return (
    <div
      id="certs"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}
    >
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
        $ ls ./certifications
      </div>
      <div
        className="np-two-col"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 26 }}
      >
        {certifications.map((c) => (
          <Hover
            key={c.title}
            as="a"
            data-reveal
            href={c.link}
            target="_blank"
            rel="noreferrer"
            style={{
              border: '1px solid var(--line)',
              borderRadius: 14,
              background: 'var(--panel)',
              padding: '22px 26px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              color: 'var(--fg)',
              transition: 'border-color 0.25s',
            }}
            hoverStyle={{ borderColor: 'var(--accent-40)', color: 'var(--fg)' }}
          >
            <span style={{ font: "600 18px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
              ⬢
            </span>
            <span style={{ flex: 1 }}>
              <span style={{ display: 'block', font: "600 15.5px 'Space Grotesk', sans-serif" }}>
                {c.title}
              </span>
              <span
                style={{
                  display: 'block',
                  font: "400 12px 'IBM Plex Mono', monospace",
                  color: 'var(--fg3)',
                  marginTop: 3,
                }}
              >
                {c.issuer}
              </span>
            </span>
            <span style={{ color: 'var(--fg3)' }}>↗</span>
          </Hover>
        ))}
      </div>
    </div>
  );
}

import { Hover } from './Hover.jsx';
import { Terminal } from './Terminal.jsx';

export function Hero({ terminal }) {
  return (
    <div
      id="top"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '150px 28px 0' }}
    >
      <div
        className="np-hero-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1.02fr 0.98fr',
          gap: 52,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 9,
              border: '1px solid var(--line2)',
              borderRadius: 99,
              padding: '7px 15px',
              font: "500 12px 'IBM Plex Mono', monospace",
              color: 'var(--fg2)',
              animation: 'fadeUp 0.7s 0.05s both',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'pulse 2.4s infinite',
              }}
            />
            open to full-stack &amp; frontend roles
          </div>
          <h1
            style={{
              font: "700 clamp(52px, 6.4vw, 84px)/1.02 'Space Grotesk', sans-serif",
              letterSpacing: '-0.03em',
              margin: '22px 0 0',
              animation: 'fadeUp 0.7s 0.14s both',
            }}
          >
            Nilesh
            <br />
            Parmar<span style={{ color: 'var(--accent)' }}>.</span>
          </h1>
          <div
            style={{
              font: "500 17px 'IBM Plex Mono', monospace",
              color: 'var(--accent)',
              marginTop: 18,
              animation: 'fadeUp 0.7s 0.22s both',
            }}
          >
            full-stack developer <span style={{ color: 'var(--fg3)' }}>·</span> react{' '}
            <span style={{ color: 'var(--fg3)' }}>·</span> typescript{' '}<span style={{ color: 'var(--fg3)' }}>·</span> node.js
          </div>
          <p
            style={{
              font: "400 16.5px/1.7 'Space Grotesk', sans-serif",
              color: 'var(--fg2)',
              maxWidth: 470,
              margin: '16px 0 0',
              textWrap: 'pretty',
              animation: 'fadeUp 0.7s 0.3s both',
            }}
          >
            Software developer focused on backend architecture and system
            design, with an eye for clean, usable interfaces.
          </p>
          <div
            style={{ display: 'flex', gap: 12, marginTop: 30, animation: 'fadeUp 0.7s 0.38s both' }}
          >
            <Hover
              as="a"
              href="#projects"
              style={{
                background: 'var(--accent)',
                color: 'var(--accent-ink)',
                font: "600 13.5px 'IBM Plex Mono', monospace",
                padding: '12px 22px',
                borderRadius: 9,
                transition: 'transform 0.15s',
              }}
              hoverStyle={{ transform: 'translateY(-2px)', color: 'var(--accent-ink)' }}
            >
              view projects →
            </Hover>
            <Hover
              as="a"
              href="#contact"
              style={{
                border: '1px solid var(--line2)',
                color: 'var(--fg)',
                font: "500 13.5px 'IBM Plex Mono', monospace",
                padding: '12px 22px',
                borderRadius: 9,
                transition: 'border-color 0.2s',
              }}
              hoverStyle={{ borderColor: 'var(--accent)', color: 'var(--fg)' }}
            >
              get in touch
            </Hover>
          </div>
        </div>

        <Terminal terminal={terminal} />
      </div>
    </div>
  );
}

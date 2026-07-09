import { useRef, useState } from 'react';
import { Hover } from './Hover.jsx';
import { EMAIL, RESUME_URL, socials } from '../data/portfolio.js';

export function Contact() {
  const [copyLabel, setCopyLabel] = useState('copy email');
  const timerRef = useRef(null);

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
    } catch (e) {
      /* ignore */
    }
    setCopyLabel('copied ✓');
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyLabel('copy email'), 1800);
  };

  return (
    <div
      id="contact"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '130px 28px 90px', scrollMarginTop: 70 }}
    >
      <div
        data-reveal
        style={{
          border: '1px solid var(--line)',
          borderRadius: 20,
          background: 'var(--bg2)',
          padding: '64px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
          $ ssh nilesh@anywhere
        </div>
        <h2
          style={{
            font: "700 clamp(34px, 4.6vw, 58px)/1.1 'Space Grotesk', sans-serif",
            letterSpacing: '-0.025em',
            margin: '18px auto 0',
            maxWidth: 640,
          }}
        >
          Let's build something that ships.
        </h2>
        <p
          style={{
            font: "400 15.5px/1.7 'Space Grotesk', sans-serif",
            color: 'var(--fg2)',
            maxWidth: 480,
            margin: '16px auto 0',
          }}
        >
          Actively seeking full-stack and frontend-leaning roles. Remote or Pune. Usually replies
          within a day.
        </p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 30,
          }}
        >
          <Hover
            as="a"
            href={`mailto:${EMAIL}`}
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-ink)',
              font: "600 13.5px 'IBM Plex Mono', monospace",
              padding: '13px 24px',
              borderRadius: 9,
              transition: 'transform 0.15s',
            }}
            hoverStyle={{ transform: 'translateY(-2px)', color: 'var(--accent-ink)' }}
          >
            {EMAIL}
          </Hover>
          <Hover
            as="button"
            onClick={copyEmail}
            style={{
              cursor: 'pointer',
              background: 'none',
              border: '1px solid var(--line2)',
              color: 'var(--fg)',
              font: "500 13.5px 'IBM Plex Mono', monospace",
              padding: '13px 20px',
              borderRadius: 9,
              transition: 'border-color 0.2s',
            }}
            hoverStyle={{ borderColor: 'var(--accent)' }}
          >
            {copyLabel}
          </Hover>
          <Hover
            as="a"
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              border: '1px solid var(--line2)',
              color: 'var(--fg)',
              font: "500 13.5px 'IBM Plex Mono', monospace",
              padding: '13px 20px',
              borderRadius: 9,
              transition: 'border-color 0.2s',
            }}
            hoverStyle={{ borderColor: 'var(--accent)', color: 'var(--fg)' }}
          >
            resume.pdf ⤓
          </Hover>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 22,
            justifyContent: 'center',
            marginTop: 30,
            font: "500 13px 'IBM Plex Mono', monospace",
          }}
        >
          <Hover as="a" href={socials.github} target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg2)' }} hoverStyle={{ color: 'var(--accent)' }}>
            github ↗
          </Hover>
          <Hover as="a" href={socials.linkedin} target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg2)' }} hoverStyle={{ color: 'var(--accent)' }}>
            linkedin ↗
          </Hover>
          <Hover as="a" href={socials.twitter} target="_blank" rel="noreferrer"
            style={{ color: 'var(--fg2)' }} hoverStyle={{ color: 'var(--accent)' }}>
            x / twitter ↗
          </Hover>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 34,
          font: "400 12px 'IBM Plex Mono', monospace",
          color: 'var(--fg3)',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <span>© 2026 Nilesh Parmar — designed &amp; built from scratch</span>
        <span>
          pune, in · utc+5:30 · <span style={{ color: 'var(--accent)' }}>$ exit 0</span>
        </span>
      </div>
    </div>
  );
}

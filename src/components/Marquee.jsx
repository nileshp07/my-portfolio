import { marqueeItems } from '../data/portfolio.js';

export function Marquee() {
  const content = marqueeItems.join('  ✦  ') + '  ✦  ';
  const span = (
    <span
      style={{
        font: "500 13px 'IBM Plex Mono', monospace",
        color: 'var(--fg2)',
        letterSpacing: '0.06em',
      }}
    >
      {content}
    </span>
  );

  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        marginTop: 84,
        overflow: 'hidden',
        background: 'var(--bg2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
          padding: '13px 0',
        }}
      >
        {span}
        {span}
      </div>
    </div>
  );
}

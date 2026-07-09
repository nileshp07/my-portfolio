import { experience } from '../data/portfolio.js';

export function Experience() {
  return (
    <div
      id="experience"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}
    >
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
        $ git log --career
      </div>
      <h2
        data-reveal
        style={{
          font: "700 clamp(30px, 3.4vw, 42px)/1.15 'Space Grotesk', sans-serif",
          letterSpacing: '-0.02em',
          margin: '14px 0 0',
        }}
      >
        Experience
      </h2>
      <div
        style={{
          marginTop: 38,
          borderLeft: '2px solid var(--line2)',
          paddingLeft: 34,
          display: 'flex',
          flexDirection: 'column',
          gap: 44,
          position: 'relative',
        }}
      >
        {experience.map((job) => (
          <div key={job.hash} data-reveal style={{ position: 'relative' }}>
            <span
              style={
                job.head
                  ? {
                      position: 'absolute',
                      left: -42,
                      top: 6,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: '3px solid var(--bg)',
                      animation: 'pulse 2.4s infinite',
                    }
                  : {
                      position: 'absolute',
                      left: -41,
                      top: 6,
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: 'var(--fg3)',
                      border: '3px solid var(--bg)',
                    }
              }
            />
            <div style={{ font: "500 12px 'IBM Plex Mono', monospace", color: 'var(--amber)' }}>
              {job.hash} ·{' '}
              {job.head && (
                <>
                  <span style={{ color: 'var(--accent)' }}>HEAD → main</span> ·{' '}
                </>
              )}
              {job.date}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 14,
                flexWrap: 'wrap',
                marginTop: 8,
              }}
            >
              <div style={{ font: "600 22px 'Space Grotesk', sans-serif" }}>{job.role}</div>
              <div style={{ font: "500 14px 'IBM Plex Mono', monospace", color: 'var(--fg2)' }}>
                {job.org}
              </div>
            </div>
            {job.bullets.length > 0 && (
              <ul
                style={{
                  margin: '14px 0 0',
                  paddingLeft: 18,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 9,
                  font: "400 14.5px/1.65 'Space Grotesk', sans-serif",
                  color: 'var(--fg2)',
                  maxWidth: 780,
                }}
              >
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

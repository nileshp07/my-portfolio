import { socials, GITHUB_USERNAME } from '../data/portfolio.js';

export function GitHub({ github }) {
  const { ok, failed, weeks, totalLabel, langs, visibleStats } = github;

  return (
    <div
      id="github"
      style={{ maxWidth: 1160, margin: '0 auto', padding: '110px 28px 0', scrollMarginTop: 70 }}
    >
      <div data-reveal style={{ font: "500 13px 'IBM Plex Mono', monospace", color: 'var(--accent)' }}>
        $ gh profile {GITHUB_USERNAME} --live
      </div>
      <div
        data-reveal
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
          marginTop: 14,
        }}
      >
        <h2
          style={{
            font: "700 clamp(30px, 3.4vw, 42px)/1.15 'Space Grotesk', sans-serif",
            letterSpacing: '-0.02em',
            margin: 0,
          }}
        >
          Proof of work
        </h2>
        <span style={{ font: "400 13px 'IBM Plex Mono', monospace", color: 'var(--fg3)' }}>
          fetched live from the GitHub API
        </span>
      </div>

      {/* Stat cards */}
      <div
        data-reveal
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: 20,
          marginTop: 36,
        }}
      >
        {visibleStats.map((st) => (
          <div
            key={st.label}
            style={{
              border: '1px solid var(--line)',
              borderRadius: 14,
              background: 'var(--panel)',
              padding: '22px 24px',
            }}
          >
            <div style={{ font: "700 34px 'Space Grotesk', sans-serif", color: 'var(--accent)' }}>
              {st.v}
            </div>
            <div
              style={{
                font: "500 11.5px 'IBM Plex Mono', monospace",
                color: 'var(--fg3)',
                letterSpacing: '0.1em',
                marginTop: 5,
              }}
            >
              {st.label}
            </div>
          </div>
        ))}
      </div>

      {/* Contribution graph */}
      <div
        data-reveal
        style={{
          border: '1px solid var(--line)',
          borderRadius: 16,
          background: 'var(--panel)',
          padding: '26px 30px',
          marginTop: 20,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ font: "600 13px 'IBM Plex Mono', monospace", color: 'var(--fg2)' }}>
            {totalLabel}
          </div>
          <a href={socials.github} target="_blank" rel="noreferrer"
            style={{ font: "500 12px 'IBM Plex Mono', monospace" }}>
            @{GITHUB_USERNAME} ↗
          </a>
        </div>

        {ok && (
          <>
            <div style={{ overflowX: 'auto', marginTop: 18, paddingBottom: 4 }}>
              <div style={{ display: 'flex', gap: 3, width: 'max-content' }}>
                {weeks.map((w, wi) => (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {w.days.map((d, di) => (
                      <div
                        key={di}
                        title={d.tip}
                        style={{ width: 11, height: 11, borderRadius: 2.5, background: d.bg }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 5,
                marginTop: 12,
                font: "400 11px 'IBM Plex Mono', monospace",
                color: 'var(--fg3)',
              }}
            >
              less
              {['--gh0', '--gh1', '--gh2', '--gh3', '--gh4'].map((v) => (
                <span
                  key={v}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: `var(${v})`,
                    display: 'inline-block',
                  }}
                />
              ))}
              more
            </div>
          </>
        )}

        {failed && (
          <img
            src={`https://ghchart.rshah.org/26a641/${GITHUB_USERNAME}`}
            alt="GitHub contributions"
            style={{ width: '100%', marginTop: 18 }}
          />
        )}
      </div>

      {/* Top languages */}
      <div
        data-reveal
        style={{
          border: '1px solid var(--line)',
          borderRadius: 16,
          background: 'var(--panel)',
          padding: '26px 30px',
          marginTop: 20,
        }}
      >
        <div style={{ font: "600 13px 'IBM Plex Mono', monospace", color: 'var(--fg2)' }}>
          top languages{' '}
          <span style={{ color: 'var(--fg3)' }}>— weighted by code volume across public repos</span>
        </div>
        <div
          style={{
            display: 'flex',
            height: 12,
            borderRadius: 99,
            overflow: 'hidden',
            marginTop: 18,
            background: 'var(--gh0)',
          }}
        >
          {langs.map((l) => (
            <div
              key={l.name}
              title={l.name}
              style={{ width: l.w, background: l.color, transition: 'width 0.8s' }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 14 }}>
          {langs.map((l) => (
            <div
              key={l.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                font: "500 12px 'IBM Plex Mono', monospace",
                color: 'var(--fg2)',
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: '50%',
                  background: l.color,
                  display: 'inline-block',
                }}
              />
              {l.name} <span style={{ color: 'var(--fg3)' }}>{l.pct}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

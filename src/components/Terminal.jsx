export function Terminal({ terminal }) {
  const {
    termLines,
    termInput,
    setTermInput,
    booted,
    booting,
    bodyRef,
    inputRef,
    onTermKey,
    focusTerm,
  } = terminal;

  return (
    <div style={{ animation: 'termIn 0.8s 0.35s both' }}>
      <div
        style={{
          background: 'var(--t-bg)',
          border: '1px solid var(--t-line)',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: 'var(--shadow)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 16px',
            background: 'var(--t-head)',
            borderBottom: '1px solid var(--t-line)',
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#f87171' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#fbbf24' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#34d399' }} />
          <span
            style={{
              flex: 1,
              textAlign: 'center',
              font: "500 11.5px 'IBM Plex Mono', monospace",
              color: 'var(--t-dim)',
            }}
          >
            nilesh@portfolio — zsh
          </span>
          <span
            style={{
              font: "500 10px 'IBM Plex Mono', monospace",
              color: 'var(--t-dim)',
              border: '1px solid var(--t-line)',
              borderRadius: 5,
              padding: '2px 7px',
            }}
          >
            interactive
          </span>
        </div>
        <div
          ref={bodyRef}
          onClick={focusTerm}
          className="np-term-body"
          style={{
            height: 348,
            overflowY: 'auto',
            padding: '18px 20px',
            font: "400 13px/1.85 'IBM Plex Mono', monospace",
            cursor: 'text',
          }}
        >
          {termLines.map((ln, i) => (
            <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              <span style={{ color: 'var(--t-green)', fontWeight: 600 }}>{ln.p}</span>
              <span style={{ color: ln.c }}>{ln.t}</span>
            </div>
          ))}
          {booted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <span style={{ color: 'var(--t-green)', fontWeight: 600, whiteSpace: 'pre' }}>
                ➜ ~{' '}
              </span>
              <input
                ref={inputRef}
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                onKeyDown={onTermKey}
                spellCheck="false"
                autoComplete="off"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--t-text)',
                  font: "400 13px 'IBM Plex Mono', monospace",
                  caretColor: 'var(--t-green)',
                  padding: 0,
                }}
              />
            </div>
          )}
          {booting && (
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 15,
                background: 'var(--t-green)',
                verticalAlign: 'text-bottom',
                animation: 'blink 1s infinite',
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          textAlign: 'center',
          font: "400 11.5px 'IBM Plex Mono', monospace",
          color: 'var(--fg3)',
          marginTop: 12,
        }}
      >
        ↳ it's real — click in and type <span style={{ color: 'var(--accent)' }}>help</span>
      </div>
    </div>
  );
}

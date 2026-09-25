import './Terminal.css';

const SUGGESTIONS = ['help', 'projects', 'skills', 'sudo hire-me'];

export function Terminal({ terminal }) {
  const { lines, input, setInput, booted, bodyRef, inputRef, onKeyDown, focus, execute } = terminal;

  return (
    <div className="term">
      <div className="term__window">
        <div className="term__bar">
          <span className="term__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="term__title">nilesh — zsh</span>
          <span className="term__badge">
            Interactive
          </span>
        </div>

        {/* Clicking anywhere in the body focuses the prompt, like a real terminal. */}
        <div ref={bodyRef} className="term__body" onClick={focus}>
          {lines.map((ln, i) => (
            <div key={i} className={`term__line term__line--${ln.tone}`}>
              {ln.prompt && <span className="term__prompt">➜ ~ </span>}
              {ln.text}
            </div>
          ))}

          {booted ? (
            <div className="term__input-row">
              <span className="term__prompt">➜ ~ </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="term__input"
                aria-label="Terminal — type a command and press Enter"
                spellCheck="false"
                autoComplete="off"
                autoCapitalize="off"
                enterKeyHint="go"
              />
            </div>
          ) : (
            <span className="term__cursor" aria-hidden="true" />
          )}
        </div>
      </div>

      <div className="term__hints">
        <span>Try</span>
        {SUGGESTIONS.map((cmd) => (
          <button key={cmd} type="button" disabled={!booted} onClick={() => execute(cmd)}>
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

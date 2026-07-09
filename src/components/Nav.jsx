import { Hover } from './Hover.jsx';
import { RESUME_URL } from '../data/portfolio.js';

const NAV_LINKS = ['about', 'experience', 'projects', 'github', 'contact'];

export function Nav({ theme, toggleTheme }) {
  const themeIcon = theme === 'dark' ? '☾' : '☀';
  const themeLabel = theme === 'dark' ? 'dark' : 'light';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: '0 auto',
          padding: '14px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 26,
        }}
      >
        <a href="#top" style={{ font: "600 15px 'IBM Plex Mono', monospace", color: 'var(--fg)' }}>
          ~/<span style={{ color: 'var(--accent)' }}>nilesh</span>
        </a>
        <div style={{ flex: 1 }} />
        <div
          className="np-nav-links"
          style={{
            display: 'flex',
            gap: 20,
            alignItems: 'center',
            font: "500 12.5px 'IBM Plex Mono', monospace",
          }}
        >
          {NAV_LINKS.map((link) => (
            <Hover
              key={link}
              as="a"
              href={`#${link}`}
              style={{ color: 'var(--fg2)' }}
              hoverStyle={{ color: 'var(--accent)' }}
            >
              {link}
            </Hover>
          ))}
        </div>
        <Hover
          as="button"
          onClick={toggleTheme}
          title="toggle theme"
          style={{
            cursor: 'pointer',
            background: 'none',
            border: '1px solid var(--line2)',
            borderRadius: 99,
            color: 'var(--fg)',
            font: "500 12px 'IBM Plex Mono', monospace",
            padding: '7px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            transition: 'border-color 0.2s',
          }}
          hoverStyle={{ borderColor: 'var(--accent)' }}
        >
          {themeIcon} {themeLabel}
        </Hover>
        <Hover
          as="a"
          href={RESUME_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            font: "600 12.5px 'IBM Plex Mono', monospace",
            padding: '8px 16px',
            borderRadius: 8,
            transition: 'transform 0.15s',
          }}
          hoverStyle={{ transform: 'translateY(-1px)', color: 'var(--accent-ink)' }}
        >
          resume ⤓
        </Hover>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { navLinks, RESUME_URL } from '../data/portfolio.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import { ArrowRight, Close, Download, Menu, Moon, Sun } from './ui/Icons.jsx';
import { SocialLinks } from './ui/SocialLinks.jsx';
import './Nav.css';

// Every section is observed so the highlight clears on sections without a link.
const SPY_IDS = ['top', 'about', 'experience', 'projects', 'github', 'contact'];

export function Nav({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 880 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <header className={`nav${scrolled || open ? ' nav--solid' : ''}`}>
      <div className="nav__progress" aria-hidden="true" />
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label="Nilesh Parmar — back to top">
          <span className="nav__mark" aria-hidden="true">
            N
          </span>
          <span className="nav__brand-name">Nilesh Parmar</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link${active === link.id ? ' is-active' : ''}`}
              aria-current={active === link.id ? 'location' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn nav__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn--primary btn--sm" href={RESUME_URL} target="_blank" rel="noreferrer">
            Resume
            <Download />
          </a>
          <button
            type="button"
            className="icon-btn nav__menu-btn"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__sheet" hidden={!open}>
        <nav className="container" aria-label="Mobile">
          <ul className="nav__sheet-links">
            {navLinks.map((link, i) => (
              <li key={link.id} style={{ '--i': i }}>
                <a href={`#${link.id}`} onClick={() => setOpen(false)}>
                  {link.label}
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
          <SocialLinks className="nav__sheet-socials" />
        </nav>
      </div>
    </header>
  );
}

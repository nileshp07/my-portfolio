import { useCallback, useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

const STORAGE_KEY = 'np_theme';
const THEME_COLORS = { dark: '#0b0c0a', light: '#f5f3ec' };

// index.html sets data-theme before first paint (stored choice, else the OS
// preference), so we read it back here instead of flashing the wrong theme.
function readInitialTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setThemeState] = useState(readInitialTheme);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
    document.documentElement.setAttribute('data-theme', theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  }, [theme]);

  const setTheme = useCallback((next) => {
    if (next === themeRef.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable — the choice just won't persist */
    }
    const commit = () => {
      document.documentElement.setAttribute('data-theme', next);
      flushSync(() => setThemeState(next));
    };
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    // Cross-fade the whole page between themes where the browser supports it.
    if (document.startViewTransition && !reduced) document.startViewTransition(commit);
    else commit();
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(themeRef.current === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, setTheme, toggleTheme };
}

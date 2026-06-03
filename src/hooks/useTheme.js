import { useState, useEffect, useCallback } from 'react';

const THEME_KEY = 'sudais-portfolio-theme';
const THEMES = { DARK: 'dark', LIGHT: 'light' };

/**
 * useTheme
 * Manages dark/light mode with localStorage persistence.
 * Applies the active theme via data-theme attribute on <html> and
 * toggles a matching class, so CSS variables can key off either.
 *
 * Returns:
 *   theme        — 'dark' | 'light'
 *   isDark       — boolean shorthand
 *   isLight      — boolean shorthand
 *   toggleTheme  — flip between dark ↔ light
 *   setTheme     — set explicitly to 'dark' | 'light'
 *   THEMES       — { DARK, LIGHT } constants
 */
export function useTheme() {
  /* ── Derive initial theme ────────────────────────────────────────── */
  const getInitialTheme = () => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === THEMES.DARK || stored === THEMES.LIGHT) return stored;
    } catch (_) { /* localStorage blocked */ }

    // Fall back to OS preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEMES.DARK
        : THEMES.LIGHT;
    }
    return THEMES.DARK; // hard default
  };

  const [theme, setThemeState] = useState(getInitialTheme);

  /* ── Apply theme to DOM + persist ────────────────────────────────── */
  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;

    // data-theme for CSS variable switching
    root.setAttribute('data-theme', newTheme);

    // Class for Tailwind-style dark: selectors (nice to have)
    root.classList.remove(THEMES.DARK, THEMES.LIGHT);
    root.classList.add(newTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === THEMES.DARK ? '#060B18' : '#F1F5F9');
    }

    try {
      localStorage.setItem(THEME_KEY, newTheme);
    } catch (_) { /* storage full or blocked */ }

    setThemeState(newTheme);
  }, []);

  /* ── Apply on first mount ─────────────────────────────────────────── */
  useEffect(() => {
    applyTheme(theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Follow OS preference changes (only if user hasn't overridden) ── */
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!mq) return;

    const handler = (e) => {
      const stored = localStorage.getItem(THEME_KEY);
      if (!stored) applyTheme(e.matches ? THEMES.DARK : THEMES.LIGHT);
    };

    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [applyTheme]);

  /* ── Exposed API ──────────────────────────────────────────────────── */
  const toggleTheme = useCallback(() => {
    applyTheme(theme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK);
  }, [theme, applyTheme]);

  const setTheme = useCallback((t) => {
    if (t === THEMES.DARK || t === THEMES.LIGHT) applyTheme(t);
  }, [applyTheme]);

  return {
    theme,
    isDark:  theme === THEMES.DARK,
    isLight: theme === THEMES.LIGHT,
    toggleTheme,
    setTheme,
    THEMES,
  };
}

export default useTheme;

import { useEffect, useState } from 'react';

const THEME_KEY = 'sudais-portfolio-theme';

/**
 * ThemeToggle
 * Standalone dark / light mode switcher — works without any context.
 * Reads and writes to localStorage directly, and applies data-theme on <html>.
 *
 * Props:
 *   variant — 'icon' | 'pill' | 'minimal'
 *             'icon'    — square icon button (default, use in Navbar)
 *             'pill'    — sliding pill toggle
 *             'minimal' — just the SVG icon, no container
 *   size    — 'sm' | 'md' | 'lg'
 *   label   — show text label beside icon (icon variant only)
 */
export function ThemeToggle({ variant = 'icon', size = 'md', label = false }) {
  const [isDark, setIsDark] = useState(true);

  /* ── Sync with DOM on mount ── */
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    const dark = stored ? stored === 'dark' : prefersDark !== false;
    setIsDark(dark);
    applyTheme(dark);
  }, []);

  function applyTheme(dark) {
    const root = document.documentElement;
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.classList.toggle('dark', dark);
    root.classList.toggle('light', !dark);
    try { localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light'); } catch (_) {}
  }

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    applyTheme(next);
  }

  /* ── Icons ── */
  const MoonIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );

  const SunIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"
      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1"  x2="12" y2="3"  />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22"  x2="5.64"  y2="5.64"  />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1"  y1="12" x2="3"  y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36" />
      <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
    </svg>
  );

  /* ── Size tokens ── */
  const sizes = {
    sm: { btn: 30, icon: 14, pill: { w: 48, h: 26, knob: 20 } },
    md: { btn: 36, icon: 16, pill: { w: 56, h: 30, knob: 24 } },
    lg: { btn: 42, icon: 18, pill: { w: 64, h: 34, knob: 28 } },
  };
  const s = sizes[size] || sizes.md;

  /* ────────────────────────────────────────────────────────────
     VARIANT: ICON (default)
  ──────────────────────────────────────────────────────────── */
  if (variant === 'icon') {
    return (
      <button
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Light mode' : 'Dark mode'}
        style={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '6px',
          width:          label ? 'auto' : s.btn,
          height:         s.btn,
          padding:        label ? `0 12px` : 0,
          borderRadius:   '9px',
          border:         '1px solid rgba(59,130,246,0.2)',
          background:     isDark
            ? 'rgba(15,32,68,0.6)'
            : 'rgba(241,245,249,0.8)',
          color:          isDark ? '#94A3B8' : '#475569',
          cursor:         'pointer',
          transition:     'all 0.2s ease',
          justifyContent: 'center',
          flexShrink:     0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
          e.currentTarget.style.color       = isDark ? '#60A5FA' : '#2563EB';
          e.currentTarget.style.background  = isDark
            ? 'rgba(59,130,246,0.1)'
            : 'rgba(37,99,235,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)';
          e.currentTarget.style.color       = isDark ? '#94A3B8' : '#475569';
          e.currentTarget.style.background  = isDark
            ? 'rgba(15,32,68,0.6)'
            : 'rgba(241,245,249,0.8)';
        }}
      >
        <span style={{
          display: 'flex', alignItems: 'center',
          transition: 'transform 0.3s ease',
          transform: 'rotate(0deg)',
        }}>
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
        {label && (
          <span style={{ fontSize: '0.8rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}
      </button>
    );
  }

  /* ────────────────────────────────────────────────────────────
     VARIANT: PILL (sliding toggle)
  ──────────────────────────────────────────────────────────── */
  if (variant === 'pill') {
    const { w, h, knob } = s.pill;
    const knobOffset = isDark ? 3 : w - knob - 3;

    return (
      <button
        onClick={toggle}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          position:     'relative',
          display:      'inline-flex',
          alignItems:   'center',
          width:        w,
          height:       h,
          borderRadius: h / 2,
          border:       '1px solid rgba(59,130,246,0.25)',
          background:   isDark
            ? 'rgba(15,32,68,0.8)'
            : 'rgba(219,234,254,0.8)',
          cursor:       'pointer',
          transition:   'background 0.3s ease, border-color 0.3s ease',
          padding:      0,
          flexShrink:   0,
        }}
      >
        {/* Sun icon — left side */}
        <span style={{
          position:   'absolute',
          left:       6,
          color:      isDark ? '#475569' : '#FBBF24',
          transition: 'opacity 0.3s ease',
          opacity:    isDark ? 0.4 : 1,
          display:    'flex',
        }}>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"
            viewBox="0 0 24 24" strokeLinecap="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        </span>

        {/* Moon icon — right side */}
        <span style={{
          position:   'absolute',
          right:      6,
          color:      isDark ? '#60A5FA' : '#CBD5E1',
          transition: 'opacity 0.3s ease',
          opacity:    isDark ? 1 : 0.35,
          display:    'flex',
        }}>
          <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </span>

        {/* Sliding knob */}
        <span style={{
          position:     'absolute',
          left:         knobOffset,
          width:        knob,
          height:       knob,
          borderRadius: '50%',
          background:   isDark
            ? 'linear-gradient(135deg, #1E3A78, #3B82F6)'
            : 'linear-gradient(135deg, #FCD34D, #F59E0B)',
          boxShadow:    '0 2px 8px rgba(0,0,0,0.3)',
          transition:   'left 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.3s ease',
        }} />
      </button>
    );
  }

  /* ────────────────────────────────────────────────────────────
     VARIANT: MINIMAL (just the icon, no container)
  ──────────────────────────────────────────────────────────── */
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        display:    'inline-flex',
        alignItems: 'center',
        padding:    '4px',
        border:     'none',
        background: 'transparent',
        color:      isDark ? '#94A3B8' : '#475569',
        cursor:     'pointer',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={e => e.currentTarget.style.color = isDark ? '#60A5FA' : '#2563EB'}
      onMouseLeave={e => e.currentTarget.style.color = isDark ? '#94A3B8' : '#475569'}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ThemeToggle;

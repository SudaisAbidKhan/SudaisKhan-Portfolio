import { useState, useEffect, useCallback } from 'react';

/**
 * ScrollToTop
 * Floating button that appears after scrolling past a threshold
 * and smoothly scrolls the page back to the top when clicked.
 *
 * Props:
 *   threshold  — px scrolled before button appears (default 400)
 *   position   — 'right' | 'left' (default 'right')
 *   bottom     — bottom offset in px (default 32)
 *   side       — side offset in px (default 28)
 *   showLabel  — show "Top" text label (default false)
 *   variant    — 'circle' | 'square' (default 'circle')
 */
export function ScrollToTop({
  threshold = 400,
  position  = 'right',
  bottom    = 32,
  side      = 28,
  showLabel = false,
  variant   = 'circle',
}) {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  /* ── Track scroll position ── */
  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > threshold);
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Scroll handler ── */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Keyboard accessibility ── */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToTop();
    }
  };

  const ArrowUp = () => (
    <svg
      width="18" height="18"
      fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      viewBox="0 0 24 24"
      style={{
        transition: 'transform 0.2s ease',
        transform:  hovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      <path d="M18 15l-6-6-6 6" />
    </svg>
  );

  const style = {
    position:   'fixed',
    bottom:     bottom,
    [position]: side,
    zIndex:     999,

    display:        'inline-flex',
    flexDirection:  'column',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '2px',

    width:        showLabel ? 'auto' : 44,
    height:       showLabel ? 'auto' : 44,
    padding:      showLabel ? '8px 14px' : 0,

    borderRadius: variant === 'circle' ? '50%' : '10px',
    border:       '1px solid rgba(59,130,246,0.35)',
    background:   hovered
      ? 'var(--blue-600, #2563EB)'
      : 'rgba(15,32,68,0.85)',
    color:        hovered ? '#fff' : '#60A5FA',
    backdropFilter: 'blur(12px)',
    boxShadow:    hovered
      ? '0 8px 24px rgba(37,99,235,0.4)'
      : '0 4px 16px rgba(0,0,0,0.4)',
    cursor:       'pointer',

    /* Visibility animation */
    opacity:      visible ? 1 : 0,
    transform:    visible
      ? 'translateY(0) scale(1)'
      : 'translateY(16px) scale(0.85)',
    pointerEvents: visible ? 'auto' : 'none',
    transition:   'opacity 0.3s ease, transform 0.3s cubic-bezier(0.34,1.56,0.64,1), background 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
  };

  return (
    <button
      onClick={scrollToTop}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Scroll to top"
      title="Back to top"
      style={style}
    >
      <ArrowUp />
      {showLabel && (
        <span style={{
          fontSize:      '0.6rem',
          fontFamily:    'var(--font-mono, monospace)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          lineHeight:    1,
          marginTop:     '-1px',
        }}>
          TOP
        </span>
      )}
    </button>
  );
}

export default ScrollToTop;

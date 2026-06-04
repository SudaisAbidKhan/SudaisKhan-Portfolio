import { useState } from 'react';

/**
 * Button
 *
 * Props:
 *   variant   — 'primary' | 'secondary' | 'ghost' | 'danger'
 *   size      — 'sm' | 'md' | 'lg'
 *   href      — renders as <a> if provided
 *   external  — adds target="_blank" when href is set
 *   icon      — JSX element shown before label
 *   iconRight — JSX element shown after label
 *   loading   — shows spinner, disables button
 *   fullWidth — stretches to 100%
 *   disabled
 *   onClick
 *   children
 *   className — extra class string passed through
 */
export function Button({
  variant   = 'primary',
  size      = 'md',
  href,
  external  = false,
  icon,
  iconRight,
  loading   = false,
  fullWidth = false,
  disabled  = false,
  onClick,
  children,
  className = '',
  ...rest
}) {
  const [pressed, setPressed] = useState(false);

  /* ── Size tokens ── */
  const sizes = {
    sm: { padding: '6px 14px',  fontSize: '0.8rem',  gap: '5px',  radius: '7px'  },
    md: { padding: '10px 22px', fontSize: '0.9rem',  gap: '7px',  radius: '9px'  },
    lg: { padding: '13px 28px', fontSize: '0.975rem', gap: '8px', radius: '10px' },
  };

  /* ── Variant tokens ── */
  const variants = {
    primary: {
      background:      'var(--blue-600, #2563EB)',
      backgroundHover: 'var(--blue-500, #3B82F6)',
      color:           '#ffffff',
      border:          '1px solid var(--blue-500, #3B82F6)',
    },
    secondary: {
      background:      'transparent',
      backgroundHover: 'rgba(59,130,246,0.08)',
      color:           'var(--slate-200, #E2E8F0)',
      border:          '1px solid rgba(59,130,246,0.25)',
    },
    ghost: {
      background:      'transparent',
      backgroundHover: 'rgba(255,255,255,0.06)',
      color:           'var(--slate-300, #CBD5E1)',
      border:          '1px solid transparent',
    },
    danger: {
      background:      'rgba(239,68,68,0.12)',
      backgroundHover: 'rgba(239,68,68,0.22)',
      color:           '#F87171',
      border:          '1px solid rgba(239,68,68,0.3)',
    },
  };

  const v = variants[variant] || variants.primary;
  const s = sizes[size]       || sizes.md;

  const isDisabled = disabled || loading;

  const baseStyle = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            s.gap,
    padding:        s.padding,
    fontSize:       s.fontSize,
    fontFamily:     'var(--font-body, sans-serif)',
    fontWeight:     600,
    borderRadius:   s.radius,
    border:         v.border,
    background:     v.background,
    color:          v.color,
    cursor:         isDisabled ? 'not-allowed' : 'pointer',
    opacity:        isDisabled ? 0.5 : 1,
    width:          fullWidth ? '100%' : 'auto',
    textDecoration: 'none',
    transition:     'background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease',
    transform:      pressed && !isDisabled ? 'translateY(1px)' : 'translateY(0)',
    userSelect:     'none',
    whiteSpace:     'nowrap',
    lineHeight:     1,
  };

  const handleMouseEnter = (e) => {
    if (!isDisabled) e.currentTarget.style.background = v.backgroundHover;
  };
  const handleMouseLeave = (e) => {
    if (!isDisabled) e.currentTarget.style.background = v.background;
  };
  const handleMouseDown  = () => { if (!isDisabled) setPressed(true);  };
  const handleMouseUp    = () => { if (!isDisabled) setPressed(false); };

  const Spinner = () => (
    <svg
      width="14" height="14"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ animation: 'spin 0.7s linear infinite', flexShrink: 0 }}
    >
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        strokeLinecap="round" />
    </svg>
  );

  const content = (
    <>
      {loading ? <Spinner /> : icon && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{icon}</span>}
      {children && <span>{children}</span>}
      {!loading && iconRight && <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={baseStyle}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      style={baseStyle}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;

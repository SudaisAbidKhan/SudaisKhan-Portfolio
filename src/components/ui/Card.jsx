/**
 * Card
 * Base card container used across projects, skills, and achievements.
 *
 * Props:
 *   variant    — 'default' | 'bordered' | 'glow' | 'flat'
 *   padding    — 'none' | 'sm' | 'md' | 'lg'
 *   hover      — enable hover lift + border highlight
 *   accent     — hex color for left border accent stripe
 *   topBar     — show gradient top bar (bool or hex color)
 *   onClick    — makes card clickable
 *   fullHeight — stretch to parent height
 *   className
 *   children
 */
export function Card({
  variant    = 'default',
  padding    = 'md',
  hover      = false,
  accent     = null,
  topBar     = false,
  onClick    = null,
  fullHeight = false,
  className  = '',
  children,
  ...rest
}) {
  /* ── Padding tokens ── */
  const paddings = {
    none: '0',
    sm:   '1.1rem',
    md:   '1.75rem',
    lg:   '2.25rem',
  };

  /* ── Variant base styles ── */
  const variants = {
    default: {
      background: 'var(--bg-card, rgba(15,32,68,0.6))',
      border:     '1px solid var(--border, rgba(59,130,246,0.15))',
    },
    bordered: {
      background: 'var(--bg-card, rgba(15,32,68,0.6))',
      border:     '1px solid rgba(59,130,246,0.25)',
    },
    glow: {
      background: 'var(--bg-card, rgba(15,32,68,0.6))',
      border:     '1px solid rgba(59,130,246,0.2)',
      boxShadow:  '0 0 30px rgba(59,130,246,0.1)',
    },
    flat: {
      background: 'rgba(15,32,68,0.3)',
      border:     '1px solid rgba(59,130,246,0.08)',
    },
  };

  const v = variants[variant] || variants.default;
  const topBarColor = typeof topBar === 'string' ? topBar : 'var(--blue-500, #3B82F6)';

  const style = {
    position:     'relative',
    borderRadius: 'var(--radius-md, 12px)',
    overflow:     'hidden',
    padding:      paddings[padding] || paddings.md,
    height:       fullHeight ? '100%' : 'auto',
    cursor:       onClick ? 'pointer' : 'default',
    transition:   'all 0.3s ease',
    display:      'flex',
    flexDirection: 'column',
    ...v,
  };

  /* Left accent stripe */
  if (accent) {
    style.borderLeft = `3px solid ${accent}`;
    style.paddingLeft = `calc(${paddings[padding] || paddings.md} - 2px)`;
  }

  const handleMouseEnter = (e) => {
    if (!hover && !onClick) return;
    const el = e.currentTarget;
    el.style.borderColor = 'rgba(59,130,246,0.4)';
    el.style.transform   = 'translateY(-4px)';
    el.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.08)';
  };

  const handleMouseLeave = (e) => {
    if (!hover && !onClick) return;
    const el = e.currentTarget;
    el.style.borderColor = v.border.replace('1px solid ', '');
    el.style.transform   = 'translateY(0)';
    el.style.boxShadow   = v.boxShadow || 'none';
  };

  return (
    <div
      style={style}
      className={className}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {/* Top gradient bar */}
      {topBar && (
        <div style={{
          position:   'absolute',
          top: 0, left: 0, right: 0,
          height:     '2px',
          background: `linear-gradient(90deg, ${topBarColor}, transparent)`,
        }} />
      )}
      {children}
    </div>
  );
}

/**
 * CardHeader
 * Optional header section inside a Card.
 */
export function CardHeader({ children, style = {} }) {
  return (
    <div style={{
      marginBottom: '1rem',
      paddingBottom: '0.875rem',
      borderBottom: '1px solid rgba(59,130,246,0.1)',
      ...style,
    }}>
      {children}
    </div>
  );
}

/**
 * CardFooter
 * Optional footer section inside a Card.
 */
export function CardFooter({ children, style = {} }) {
  return (
    <div style={{
      marginTop:   'auto',
      paddingTop:  '1rem',
      borderTop:   '1px solid rgba(59,130,246,0.08)',
      ...style,
    }}>
      {children}
    </div>
  );
}

export default Card;

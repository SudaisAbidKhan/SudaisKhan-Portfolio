/**
 * Badge
 * Tech tag pill used on project cards and skill sections.
 *
 * Props:
 *   label     — text to display (required)
 *   color     — custom hex/css color for border + text tint
 *   variant   — 'default' | 'solid' | 'outline' | 'subtle'
 *   size      — 'xs' | 'sm' | 'md'
 *   icon      — optional JSX icon before label
 *   dot       — show a colored status dot before label
 *   onClick   — makes it interactive (cursor: pointer)
 *   active    — highlighted state (e.g. active filter chip)
 */
export function Badge({
  label,
  color   = null,
  variant = 'default',
  size    = 'sm',
  icon    = null,
  dot     = false,
  onClick = null,
  active  = false,
}) {
  /* ── Size tokens ── */
  const sizes = {
    xs: { padding: '2px 8px',  fontSize: '0.65rem', gap: '4px', dotSize: '5px' },
    sm: { padding: '3px 10px', fontSize: '0.72rem', gap: '5px', dotSize: '6px' },
    md: { padding: '5px 13px', fontSize: '0.8rem',  gap: '6px', dotSize: '7px' },
  };
  const s = sizes[size] || sizes.sm;

  /* ── Variant base styles ── */
  const accentColor = color || '#3B82F6';

  const variantStyles = {
    default: {
      background:   `${accentColor}0f`,
      border:       `1px solid ${accentColor}30`,
      color:        'var(--slate-300, #CBD5E1)',
    },
    solid: {
      background:   accentColor,
      border:       `1px solid ${accentColor}`,
      color:        '#ffffff',
    },
    outline: {
      background:   'transparent',
      border:       `1px solid ${accentColor}55`,
      color:        accentColor,
    },
    subtle: {
      background:   'rgba(255,255,255,0.04)',
      border:       '1px solid rgba(255,255,255,0.08)',
      color:        'var(--slate-400, #94A3B8)',
    },
  };

  const v = variantStyles[variant] || variantStyles.default;

  /* Active overrides */
  const activeStyle = active
    ? {
        background: `${accentColor}20`,
        border:     `1px solid ${accentColor}60`,
        color:      accentColor,
      }
    : {};

  const style = {
    display:        'inline-flex',
    alignItems:     'center',
    gap:            s.gap,
    padding:        s.padding,
    borderRadius:   '100px',
    fontSize:       s.fontSize,
    fontFamily:     'var(--font-mono, monospace)',
    fontWeight:     500,
    letterSpacing:  '0.03em',
    whiteSpace:     'nowrap',
    userSelect:     'none',
    cursor:         onClick ? 'pointer' : 'default',
    transition:     'all 0.2s ease',
    ...v,
    ...activeStyle,
  };

  const handleMouseEnter = (e) => {
    if (!onClick) return;
    e.currentTarget.style.background = `${accentColor}25`;
    e.currentTarget.style.borderColor = `${accentColor}60`;
    e.currentTarget.style.color = accentColor;
  };

  const handleMouseLeave = (e) => {
    if (!onClick) return;
    const merged = { ...v, ...activeStyle };
    e.currentTarget.style.background  = merged.background;
    e.currentTarget.style.borderColor = merged.border.replace('1px solid ', '');
    e.currentTarget.style.color       = merged.color;
  };

  return (
    <span
      style={style}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {dot && (
        <span style={{
          display:      'block',
          width:        s.dotSize,
          height:       s.dotSize,
          borderRadius: '50%',
          background:   accentColor,
          flexShrink:   0,
        }} />
      )}
      {icon && (
        <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.8em', flexShrink: 0 }}>
          {icon}
        </span>
      )}
      {label}
    </span>
  );
}

/**
 * BadgeGroup
 * Renders a row of Badge components from a string array.
 * Useful for project tech stacks.
 *
 * Props:
 *   items     — string[]
 *   max       — max badges shown before "+N more"
 *   size      — passed to each Badge
 *   variant   — passed to each Badge
 *   gap       — gap between badges (default '0.4rem')
 */
export function BadgeGroup({
  items   = [],
  max     = 99,
  size    = 'sm',
  variant = 'default',
  gap     = '0.4rem',
}) {
  const visible = items.slice(0, max);
  const overflow = items.length - visible.length;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap, alignItems: 'center' }}>
      {visible.map((item) => (
        <Badge key={item} label={item} size={size} variant={variant} />
      ))}
      {overflow > 0 && (
        <span style={{
          fontSize: '0.7rem',
          color: 'var(--slate-500, #64748B)',
          fontFamily: 'var(--font-mono, monospace)',
          alignSelf: 'center',
        }}>
          +{overflow} more
        </span>
      )}
    </div>
  );
}

export default Badge;

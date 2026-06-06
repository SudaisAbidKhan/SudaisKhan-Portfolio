/**
 * AchievementCard
 * Displays a single achievement with icon badge, title, org, date, description.
 *
 * Props:
 *   achievement — object from achievements.js data
 *   variant     — 'default' | 'compact' | 'featured'
 */
export function AchievementCard({ achievement, variant = 'default' }) {
  const {
    icon, title, organization, date,
    description, color = '#3B82F6', highlight = false,
    type, credential,
  } = achievement;

  const typeLabels = {
    competition:   'Competition',
    certification: 'Certification',
    academic:      'Academic',
    workshop:      'Leadership',
    project:       'Project',
    github:        'GitHub',
    milestone:     'Milestone',
  };

  /* ════════════════════════════════════════════════
     VARIANT: FEATURED (highlight card — larger)
  ════════════════════════════════════════════════ */
  if (variant === 'featured') {
    return (
      <div
        style={{
          background: 'rgba(15,32,68,0.6)',
          border: `1px solid ${color}33`,
          borderRadius: '14px',
          padding: '2rem',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          height: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '55';
          e.currentTarget.style.transform   = 'translateY(-4px)';
          e.currentTarget.style.boxShadow   = `0 16px 40px rgba(0,0,0,0.4), 0 0 30px ${color}12`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = color + '33';
          e.currentTarget.style.transform   = 'translateY(0)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* Glow bg */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: 140, height: 140, borderRadius: '50%',
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '14px',
            background: color + '18', border: `1px solid ${color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', flexShrink: 0,
          }}>
            {icon}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
            {highlight && (
              <span style={{
                padding: '2px 9px', borderRadius: '100px',
                background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
                color: '#F59E0B', fontSize: '0.62rem',
                fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em',
              }}>★ Highlight</span>
            )}
            <span style={{
              padding: '2px 9px', borderRadius: '100px',
              background: color + '12', border: `1px solid ${color}25`,
              color: color, fontSize: '0.65rem',
              fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em',
            }}>{typeLabels[type] || type}</span>
          </div>
        </div>

        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: '0.4rem' }}>
          {title}
        </h3>
        <p style={{ fontSize: '0.82rem', color: color, fontWeight: 500, marginBottom: '0.25rem' }}>
          {organization}
        </p>
        <p style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono, monospace)', marginBottom: '0.875rem' }}>
          {date}
        </p>
        <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.7 }}>
          {description}
        </p>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: COMPACT (horizontal single-line row)
  ════════════════════════════════════════════════ */
  if (variant === 'compact') {
    return (
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: '0.875rem',
          padding: '0.875rem 1rem',
          background: 'rgba(15,32,68,0.4)',
          border: '1px solid rgba(59,130,246,0.12)',
          borderRadius: '10px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '40';
          e.currentTarget.style.background  = 'rgba(15,32,68,0.65)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.12)';
          e.currentTarget.style.background  = 'rgba(15,32,68,0.4)';
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: '9px', flexShrink: 0,
          background: color + '15', border: `1px solid ${color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1rem',
        }}>
          {icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#E2E8F0', lineHeight: 1.3, marginBottom: '0.1rem' }}>
            {title}
          </p>
          <p style={{ fontSize: '0.75rem', color: '#64748B' }}>{organization}</p>
        </div>
        <span style={{
          fontSize: '0.68rem', fontFamily: 'var(--font-mono, monospace)',
          color: '#475569', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {date}
        </span>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: DEFAULT (full card — Achievements page)
  ════════════════════════════════════════════════ */
  return (
    <div
      style={{
        background: 'rgba(15,32,68,0.6)',
        border: '1px solid rgba(59,130,246,0.15)',
        borderRadius: '12px', padding: '1.75rem',
        display: 'flex', gap: '1rem', alignItems: 'flex-start',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '44';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = `0 12px 36px rgba(0,0,0,0.4), 0 0 24px ${color}0e`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Left accent bar (highlight only) */}
      {highlight && (
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
          background: `linear-gradient(180deg, ${color}, ${color}44)`,
          borderRadius: '3px 0 0 3px',
        }} />
      )}

      {/* Icon badge */}
      <div style={{
        width: 50, height: 50, borderRadius: '12px', flexShrink: 0,
        background: color + '15', border: `1px solid ${color}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.35rem',
      }}>
        {icon}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        {/* Title row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
          <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#fff', lineHeight: 1.35, maxWidth: '78%' }}>
            {title}
          </h3>
          {highlight && (
            <span style={{
              padding: '2px 8px', borderRadius: '100px',
              background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.28)',
              color: '#F59E0B', fontSize: '0.6rem',
              fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
            }}>★ Highlight</span>
          )}
        </div>

        {/* Org + date */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.6rem' }}>
          <span style={{ fontSize: '0.82rem', color: color, fontWeight: 500 }}>{organization}</span>
          <span style={{ fontSize: '0.72rem', color: '#64748B', fontFamily: 'var(--font-mono, monospace)' }}>
            {date}
          </span>
          <span style={{
            fontSize: '0.62rem', fontFamily: 'var(--font-mono, monospace)',
            color: color, background: color + '12',
            border: `1px solid ${color}22`, borderRadius: '100px', padding: '1px 7px',
          }}>
            {typeLabels[type] || type}
          </span>
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.7 }}>
          {description}
        </p>

        {/* Credential link */}
        {credential && (
          <a
            href={credential} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              marginTop: '0.75rem', fontSize: '0.78rem', color: '#60A5FA',
              transition: 'gap 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '7px'}
            onMouseLeave={e => e.currentTarget.style.gap = '4px'}
          >
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
            Verify Credential →
          </a>
        )}
      </div>
    </div>
  );
}

export default AchievementCard;
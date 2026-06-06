/**
 * CertificationCard
 * Displays a certification with issuer logo placeholder, name, date, and verify link.
 *
 * Props:
 *   cert    — { title, organization, date, description, credential, color, icon }
 *   variant — 'default' | 'compact' | 'inline'
 */
export function CertificationCard({ cert, variant = 'default' }) {
  const {
    title,
    organization,
    date,
    description,
    credential,
    color = '#3B82F6',
    icon  = '📜',
  } = cert;

  /* ════════════════════════════════════════════════
     VARIANT: COMPACT (tight row — resume / sidebar)
  ════════════════════════════════════════════════ */
  if (variant === 'compact') {
    return (
      <div
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          padding: '0.75rem 0',
          borderBottom: '1px solid rgba(59,130,246,0.08)',
        }}
      >
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flex: 1 }}>
          <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{icon}</span>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.1rem', lineHeight: 1.3 }}>
              {title}
            </p>
            <p style={{ fontSize: '0.78rem', color: color, fontWeight: 500 }}>{organization}</p>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0, paddingLeft: '0.5rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#64748B',
          }}>{date}</span>
          {credential && (
            <a
              href={credential} target="_blank" rel="noopener noreferrer"
              style={{
                fontSize: '0.68rem', color: '#60A5FA',
                display: 'flex', alignItems: 'center', gap: '3px',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#93C5FD'}
              onMouseLeave={e => e.currentTarget.style.color = '#60A5FA'}
            >
              Verify
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: INLINE (horizontal pill row)
  ════════════════════════════════════════════════ */
  if (variant === 'inline') {
    return (
      <div
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px 6px 8px',
          background: color + '0f',
          border: `1px solid ${color}25`,
          borderRadius: '100px',
          transition: 'all 0.2s ease', cursor: 'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background   = color + '18';
          e.currentTarget.style.borderColor  = color + '45';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background   = color + '0f';
          e.currentTarget.style.borderColor  = color + '25';
        }}
      >
        <span style={{ fontSize: '0.85rem' }}>{icon}</span>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#E2E8F0' }}>{title}</span>
          <span style={{ fontSize: '0.72rem', color: '#64748B', marginLeft: '6px' }}>· {organization}</span>
        </div>
        {credential && (
          <a
            href={credential} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center',
              color: '#60A5FA', marginLeft: '2px',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#93C5FD'}
            onMouseLeave={e => e.currentTarget.style.color = '#60A5FA'}
            aria-label={`Verify ${title}`}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        )}
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
        borderRadius: '12px', padding: '1.5rem',
        transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '44';
        e.currentTarget.style.transform   = 'translateY(-3px)';
        e.currentTarget.style.boxShadow   = `0 12px 36px rgba(0,0,0,0.4), 0 0 20px ${color}10`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
        e.currentTarget.style.transform   = 'translateY(0)';
        e.currentTarget.style.boxShadow   = 'none';
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${color}, ${color}44, transparent)`,
      }} />

      {/* Header row */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
        {/* Issuer icon */}
        <div style={{
          width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
          background: color + '15', border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.35rem',
        }}>
          {icon}
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '0.975rem', fontWeight: 700, color: '#fff', lineHeight: 1.3, marginBottom: '0.25rem' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.82rem', color: color, fontWeight: 500 }}>
            {organization}
          </p>
        </div>

        {/* Date badge */}
        <span style={{
          fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem',
          color: color, background: color + '12',
          border: `1px solid ${color}22`, borderRadius: '100px',
          padding: '3px 9px', whiteSpace: 'nowrap', flexShrink: 0,
        }}>
          {date}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: credential ? '1rem' : 0 }}>
          {description}
        </p>
      )}

      {/* Verify credential */}
      {credential && (
        <div style={{
          paddingTop: '0.875rem',
          borderTop: '1px solid rgba(59,130,246,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{ fontSize: '0.72rem', color: '#475569', fontFamily: 'var(--font-mono, monospace)' }}>
            ✓ Verified Credential
          </span>
          <a
            href={credential} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '5px 12px', borderRadius: '7px',
              border: `1px solid ${color}33`,
              background: color + '0e',
              color: color, fontSize: '0.78rem', fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background   = color + '20';
              e.currentTarget.style.borderColor  = color + '55';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background   = color + '0e';
              e.currentTarget.style.borderColor  = color + '33';
            }}
          >
            View Certificate
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

export default CertificationCard;
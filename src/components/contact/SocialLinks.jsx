import { personal } from '../../data/personal';

/* ── SVG icons ── */
const GitHubIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
    viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2"
    viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

/* ── Social data ── */
const SOCIALS = [
  {
    id:      'github',
    label:   'GitHub',
    handle:  '@SudaisAbidKhan',
    desc:    '41 public repositories',
    href:    personal.socials.github,
    icon:    <GitHubIcon />,
    color:   '#ffffff',
    bgColor: 'rgba(255,255,255,0.08)',
  },
  {
    id:      'linkedin',
    label:   'LinkedIn',
    handle:  'sudais-khan',
    desc:    'Connect professionally',
    href:    personal.socials.linkedin,
    icon:    <LinkedInIcon />,
    color:   '#0A66C2',
    bgColor: 'rgba(10,102,194,0.12)',
  },
  {
    id:      'email',
    label:   'Email',
    handle:  personal.email,
    desc:    'Best for opportunities',
    href:    personal.socials.email,
    icon:    <EmailIcon />,
    color:   '#60A5FA',
    bgColor: 'rgba(59,130,246,0.1)',
    external: false,
  },
];

/* ── Single social card ── */
function SocialCard({ label, handle, desc, href, icon, color, bgColor, external = true }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display:        'flex',
        alignItems:     'center',
        gap:            '0.875rem',
        padding:        '1rem 1.1rem',
        background:     'var(--bg-card, rgba(15,32,68,0.6))',
        border:         '1px solid var(--border, rgba(59,130,246,0.15))',
        borderRadius:   '10px',
        textDecoration: 'none',
        transition:     'all 0.25s ease',
        cursor:         'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.borderColor = color + '55';
        el.style.background  = bgColor;
        el.style.transform   = 'translateX(4px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border, rgba(59,130,246,0.15))';
        el.style.background  = 'var(--bg-card, rgba(15,32,68,0.6))';
        el.style.transform   = 'translateX(0)';
      }}
    >
      {/* Icon circle */}
      <div style={{
        width:          42,
        height:         42,
        borderRadius:   '10px',
        background:     bgColor,
        border:         `1px solid ${color}28`,
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          color,
        flexShrink:     0,
      }}>
        {icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize:     '0.875rem',
          fontWeight:   600,
          color:        '#ffffff',
          marginBottom: '0.1rem',
          lineHeight:   1.3,
        }}>{label}</p>
        <p style={{
          fontSize:    '0.75rem',
          color:       'var(--slate-500, #64748B)',
          fontFamily:  'var(--font-mono, monospace)',
          overflow:    'hidden',
          textOverflow: 'ellipsis',
          whiteSpace:  'nowrap',
        }}>{handle}</p>
        <p style={{
          fontSize:   '0.72rem',
          color:      'var(--slate-600, #475569)',
          marginTop:  '1px',
          lineHeight: 1.3,
        }}>{desc}</p>
      </div>

      {/* Arrow */}
      <span style={{ color: 'var(--slate-600, #475569)', flexShrink: 0, display: 'flex' }}>
        <ArrowIcon />
      </span>
    </a>
  );
}

/* ── Icon-only variant ── */
function SocialIconButton({ href, icon, label, color, bgColor, external = true }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={label}
      title={label}
      style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          42,
        height:         42,
        borderRadius:   '9px',
        border:         '1px solid var(--border, rgba(59,130,246,0.15))',
        background:     'transparent',
        color:          'var(--slate-400, #94A3B8)',
        textDecoration: 'none',
        transition:     'all 0.2s ease',
        flexShrink:     0,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget;
        el.style.color       = color;
        el.style.borderColor = color + '55';
        el.style.background  = bgColor;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget;
        el.style.color       = 'var(--slate-400, #94A3B8)';
        el.style.borderColor = 'var(--border, rgba(59,130,246,0.15))';
        el.style.background  = 'transparent';
      }}
    >
      {icon}
    </a>
  );
}

/**
 * SocialLinks
 * Renders social link cards or icon buttons.
 *
 * Props:
 *   variant — 'cards' | 'icons'
 *             'cards'  — full card rows with label, handle, description (default)
 *             'icons'  — compact icon-only row (for footer / compact areas)
 *   gap     — gap between items (default '0.6rem' for cards, '0.5rem' for icons)
 */
export function SocialLinks({ variant = 'cards', gap }) {
  if (variant === 'icons') {
    return (
      <div style={{ display: 'flex', gap: gap || '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        {SOCIALS.map(s => (
          <SocialIconButton
            key={s.id}
            href={s.href}
            icon={s.icon}
            label={s.label}
            color={s.color}
            bgColor={s.bgColor}
            external={s.external !== false}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: gap || '0.6rem' }}>
      {SOCIALS.map(s => (
        <SocialCard
          key={s.id}
          label={s.label}
          handle={s.handle}
          desc={s.desc}
          href={s.href}
          icon={s.icon}
          color={s.color}
          bgColor={s.bgColor}
          external={s.external !== false}
        />
      ))}
    </div>
  );
}

export default SocialLinks;

import { useState } from 'react';
import { BadgeGroup } from '../ui/Badge';

/**
 * ProjectCard
 * Displays a single project with thumbnail, category, title, description,
 * tech stack badges, and GitHub / Live Demo links.
 *
 * Props:
 *   project  — object from projects.js data
 *   variant  — 'default' | 'featured' | 'compact'
 */
export function ProjectCard({ project, variant = 'default' }) {
  const [hovered, setHovered] = useState(false);

  const {
    title, description, tech = [], github, demo,
    category, year, featured, image,
  } = project;

  /* ── Icon helpers ── */
  const GitHubIcon = () => (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );

  const ExternalIcon = () => (
    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2"
      viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );

  /* ── Thumbnail placeholder ── */
  const Thumbnail = ({ height = 180 }) => (
    <div style={{
      width: '100%', height,
      background: 'linear-gradient(135deg, #0F2044 0%, #162B5A 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden', flexShrink: 0,
    }}>
      {/* Subtle grid pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
      }} />
      {/* Monogram */}
      <span style={{
        fontFamily: 'var(--font-mono, monospace)', fontWeight: 700,
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        color: 'rgba(59,130,246,0.2)',
        letterSpacing: '-0.04em',
        position: 'relative', zIndex: 1,
        transform: hovered ? 'scale(1.08)' : 'scale(1)',
        transition: 'transform 0.4s ease',
      }}>
        {title.slice(0, 2).toUpperCase()}
      </span>
      {/* Category pill */}
      <span style={{
        position: 'absolute', top: 12, left: 12,
        padding: '3px 10px', borderRadius: '100px',
        background: 'rgba(6,11,24,0.75)', border: '1px solid rgba(59,130,246,0.2)',
        fontFamily: 'var(--font-mono, monospace)', fontSize: '0.62rem',
        color: '#60A5FA', letterSpacing: '0.06em',
        backdropFilter: 'blur(8px)',
      }}>{category}</span>
      {/* Featured badge */}
      {featured && (
        <span style={{
          position: 'absolute', top: 12, right: 12,
          padding: '3px 9px', borderRadius: '100px',
          background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
          fontSize: '0.6rem', color: '#F59E0B',
          fontFamily: 'var(--font-mono, monospace)',
        }}>★ Featured</span>
      )}
    </div>
  );

  /* ════════════════════════════════════════════════
     VARIANT: FEATURED (hero-style card)
  ════════════════════════════════════════════════ */
  if (variant === 'featured') {
    return (
      <div
        style={{
          background: 'rgba(15,32,68,0.6)',
          border: `1px solid ${hovered ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.15)'}`,
          borderRadius: '14px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          transition: 'all 0.3s ease',
          transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
          boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)' : 'none',
          height: '100%',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Top accent */}
        <div style={{ height: 2, background: 'linear-gradient(90deg, #2563EB, #60A5FA, transparent)' }} />
        <Thumbnail height={200} />

        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{title}</h3>
            <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#64748B' }}>{year}</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
            {description}
          </p>
          <BadgeGroup items={tech} max={4} size="sm" />
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', paddingTop: '1.1rem', borderTop: '1px solid rgba(59,130,246,0.08)' }}>
            {github && <LinkBtn href={github} icon={<GitHubIcon />} label="GitHub" secondary />}
            {demo   && <LinkBtn href={demo}   icon={<ExternalIcon />} label="Live Demo" />}
            {!demo  && <span style={{ fontSize: '0.75rem', color: '#475569', alignSelf: 'center', fontFamily: 'var(--font-mono, monospace)' }}>No live demo</span>}
          </div>
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: COMPACT (minimal list row)
  ════════════════════════════════════════════════ */
  if (variant === 'compact') {
    return (
      <div
        style={{
          display: 'flex', gap: '1rem', alignItems: 'center',
          padding: '0.875rem 1rem',
          background: 'rgba(15,32,68,0.4)',
          border: `1px solid ${hovered ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.1)'}`,
          borderRadius: '10px',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Monogram icon */}
        <div style={{
          width: 40, height: 40, borderRadius: '9px', flexShrink: 0,
          background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono, monospace)', fontWeight: 700,
          fontSize: '0.8rem', color: '#3B82F6',
        }}>
          {title.slice(0, 2).toUpperCase()}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {title}
          </p>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {tech.slice(0, 3).map(t => (
              <span key={t} style={{
                fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)',
                color: '#64748B', background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.12)', borderRadius: '4px', padding: '1px 6px',
              }}>{t}</span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer"
              style={{ color: '#64748B', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#fff'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            ><GitHubIcon /></a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
              style={{ color: '#64748B', display: 'flex', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#60A5FA'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            ><ExternalIcon /></a>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: DEFAULT (Projects page card)
  ════════════════════════════════════════════════ */
  return (
    <div
      style={{
        background: 'rgba(15,32,68,0.6)',
        border: `1px solid ${hovered ? 'rgba(59,130,246,0.4)' : 'rgba(59,130,246,0.15)'}`,
        borderRadius: '12px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 48px rgba(0,0,0,0.5)' : 'none',
        height: '100%',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Thumbnail height={175} />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
          <h3 style={{ fontSize: '1.025rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>{title}</h3>
          <span style={{ fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem', color: '#64748B', flexShrink: 0, paddingLeft: '0.5rem' }}>{year}</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '1.1rem', flex: 1 }}>
          {description}
        </p>

        <BadgeGroup items={tech} max={4} size="sm" />

        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.1rem', paddingTop: '1rem', borderTop: '1px solid rgba(59,130,246,0.08)' }}>
          {github && <LinkBtn href={github} icon={<GitHubIcon />} label="GitHub" secondary />}
          {demo   && <LinkBtn href={demo}   icon={<ExternalIcon />} label="Live Demo" />}
          {!demo  && !github && <span style={{ fontSize: '0.72rem', color: '#475569' }}>Private repo</span>}
        </div>
      </div>
    </div>
  );
}

/* ── Shared link button ── */
function LinkBtn({ href, icon, label, secondary = false }) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '5px', flex: 1,
        padding: '7px 12px', borderRadius: '7px', justifyContent: 'center',
        border: secondary ? '1px solid rgba(59,130,246,0.2)' : '1px solid #2563EB',
        background: secondary ? 'transparent' : '#2563EB',
        color: secondary ? '#94A3B8' : '#fff',
        fontSize: '0.78rem', fontWeight: 500,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => {
        if (secondary) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = '#fff'; }
        else e.currentTarget.style.background = '#3B82F6';
      }}
      onMouseLeave={e => {
        if (secondary) { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.2)'; e.currentTarget.style.color = '#94A3B8'; }
        else e.currentTarget.style.background = '#2563EB';
      }}
    >
      {icon}{label}
    </a>
  );
}

export default ProjectCard;
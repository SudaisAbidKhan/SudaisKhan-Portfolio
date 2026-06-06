import { useEffect, useRef, useState } from 'react';

/**
 * SkillBadge
 * Displays a single skill with icon, name, and animated proficiency bar.
 *
 * Props:
 *   skill     — { name, level (0–100), icon }
 *   color     — accent color for the bar and icon bg
 *   variant   — 'bar' | 'pill' | 'compact'
 *   animate   — trigger bar fill animation (boolean)
 *   delay     — animation delay in ms
 */
export function SkillBadge({ skill, color = '#3B82F6', variant = 'bar', animate = true, delay = 0 }) {
  const [filled, setFilled] = useState(false);
  const ref = useRef(null);

  /* Animate bar when element enters viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setFilled(true), delay); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  /* Re-trigger when animate prop changes (tab switching) */
  useEffect(() => {
    if (animate) setTimeout(() => setFilled(true), delay + 80);
    else setFilled(false);
  }, [animate, delay]);

  /* ── Proficiency label ── */
  const proficiencyLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Proficient';
    if (level >= 55) return 'Familiar';
    return 'Learning';
  };

  const proficiencyColor = (level) => {
    if (level >= 90) return '#10B981';
    if (level >= 75) return color;
    if (level >= 55) return '#F59E0B';
    return '#64748B';
  };

  /* ════════════════════════════════════════════════
     VARIANT: BAR (default — used in Skills page panel)
  ════════════════════════════════════════════════ */
  if (variant === 'bar') {
    return (
      <div ref={ref} style={{ marginBottom: '1.1rem' }}>
        {/* Top row: icon + name + level % */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: 26, height: 26, borderRadius: '6px', flexShrink: 0,
              background: color + '18', border: `1px solid ${color}28`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', lineHeight: 1,
            }}>{skill.icon}</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#E2E8F0' }}>
              {skill.name}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)',
              color: proficiencyColor(skill.level),
              background: proficiencyColor(skill.level) + '18',
              border: `1px solid ${proficiencyColor(skill.level)}28`,
              borderRadius: '100px', padding: '1px 7px',
            }}>
              {proficiencyLabel(skill.level)}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono, monospace)', fontSize: '0.7rem', color: '#64748B',
            }}>
              {skill.level}%
            </span>
          </div>
        </div>

        {/* Progress bar track */}
        <div style={{
          height: '4px', borderRadius: '2px',
          background: 'rgba(255,255,255,0.05)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: '2px',
            width: filled ? `${skill.level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 10px ${color}55`,
            transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          }} />
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: PILL (tag-style, used in overview/cloud)
  ════════════════════════════════════════════════ */
  if (variant === 'pill') {
    return (
      <div
        ref={ref}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '6px 14px', borderRadius: '100px',
          border: `1px solid ${color}22`,
          background: `${color}0c`,
          transition: 'all 0.2s ease', cursor: 'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '55';
          e.currentTarget.style.background  = color + '18';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = color + '22';
          e.currentTarget.style.background  = color + '0c';
        }}
      >
        <span style={{ fontSize: '0.82rem' }}>{skill.icon}</span>
        <span style={{ fontSize: '0.82rem', color: '#CBD5E1', fontWeight: 500 }}>{skill.name}</span>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)', fontSize: '0.62rem',
          color: color, opacity: 0.7,
        }}>{skill.level}%</span>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: COMPACT (icon + name only, no bar)
  ════════════════════════════════════════════════ */
  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
      <div style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>{skill.name}</span>
    </div>
  );
}

export default SkillBadge;
import { useState, useEffect } from 'react';
import { SkillBadge } from './SkillBadge';

/**
 * SkillCategory
 * Renders a full skill category section — icon, label, skill count,
 * and a list of SkillBadge components.
 *
 * Props:
 *   category  — { id, label, icon, color, skills[] }
 *   variant   — 'panel' | 'card' | 'minimal'
 *               'panel'   — full panel with header + bars (Skills page)
 *               'card'    — compact card with dot list (Home overview)
 *               'minimal' — label + pill badges only
 *   animate   — trigger bar animations (boolean)
 *   maxSkills — limit how many skills are shown (default: all)
 */
export function SkillCategory({ category, variant = 'panel', animate = true, maxSkills }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const skills = maxSkills ? category.skills.slice(0, maxSkills) : category.skills;
  const hidden  = maxSkills && category.skills.length > maxSkills
    ? category.skills.length - maxSkills
    : 0;

  /* ════════════════════════════════════════════════
     VARIANT: PANEL (Skills page — sidebar selection)
  ════════════════════════════════════════════════ */
  if (variant === 'panel') {
    return (
      <div>
        {/* Category header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '12px',
          marginBottom: '2rem',
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '12px',
            background: category.color + '18',
            border: `1px solid ${category.color}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.4rem',
          }}>
            {category.icon}
          </div>
          <div>
            <h2 style={{
              fontSize: '1.3rem', fontWeight: 700,
              color: category.color, marginBottom: '2px',
            }}>
              {category.label}
            </h2>
            <p style={{
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.7rem', color: '#64748B',
            }}>
              {category.skills.length} skills in this category
            </p>
          </div>
        </div>

        {/* Skill bars */}
        <div style={{
          background: 'rgba(15,32,68,0.5)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '12px', padding: '1.75rem',
        }}>
          {category.skills.map((skill, i) => (
            <SkillBadge
              key={skill.name}
              skill={skill}
              color={category.color}
              variant="bar"
              animate={animate}
              delay={i * 60}
            />
          ))}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: CARD (Home overview — compact grid card)
  ════════════════════════════════════════════════ */
  if (variant === 'card') {
    return (
      <div
        style={{
          background: 'rgba(15,32,68,0.6)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '12px', padding: '1.5rem',
          transition: 'all 0.3s ease', height: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = category.color + '44';
          e.currentTarget.style.boxShadow   = `0 0 28px ${category.color}14`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.1rem' }}>
          <span style={{ fontSize: '1.3rem' }}>{category.icon}</span>
          <h3 style={{
            fontSize: '0.975rem', fontWeight: 700,
            color: category.color,
          }}>
            {category.label}
          </h3>
        </div>

        {/* Skill dot list */}
        <div>
          {skills.map(skill => (
            <SkillBadge
              key={skill.name}
              skill={skill}
              color={category.color}
              variant="compact"
            />
          ))}
          {hidden > 0 && (
            <p style={{
              fontSize: '0.75rem', color: '#64748B',
              fontFamily: 'var(--font-mono, monospace)',
              marginTop: '0.4rem', paddingLeft: '13px',
            }}>
              +{hidden} more
            </p>
          )}
        </div>
      </div>
    );
  }

  /* ════════════════════════════════════════════════
     VARIANT: MINIMAL (pill badges with collapsible toggle)
  ════════════════════════════════════════════════ */
  return (
    <div style={{ marginBottom: '2rem' }}>
      {/* Header row with toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '0 0 0.875rem', width: '100%', textAlign: 'left',
          borderBottom: `1px solid rgba(59,130,246,0.1)`,
          marginBottom: '0.875rem',
        }}
      >
        <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: category.color }}>
          {category.label}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono, monospace)', fontSize: '0.68rem',
          color: '#64748B', marginLeft: '4px',
        }}>
          ({category.skills.length})
        </span>
        <svg
          width="14" height="14" fill="none" stroke="#64748B"
          strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round"
          style={{
            marginLeft: 'auto', flexShrink: 0,
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Pill badges */}
      {isExpanded && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {skills.map((skill, i) => (
            <SkillBadge
              key={skill.name}
              skill={skill}
              color={category.color}
              variant="pill"
              delay={i * 40}
            />
          ))}
          {hidden > 0 && (
            <span style={{
              fontSize: '0.75rem', color: '#64748B',
              fontFamily: 'var(--font-mono, monospace)',
              alignSelf: 'center', padding: '4px 8px',
            }}>
              +{hidden} more
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default SkillCategory;
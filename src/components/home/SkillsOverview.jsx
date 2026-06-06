import { Link } from 'react-router-dom';
import { skillCategories } from '../../data/skills';

function SkillPill({ skill, color }) {
  return (
    <div
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px',
        padding: '7px 14px', borderRadius: '100px',
        border: `1px solid ${color}22`,
        background: `${color}0a`,
        transition: 'all 0.2s ease', cursor: 'default', whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '55';
        e.currentTarget.style.background  = color + '16';
        e.currentTarget.style.transform   = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = color + '22';
        e.currentTarget.style.background  = color + '0a';
        e.currentTarget.style.transform   = 'translateY(0)';
      }}
    >
      <span style={{ fontSize: '0.9rem' }}>{skill.icon}</span>
      <span style={{ fontSize: '0.8rem', color: '#CBD5E1', fontWeight: 500 }}>{skill.name}</span>
    </div>
  );
}

export function SkillsOverview() {
  return (
    <section className="section">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Tech Stack</div>
          <h2 className="section-title reveal">What I work with</h2>
          <p className="section-subtitle reveal" style={{ margin: '0 auto' }}>
            Technologies I use to build full-stack web applications from idea to deployment.
          </p>
        </div>

        {/* Category rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {skillCategories.map((cat, ci) => (
            <div key={cat.id} className="reveal" style={{ animationDelay: `${ci * 80}ms` }}>
              {/* Category label */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                marginBottom: '0.875rem',
              }}>
                <span style={{ fontSize: '1rem' }}>{cat.icon}</span>
                <span style={{
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.7rem', color: cat.color,
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>{cat.label}</span>
                <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${cat.color}30, transparent)` }} />
              </div>

              {/* Pill row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {cat.skills.map(skill => (
                  <SkillPill key={skill.name} skill={skill} color={cat.color} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link
            to="/skills"
            style={{
              color: '#60A5FA', fontSize: '0.875rem', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              transition: 'gap 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '10px'}
            onMouseLeave={e => e.currentTarget.style.gap = '5px'}
          >
            See full skills breakdown →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SkillsOverview;

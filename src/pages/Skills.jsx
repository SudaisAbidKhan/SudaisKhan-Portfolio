import { useState, useEffect, useRef } from 'react';
import { skillCategories } from '../data/skills';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function SkillBar({ skill, color, animate }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem' }}>{skill.icon}</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--slate-200)' }}>{skill.name}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--slate-500)' }}>
          {skill.level}%
        </span>
      </div>
      {/* Bar track */}
      <div style={{
        height: '4px', borderRadius: '2px',
        background: 'rgba(255,255,255,0.06)', overflow: 'hidden',
      }}>
        <div style={{
          height: '100%', borderRadius: '2px',
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
          width: animate ? `${skill.level}%` : '0%',
          transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: `0 0 8px ${color}66`,
        }} />
      </div>
    </div>
  );
}

function CategoryCard({ category, isActive, onSelect }) {
  return (
    <button onClick={() => onSelect(category.id)} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 16px', borderRadius: '10px',
      border: isActive ? `1px solid ${category.color}44` : '1px solid var(--border)',
      background: isActive ? `${category.color}12` : 'var(--bg-card)',
      color: isActive ? category.color : 'var(--slate-400)',
      fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
      cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'left',
    }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = `${category.color}33`; e.currentTarget.style.color = 'var(--slate-200)'; } }}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-400)'; } }}
    >
      <span style={{ fontSize: '1.1rem' }}>{category.icon}</span>
      {category.label}
    </button>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef(null);
  useReveal();

  const category = skillCategories.find(c => c.id === activeCategory);

  useEffect(() => {
    setAnimate(false);
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // All skills summary for the overview
  const allSkillsCount = skillCategories.reduce((acc, c) => acc + c.skills.length, 0);
  const avgProficiency = Math.round(
    skillCategories.flatMap(c => c.skills).reduce((acc, s) => acc + s.level, 0) / allSkillsCount
  );

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 600, height: 400,
          background: 'radial-gradient(ellipse at right, rgba(59,130,246,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div className="section-tag">Expertise</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            My <span className="gradient-text">technical skills</span>
          </h1>
          <p style={{ color: 'var(--slate-400)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.75, marginTop: '1rem' }}>
            Proficiencies built through real projects, coursework, and continuous self-study.
          </p>

          {/* Summary stats */}
          <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { val: allSkillsCount + '+', label: 'Technologies' },
              { val: avgProficiency + '%', label: 'Avg Proficiency' },
              { val: skillCategories.length, label: 'Skill Areas' },
            ].map(({ val, label }) => (
              <div key={label} style={{
                padding: '1rem 1.5rem', borderRadius: '10px',
                border: '1px solid var(--border)', background: 'var(--bg-card)',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--blue-400)' }}>{val}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '3px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Panel */}
      <section className="section" style={{ paddingTop: '1rem' }} ref={sectionRef}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3rem', alignItems: 'start' }}>
            {/* Category sidebar */}
            <div className="reveal">
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                Category
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {skillCategories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} isActive={activeCategory === cat.id} onSelect={setActiveCategory} />
                ))}
              </div>
            </div>

            {/* Skills list */}
            <div className="reveal">
              {category && (
                <>
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                      <span style={{ fontSize: '1.6rem' }}>{category.icon}</span>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: category.color }}>{category.label}</h2>
                    </div>
                    <p style={{ color: 'var(--slate-500)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
                      {category.skills.length} skills in this category
                    </p>
                  </div>

                  <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-md)', padding: '2rem',
                  }}>
                    {category.skills.map(skill => (
                      <SkillBar key={skill.name} skill={skill} color={category.color} animate={animate} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Skill level legend */}
          <div className="reveal" style={{ marginTop: '3rem', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { range: '90–100%', label: 'Expert', color: '#10B981' },
              { range: '70–89%', label: 'Proficient', color: 'var(--blue-400)' },
              { range: '50–69%', label: 'Familiar', color: '#F59E0B' },
              { range: '<50%', label: 'Learning', color: 'var(--slate-500)' },
            ].map(({ range, label, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '2px', background: color }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)', fontFamily: 'var(--font-mono)' }}>
                  {range} — {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All skills as cloud - mobile-friendly view */}
      <section className="section" style={{ background: 'rgba(10, 22, 40, 0.4)', paddingTop: '3rem' }}>
        <div className="container">
          <div className="section-tag reveal">At a Glance</div>
          <h2 className="section-title reveal" style={{ fontSize: '1.8rem' }}>All technologies</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '2rem' }}>
            {skillCategories.flatMap(c =>
              c.skills.map(s => ({ ...s, categoryColor: c.color }))
            ).map((skill, i) => (
              <div key={skill.name} className="reveal" style={{ animationDelay: `${(i % 8) * 50}ms` }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  padding: '6px 14px', borderRadius: '100px',
                  border: '1px solid rgba(59,130,246,0.15)',
                  background: 'var(--bg-card)',
                  fontSize: '0.82rem', color: 'var(--slate-300)',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = skill.categoryColor + '55'; e.currentTarget.style.color = skill.categoryColor; e.currentTarget.style.background = skill.categoryColor + '0f'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)'; e.currentTarget.style.color = 'var(--slate-300)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                >
                  <span style={{ fontSize: '0.8rem' }}>{skill.icon}</span>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .skills-layout { grid-template-columns: 1fr !important; }
          .category-sidebar { flex-direction: row !important; flex-wrap: wrap; }
        }
      `}</style>
    </div>
  );
}
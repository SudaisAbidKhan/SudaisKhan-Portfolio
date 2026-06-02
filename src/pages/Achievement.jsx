import { useState, useEffect } from 'react';
import { achievements, achievementTypes } from '../data/achievements';

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

const typeLabels = {
  competition: '🏆 Competitions',
  certification: '📜 Certifications',
  academic: '🎓 Academic',
  workshop: '🎯 Leadership',
};

function AchievementCard({ achievement }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', padding: '1.75rem',
      transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = achievement.color + '44';
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.4), 0 0 30px ${achievement.color}12`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Left color accent */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: achievement.highlight
          ? `linear-gradient(180deg, ${achievement.color}, ${achievement.color}55)`
          : 'transparent',
        borderRadius: '3px 0 0 3px',
      }} />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
        {/* Icon */}
        <div style={{
          width: 52, height: 52, borderRadius: '12px', flexShrink: 0,
          background: achievement.color + '15',
          border: `1px solid ${achievement.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>{achievement.icon}</div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <h3 style={{ fontSize: '0.975rem', fontWeight: 700, lineHeight: 1.35, maxWidth: '80%' }}>{achievement.title}</h3>
            {achievement.highlight && (
              <span style={{
                padding: '2px 8px', borderRadius: '100px', fontSize: '0.62rem',
                background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)',
                color: '#F59E0B', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em', whiteSpace: 'nowrap',
              }}>★ Highlight</span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '0.82rem', color: achievement.color, fontWeight: 500 }}>{achievement.organization}</span>
            <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>{achievement.date}</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--slate-400)', lineHeight: 1.7 }}>
            {achievement.description}
          </p>

          {achievement.credential && (
            <a href={achievement.credential} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--blue-400)',
                transition: 'gap 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.gap = '7px'}
              onMouseLeave={e => e.currentTarget.style.gap = '4px'}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Verify Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [activeType, setActiveType] = useState('All');
  useReveal();

  const filtered = achievements.filter(a => activeType === 'All' || a.type === activeType);

  const stats = {
    competitions: achievements.filter(a => a.type === 'competition').length,
    certifications: achievements.filter(a => a.type === 'certification').length,
    academic: achievements.filter(a => a.type === 'academic').length,
    workshops: achievements.filter(a => a.type === 'workshop').length,
  };

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)',
          width: 800, height: 400,
          background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div className="section-tag">Recognition</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            Achievements &<br /><span className="gradient-text">Milestones</span>
          </h1>
          <p style={{ color: 'var(--slate-400)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.75, marginTop: '1rem' }}>
            Awards, certifications, academic honors, and leadership experiences that define my journey.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
            {[
              { val: stats.competitions, label: 'Competitions', icon: '🏆' },
              { val: stats.certifications, label: 'Certifications', icon: '📜' },
              { val: stats.academic, label: 'Academic Awards', icon: '🎓' },
              { val: stats.workshops, label: 'Leadership Roles', icon: '🎯' },
            ].map(({ val, label, icon }) => (
              <div key={label} style={{
                padding: '1rem 1.5rem', borderRadius: '10px',
                border: '1px solid var(--border)', background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
                <span style={{ fontSize: '1.25rem' }}>{icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--white)', lineHeight: 1.2 }}>{val}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--slate-500)' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div style={{ background: 'rgba(10, 22, 40, 0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0', position: 'sticky', top: '72px', zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginRight: '0.5rem' }}>Filter:</span>
            {achievementTypes.map(type => (
              <button key={type} onClick={() => setActiveType(type === 'All' ? 'All' : type)} style={{
                padding: '6px 14px', borderRadius: '8px',
                border: activeType === (type === 'All' ? 'All' : type) ? '1px solid var(--blue-500)' : '1px solid var(--border)',
                background: activeType === (type === 'All' ? 'All' : type) ? 'rgba(59,130,246,0.12)' : 'transparent',
                color: activeType === (type === 'All' ? 'All' : type) ? 'var(--blue-400)' : 'var(--slate-400)',
                fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
                {type === 'All' ? 'All' : typeLabels[type] || type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {filtered.map((achievement, i) => (
              <div key={achievement.id} className="reveal" style={{ animationDelay: `${(i % 4) * 80}ms` }}>
                <AchievementCard achievement={achievement} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
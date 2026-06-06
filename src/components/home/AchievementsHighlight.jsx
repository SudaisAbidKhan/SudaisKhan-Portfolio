import { Link } from 'react-router-dom';
import { achievements } from '../../data/achievements';

function HighlightCard({ achievement, delay = 0 }) {
  const { icon, title, organization, date, description, color = '#3B82F6' } = achievement;

  return (
    <div
      className="reveal"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        style={{
          background: 'rgba(15,32,68,0.6)',
          border: '1px solid rgba(59,130,246,0.15)',
          borderRadius: '12px', padding: '1.75rem',
          display: 'flex', gap: '1rem', alignItems: 'flex-start',
          height: '100%', transition: 'all 0.3s ease',
          position: 'relative', overflow: 'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = color + '44';
          e.currentTarget.style.transform   = 'translateY(-4px)';
          e.currentTarget.style.boxShadow   = `0 12px 36px rgba(0,0,0,0.4), 0 0 24px ${color}0e`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)';
          e.currentTarget.style.transform   = 'translateY(0)';
          e.currentTarget.style.boxShadow   = 'none';
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${color}, transparent)`,
        }} />

        {/* Icon */}
        <div style={{
          width: 50, height: 50, borderRadius: '12px', flexShrink: 0,
          background: color + '15', border: `1px solid ${color}28`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>{icon}</div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontFamily: 'var(--font-mono, monospace)', fontSize: '0.65rem',
            color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em',
            marginBottom: '0.3rem',
          }}>{date}</p>
          <h3 style={{
            fontSize: '0.95rem', fontWeight: 700, color: '#fff',
            lineHeight: 1.35, marginBottom: '0.3rem',
          }}>{title}</h3>
          <p style={{ fontSize: '0.8rem', color: color, fontWeight: 500, marginBottom: '0.5rem' }}>
            {organization}
          </p>
          <p style={{ fontSize: '0.82rem', color: '#94A3B8', lineHeight: 1.65 }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AchievementsHighlight() {
  const highlights = achievements.filter(a => a.highlight).slice(0, 3);

  return (
    <section className="section" style={{ background: 'rgba(10,22,40,0.4)' }}>
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '3rem',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div>
            <div className="section-tag reveal">Recognition</div>
            <h2 className="section-title reveal">Highlights</h2>
          </div>
          <Link
            to="/achievements"
            className="reveal"
            style={{
              color: '#60A5FA', fontSize: '0.875rem', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              transition: 'gap 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.gap = '10px'}
            onMouseLeave={e => e.currentTarget.style.gap = '5px'}
          >
            All achievements →
          </Link>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.25rem',
        }}>
          {highlights.map((a, i) => (
            <HighlightCard key={a.id} achievement={a} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievementsHighlight;

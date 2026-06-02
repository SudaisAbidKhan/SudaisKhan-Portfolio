import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { personal } from '../data/personal';

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(59,130,246,0.08)' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--blue-400)', minWidth: '110px', paddingTop: '2px' }}>{label}</span>
      <span style={{ color: 'var(--slate-300)', fontSize: '0.9rem' }}>{value}</span>
    </div>
  );
}

export default function About() {
  useReveal();

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px', width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div className="section-tag" style={{ animationDelay: '0s' }}>About Me</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            The person behind<br />
            <span className="gradient-text">the code</span>
          </h1>
          <p style={{ color: 'var(--slate-400)', fontSize: '1.05rem', maxWidth: '540px', lineHeight: 1.75, marginTop: '1.25rem' }}>
            Passionate engineer. Lifelong learner. Creative problem solver.
          </p>
        </div>
      </section>

      {/* Bio + Quick Info */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Avatar + Quick info */}
            <div className="reveal">
              {/* Avatar placeholder */}
              <div style={{
                width: '100%', aspectRatio: '1', maxWidth: '380px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '2rem', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: 120, height: 120, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--blue-600), var(--navy-600))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1rem',
                    fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)',
                    color: 'var(--white)', border: '3px solid rgba(59,130,246,0.3)',
                  }}>SK</div>
                  <p style={{ color: 'var(--slate-500)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
                    sudaiskhan.dev
                  </p>
                </div>
                {/* Decorative corner dots */}
                {['top:12px;left:12px', 'top:12px;right:12px', 'bottom:12px;left:12px', 'bottom:12px;right:12px'].map((pos, i) => (
                  <div key={i} style={{
                    position: 'absolute', ...Object.fromEntries(pos.split(';').map(p => p.split(':'))),
                    width: 6, height: 6, borderRadius: '50%', background: 'rgba(59,130,246,0.4)',
                  }} />
                ))}
              </div>

              {/* Quick info */}
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '1.5rem',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue-400)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  Quick Info
                </p>
                <InfoRow label="Location" value={personal.location} />
                <InfoRow label="Email" value={personal.email} />
                <InfoRow label="Status" value={personal.availability} />
                <InfoRow label="Degree" value={personal.education[0]?.degree?.split(' in ')[0] || 'B.Sc. Computer Science'} />
                <InfoRow label="GPA" value={personal.education[0]?.grade || '3.8 / 4.0'} />
              </div>
            </div>

            {/* Bio text */}
            <div>
              <h2 className="reveal" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Who I am
              </h2>
              <p className="reveal" style={{ color: 'var(--slate-300)', fontSize: '1rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                {personal.bio}
              </p>
              <p className="reveal" style={{ color: 'var(--slate-400)', fontSize: '1rem', lineHeight: 1.85, marginBottom: '2rem' }}>
                {personal.longBio}
              </p>

              {/* Career objective */}
              <div className="reveal" style={{
                background: 'rgba(59,130,246,0.06)',
                border: '1px solid rgba(59,130,246,0.18)',
                borderLeft: '3px solid var(--blue-500)',
                borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                padding: '1.25rem 1.5rem', marginBottom: '2rem',
              }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--blue-400)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                  Career Objective
                </p>
                <p style={{ color: 'var(--slate-200)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                  To join a forward-thinking team where I can contribute to building impactful software, 
                  grow as an engineer, and create technology that genuinely makes a difference.
                </p>
              </div>

              {/* Social links */}
              <div className="reveal" style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'GitHub', href: personal.socials.github, color: '#fff' },
                  { label: 'LinkedIn', href: personal.socials.linkedin, color: '#0A66C2' },
                  { label: 'Email Me', href: personal.socials.email, color: 'var(--blue-400)' },
                ].map(({ label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '9px 18px', borderRadius: '8px',
                      border: '1px solid var(--border)',
                      color: 'var(--slate-300)', fontSize: '0.875rem', fontWeight: 500,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = color; e.currentTarget.style.color = color; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-300)'; }}
                  >{label}</a>
                ))}
              </div>
            </div>
          </div>

          <style>{`@media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; } }`}</style>
        </div>
      </section>

      {/* Education */}
      <section className="section" style={{ background: 'rgba(10, 22, 40, 0.4)' }}>
        <div className="container">
          <div className="section-tag reveal">Education</div>
          <h2 className="section-title reveal">Academic Background</h2>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {personal.education.map((edu, i) => (
              <div key={i} className="reveal" style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '2rem',
                display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap',
                transition: 'border-color 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{
                  width: 56, height: 56, borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                }}>🎓</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{edu.degree}</h3>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      color: 'var(--blue-400)', border: '1px solid rgba(59,130,246,0.25)',
                      borderRadius: '100px', padding: '3px 10px',
                    }}>{edu.year}</span>
                  </div>
                  <p style={{ color: 'var(--blue-400)', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.4rem' }}>{edu.institution}</p>
                  <p style={{ color: 'var(--slate-400)', fontSize: '0.85rem', marginBottom: '0.3rem' }}>{edu.grade}</p>
                  <p style={{ color: 'var(--slate-500)', fontSize: '0.85rem' }}>{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="section">
        <div className="container">
          <div className="section-tag reveal">Beyond Code</div>
          <h2 className="section-title reveal">Personal Interests</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '2rem' }}>
            {personal.interests.map((interest, i) => (
              <div key={interest} className="reveal" style={{ animationDelay: `${i * 60}ms` }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '10px 20px', borderRadius: '100px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--slate-300)', fontSize: '0.9rem',
                  transition: 'all 0.2s ease', cursor: 'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--blue-400)'; e.currentTarget.style.background = 'rgba(59,130,246,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-300)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                >
                  ✦ {interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '3rem 0 5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="reveal">
            <p style={{ color: 'var(--slate-400)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              Interested in working together?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                padding: '12px 28px', borderRadius: '10px',
                background: 'var(--blue-600)', color: '#fff', fontWeight: 600,
                border: '1px solid var(--blue-500)', transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-500)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
              >Let's Connect</Link>
              <Link to="/projects" style={{
                padding: '12px 28px', borderRadius: '10px',
                border: '1px solid var(--border)', color: 'var(--slate-200)', fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-200)'; }}
              >See My Work</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { personal } from '../data/personal';
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

/* ── Timeline entry ── */
function TimelineEntry({ icon, title, subtitle, period, detail, accent = 'var(--blue-500)', last = false }) {
  return (
    <div style={{ display: 'flex', gap: '1.25rem', paddingBottom: last ? 0 : '2rem', position: 'relative' }}>
      {/* Vertical line */}
      {!last && (
        <div style={{
          position: 'absolute', left: '19px', top: '40px', bottom: 0,
          width: '1px', background: 'linear-gradient(180deg, rgba(59,130,246,0.3), transparent)',
        }} />
      )}
      {/* Icon dot */}
      <div style={{
        width: 40, height: 40, borderRadius: '10px', flexShrink: 0,
        background: accent + '18', border: `1px solid ${accent}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.1rem', zIndex: 1,
      }}>{icon}</div>
      <div style={{ flex: 1, paddingTop: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--white)' }}>{title}</h3>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: accent,
            border: `1px solid ${accent}33`, borderRadius: '100px', padding: '2px 9px',
            whiteSpace: 'nowrap',
          }}>{period}</span>
        </div>
        <p style={{ fontSize: '0.875rem', color: accent, fontWeight: 500, marginBottom: '0.3rem' }}>{subtitle}</p>
        {detail && <p style={{ fontSize: '0.83rem', color: 'var(--slate-500)', lineHeight: 1.65 }}>{detail}</p>}
      </div>
    </div>
  );
}

/* ── Section block inside the preview ── */
function ResumeSection({ title, children, icon }) {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        paddingBottom: '0.75rem', marginBottom: '1.25rem',
        borderBottom: '1px solid rgba(59,130,246,0.15)',
      }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--blue-400)', fontFamily: 'var(--font-mono)' }}>
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

/* ── Skill chip in preview ── */
function SkillChip({ name, color }) {
  return (
    <span style={{
      display: 'inline-flex', padding: '3px 10px', borderRadius: '6px',
      fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
      background: color + '12', border: `1px solid ${color}28`,
      color: 'var(--slate-300)',
    }}>{name}</span>
  );
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState('preview');
  useReveal();

  const topSkills = skillCategories.flatMap(c =>
    c.skills.filter(s => s.level >= 75).slice(0, 3).map(s => ({ ...s, color: c.color }))
  );

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>

      {/* ── Header ── */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: 500, height: 400,
          background: 'radial-gradient(ellipse at right bottom, rgba(37,99,235,0.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div className="section-tag">Resume</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            Curriculum <span className="gradient-text">Vitae</span>
          </h1>
          <p style={{ color: 'var(--slate-400)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.75, marginTop: '1rem' }}>
            A full overview of my education, experience, and technical skills. Download a copy or read it right here.
          </p>

          {/* Download CTA */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
            <a href="/resume.pdf" download="Sudais_Khan_Resume.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', borderRadius: '10px',
                background: 'var(--blue-600)', border: '1px solid var(--blue-500)',
                color: '#fff', fontWeight: 600, fontSize: '0.925rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-500)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue-600)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Download PDF
            </a>
            <a href={`mailto:${personal.email}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 26px', borderRadius: '10px',
                border: '1px solid var(--border)',
                color: 'var(--slate-200)', fontWeight: 500, fontSize: '0.925rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-200)'; }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Email Me
            </a>
          </div>
        </div>
      </section>

      {/* ── Tab bar ── */}
      <div style={{
        background: 'rgba(10,22,40,0.6)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: '72px', zIndex: 100,
      }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0' }}>
            {[
              { id: 'preview', label: 'Resume Preview', icon: '👁' },
              { id: 'timeline', label: 'Timeline View', icon: '📅' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '1rem 1.5rem', background: 'none', cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid var(--blue-500)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--blue-400)' : 'var(--slate-500)',
                fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem',
                transition: 'all 0.2s ease',
              }}>
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Resume Preview Tab ── */}
      {activeTab === 'preview' && (
        <section className="section">
          <div className="container">
            <div className="reveal" style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              maxWidth: '860px', margin: '0 auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}>
              {/* Resume header band */}
              <div style={{
                background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
                borderBottom: '1px solid rgba(59,130,246,0.2)',
                padding: '2.5rem 3rem',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Corner decoration */}
                <div style={{
                  position: 'absolute', top: '-40px', right: '-40px',
                  width: 200, height: 200, borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
                }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                      <div style={{
                        width: 52, height: 52, borderRadius: '12px',
                        background: 'linear-gradient(135deg, var(--blue-600), var(--navy-600))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '18px', color: '#fff',
                        border: '2px solid rgba(96,165,250,0.3)',
                      }}>SK</div>
                      <div>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{personal.name}</h2>
                        <p style={{ color: 'var(--blue-400)', fontWeight: 500, fontSize: '0.95rem' }}>{personal.role}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'flex-end' }}>
                    {[
                      { icon: '📍', val: personal.location },
                      { icon: '📧', val: personal.email },
                      { icon: '🔗', val: 'github.com/sudaiskhan' },
                    ].map(({ icon, val }) => (
                      <span key={val} style={{ fontSize: '0.8rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'var(--font-mono)' }}>
                        {icon} {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resume body */}
              <div style={{ padding: '2.5rem 3rem' }}>
                {/* Summary */}
                <ResumeSection title="Professional Summary" icon="👤">
                  <p style={{ color: 'var(--slate-300)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                    {personal.bio.trim().replace(/\s+/g, ' ')}
                  </p>
                </ResumeSection>

                {/* Two-column layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                  {/* Left col */}
                  <div>
                    <ResumeSection title="Education" icon="🎓">
                      {personal.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '1rem' }}>
                          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>{edu.degree}</h3>
                          <p style={{ fontSize: '0.82rem', color: 'var(--blue-400)', fontWeight: 500, marginBottom: '0.15rem' }}>{edu.institution}</p>
                          <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>{edu.year} · {edu.grade}</p>
                          <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '0.3rem' }}>{edu.details}</p>
                        </div>
                      ))}
                    </ResumeSection>

                    <ResumeSection title="Certifications" icon="📜">
                      {[
                        { name: 'AWS Cloud Practitioner', org: 'Amazon Web Services', year: '2024' },
                        { name: 'Meta Front-End Developer', org: 'Meta / Coursera', year: '2023' },
                        { name: 'JS Algorithms & DS', org: 'freeCodeCamp', year: '2022' },
                      ].map(cert => (
                        <div key={cert.name} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', alignItems: 'flex-start' }}>
                          <div>
                            <p style={{ fontSize: '0.83rem', fontWeight: 500, color: 'var(--slate-200)' }}>{cert.name}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{cert.org}</p>
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--slate-600)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', paddingLeft: '0.5rem' }}>{cert.year}</span>
                        </div>
                      ))}
                    </ResumeSection>
                  </div>

                  {/* Right col */}
                  <div>
                    <ResumeSection title="Experience" icon="💼">
                      {[
                        {
                          role: 'GDSC Lead Developer',
                          org: 'Google Developer Student Club',
                          period: '2023 – 2024',
                          desc: 'Led 120-member community, organized 15+ workshops on web dev, AI, and cloud.',
                        },
                        {
                          role: 'Freelance Full-Stack Dev',
                          org: 'Self-employed',
                          period: '2022 – Present',
                          desc: 'Delivered 5+ client projects including e-commerce platforms and dashboards.',
                        },
                      ].map(exp => (
                        <div key={exp.role} style={{ marginBottom: '1.1rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem' }}>
                            <h3 style={{ fontSize: '0.875rem', fontWeight: 700 }}>{exp.role}</h3>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--slate-500)' }}>{exp.period}</span>
                          </div>
                          <p style={{ fontSize: '0.78rem', color: 'var(--blue-400)', marginBottom: '0.3rem' }}>{exp.org}</p>
                          <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', lineHeight: 1.6 }}>{exp.desc}</p>
                        </div>
                      ))}
                    </ResumeSection>

                    <ResumeSection title="Technical Skills" icon="⚙️">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {topSkills.map(s => <SkillChip key={s.name} name={s.name} color={s.color} />)}
                      </div>
                    </ResumeSection>

                    <ResumeSection title="Languages" icon="🗣️">
                      {[
                        { lang: 'Urdu', level: 'Native' },
                        { lang: 'English', level: 'Fluent (Professional)' },
                      ].map(({ lang, level }) => (
                        <div key={lang} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                          <span style={{ fontSize: '0.83rem', color: 'var(--slate-300)' }}>{lang}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>{level}</span>
                        </div>
                      ))}
                    </ResumeSection>
                  </div>
                </div>

                {/* Footer watermark */}
                <div style={{
                  marginTop: '2rem', paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(59,130,246,0.1)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--slate-600)' }}>
                    Last updated · {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </span>
                  <a href="/resume.pdf" download style={{ fontSize: '0.75rem', color: 'var(--blue-400)', display: 'flex', alignItems: 'center', gap: '4px', transition: 'gap 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.gap = '7px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '4px'}
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Download PDF →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Timeline View Tab ── */}
      {activeTab === 'timeline' && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}>
              {/* Education timeline */}
              <div className="reveal">
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--blue-400)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>🎓 Education</p>
                <TimelineEntry icon="🎓" title="B.Sc. Computer Science" subtitle={personal.education[0].institution} period={personal.education[0].year} detail={`${personal.education[0].grade} · ${personal.education[0].details}`} last />
              </div>

              {/* Experience timeline */}
              <div className="reveal" style={{ animationDelay: '100ms' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#10B981', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>💼 Experience</p>
                <TimelineEntry icon="🚀" title="GDSC Lead Developer" subtitle="Google Developer Student Club" period="2023 – 2024" detail="Led 120-member tech community, hosted 15+ workshops." accent="#10B981" />
                <TimelineEntry icon="💻" title="Freelance Developer" subtitle="Self-employed" period="2022 – Present" detail="Delivered 5+ full-stack client projects end-to-end." accent="#10B981" last />
              </div>

              {/* Achievements timeline */}
              <div className="reveal" style={{ animationDelay: '200ms' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#F59E0B', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>🏆 Achievements</p>
                <TimelineEntry icon="🥇" title="1st Place – National Hackathon" subtitle="Tech Pakistan" period="Mar 2024" detail="Built AI disaster relief system in 36h. Won from 200+ teams." accent="#F59E0B" />
                <TimelineEntry icon="🥈" title="2nd Place – Speed Coding" subtitle="University CS Dept." period="Nov 2023" detail="Solved 8 algorithmic problems in under 2 hours." accent="#F59E0B" last />
              </div>

              {/* Certifications timeline */}
              <div className="reveal" style={{ animationDelay: '300ms' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8B5CF6', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.75rem' }}>📜 Certifications</p>
                <TimelineEntry icon="☁️" title="AWS Cloud Practitioner" subtitle="Amazon Web Services" period="Jan 2024" accent="#8B5CF6" />
                <TimelineEntry icon="⚛️" title="Meta Front-End Developer" subtitle="Meta / Coursera" period="Aug 2023" accent="#8B5CF6" />
                <TimelineEntry icon="📝" title="JS Algorithms & DS" subtitle="freeCodeCamp" period="2022" accent="#8B5CF6" last />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section style={{ padding: '2rem 0 5rem' }}>
        <div className="container">
          <div className="reveal" style={{
            background: 'linear-gradient(135deg, rgba(22,43,90,0.5), rgba(15,32,68,0.8))',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: 'var(--radius-md)', padding: '2.5rem',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem',
          }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.3rem' }}>Ready to hire a motivated engineer?</h3>
              <p style={{ color: 'var(--slate-400)', fontSize: '0.875rem' }}>Let's have a conversation about how I can contribute to your team.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link to="/contact" style={{
                padding: '10px 22px', borderRadius: '8px',
                background: 'var(--blue-600)', border: '1px solid var(--blue-500)',
                color: '#fff', fontWeight: 600, fontSize: '0.875rem',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-500)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
              >Get in Touch</Link>
              <a href="/resume.pdf" download style={{
                padding: '10px 22px', borderRadius: '8px',
                border: '1px solid var(--border)', color: 'var(--slate-200)',
                fontWeight: 500, fontSize: '0.875rem', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-200)'; }}
              >Download CV</a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .resume-grid { grid-template-columns: 1fr !important; }
          .resume-body { padding: 1.5rem !important; }
          .resume-header { padding: 1.75rem !important; }
        }
      `}</style>
    </div>
  );
}
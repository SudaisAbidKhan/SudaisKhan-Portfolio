import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { personal } from '../data/personal';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { achievements } from '../data/achievements';

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ── Dot grid background ── */
function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
      backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.18) 1px, transparent 1px)',
      backgroundSize: '32px 32px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)',
    }} />
  );
}

/* ── Glowing orbs ── */
function Orbs() {
  return (
    <>
      <div style={{
        position: 'absolute', top: '10%', right: '15%', width: 400, height: 400,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite', zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '5%', width: 300, height: 300,
        borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
        filter: 'blur(40px)', animation: 'float 10s ease-in-out infinite reverse', zIndex: 0,
        pointerEvents: 'none',
      }} />
    </>
  );
}

/* ── Tech badge ── */
function TechBadge({ label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '4px 12px',
      borderRadius: '100px',
      border: '1px solid rgba(59,130,246,0.25)',
      background: 'rgba(59,130,246,0.06)',
      color: 'var(--slate-300)',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.72rem',
      letterSpacing: '0.04em',
    }}>{label}</span>
  );
}

/* ── Project card ── */
function ProjectCard({ project, delay = 0 }) {
  return (
    <div className="reveal" style={{ animationDelay: `${delay}ms` }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: '1.75rem',
          height: '100%',
          transition: 'all 0.3s ease',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
          e.currentTarget.style.background = 'var(--bg-card-hover)';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--blue-600), transparent)',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--blue-400)', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>{project.category}</span>
          <span style={{ color: 'var(--slate-500)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
            {project.year}
          </span>
        </div>

        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem', color: 'var(--white)' }}>
          {project.title}
        </h3>
        <p style={{ color: 'var(--slate-400)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tech.slice(0, 4).map(t => <TechBadge key={t} label={t} />)}
          {project.tech.length > 4 && (
            <span style={{ color: 'var(--slate-500)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', alignSelf: 'center' }}>
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--slate-400)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--white)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--slate-400)'}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--blue-400)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--blue-400)'}
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  useReveal();
  const featuredProjects = projects.filter(p => p.featured);
  const topSkills = skillCategories.slice(0, 4).flatMap(c => c.skills.slice(0, 3));
  const topAchievements = achievements.filter(a => a.highlight).slice(0, 3);

  return (
    <div className="page-enter">
      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <DotGrid />
        <Orbs />
        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
          <div style={{ maxWidth: '780px' }}>
            {/* Status badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px 6px 8px',
              borderRadius: '100px',
              border: '1px solid rgba(16,185,129,0.3)',
              background: 'rgba(16,185,129,0.06)',
              marginBottom: '2rem',
              animation: 'fadeInUp 0.6s ease both',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block', boxShadow: '0 0 8px #10B981', animation: 'pulse-glow 2s ease infinite' }} />
              <span style={{ color: '#10B981', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
                {personal.availability}
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 700,
              lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem',
              animation: 'fadeInUp 0.6s ease 0.1s both',
            }}>
              Hi, I'm{' '}
              <span className="gradient-text">{personal.name}</span>
              <br />
              <span style={{ color: 'var(--slate-300)', fontWeight: 500, fontSize: '85%' }}>
                {personal.role}
              </span>
            </h1>

            {/* Tagline */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--slate-400)',
              maxWidth: '520px', lineHeight: 1.7, marginBottom: '2.5rem',
              animation: 'fadeInUp 0.6s ease 0.2s both',
            }}>
              {personal.tagline}. I build full-stack applications that are fast, scalable, and delightful to use.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeInUp 0.6s ease 0.3s both' }}>
              <Link to="/projects" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                background: 'var(--blue-600)',
                color: '#fff', fontWeight: 600, fontSize: '0.95rem',
                border: '1px solid var(--blue-500)',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue-500)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue-600)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                View Projects
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="/resume.pdf" download style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                border: '1px solid var(--border)',
                color: 'var(--slate-200)', fontWeight: 500, fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                background: 'transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--white)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-200)'; }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download CV
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap', animation: 'fadeInUp 0.6s ease 0.4s both' }}>
              {[
                { val: '15+', label: 'Projects Built' },
                { val: '6+', label: 'Technologies' },
                { val: '3×', label: "Dean's List" },
                { val: '1st', label: 'Hackathon Win' },
              ].map(({ val, label }) => (
                <div key={label}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--blue-400)', fontFamily: 'var(--font-mono)' }}>{val}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'var(--slate-600)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
          letterSpacing: '0.08em', animation: 'fadeIn 1s ease 1s both',
        }}>
          <div style={{
            width: 24, height: 40, border: '1.5px solid rgba(100,116,139,0.4)',
            borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px',
          }}>
            <div style={{
              width: 3, height: 8, borderRadius: '2px', background: 'var(--blue-400)',
              animation: 'float 1.5s ease-in-out infinite',
            }} />
          </div>
          SCROLL
        </div>
      </section>

      {/* ── FEATURED PROJECTS ── */}
      <section className="section" style={{ background: 'rgba(10, 22, 40, 0.4)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem' }}>
            <div className="section-tag reveal">Featured Work</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="section-title reveal">Projects I'm proud of</h2>
              <Link to="/projects" className="reveal" style={{
                color: 'var(--blue-400)', fontSize: '0.875rem', fontWeight: 500,
                display: 'flex', alignItems: 'center', gap: '5px',
                transition: 'gap 0.2s ease',
              }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '5px'}
              >
                View all projects →
              </Link>
            </div>
          </div>
          <div className="grid-3">
            {featuredProjects.map((p, i) => <ProjectCard key={p.id} project={p} delay={i * 120} />)}
          </div>
        </div>
      </section>

      {/* ── SKILLS OVERVIEW ── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Tech Stack</div>
            <h2 className="section-title reveal">What I work with</h2>
            <p className="section-subtitle reveal" style={{ margin: '0 auto' }}>
              A curated set of tools and technologies I use to build powerful applications.
            </p>
          </div>
          <div className="grid-4 reveal">
            {skillCategories.map(cat => (
              <div key={cat.id} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)', padding: '1.5rem',
                transition: 'all 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color + '44'; e.currentTarget.style.boxShadow = `0 0 30px ${cat.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: cat.color }}>{cat.label}</h3>
                <ul style={{ listStyle: 'none' }}>
                  {cat.skills.slice(0, 5).map(s => (
                    <li key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.85rem', color: 'var(--slate-300)' }}>{s.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/skills" style={{
              color: 'var(--blue-400)', fontSize: '0.875rem', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', gap: '5px',
            }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '5px'}
            >See full skills breakdown →</Link>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS HIGHLIGHT ── */}
      <section className="section" style={{ background: 'rgba(10, 22, 40, 0.4)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="section-tag reveal">Recognition</div>
              <h2 className="section-title reveal">Highlights</h2>
            </div>
            <Link to="/achievements" className="reveal" style={{ color: 'var(--blue-400)', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px' }}
              onMouseEnter={e => e.currentTarget.style.gap = '10px'}
              onMouseLeave={e => e.currentTarget.style.gap = '5px'}
            >All achievements →</Link>
          </div>
          <div className="grid-3">
            {topAchievements.map((a, i) => (
              <div key={a.id} className="reveal" style={{ animationDelay: `${i * 100}ms` }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '1.75rem',
                  display: 'flex', gap: '1rem', height: '100%',
                  transition: 'all 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = a.color + '44'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{
                    width: 48, height: 48, borderRadius: '12px', flexShrink: 0,
                    background: a.color + '18', border: `1px solid ${a.color}33`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem',
                  }}>{a.icon}</div>
                  <div>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--slate-500)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.3rem' }}>{a.date}</p>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', lineHeight: 1.35 }}>{a.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--slate-400)', lineHeight: 1.6 }}>{a.organization}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{
            background: 'linear-gradient(135deg, rgba(30,58,120,0.6) 0%, rgba(15,32,68,0.8) 100%)',
            border: '1px solid rgba(59,130,246,0.25)',
            borderRadius: 'var(--radius-lg)', padding: 'clamp(2.5rem, 5vw, 4rem)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 60%)',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--blue-400)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Let's build something great
              </p>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, marginBottom: '1rem' }}>
                Open to new opportunities
              </h2>
              <p style={{ color: 'var(--slate-400)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                Whether it's a full-time role, freelance project, or collaboration — I'd love to connect.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" style={{
                  padding: '13px 30px', borderRadius: '10px',
                  background: 'var(--blue-600)', color: '#fff', fontWeight: 600,
                  border: '1px solid var(--blue-500)', transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-500)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
                >Get in Touch</Link>
                <Link to="/resume" style={{
                  padding: '13px 30px', borderRadius: '10px',
                  border: '1px solid var(--border)', color: 'var(--slate-200)', fontWeight: 500,
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-500)'; e.currentTarget.style.color = 'var(--white)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-200)'; }}
                >View Resume</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
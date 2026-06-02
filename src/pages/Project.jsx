import { useState, useEffect } from 'react';
import { projects, categories } from '../data/projects';

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

function TechBadge({ label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '3px 10px', borderRadius: '100px',
      border: '1px solid rgba(59,130,246,0.22)',
      background: 'rgba(59,130,246,0.05)',
      color: 'var(--slate-400)',
      fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.03em',
    }}>{label}</span>
  );
}

function ProjectCard({ project }) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)', overflow: 'hidden',
      transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column',
      position: 'relative',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.5)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Image placeholder */}
      <div style={{
        width: '100%', height: '180px',
        background: 'linear-gradient(135deg, var(--navy-800) 0%, var(--navy-700) 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          fontSize: '2.5rem', opacity: 0.25,
          fontFamily: 'var(--font-mono)', fontWeight: 700, letterSpacing: '-0.05em',
        }}>{project.title.slice(0, 2).toUpperCase()}</div>
        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '12px', left: '12px',
          padding: '4px 10px', borderRadius: '100px',
          background: 'rgba(6, 11, 24, 0.8)', border: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--blue-400)',
          letterSpacing: '0.06em',
        }}>{project.category}</div>
        {/* Featured badge */}
        {project.featured && (
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            padding: '3px 10px', borderRadius: '100px',
            background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: '0.65px', color: '#F59E0B',
            fontSize: '0.65rem',
          }}>★ Featured</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{project.title}</h3>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--slate-500)' }}>{project.year}</span>
        </div>
        <p style={{ color: 'var(--slate-400)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.25rem', flex: 1 }}>
          {project.description}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
          {project.tech.map(t => <TechBadge key={t} label={t} />)}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(59,130,246,0.08)' }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', flex: 1,
                padding: '8px 14px', borderRadius: '7px',
                border: '1px solid var(--border)', color: 'var(--slate-300)',
                fontSize: '0.8rem', fontWeight: 500, justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.color = 'var(--white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--slate-300)'; }}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', flex: 1,
                padding: '8px 14px', borderRadius: '7px',
                background: 'var(--blue-600)', border: '1px solid var(--blue-500)',
                color: '#fff', fontSize: '0.8rem', fontWeight: 500, justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-500)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--blue-600)'}
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Live Demo
            </a>
          )}
          {!project.demo && (
            <div style={{
              flex: 1, padding: '8px 14px', borderRadius: '7px',
              border: '1px solid rgba(59,130,246,0.12)',
              color: 'var(--slate-600)', fontSize: '0.8rem', textAlign: 'center',
            }}>Backend / API</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  useReveal();

  const filtered = projects.filter(p => {
    const catMatch = activeCategory === 'All' || p.category === activeCategory;
    const searchMatch = search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tech.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(37,99,235,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <div className="section-tag">Projects</div>
          <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
            Things I've <span className="gradient-text">built</span>
          </h1>
          <p style={{ color: 'var(--slate-400)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.75, marginTop: '1rem' }}>
            A collection of projects ranging from full-stack applications to developer tools and AI experiments.
          </p>
        </div>
      </section>

      {/* Filters + Search */}
      <div style={{ background: 'rgba(10, 22, 40, 0.5)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0', position: 'sticky', top: '72px', zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Category filters */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                  padding: '6px 14px', borderRadius: '8px',
                  border: activeCategory === cat ? '1px solid var(--blue-500)' : '1px solid var(--border)',
                  background: activeCategory === cat ? 'rgba(59,130,246,0.12)' : 'transparent',
                  color: activeCategory === cat ? 'var(--blue-400)' : 'var(--slate-400)',
                  fontSize: '0.82rem', fontWeight: 500,
                  transition: 'all 0.2s ease', cursor: 'pointer',
                }}>{cat}</button>
              ))}
            </div>

            {/* Search */}
            <div style={{ marginLeft: 'auto', position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--slate-500)' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35" strokeLinecap="round"/></svg>
              <input
                type="text" placeholder="Search projects or tech..."
                value={search} onChange={e => setSearch(e.target.value)}
                style={{
                  paddingLeft: '32px', paddingRight: '12px', paddingTop: '7px', paddingBottom: '7px',
                  borderRadius: '8px', border: '1px solid var(--border)',
                  background: 'rgba(15, 32, 68, 0.5)',
                  color: 'var(--white)', fontSize: '0.82rem', fontFamily: 'var(--font-body)',
                  outline: 'none', width: '220px', transition: 'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--blue-500)'}
                onBlur={e => e.target.style.borderColor = 'var(--border)'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="section">
        <div className="container">
          {/* Result count */}
          <div style={{ marginBottom: '1.5rem', color: 'var(--slate-500)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} {activeCategory !== 'All' ? `in ${activeCategory}` : ''}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--slate-500)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
              <p style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>No projects found</p>
              <p style={{ fontSize: '0.875rem' }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {filtered.map((project, i) => (
                <div key={project.id} className="reveal" style={{ animationDelay: `${(i % 3) * 100}ms` }}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
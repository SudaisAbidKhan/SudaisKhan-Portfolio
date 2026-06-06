import { Link } from 'react-router-dom';
import { personal } from '../../data/personal';

function DotGrid() {
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0,
      backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.18) 1px, transparent 1px)',
      backgroundSize: '30px 30px',
      maskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)',
      WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 0%, black 30%, transparent 100%)',
    }} />
  );
}

function Orb({ top, right, bottom, left, size = 400, color = 'rgba(37,99,235,0.18)', delay = '0s' }) {
  return (
    <div style={{
      position: 'absolute', top, right, bottom, left,
      width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      filter: 'blur(40px)',
      animation: `float 8s ease-in-out ${delay} infinite`,
      zIndex: 0, pointerEvents: 'none',
    }} />
  );
}

export function Hero() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <DotGrid />
      <Orb top="10%" right="10%" size={420} color="rgba(37,99,235,0.16)" delay="0s" />
      <Orb bottom="20%" left="5%"  size={300} color="rgba(16,185,129,0.10)" delay="2s" />

      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '800px' }}>

          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 14px 6px 8px', borderRadius: '100px',
            border: '1px solid rgba(16,185,129,0.3)',
            background: 'rgba(16,185,129,0.06)',
            marginBottom: '2rem',
            animation: 'fadeInUp 0.6s ease both',
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#10B981',
              boxShadow: '0 0 8px #10B981', animation: 'pulseGlow 2s ease infinite',
            }} />
            <span style={{ color: '#10B981', fontSize: '0.8rem', fontFamily: 'var(--font-mono, monospace)', letterSpacing: '0.04em' }}>
              {personal.availability}
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)', fontWeight: 700,
            lineHeight: 1.1, letterSpacing: '-0.025em',
            marginBottom: '1.5rem',
            animation: 'fadeInUp 0.6s ease 0.1s both',
          }}>
            Hi, I'm{' '}
            <span className="gradient-text">{personal.name}</span>
            <br />
            <span style={{ color: '#94A3B8', fontWeight: 500, fontSize: '80%' }}>
              {personal.role}
            </span>
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#94A3B8',
            maxWidth: '520px', lineHeight: 1.75, marginBottom: '2.5rem',
            animation: 'fadeInUp 0.6s ease 0.2s both',
          }}>
            {personal.tagline}. I build full-stack web applications that are fast,
            clean, and solve real problems.
          </p>

          {/* CTA buttons */}
          <div style={{
            display: 'flex', gap: '1rem', flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease 0.3s both',
          }}>
            <Link to="/projects"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                background: '#2563EB', border: '1px solid #3B82F6',
                color: '#fff', fontWeight: 600, fontSize: '0.95rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#3B82F6'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,99,235,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              View Projects
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>

            <a href="/resume.pdf" download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                border: '1px solid rgba(59,130,246,0.25)',
                color: '#CBD5E1', fontWeight: 500, fontSize: '0.95rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#3B82F6'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; e.currentTarget.style.color = '#CBD5E1'; }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
              </svg>
              Download CV
            </a>

            <Link to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '13px 28px', borderRadius: '10px',
                border: '1px solid rgba(59,130,246,0.15)',
                color: '#64748B', fontWeight: 500, fontSize: '0.95rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; e.currentTarget.style.color = '#94A3B8'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.15)'; e.currentTarget.style.color = '#64748B'; }}
            >
              Get in Touch
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '2.5rem', marginTop: '3.5rem',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease 0.4s both',
          }}>
            {[
              { val: '6+',  label: 'Projects Built'  },
              { val: '41',  label: 'GitHub Repos'    },
              { val: '4+',  label: 'Technologies'    },
              { val: '1+',  label: 'Years Coding'    },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#60A5FA', fontFamily: 'var(--font-mono, monospace)', lineHeight: 1.1 }}>{val}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '3px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
        color: '#475569', fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)',
        letterSpacing: '0.1em', animation: 'fadeIn 1s ease 1s both',
      }}>
        <div style={{
          width: 24, height: 38, border: '1.5px solid rgba(100,116,139,0.4)',
          borderRadius: '12px', display: 'flex', justifyContent: 'center', paddingTop: '6px',
        }}>
          <div style={{
            width: 3, height: 8, borderRadius: '2px', background: '#60A5FA',
            animation: 'float 1.5s ease-in-out infinite',
          }} />
        </div>
        SCROLL
      </div>

      <style>{`
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes float    { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-12px); } }
        @keyframes pulseGlow { 0%,100% { box-shadow:0 0 8px #10B981; } 50% { box-shadow:0 0 20px #10B981; } }
      `}</style>
    </section>
  );
}

export default Hero;

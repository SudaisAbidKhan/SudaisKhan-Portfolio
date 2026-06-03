import { useState, useEffect } from 'react';
import { personal } from '../data/personal';

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

/* ── Social card ── */
function SocialCard({ href, icon, label, handle, color, external = true }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: '1rem',
        padding: '1.1rem 1.25rem',
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        transition: 'all 0.25s ease', textDecoration: 'none',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = color + '55';
        e.currentTarget.style.background = color + '0c';
        e.currentTarget.style.transform = 'translateX(4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.transform = 'translateX(0)';
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: '10px', flexShrink: 0,
        background: color + '18', border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{icon}</div>
      <div>
        <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.1rem' }}>{label}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>{handle}</p>
      </div>
      <svg style={{ marginLeft: 'auto', color: 'var(--slate-600)' }} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* ── Form input ── */
function FormField({ label, id, type = 'text', placeholder, value, onChange, error, required, multiline, rows = 5 }) {
  const [focused, setFocused] = useState(false);
  const baseStyle = {
    width: '100%', padding: '11px 14px',
    borderRadius: '8px',
    border: error
      ? '1px solid rgba(239,68,68,0.6)'
      : focused
        ? '1px solid var(--blue-500)'
        : '1px solid rgba(59,130,246,0.18)',
    background: 'rgba(15, 32, 68, 0.4)',
    color: 'var(--white)',
    fontFamily: 'var(--font-body)', fontSize: '0.9rem',
    outline: 'none', resize: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(59,130,246,0.12)' : 'none',
  };

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label htmlFor={id} style={{
        display: 'block', fontSize: '0.8rem', fontWeight: 500,
        color: error ? 'var(--error)' : 'var(--slate-300)',
        marginBottom: '6px', letterSpacing: '0.02em',
      }}>
        {label}{required && <span style={{ color: 'var(--blue-400)', marginLeft: '3px' }}>*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id} rows={rows} placeholder={placeholder}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      ) : (
        <input
          id={id} type={type} placeholder={placeholder}
          value={value} onChange={onChange}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={baseStyle}
        />
      )}
      {error && <p style={{ fontSize: '0.75rem', color: 'var(--error)', marginTop: '5px' }}>{error}</p>}
    </div>
  );
}

/* ── Contact form ── */
function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.subject.trim()) errs.subject = 'Subject is required';
    if (!form.message.trim()) errs.message = 'Message is required';
    else if (form.message.trim().length < 20) errs.message = 'Message must be at least 20 characters';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    /* ── Replace this block with your EmailJS / Formspree / backend call ──
       Example with EmailJS:
       await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
    ── */
    await new Promise(resolve => setTimeout(resolve, 1400)); // simulate network
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  if (status === 'success') {
    return (
      <div style={{
        background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)',
        borderRadius: 'var(--radius-md)', padding: '3rem 2rem', textAlign: 'center',
        animation: 'fadeInUp 0.5s ease',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10B981' }}>Message Sent!</h3>
        <p style={{ color: 'var(--slate-400)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          Thanks for reaching out, {form.name || 'there'}. I'll get back to you within 24–48 hours.
        </p>
        <button onClick={() => setStatus('idle')} style={{
          padding: '9px 20px', borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)',
          color: '#10B981', fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.18)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
        >Send Another Message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
        <FormField label="Full Name" id="name" placeholder="Your name" value={form.name} onChange={set('name')} error={errors.name} required />
        <FormField label="Email Address" id="email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} error={errors.email} required />
      </div>
      <FormField label="Subject" id="subject" placeholder="What's this about?" value={form.subject} onChange={set('subject')} error={errors.subject} required />
      <FormField label="Message" id="message" placeholder="Tell me about your project, opportunity, or just say hi..." value={form.message} onChange={set('message')} error={errors.message} required multiline rows={6} />

      {status === 'error' && (
        <div style={{
          padding: '10px 14px', borderRadius: '8px', marginBottom: '1.25rem',
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
          color: 'var(--error)', fontSize: '0.85rem',
        }}>
          Something went wrong. Please try again or email me directly.
        </div>
      )}

      <button type="submit" disabled={status === 'sending'} style={{
        width: '100%', padding: '13px 24px', borderRadius: '10px',
        background: status === 'sending' ? 'var(--navy-700)' : 'var(--blue-600)',
        border: '1px solid var(--blue-500)',
        color: '#fff', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem',
        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
        transition: 'all 0.2s ease',
      }}
        onMouseEnter={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--blue-500)'; }}
        onMouseLeave={e => { if (status !== 'sending') e.currentTarget.style.background = 'var(--blue-600)'; }}
      >
        {status === 'sending' ? (
          <>
            <svg style={{ animation: 'spin 0.8s linear infinite' }} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round"/>
            </svg>
            Sending…
          </>
        ) : (
          <>
            Send Message
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </>
        )}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--slate-600)', marginTop: '0.75rem', fontFamily: 'var(--font-mono)' }}>
        I typically respond within 24–48 hours
      </p>
    </form>
  );
}

export default function Contact() {
  useReveal();

  const socials = [
    {
      href: personal.socials.github,
      label: 'GitHub',
      handle: '@sudaiskhan',
      color: '#ffffff',
      icon: (
        <svg width="20" height="20" fill="white" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
    {
      href: personal.socials.linkedin,
      label: 'LinkedIn',
      handle: 'sudaiskhan',
      color: '#0A66C2',
      icon: (
        <svg width="20" height="20" fill="#0A66C2" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: personal.socials.twitter,
      label: 'Twitter / X',
      handle: '@sudaiskhan',
      color: '#1DA1F2',
      icon: (
        <svg width="20" height="20" fill="#1DA1F2" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59l-.047-.02z"/>
        </svg>
      ),
    },
    {
      href: personal.socials.email,
      label: 'Email',
      handle: personal.email,
      color: '#60A5FA',
      external: false,
      icon: (
        <svg width="20" height="20" fill="none" stroke="#60A5FA" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: '80px' }}>

      {/* ── Header ── */}
      <section style={{ padding: '5rem 0 3rem', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute', top: '-80px', left: '50%', transform: 'translateX(-50%)',
          width: 700, height: 400,
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Dot grid accent */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 0%, black 0%, transparent 100%)',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div className="section-tag" style={{ justifyContent: 'center' }}>Contact</div>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
              Let's work<br /><span className="gradient-text">together</span>
            </h1>
            <p style={{ color: 'var(--slate-400)', fontSize: '1.05rem', lineHeight: 1.75, marginTop: '1.25rem' }}>
              Whether you have a project in mind, a job opportunity, or just want to say hello — my inbox is always open.
            </p>

            {/* Availability badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px 6px 10px', borderRadius: '100px',
              border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.06)',
              marginTop: '1.5rem',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', display: 'block', animation: 'pulse-glow 2s ease infinite' }} />
              <span style={{ color: '#10B981', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {personal.availability}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main content ── */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3.5rem', alignItems: 'start' }}>

            {/* ── Left: Info + Socials ── */}
            <div>
              {/* Contact details */}
              <div className="reveal" style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem' }}>Get in touch</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                  {[
                    {
                      icon: (
                        <svg width="18" height="18" fill="none" stroke="var(--blue-400)" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ),
                      label: 'Email',
                      value: personal.email,
                      href: personal.socials.email,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" fill="none" stroke="var(--blue-400)" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.42 7.67a19.79 19.79 0 01-3.07-8.67A2 2 0 012.32 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.29 6.29l1.28-.76a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ),
                      label: 'Phone',
                      value: personal.phone,
                      href: `tel:${personal.phone}`,
                    },
                    {
                      icon: (
                        <svg width="18" height="18" fill="none" stroke="var(--blue-400)" strokeWidth="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ),
                      label: 'Location',
                      value: personal.location,
                      href: null,
                    },
                  ].map(({ icon, label, value, href }) => (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      padding: '0.875rem 1.1rem',
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: '10px', transition: 'border-color 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: '8px', flexShrink: 0,
                        background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>{icon}</div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</p>
                        {href ? (
                          <a href={href} style={{ fontSize: '0.875rem', color: 'var(--slate-200)', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = 'var(--blue-400)'}
                            onMouseLeave={e => e.currentTarget.style.color = 'var(--slate-200)'}
                          >{value}</a>
                        ) : (
                          <p style={{ fontSize: '0.875rem', color: 'var(--slate-200)' }}>{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social links */}
              <div className="reveal" style={{ animationDelay: '100ms' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--slate-300)' }}>
                  Find me on
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {socials.map(s => (
                    <SocialCard key={s.label} {...s} />
                  ))}
                </div>
              </div>

              {/* Response time note */}
              <div className="reveal" style={{
                marginTop: '2rem',
                padding: '1rem 1.25rem',
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '10px',
              }}>
                <p style={{ fontSize: '0.78rem', color: 'var(--slate-400)', lineHeight: 1.7 }}>
                  <span style={{ color: 'var(--blue-400)', fontWeight: 600 }}>⚡ Quick responder.</span>{' '}
                  I aim to reply to all messages within <strong style={{ color: 'var(--slate-300)' }}>24–48 hours</strong>.
                  For urgent inquiries, email works best.
                </p>
              </div>
            </div>

            {/* ── Right: Contact form ── */}
            <div className="reveal" style={{ animationDelay: '80ms' }}>
              <div style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Subtle top gradient */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, var(--blue-600), var(--blue-400), transparent)',
                }} />

                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.4rem' }}>Send a Message</h2>
                  <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
                    Fill out the form below and I'll be in touch shortly.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ / What I'm open to ── */}
      <section className="section" style={{ background: 'rgba(10,22,40,0.4)', paddingTop: '3rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="section-tag reveal" style={{ justifyContent: 'center' }}>Open to</div>
            <h2 className="section-title reveal" style={{ fontSize: '1.8rem' }}>What I'm looking for</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.1rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { icon: '💼', title: 'Full-Time Roles', desc: 'Software Engineer, Frontend, or Full-Stack positions at product companies.' },
              { icon: '🎯', title: 'Internships', desc: 'Summer or co-op software engineering internships where I can learn and contribute.' },
              { icon: '🛠️', title: 'Freelance Projects', desc: 'Web applications, dashboards, or MVPs for startups and small businesses.' },
              { icon: '🤝', title: 'Collaborations', desc: 'Open source projects, side projects, or hackathon teams.' },
            ].map((item, i) => (
              <div key={item.title} className="reveal" style={{ animationDelay: `${i * 80}ms` }}>
                <div style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)', padding: '1.5rem',
                  transition: 'all 0.25s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,0.35)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{item.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .form-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
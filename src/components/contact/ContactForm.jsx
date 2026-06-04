import { useContactForm, FORM_STATUS } from '../../hooks/useContactForm';

/* ── Single form field ── */
function Field({ label, id, type = 'text', placeholder, value, onChange, onBlur, error, touched, required, multiline, rows = 5, maxLength, charCount }) {
  const showError = touched && error;

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      {/* Label row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
        <label htmlFor={id} style={{
          fontSize: '0.8rem', fontWeight: 500,
          color: showError ? '#F87171' : 'var(--slate-300, #CBD5E1)',
          letterSpacing: '0.02em',
        }}>
          {label}
          {required && <span style={{ color: '#60A5FA', marginLeft: '3px' }}>*</span>}
        </label>
        {maxLength && (
          <span style={{
            fontSize: '0.7rem', fontFamily: 'var(--font-mono, monospace)',
            color: charCount > maxLength * 0.9 ? '#F59E0B' : 'var(--slate-600, #475569)',
          }}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>

      {/* Input / Textarea */}
      {multiline ? (
        <textarea
          id={id} rows={rows} placeholder={placeholder}
          value={value} onChange={onChange} onBlur={onBlur}
          maxLength={maxLength}
          style={{
            width: '100%', padding: '11px 14px',
            borderRadius: '8px',
            border: showError
              ? '1px solid rgba(248,113,113,0.6)'
              : '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(15,32,68,0.4)',
            color: '#ffffff',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.9rem', lineHeight: 1.6,
            outline: 'none', resize: 'vertical',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = showError ? 'rgba(248,113,113,0.8)' : 'rgba(59,130,246,0.6)';
            e.target.style.boxShadow   = showError ? '0 0 0 3px rgba(248,113,113,0.1)' : '0 0 0 3px rgba(59,130,246,0.12)';
          }}
          onBlur2={e => { e.target.style.boxShadow = 'none'; }}
        />
      ) : (
        <input
          id={id} type={type} placeholder={placeholder}
          value={value} onChange={onChange} onBlur={onBlur}
          maxLength={maxLength}
          style={{
            width: '100%', padding: '11px 14px',
            borderRadius: '8px',
            border: showError
              ? '1px solid rgba(248,113,113,0.6)'
              : '1px solid rgba(59,130,246,0.2)',
            background: 'rgba(15,32,68,0.4)',
            color: '#ffffff',
            fontFamily: 'var(--font-body, sans-serif)',
            fontSize: '0.9rem',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={e => {
            e.target.style.borderColor = showError ? 'rgba(248,113,113,0.8)' : 'rgba(59,130,246,0.6)';
            e.target.style.boxShadow   = showError ? '0 0 0 3px rgba(248,113,113,0.1)' : '0 0 0 3px rgba(59,130,246,0.12)';
          }}
          onBlur2={e => { e.target.style.boxShadow = 'none'; }}
        />
      )}

      {/* Error message */}
      {showError && (
        <p style={{
          marginTop: '5px', fontSize: '0.75rem', color: '#F87171',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Success state ── */
function SuccessState({ name, onReset }) {
  return (
    <div style={{
      textAlign: 'center', padding: '3rem 1.5rem',
      background: 'rgba(16,185,129,0.06)',
      border: '1px solid rgba(16,185,129,0.2)',
      borderRadius: '12px',
      animation: 'fadeInUp 0.5s ease',
    }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'rgba(16,185,129,0.12)',
        border: '1px solid rgba(16,185,129,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 1.25rem',
      }}>
        <svg width="28" height="28" fill="none" stroke="#10B981" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#10B981', marginBottom: '0.5rem' }}>
        Message sent!
      </h3>
      <p style={{ color: 'var(--slate-400, #94A3B8)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
        Thanks{name ? `, ${name}` : ''}! I'll get back to you within 24–48 hours.
      </p>
      <button
        onClick={onReset}
        style={{
          padding: '8px 20px', borderRadius: '8px',
          border: '1px solid rgba(16,185,129,0.3)',
          background: 'rgba(16,185,129,0.08)',
          color: '#10B981', fontFamily: 'var(--font-body, sans-serif)',
          fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(16,185,129,0.08)'}
      >
        Send another message
      </button>
    </div>
  );
}

/* ── Spinner ── */
function Spinner() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"
      viewBox="0 0 24 24" style={{ animation: 'spin 0.7s linear infinite' }}>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        strokeLinecap="round" />
    </svg>
  );
}

/**
 * ContactForm
 * Full contact form wired to useContactForm hook.
 *
 * Props:
 *   onSuccess — optional callback fired after successful send
 */
export function ContactForm({ onSuccess }) {
  const {
    fields, errors, touched, status, serverError,
    charCount, handleChange, handleBlur, handleSubmit, reset,
    FORM_STATUS,
  } = useContactForm();

  const isSending = status === FORM_STATUS.SENDING;
  const isSuccess = status === FORM_STATUS.SUCCESS;
  const isError   = status === FORM_STATUS.ERROR;

  if (isSuccess) {
    onSuccess?.();
    return <SuccessState name={fields.name} onReset={reset} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name + Email row */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem',
      }} className="form-row">
        <Field
          label="Full Name" id="name" placeholder="Sudais Khan"
          value={fields.name}   onChange={handleChange('name')}  onBlur={handleBlur('name')}
          error={errors.name}   touched={touched.name}
          required maxLength={60}
        />
        <Field
          label="Email Address" id="email" type="email" placeholder="you@example.com"
          value={fields.email}  onChange={handleChange('email')} onBlur={handleBlur('email')}
          error={errors.email}  touched={touched.email}
          required maxLength={100}
        />
      </div>

      <Field
        label="Subject" id="subject" placeholder="What's this about?"
        value={fields.subject} onChange={handleChange('subject')} onBlur={handleBlur('subject')}
        error={errors.subject} touched={touched.subject}
        required maxLength={100}
      />

      <Field
        label="Message" id="message"
        placeholder="Tell me about your project, opportunity, or just say hi..."
        value={fields.message} onChange={handleChange('message')} onBlur={handleBlur('message')}
        error={errors.message} touched={touched.message}
        required multiline rows={6} maxLength={2000}
        charCount={charCount}
      />

      {/* Server error banner */}
      {isError && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '10px',
          padding: '12px 14px', borderRadius: '8px', marginBottom: '1.25rem',
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
          color: '#F87171', fontSize: '0.85rem', lineHeight: 1.6,
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {serverError || 'Something went wrong. Please try emailing me directly.'}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSending}
        style={{
          width: '100%', padding: '13px 24px', borderRadius: '10px',
          background: isSending ? 'rgba(15,32,68,0.6)' : 'var(--blue-600, #2563EB)',
          border: '1px solid var(--blue-500, #3B82F6)',
          color: '#fff',
          fontFamily: 'var(--font-body, sans-serif)',
          fontWeight: 600, fontSize: '0.95rem',
          cursor: isSending ? 'not-allowed' : 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          transition: 'all 0.2s ease',
          opacity: isSending ? 0.7 : 1,
        }}
        onMouseEnter={e => { if (!isSending) e.currentTarget.style.background = 'var(--blue-500, #3B82F6)'; }}
        onMouseLeave={e => { if (!isSending) e.currentTarget.style.background = 'var(--blue-600, #2563EB)'; }}
      >
        {isSending ? (
          <><Spinner /> Sending…</>
        ) : (
          <>
            Send Message
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2"
              viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </>
        )}
      </button>

      <p style={{
        textAlign: 'center', fontSize: '0.72rem', fontFamily: 'var(--font-mono, monospace)',
        color: 'var(--slate-600, #475569)', marginTop: '0.75rem',
      }}>
        I typically respond within 24–48 hours
      </p>

      <style>{`
        @media (max-width: 560px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </form>
  );
}

export default ContactForm;

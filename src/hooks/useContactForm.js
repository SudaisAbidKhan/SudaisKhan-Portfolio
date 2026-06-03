import { useState, useCallback, useRef } from 'react';
import { sendContactEmail } from '../utils/emailService';

/* ── Validation rules ─────────────────────────────────────────────── */
const RULES = {
  name: [
    { test: (v) => v.trim().length > 0,   msg: 'Name is required.' },
    { test: (v) => v.trim().length >= 2,  msg: 'Name must be at least 2 characters.' },
    { test: (v) => v.trim().length <= 60, msg: 'Name must be under 60 characters.' },
  ],
  email: [
    { test: (v) => v.trim().length > 0, msg: 'Email address is required.' },
    {
      test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
      msg: 'Please enter a valid email address.',
    },
  ],
  subject: [
    { test: (v) => v.trim().length > 0,   msg: 'Subject is required.' },
    { test: (v) => v.trim().length >= 5,  msg: 'Subject must be at least 5 characters.' },
    { test: (v) => v.trim().length <= 100, msg: 'Subject must be under 100 characters.' },
  ],
  message: [
    { test: (v) => v.trim().length > 0,   msg: 'Message is required.' },
    { test: (v) => v.trim().length >= 20,  msg: 'Message must be at least 20 characters.' },
    { test: (v) => v.trim().length <= 2000, msg: 'Message must be under 2000 characters.' },
  ],
};

/** Run rules for a single field; returns first error string or null */
function validateField(name, value) {
  const rules = RULES[name];
  if (!rules) return null;
  for (const rule of rules) {
    if (!rule.test(value)) return rule.msg;
  }
  return null;
}

/** Run all rules; returns { fieldName: errorString } for every failing field */
function validateAll(fields) {
  return Object.keys(RULES).reduce((acc, key) => {
    const err = validateField(key, fields[key] ?? '');
    if (err) acc[key] = err;
    return acc;
  }, {});
}

/* ── Status constants ─────────────────────────────────────────────── */
export const FORM_STATUS = {
  IDLE:    'idle',
  SENDING: 'sending',
  SUCCESS: 'success',
  ERROR:   'error',
};

/* ── Default field values ─────────────────────────────────────────── */
const DEFAULT_FIELDS = { name: '', email: '', subject: '', message: '' };

/**
 * useContactForm
 * Manages the full lifecycle of the contact form:
 * field values, per-field touched state, validation errors,
 * submission status, and EmailJS integration.
 *
 * Returns:
 *   fields        — { name, email, subject, message }
 *   errors        — { [fieldName]: errorString }
 *   touched       — { [fieldName]: boolean }
 *   status        — FORM_STATUS value
 *   serverError   — string | null  (API-level error message)
 *   charCount     — character count for message field
 *   handleChange  — onChange handler factory: handleChange('name')
 *   handleBlur    — onBlur  handler factory: handleBlur('name')
 *   handleSubmit  — form onSubmit handler
 *   reset         — reset everything back to defaults
 *   isValid       — boolean: no errors exist for current values
 */
export function useContactForm() {
  const [fields,      setFields]      = useState(DEFAULT_FIELDS);
  const [errors,      setErrors]      = useState({});
  const [touched,     setTouched]     = useState({});
  const [status,      setStatus]      = useState(FORM_STATUS.IDLE);
  const [serverError, setServerError] = useState(null);

  // Prevent double-submit on slow connections
  const submittingRef = useRef(false);

  /* ── Field change ─────────────────────────────────────────────── */
  const handleChange = useCallback(
    (fieldName) => (e) => {
      const value = e.target.value;
      setFields((prev) => ({ ...prev, [fieldName]: value }));

      // Live-validate once the field has been touched
      setTouched((prev) => {
        if (!prev[fieldName]) return prev;
        const err = validateField(fieldName, value);
        setErrors((errs) => ({ ...errs, [fieldName]: err || undefined }));
        return prev;
      });
    },
    []
  );

  /* ── Field blur ───────────────────────────────────────────────── */
  const handleBlur = useCallback(
    (fieldName) => () => {
      setTouched((prev) => ({ ...prev, [fieldName]: true }));
      const err = validateField(fieldName, fields[fieldName] ?? '');
      setErrors((prev) => ({ ...prev, [fieldName]: err || undefined }));
    },
    [fields]
  );

  /* ── Submit ───────────────────────────────────────────────────── */
  const handleSubmit = useCallback(
    async (e) => {
      e?.preventDefault();
      if (submittingRef.current) return;

      // Mark all touched & run full validation
      setTouched({ name: true, email: true, subject: true, message: true });
      const allErrors = validateAll(fields);

      if (Object.keys(allErrors).length > 0) {
        setErrors(allErrors);
        // Focus first errored field for accessibility
        const firstKey = Object.keys(allErrors)[0];
        document.getElementById(firstKey)?.focus();
        return;
      }

      submittingRef.current = true;
      setStatus(FORM_STATUS.SENDING);
      setServerError(null);

      try {
        await sendContactEmail({
          from_name:    fields.name.trim(),
          from_email:   fields.email.trim(),
          subject:      fields.subject.trim(),
          message:      fields.message.trim(),
          reply_to:     fields.email.trim(),
          sent_at:      new Date().toLocaleString(),
        });

        setStatus(FORM_STATUS.SUCCESS);
        setFields(DEFAULT_FIELDS);
        setErrors({});
        setTouched({});
      } catch (err) {
        setStatus(FORM_STATUS.ERROR);
        setServerError(
          err?.message || 'Something went wrong. Please try emailing me directly.'
        );
      } finally {
        submittingRef.current = false;
      }
    },
    [fields]
  );

  /* ── Reset ────────────────────────────────────────────────────── */
  const reset = useCallback(() => {
    setFields(DEFAULT_FIELDS);
    setErrors({});
    setTouched({});
    setStatus(FORM_STATUS.IDLE);
    setServerError(null);
    submittingRef.current = false;
  }, []);

  /* ── Derived helpers ──────────────────────────────────────────── */
  const isValid    = Object.keys(validateAll(fields)).length === 0;
  const charCount  = fields.message.length;

  return {
    fields,
    errors,
    touched,
    status,
    serverError,
    charCount,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    isValid,
    FORM_STATUS,
  };
}

export default useContactForm;

/**
 * emailService.js
 * EmailJS integration for the contact form.
 *
 * SETUP (one-time):
 *   1. Create a free account at https://emailjs.com
 *   2. Add an Email Service (Gmail, Outlook, etc.) → copy Service ID
 *   3. Create an Email Template → copy Template ID
 *      Suggested template variables: {{from_name}}, {{from_email}},
 *      {{subject}}, {{message}}, {{reply_to}}, {{sent_at}}
 *   4. Copy your Public Key from Account → API Keys
 *   5. Add to your .env file:
 *        VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *        VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *        VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
 *
 * Alternative — Formspree:
 *   Replace sendContactEmail with the Formspree version below
 *   and set VITE_FORMSPREE_ENDPOINT in your .env.
 */

/* ── Config (loaded from .env via Vite) ──────────────────────────── */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';
const FORMSPREE_ENDPOINT  = import.meta.env.VITE_FORMSPREE_ENDPOINT  || '';

/* ── Lazy-load EmailJS SDK (avoids adding it to the main bundle) ─── */
let emailjsInstance = null;

async function getEmailJS() {
  if (emailjsInstance) return emailjsInstance;
  const mod = await import('https://cdn.jsdelivr.net/npm/@emailjs/browser@4/+esm');
  emailjsInstance = mod.default ?? mod;
  emailjsInstance.init(EMAILJS_PUBLIC_KEY);
  return emailjsInstance;
}

/* ── EmailJS sender ──────────────────────────────────────────────── */
/**
 * sendContactEmail
 * Sends the contact form data via EmailJS.
 *
 * @param {Object} templateParams — keys must match your EmailJS template vars
 *   { from_name, from_email, subject, message, reply_to, sent_at }
 * @returns {Promise<void>}
 * @throws {Error} with a human-readable message on failure
 */
export async function sendContactEmail(templateParams) {
  // ── Dev / missing config fallback ──────────────────────────────
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    if (import.meta.env.DEV) {
      // In development with missing keys, simulate a 1.2s send and succeed
      console.info('[emailService] No EmailJS keys found — simulating send:', templateParams);
      await new Promise((r) => setTimeout(r, 1200));
      return;
    }
    throw new Error('Email service is not configured. Please contact me directly.');
  }

  try {
    const emailjs = await getEmailJS();
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS responded with status ${response.status}`);
    }
  } catch (err) {
    // Re-throw with a cleaner message for the UI
    const msg = err?.text || err?.message || 'Unknown error';
    throw new Error(`Failed to send message: ${msg}`);
  }
}

/* ── Formspree alternative ───────────────────────────────────────── */
/**
 * sendViaFormspree
 * Drop-in replacement for sendContactEmail when using Formspree.
 * Set VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxx in .env
 */
export async function sendViaFormspree(templateParams) {
  if (!FORMSPREE_ENDPOINT) {
    throw new Error('Formspree endpoint not configured.');
  }

  const res = await fetch(FORMSPREE_ENDPOINT, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body:    JSON.stringify(templateParams),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Formspree error ${res.status}`);
  }
}

/* ── Mailto fallback ─────────────────────────────────────────────── */
/**
 * openMailtoFallback
 * Opens the user's mail client as a last resort.
 * Call this if both sendContactEmail and sendViaFormspree fail.
 */
export function openMailtoFallback({ from_name, subject, message } = {}) {
  const to      = import.meta.env.VITE_CONTACT_EMAIL || 'sudais.khan@email.com';
  const subj    = encodeURIComponent(subject || 'Portfolio Contact');
  const body    = encodeURIComponent(`From: ${from_name}\n\n${message}`);
  window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
}

export default sendContactEmail;

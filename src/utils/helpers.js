/**
 * helpers.js
 * Pure utility functions used across the portfolio.
 * No side-effects, no imports — safe to tree-shake.
 */

/* ═══════════════════════════════════════════════════════════════════
   DATE & TIME
═══════════════════════════════════════════════════════════════════ */

/**
 * formatDate
 * Converts a date string / Date object into a human-readable label.
 *
 * @param {string|Date} date
 * @param {'short'|'medium'|'long'|'year'} style
 * @returns {string}
 *
 * Examples:
 *   formatDate('2024-03-15', 'short')  → "Mar 2024"
 *   formatDate('2024-03-15', 'medium') → "March 15, 2024"
 *   formatDate('2024-03-15', 'long')   → "March 15, 2024 at 00:00"
 *   formatDate('2024-03-15', 'year')   → "2024"
 */
export function formatDate(date, style = 'short') {
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d)) return String(date); // fallback: return as-is

  const opts = {
    short:  { month: 'short', year: 'numeric' },
    medium: { month: 'long',  day: 'numeric', year: 'numeric' },
    long:   { month: 'long',  day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    year:   { year: 'numeric' },
  };

  return d.toLocaleDateString('en-US', opts[style] || opts.short);
}

/**
 * timeAgo
 * Returns a relative time string from now.
 *
 * @param {string|Date} date
 * @returns {string}  e.g. "2 hours ago", "3 days ago", "just now"
 */
export function timeAgo(date) {
  const d     = date instanceof Date ? date : new Date(date);
  const diff  = Date.now() - d.getTime(); // ms
  const secs  = Math.floor(diff / 1000);
  const mins  = Math.floor(secs  / 60);
  const hours = Math.floor(mins  / 60);
  const days  = Math.floor(hours / 24);
  const weeks = Math.floor(days  / 7);
  const mons  = Math.floor(days  / 30);
  const years = Math.floor(days  / 365);

  if (secs  <  60) return 'just now';
  if (mins  <  60) return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
  if (hours <  24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days  <   7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks <   5) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  if (mons  <  12) return `${mons} month${mons !== 1 ? 's' : ''} ago`;
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

/**
 * yearRange
 * Returns "2021 – Present" or "2021 – 2023" given start/end years.
 */
export function yearRange(start, end = null) {
  return end ? `${start} – ${end}` : `${start} – Present`;
}

/* ═══════════════════════════════════════════════════════════════════
   STRING UTILITIES
═══════════════════════════════════════════════════════════════════ */

/**
 * truncate
 * Cuts a string to maxLength and appends an ellipsis.
 *
 * @param {string} str
 * @param {number} maxLength   default 120
 * @param {string} suffix      default '...'
 */
export function truncate(str, maxLength = 120, suffix = '…') {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + suffix;
}

/**
 * slugify
 * Converts a string to a URL-friendly slug.
 *   "My Awesome Project!" → "my-awesome-project"
 */
export function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * capitalize
 * Capitalizes the first letter of a string.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * titleCase
 * Converts "hello world" → "Hello World".
 */
export function titleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(capitalize)
    .join(' ');
}

/**
 * initials
 * Returns up to 2 uppercase initials from a full name.
 *   "Sudais Khan" → "SK"
 */
export function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

/**
 * pluralize
 * Returns singular or plural form based on count.
 *   pluralize('project', 1)   → "project"
 *   pluralize('project', 5)   → "projects"
 *   pluralize('child', 2, 'children') → "children"
 */
export function pluralize(word, count, pluralForm = null) {
  if (count === 1) return word;
  return pluralForm || `${word}s`;
}

/* ═══════════════════════════════════════════════════════════════════
   ARRAY & OBJECT UTILITIES
═══════════════════════════════════════════════════════════════════ */

/**
 * groupBy
 * Groups an array of objects by a key.
 *
 * @param {Object[]} arr
 * @param {string|Function} key  — property name or accessor function
 * @returns {Object}  { groupKey: [items] }
 */
export function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const group = typeof key === 'function' ? key(item) : item[key];
    (acc[group] = acc[group] || []).push(item);
    return acc;
  }, {});
}

/**
 * sortBy
 * Sorts an array of objects by a key, ascending or descending.
 *
 * @param {Object[]} arr
 * @param {string}   key
 * @param {'asc'|'desc'} dir
 */
export function sortBy(arr, key, dir = 'asc') {
  return [...arr].sort((a, b) => {
    const va = a[key];
    const vb = b[key];
    if (va < vb) return dir === 'asc' ? -1 :  1;
    if (va > vb) return dir === 'asc' ?  1 : -1;
    return 0;
  });
}

/**
 * uniqueBy
 * Returns an array with duplicates removed based on a key.
 */
export function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter((item) => {
    const val = item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}

/**
 * chunk
 * Splits an array into chunks of a given size.
 *   chunk([1,2,3,4,5], 2) → [[1,2],[3,4],[5]]
 */
export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

/* ═══════════════════════════════════════════════════════════════════
   NUMBER & PERCENT UTILITIES
═══════════════════════════════════════════════════════════════════ */

/**
 * clamp
 * Clamps a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * lerp
 * Linear interpolation between a and b by t (0–1).
 */
export function lerp(a, b, t) {
  return a + (b - a) * clamp(t, 0, 1);
}

/**
 * formatPercent
 * Formats a decimal (0–1) or integer (0–100) as a percent string.
 *   formatPercent(0.856)  → "86%"
 *   formatPercent(85.6)   → "86%"
 */
export function formatPercent(value) {
  const pct = value <= 1 ? value * 100 : value;
  return `${Math.round(pct)}%`;
}

/* ═══════════════════════════════════════════════════════════════════
   DOM & BROWSER UTILITIES
═══════════════════════════════════════════════════════════════════ */

/**
 * copyToClipboard
 * Copies text to the clipboard. Returns true on success.
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (_) {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    el.style.position = 'fixed';
    el.style.opacity  = '0';
    document.body.appendChild(el);
    el.focus();
    el.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(el);
    return ok;
  }
}

/**
 * scrollToId
 * Smooth-scrolls to an element by its id, with an optional offset
 * to account for fixed headers.
 */
export function scrollToId(id, offset = 80) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/**
 * isMobile
 * Returns true if the viewport is narrower than 768 px.
 */
export function isMobile() {
  return typeof window !== 'undefined' && window.innerWidth < 768;
}

/**
 * getOS
 * Returns 'windows' | 'mac' | 'linux' | 'ios' | 'android' | 'unknown'
 */
export function getOS() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android'))    return 'android';
  if (ua.includes('iphone') || ua.includes('ipad')) return 'ios';
  if (ua.includes('win'))        return 'windows';
  if (ua.includes('mac'))        return 'mac';
  if (ua.includes('linux'))      return 'linux';
  return 'unknown';
}

/* ═══════════════════════════════════════════════════════════════════
   PERFORMANCE
═══════════════════════════════════════════════════════════════════ */

/**
 * debounce
 * Delays fn execution until ms have passed since the last call.
 */
export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

/**
 * throttle
 * Ensures fn is called at most once every ms milliseconds.
 */
export function throttle(fn, ms = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= ms) {
      last = now;
      fn(...args);
    }
  };
}

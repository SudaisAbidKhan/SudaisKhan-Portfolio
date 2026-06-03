import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useScrollAnimation
 * Lightweight IntersectionObserver wrapper for scroll-triggered reveals.
 *
 * Three usage patterns:
 *
 * 1. Auto-observe all .reveal elements on the page (call with no args):
 *    useScrollAnimation();
 *
 * 2. Observe a single ref:
 *    const { ref, isVisible } = useScrollAnimation({ single: true });
 *    <div ref={ref} className={isVisible ? 'visible' : ''} />
 *
 * 3. Observe a list of refs (staggered):
 *    const { assignRef, visibleMap } = useScrollAnimation({ stagger: true });
 *    items.map((item, i) => <div key={i} ref={assignRef(i)} />)
 */
export function useScrollAnimation(options = {}) {
  const {
    threshold   = 0.12,    // fraction of element visible before trigger
    rootMargin  = '0px',   // IntersectionObserver rootMargin
    once        = true,    // un-observe after first reveal (default: true)
    single      = false,   // single-ref mode
    stagger     = false,   // multi-ref stagger mode
    staggerDelay = 80,     // ms between each stagger step
  } = options;

  /* ── MODE 1: Auto-observe all .reveal in DOM ─────────────────────── */
  useEffect(() => {
    if (single || stagger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    // Observe existing + any added later (short delay for initial render)
    const observe = () =>
      document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    observe();
    const timer = setTimeout(observe, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, once, single, stagger]);

  /* ── MODE 2: Single ref ──────────────────────────────────────────── */
  const singleRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!single || !singleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(singleRef.current);
    return () => observer.disconnect();
  }, [single, threshold, rootMargin, once]);

  /* ── MODE 3: Stagger map ─────────────────────────────────────────── */
  const refsMap   = useRef({});
  const [visibleMap, setVisibleMap] = useState({});

  useEffect(() => {
    if (!stagger) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = entry.target.dataset.staggerKey;
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.staggerDelay || '0', 10);
            setTimeout(() => {
              setVisibleMap((prev) => ({ ...prev, [key]: true }));
              entry.target.classList.add('visible');
            }, delay);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisibleMap((prev) => ({ ...prev, [key]: false }));
          }
        });
      },
      { threshold, rootMargin }
    );

    Object.values(refsMap.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [stagger, threshold, rootMargin, once, staggerDelay]);

  /** assignRef(index) — attach to a ref prop in stagger mode */
  const assignRef = useCallback(
    (index) => (el) => {
      if (el) {
        el.dataset.staggerKey   = String(index);
        el.dataset.staggerDelay = String(index * staggerDelay);
        refsMap.current[index]  = el;
      }
    },
    [staggerDelay]
  );

  /* ── Utility: manually mark an element visible ───────────────────── */
  const revealElement = useCallback((el) => {
    if (el) el.classList.add('visible');
  }, []);

  /** Trigger all .reveal elements immediately (e.g. for print view) */
  const revealAll = useCallback(() => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }, []);

  return {
    // Single-ref mode
    ref: singleRef,
    isVisible,

    // Stagger mode
    assignRef,
    visibleMap,

    // Utilities
    revealElement,
    revealAll,
  };
}

/**
 * useParallax
 * Simple scroll-based parallax offset for a ref element.
 *
 * Usage:
 *   const { ref, offset } = useParallax({ speed: 0.3 });
 *   <div ref={ref} style={{ transform: `translateY(${offset}px)` }} />
 */
export function useParallax({ speed = 0.2 } = {}) {
  const ref    = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect  = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(center * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
}

/**
 * useActiveSection
 * Tracks which section id is currently in the viewport.
 * Useful for highlighting the active nav link.
 *
 * Usage:
 *   const activeSection = useActiveSection(['hero', 'about', 'projects']);
 */
export function useActiveSection(sectionIds = [], offset = 120) {
  const [active, setActive] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: `-${offset}px 0px -50% 0px`, threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return active;
}

export default useScrollAnimation;

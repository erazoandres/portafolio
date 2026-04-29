import { useEffect, useRef } from 'react';

/**
 * FadeIn wrapper component — adds the 'fade-in' class and observes
 * the element for viewport entry, toggling 'visible' class.
 * Accepts an optional `delay` prop for stagger support.
 */
export default function FadeIn({ children, as: Tag = 'div', delay = 0, className = '', ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(el);

    // Fallback for smooth-scroll libraries (e.g., Lenis) or environments
    // where IntersectionObserver may not fire reliably. Use a lightweight
    // requestAnimationFrame loop + scroll listener to check visibility until
    // the element becomes visible or a short timeout elapses.
    let rafId = null;
    let timeoutId = null;
    let stopped = false;

    const checkVisibility = () => {
      if (stopped || !el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
        // Mark with attribute so CSS can target with !important
        el.setAttribute('data-fadein-visible', 'true');
        // If GSAP is present, stop tweens on this element to avoid conflicts
        try { if (window.gsap && typeof window.gsap.killTweensOf === 'function') window.gsap.killTweensOf(el); } catch (e) {}
        try { observer.unobserve(el); } catch (e) {}
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(checkVisibility);
    };

    const onScroll = () => {
      // run a single quick visibility check on scroll (helps Lenis-like setups)
      if (stopped || !el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
        el.setAttribute('data-fadein-visible', 'true');
        try { if (window.gsap && typeof window.gsap.killTweensOf === 'function') window.gsap.killTweensOf(el); } catch (e) {}
        try { observer.unobserve(el); } catch (e) {}
      }
    };

    // Start fallback checks only if element not already visible
    if (!el.classList.contains('visible')) {
      rafId = requestAnimationFrame(checkVisibility);
      window.addEventListener('scroll', onScroll, { passive: true });
      // safety: stop trying after 2500ms to avoid infinite loops
      timeoutId = setTimeout(() => {
        stopped = true;
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', onScroll);
      }, 2500);
    }

    return () => {
      stopped = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      try { window.removeEventListener('scroll', onScroll); } catch (e) {}
      observer.disconnect();
    };
  }, []);

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}

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
    // requestAnimationFrame loop to check visibility until element becomes visible.
    let rafId = null;
    const checkVisibility = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9) {
        el.classList.add('visible');
        try { observer.unobserve(el); } catch (e) {}
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      rafId = requestAnimationFrame(checkVisibility);
    };

    // Start fallback check (only if element not already visible)
    if (!el.classList.contains('visible')) {
      rafId = requestAnimationFrame(checkVisibility);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
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

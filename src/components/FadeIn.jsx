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

    // Use IntersectionObserver with a slightly negative bottom rootMargin
    // so elements trigger a bit earlier as the user scrolls down.
    // Fallback: if IntersectionObserver is not available, reveal immediately.
    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }

    const obsOptions = { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.05 };
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, obsOptions);

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}

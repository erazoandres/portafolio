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

    return () => observer.disconnect();
  }, []);

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined;

  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style} {...props}>
      {children}
    </Tag>
  );
}

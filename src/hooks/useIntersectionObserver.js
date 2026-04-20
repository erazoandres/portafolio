import { useEffect, useRef } from 'react';

/**
 * Custom hook to observe when an element enters the viewport
 * and add a CSS class (default: 'visible') when it does.
 * @param {Object} options
 * @param {string} options.className - Class to add when visible (default: 'visible')
 * @param {string} options.rootMargin - IntersectionObserver rootMargin
 * @param {number} options.threshold - IntersectionObserver threshold
 * @param {boolean} options.once - Whether to unobserve after first intersection
 */
export function useFadeIn({
  className = 'visible',
  rootMargin = '0px',
  threshold = 0.1,
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add(className);
      if (once) return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className);
            if (once) observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [className, rootMargin, threshold, once]);

  return ref;
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook that applies a magnetic effect to an element.
 * The element will follow the cursor when hovered.
 * @param {Object} options
 * @param {number} options.strength - Magnetic pull strength (default: 50)
 * @param {string} options.textSelector - Optional CSS selector for inner text element
 */
export function useMagnetic({ strength = 50, textSelector = null } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let textElement = null;
    if (textSelector) {
      textElement = el.querySelector(textSelector);
    }

    const mouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(el, {
        x: (x / rect.width) * strength,
        y: (y / rect.height) * strength,
        duration: 1,
        ease: 'power3.out',
      });

      if (textElement) {
        gsap.to(textElement, {
          x: (x / rect.width) * (strength / 2),
          y: (y / rect.height) * (strength / 2),
          duration: 1,
          ease: 'power3.out',
        });
      }
    };

    const mouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.3)',
      });

      if (textElement) {
        gsap.to(textElement, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'elastic.out(1, 0.3)',
        });
      }
    };

    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseleave', mouseLeave);

    return () => {
      el.removeEventListener('mousemove', mouseMove);
      el.removeEventListener('mouseleave', mouseLeave);
    };
  }, [strength, textSelector]);

  return ref;
}

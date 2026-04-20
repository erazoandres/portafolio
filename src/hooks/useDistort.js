import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Custom hook that applies a scroll-velocity-based skew distortion to an element.
 * Creates a dynamic text distortion effect when the user scrolls.
 */
export function useDistort() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const proxy = { skew: 0 };
    const clamp = gsap.utils.clamp(-20, 20);

    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const velocity = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      const skew = clamp(velocity / -10);

      if (Math.abs(skew) > 0.1) {
        proxy.skew = skew;
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => {
            if (el) {
              gsap.set(el, { skewY: proxy.skew + 'deg' });
            }
          },
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return ref;
}

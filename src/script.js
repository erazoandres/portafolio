import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let lenis;

/**
 * Initializes Smooth Scroll using Lenis and syncs it with GSAP ScrollTrigger.
 */
export const initSmoothScroll = () => {
  if (lenis) return; // Prevent multiple initializations

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // default easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};

/**
 * Destroys the smooth scroll instance (cleanup).
 */
export const destroySmoothScroll = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
};

/**
 * Applies text reveal animations to elements matching the selector.
 * @param {string} selector - CSS selector for text elements.
 */
export const animateText = (selector = '.split-text') => {
  const elements = document.querySelectorAll(selector);
  let mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)"
  }, (context) => {
    let { isDesktop } = context.conditions;

    elements.forEach((el) => {
      if (isDesktop) {
        const split = new SplitType(el, { types: 'chars, words' });
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      } else {
        // Mobile: Simpler fade-up without splitting to avoid DOM overload and layout lag
        gsap.from(el, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  });
};

/**
 * Applies a floating / movement physics effect to elements.
 * @param {string} selector - CSS selector for floating elements.
 */
export const initFloatingPhysics = (selector = '.float-element') => {
  const elements = document.querySelectorAll(selector);
  let mm = gsap.matchMedia();

  // Only run floating physics on desktop to save battery and avoid mobile lag
  mm.add("(min-width: 768px)", () => {
    elements.forEach((el) => {
      // Independent tweens for X, Y, and Rotation create complex, organic Lissajous curves
      gsap.to(el, {
        x: "random(-12, 12)",
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
      });

      gsap.to(el, {
        y: "random(-15, 15)",
        duration: "random(3, 4.5)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        delay: 0.3,
      });

      gsap.to(el, {
        rotation: "random(-8, 8)",
        duration: "random(3.5, 5)",
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
        delay: 0.6,
      });
    });
  });
};

/**
 * Applies parallax effect to background or specific elements
 */
export const initParallax = (selector = '.parallax') => {
  const elements = document.querySelectorAll(selector);
  let mm = gsap.matchMedia();

  // Only run parallax on desktop to avoid scroll lag on mobile
  mm.add("(min-width: 768px)", () => {
    elements.forEach((el) => {
      const speed = el.dataset.speed || 0.5;
      
      gsap.to(el, {
        y: () => (window.innerHeight - el.getBoundingClientRect().top) * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  });
};

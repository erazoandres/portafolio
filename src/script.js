import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

let lenis;
let _lenisTicker = null;

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
  // Add a safe ticker callback that checks `lenis` before calling `raf`.
  _lenisTicker = (time) => {
    if (lenis && typeof lenis.raf === 'function') {
      try {
        lenis.raf(time * 1000);
      } catch (e) {
        // swallow errors to avoid uncaught exceptions breaking the ticker
        // but log for debugging in development
        // eslint-disable-next-line no-console
        console.warn('lenis.raf error:', e);
      }
    }
  };

  gsap.ticker.add(_lenisTicker);

  gsap.ticker.lagSmoothing(0);
};

/**
 * Smoothly scrolls to a target element or position using Lenis.
 * @param {string|number|HTMLElement} target - Target to scroll to.
 */
export const scrollToTarget = (target) => {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el && typeof target !== 'number') return;

  if (lenis && typeof lenis.scrollTo === 'function') {
    lenis.scrollTo(el || target, {
      offset: 0,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const targetEl = el || (typeof target === 'string' ? document.querySelector(target) : null);
    if (targetEl && targetEl.scrollIntoView) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }
};

/**
 * Destroys the smooth scroll instance (cleanup).
 */
export const destroySmoothScroll = () => {
  if (lenis) {
    lenis.destroy();
    lenis = null;
  }
  // Remove ticker callback if it was registered
  if (_lenisTicker) {
    try {
      gsap.ticker.remove(_lenisTicker);
    } catch (e) {
      // ignore
    }
    _lenisTicker = null;
  }
};

/**
 * Applies text reveal animations to elements matching the selector.
 * @param {string} selector - CSS selector for text elements.
 */
export const animateText = (selector = '.split-text') => {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  let mm = gsap.matchMedia();

  mm.add({
    isDesktop: "(min-width: 768px)",
    isMobile: "(max-width: 767px)"
  }, (context) => {
    let { isDesktop } = context.conditions;

    elements.forEach((el) => {
      // Revert previous SplitType instance if it exists to avoid nested splitting
      if (el._splitInstance) {
        try {
          el._splitInstance.revert();
        } catch (e) {
          // ignore
        }
        el._splitInstance = null;
      }

      if (isDesktop) {
        // Create SplitType using inline span tags for clean typography flow
        const split = new SplitType(el, { types: 'chars, words', tagName: 'span' });
        el._splitInstance = split;

        if (split.chars && split.chars.length > 0) {
          gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            stagger: 0.02,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          });
        }
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

    return () => {
      elements.forEach((el) => {
        if (el._splitInstance) {
          try {
            el._splitInstance.revert();
          } catch (e) {}
          el._splitInstance = null;
        }
      });
    };
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
 * Enables smooth mouse click-and-drag page scrolling with inertia momentum.
 * Excludes interactive elements (buttons, links, inputs, cards) from triggering drag.
 */
export const initMouseDragScroll = () => {
  let isMouseDown = false;
  let startY = 0;
  let startScrollTop = 0;
  let velocityY = 0;
  let lastY = 0;
  let lastTime = 0;
  let animationFrameId = null;
  let isDragging = false;

  const isInteractiveElement = (target) => {
    if (!target) return false;
    return !!target.closest(
      'a, button, input, textarea, select, label, option, .btn, .custom-cursor, .dock-nav, .term-card, [role="button"], [contenteditable="true"]'
    );
  };

  const onMouseDown = (e) => {
    // Only primary mouse button (left click)
    if (e.button !== 0) return;
    if (isInteractiveElement(e.target)) return;

    isMouseDown = true;
    isDragging = false;
    startY = e.clientY;
    lastY = e.clientY;
    lastTime = performance.now();
    startScrollTop = window.scrollY || document.documentElement.scrollTop;
    velocityY = 0;

    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  const onMouseMove = (e) => {
    if (!isMouseDown) return;

    const currentY = e.clientY;
    const deltaY = startY - currentY;

    if (!isDragging && Math.abs(deltaY) > 4) {
      isDragging = true;
      document.body.classList.add('is-dragging-scroll');
    }

    if (isDragging) {
      const now = performance.now();
      const dt = Math.max(now - lastTime, 1);
      const dy = currentY - lastY;

      velocityY = (dy / dt) * 16;
      lastY = currentY;
      lastTime = now;

      const targetY = startScrollTop + deltaY;

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(targetY, { immediate: true });
      } else {
        window.scrollTo(0, targetY);
      }
    }
  };

  const applyInertia = () => {
    if (Math.abs(velocityY) > 0.5) {
      const step = velocityY;
      velocityY *= 0.90;

      if (lenis && typeof lenis.scrollTo === 'function') {
        lenis.scrollTo(window.scrollY - step * 10, {
          duration: 0.6,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
        velocityY = 0;
      } else {
        window.scrollBy(0, -step);
        animationFrameId = requestAnimationFrame(applyInertia);
      }
    } else {
      velocityY = 0;
      animationFrameId = null;
    }
  };

  const onMouseUp = () => {
    if (!isMouseDown) return;

    isMouseDown = false;
    document.body.classList.remove('is-dragging-scroll');

    if (isDragging) {
      if (Math.abs(velocityY) > 0.5) {
        applyInertia();
      }

      const preventClickOnce = (clickEvent) => {
        clickEvent.stopPropagation();
        clickEvent.preventDefault();
        window.removeEventListener('click', preventClickOnce, true);
      };
      window.addEventListener('click', preventClickOnce, true);
      setTimeout(() => {
        window.removeEventListener('click', preventClickOnce, true);
      }, 50);
    }
  };

  window.addEventListener('mousedown', onMouseDown, { passive: true });
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseup', onMouseUp, { passive: true });
  window.addEventListener('mouseleave', onMouseUp, { passive: true });

  return () => {
    window.removeEventListener('mousedown', onMouseDown);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);
    window.removeEventListener('mouseleave', onMouseUp);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };
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

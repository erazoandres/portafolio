import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import DockNav from './components/DockNav';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ScrollHelper from './components/ScrollHelper';

// Lazy load below-the-fold sections to improve initial load time
const AboutSection = lazy(() => import('./components/AboutSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));
import {
  initSmoothScroll,
  destroySmoothScroll,
  animateText,
  initFloatingPhysics,
  scrollToTarget
} from './script';
import gsap from 'gsap';

/**
 * Root application component.
 * Manages current section tracking via IntersectionObserver
 * and provides smooth scroll navigation.
 */
export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');

  const scrollTo = useCallback((id) => {
    scrollToTarget(`#${id}`);
  }, []);

  // Track scroll progress and Custom Cursor
  useEffect(() => {
    // Initialize Lenis & GSAP ScrollSmoother logic
    initSmoothScroll();

    // Custom Cursor Logic with quickSetter for high-performance tracking
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !follower) return;

    // Mouse Tracking Logic
    let mouseX = 0;
    let mouseY = 0;
    
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");
    const xFollowerSetter = gsap.quickSetter(follower, "x", "px");
    const yFollowerSetter = gsap.quickSetter(follower, "y", "px");

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateFrame = () => {
      // Set CSS variables for background spotlight effect (only once per frame)
      document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

      xSetter(mouseX - 5);
      ySetter(mouseY - 5);
      
      // Follower with a slight lag (LERP-like smoothing via GSAP quickSetter)
      gsap.to(follower, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.4,
        overwrite: 'auto',
        ease: 'power2.out'
      });
    };

    // Use GSAP ticker for synchronized updates with screen refresh rate
    gsap.ticker.add(updateFrame);

    window.addEventListener('mousemove', moveCursor, { passive: true });

    // Initialize text and physics animations after initial render
    setTimeout(() => {
      animateText('.section-heading');
      initFloatingPhysics('.about-icon, .hero-badge');
      // Refresh ScrollTrigger to account for lazy-loaded content
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => ScrollTrigger.refresh());
    }, 500);

    // GSAP ScrollTrigger for Progress Bar (Replacing React state to avoid main thread blocking)
    gsap.to('.scroll-progress-bar', {
      scaleX: 1,
      transformOrigin: 'left center',
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      }
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      gsap.ticker.remove(updateFrame);
      destroySmoothScroll();
    };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-10% 0px -10% 0px', threshold: [0.1, 0.3, 0.5] }
    );

    document.querySelectorAll('.section').forEach((el) => sectionObs.observe(el));

    const handleScrollBoundaries = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (scrollY < 100) {
        setCurrentSection('hero');
      } else if (scrollY > maxScroll - 150) {
        setCurrentSection('contact');
      }
    };

    window.addEventListener('scroll', handleScrollBoundaries, { passive: true });

    return () => {
      sectionObs.disconnect();
      window.removeEventListener('scroll', handleScrollBoundaries);
    };
  }, []);

  return (
    <div className="app-shell">
      <div className="scroll-progress-bar"></div>
      <div className="void-bg">
        <div className="grid-lines"></div>
        <div className="noise-layer"></div>
      </div>

      <div className="custom-cursor"></div>
      <div className="custom-cursor-follower"></div>

      <DockNav currentSection={currentSection} onNavigate={scrollTo} />
      <ScrollHelper currentSection={currentSection} onNavigate={scrollTo} />

      <div className="main-content">
        <HeroSection onNavigate={scrollTo} />
        <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)' }}>Cargando sección...</div>}>
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </Suspense>
        <Footer />
      </div>
    </div>
  );
}

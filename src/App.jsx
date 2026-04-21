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
  initFloatingPhysics
} from './script';
import gsap from 'gsap';

/**
 * Root application component.
 * Manages current section tracking via IntersectionObserver
 * and provides smooth scroll navigation.
 */
export default function App() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Track scroll progress and Custom Cursor
  useEffect(() => {
    // Initialize Lenis & GSAP ScrollSmoother logic
    initSmoothScroll();

    // Custom Cursor Logic
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      gsap.to(follower, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.3
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Initialize text and physics animations after initial render
    setTimeout(() => {
      animateText('.section-heading');
      initFloatingPhysics('.about-icon, .hero-badge');
    }, 100);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', moveCursor);
      destroySmoothScroll();
    };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    document.querySelectorAll('.section').forEach((el) => sectionObs.observe(el));

    return () => sectionObs.disconnect();
  }, []);

  return (
    <div className="app-shell">
      <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
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

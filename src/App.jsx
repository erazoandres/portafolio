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

  // Track scroll progress
  useEffect(() => {
    // Initialize Lenis & GSAP ScrollSmoother logic
    initSmoothScroll();
    
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

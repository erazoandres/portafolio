import { useState, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { heroLinesData } from '../data';
import TerminalCard from './TerminalCard';

const NAME_TEXT = 'Andrés Erazo';
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

/**
 * Hero section with optimized GSAP animations, 
 * interactive glitch name and terminal typing effect.
 */
export default function HeroSection({ onNavigate }) {
  const [glitchedName, setGlitchedName] = useState(NAME_TEXT);
  const [visibleLines, setVisibleLines] = useState([]);
  const containerRef = useRef(null);

  // Optimized Glitch Effect
  const handleGlitch = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setGlitchedName(
        NAME_TEXT.split('')
          .map((letter, index) => {
            if (index < iteration) return NAME_TEXT[index];
            if (letter === ' ') return ' ';
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      if (iteration >= NAME_TEXT.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  }, []);

  useGSAP(() => {
    // Initial reveal animations
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.6 })
      .from('.hero-name', { y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .from('.hero-role', { x: -20, opacity: 0, duration: 0.5 }, '-=0.4')
      .from('.hero-desc', { opacity: 0, y: 10, duration: 1 }, '-=0.2')
      .from('.hero-actions .btn', { 
        y: 20, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: 'power2.out' 
      }, '-=0.6');

    // Terminal typing logic with GSAP (more precise than setTimeouts)
    let lineIndex = 0;
    const typeNextLine = () => {
      if (lineIndex >= heroLinesData.length) return;
      
      const line = heroLinesData[lineIndex];
      setVisibleLines((prev) => [...prev, { ...line, text: '' }]);
      
      const targetText = line.text;
      const proxy = { charCount: 0 };
      
      gsap.to(proxy, {
        charCount: targetText.length,
        duration: targetText.length * (line.type === 'cmd' ? 0.04 : 0.02),
        ease: 'none',
        onUpdate: () => {
          setVisibleLines((prev) => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = {
              ...newLines[newLines.length - 1],
              text: targetText.slice(0, Math.ceil(proxy.charCount)),
            };
            return newLines;
          });
        },
        onComplete: () => {
          lineIndex++;
          gsap.delayedCall(line.type === 'cmd' ? 0.6 : 0.2, typeNextLine);
        }
      });
    };

    gsap.delayedCall(1.2, typeNextLine);
    gsap.delayedCall(0.5, handleGlitch);

  }, { scope: containerRef });

  return (
    <section id="hero" className="section hero" ref={containerRef}>
      <div className="hero-layout">
        <div className="hero-intro">
          <div className="hero-badge">
            <span className="status-dot"></span> Disponible para proyectos
          </div>

          <h1 className="hero-name" onMouseOver={handleGlitch}>
            {glitchedName}
          </h1>

          <p className="hero-role">
            Full Stack Developer <span className="caret">|</span>
          </p>

          <p className="hero-desc">
            Arquitecto de experiencias digitales de alto rendimiento. Especializado en crear interfaces inmersivas que fusionan ingeniería robusta con un diseño visual impecable.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              <i className="fas fa-rocket"></i> Ver proyectos
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate('contact')}>
              <i className="fas fa-terminal"></i> Contactar
            </button>
          </div>
        </div>

        <div className="hero-terminal-wrapper">
          <TerminalCard filename="erazo@portfolio ~ shell" className="hero-terminal">
            {visibleLines.map((line, idx) => (
              <div key={idx} className={`line ${line.type}`}>
                {line.type === 'cmd' && <span className="prompt">❯ </span>}
                <span className={line.type}>{line.text}</span>
                {idx === visibleLines.length - 1 && line.type === 'cmd' && (
                  <span className="cursor-blink">▊</span>
                )}
              </div>
            ))}
          </TerminalCard>
        </div>
      </div>
    </section>
  );
}

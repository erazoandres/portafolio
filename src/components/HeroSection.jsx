import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { heroLinesData } from '../data';
import TerminalCard from './TerminalCard';

const NAME_TEXT = 'Andrés Erazo';

/**
 * Hero section with optimized GSAP animations, 
 * interactive glitch name and terminal typing effect.
 */
export default function HeroSection({ onNavigate }) {
  const [visibleLines, setVisibleLines] = useState([]);
  const [displayedRole, setDisplayedRole] = useState('');
  const ROLE_TEXT = 'Senior Frontend Engineer';
  const containerRef = useRef(null);



  useGSAP(() => {
    // Initial reveal animations
    const tl = gsap.timeline();
    
    tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.6 })
      .from('.hero-name', { y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .to({}, {
        duration: 1.2,
        onUpdate: function() {
          const progress = this.progress();
          const charCount = Math.floor(progress * ROLE_TEXT.length);
          setDisplayedRole(ROLE_TEXT.slice(0, charCount));
        },
        ease: 'none'
      }, '-=0.2')
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

  }, { scope: containerRef });

  return (
    <section id="hero" className="section hero" ref={containerRef}>
      <div className="hero-layout">
        <div className="hero-intro">
          <div className="hero-badge">
            <span className="status-dot"></span> Disponibilidad para proyectos estratégicos
          </div>

          <h1 className="hero-name">
            {NAME_TEXT}
          </h1>

          <p className="hero-role">
            <span className="role-keyword">{displayedRole}</span><span className="caret">|</span>
          </p>

          <p className="hero-desc">
            Especializado en la intersección del diseño premium y la ingeniería de alto rendimiento. Construyo ecosistemas digitales inmersivos, Agentes AI y automatizaciones avanzadas con n8n, Slack y Google Workspace.
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

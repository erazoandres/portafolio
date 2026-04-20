import { useState, useEffect, useRef, useCallback } from 'react';
import { heroLinesData } from '../data';
import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';

const NAME_TEXT = 'Andrés Erazo';
const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

/**
 * Hero section with animated terminal typing effect and glitch name hover.
 */
export default function HeroSection({ onNavigate }) {
  const [glitchedName, setGlitchedName] = useState(NAME_TEXT);
  const [visibleLines, setVisibleLines] = useState([]);

  const glitchIntervalRef = useRef(null);
  const typeTimeoutRef = useRef(null);

  const handleGlitch = useCallback(() => {
    let iteration = 0;
    clearInterval(glitchIntervalRef.current);
    glitchIntervalRef.current = setInterval(() => {
      setGlitchedName(
        NAME_TEXT.split('')
          .map((letter, index) => {
            if (index < iteration) return NAME_TEXT[index];
            if (letter === ' ') return ' ';
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );
      if (iteration >= NAME_TEXT.length) clearInterval(glitchIntervalRef.current);
      iteration += 1 / 3;
    }, 30);
  }, []);

  useEffect(() => {
    let lineIndex = 0;
    let isCancelled = false;

    const typeLines = () => {
      if (isCancelled || lineIndex >= heroLinesData.length) return;
      const line = heroLinesData[lineIndex];
      setVisibleLines((prev) => [...prev, { ...line, text: '' }]);
      const targetText = line.text;
      let charIdx = 0;

      const typeChar = () => {
        if (isCancelled) return;
        if (charIdx < targetText.length) {
          setVisibleLines((prev) => {
            const newLines = [...prev];
            newLines[newLines.length - 1] = {
              ...newLines[newLines.length - 1],
              text: targetText.slice(0, charIdx + 1),
            };
            return newLines;
          });
          charIdx++;
          typeTimeoutRef.current = setTimeout(typeChar, line.type === 'cmd' ? 40 : 15);
        } else {
          lineIndex++;
          typeTimeoutRef.current = setTimeout(typeLines, line.type === 'cmd' ? 600 : 200);
        }
      };
      typeChar();
    };

    typeTimeoutRef.current = setTimeout(typeLines, 800);
    setTimeout(handleGlitch, 500);

    return () => {
      isCancelled = true;
      clearTimeout(typeTimeoutRef.current);
      clearInterval(glitchIntervalRef.current);
    };
  }, [handleGlitch]);

  return (
    <section id="hero" className="section hero">
      <div className="hero-layout">
        <div className="hero-intro">
          <FadeIn className="hero-badge">
            <span className="status-dot"></span> Disponible para proyectos
          </FadeIn>

          <FadeIn as="h1" className="hero-name" onMouseOver={handleGlitch}>
            {glitchedName}
          </FadeIn>

          <FadeIn as="p" className="hero-role">
            Full Stack Developer <span className="caret">|</span>
          </FadeIn>

          <FadeIn as="p" className="hero-desc">
            Soy quien te ayuda a darle vida a ese proyecto que tienes en mente. Código limpio,
            diseño de impacto.
          </FadeIn>

          <FadeIn className="hero-actions">
            <button className="btn btn-primary" onClick={() => onNavigate('projects')}>
              <i className="fas fa-rocket"></i> Ver proyectos
            </button>
            <button className="btn btn-ghost" onClick={() => onNavigate('contact')}>
              <i className="fas fa-terminal"></i> Contactar
            </button>
          </FadeIn>
        </div>

        <FadeIn>
          <TerminalCard filename="erazo@portfolio ~ shell" className="hero-terminal">
            {visibleLines.map((line, idx) => (
              <div key={idx} className={`line ${line.type}`}>
                {line.type === 'cmd' && <span className="prompt">❯ </span>}
                {line.type === 'cmd' ? (
                  <span className="cmd">{line.text}</span>
                ) : (
                  <span>{line.text}</span>
                )}
                {idx === visibleLines.length - 1 && line.type === 'cmd' && (
                  <span className="caret" style={{ color: 'var(--accent)' }}>
                    ▊
                  </span>
                )}
              </div>
            ))}
          </TerminalCard>
        </FadeIn>
      </div>
    </section>
  );
}

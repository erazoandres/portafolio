import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'contact'];

export default function ScrollHelper({ currentSection, onNavigate }) {
  const currentIndex = SECTIONS.indexOf(currentSection);
  const nextSection = SECTIONS[currentIndex + 1];

  if (!nextSection) return null;

  return (
    <div className="premium-scroll-wrapper">
      <button 
        className="premium-scroll-btn"
        onClick={() => onNavigate(nextSection)}
        aria-label="Siguiente sección"
      >
        <span className="premium-scroll-text">SCROLL</span>
        <div className="premium-scroll-track">
          <div className="premium-scroll-dot"></div>
        </div>
      </button>
    </div>
  );
}

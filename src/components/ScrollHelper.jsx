import { useState, useEffect } from 'react';

const SECTIONS = ['hero', 'about', 'projects', 'skills', 'contact'];

export default function ScrollHelper({ currentSection, onNavigate }) {
  const currentIndex = SECTIONS.indexOf(currentSection);
  const isLast = currentIndex === SECTIONS.length - 1;
  const isFirst = currentIndex === 0;

  // Shortcut logic: Top -> End, End -> Top. Middle -> Next.
  let nextTarget;
  let label;
  
  if (isFirst) {
    nextTarget = SECTIONS[SECTIONS.length - 1];
    label = "SALTA AL FINAL";
  } else if (isLast) {
    nextTarget = SECTIONS[0];
    label = "VOLVER AL INICIO";
  } else {
    nextTarget = SECTIONS[currentIndex + 1];
    label = "CONTINUAR";
  }

  return (
    <div className="premium-scroll-wrapper">
      <button 
        className={`premium-scroll-btn ${isLast ? 'is-up' : 'is-down'}`}
        onClick={() => onNavigate(nextTarget)}
        aria-label={label}
      >
        <span className="premium-scroll-text">
          {label}
        </span>
        <div className="premium-scroll-track">
          <div className="premium-scroll-dot"></div>
        </div>
      </button>
    </div>
  );
}

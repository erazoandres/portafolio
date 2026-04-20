import React from 'react';
import { sectionsNav } from '../data';

/**
 * macOS-style dock navigation bar that sticks to the bottom of the viewport.
 * Highlights the currently active section.
 */
export default function DockNav({ currentSection, onNavigate }) {
  return (
    <nav className="dock-nav" id="dock-navigation">
      {sectionsNav.map((item, i) => (
        <React.Fragment key={item.id}>
          <button
            className={`dock-item ${currentSection === item.id ? 'active' : ''}`}
            onClick={() => onNavigate(item.id)}
            aria-label={item.label}
          >
            <i className={item.icon}></i>
            <span className="dock-tooltip">{item.label}</span>
          </button>
          {i === 0 && <div className="dock-divider"></div>}
        </React.Fragment>
      ))}
      <div className="dock-divider"></div>
      <a
        href="https://github.com/erazoandres"
        target="_blank"
        rel="noreferrer"
        className="dock-item"
        aria-label="GitHub"
      >
        <i className="fab fa-github"></i>
        <span className="dock-tooltip">GitHub</span>
      </a>
    </nav>
  );
}

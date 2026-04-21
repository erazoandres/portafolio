import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { projectsData } from '../data';

/**
 * Projects section — compact grid of project cards with hover interactions.
 * Each card shows both Demo and GitHub links, matching the live portfolio.
 */
export default function ProjectsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.compact-project', {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });
  }, { scope: containerRef });

  return (
    <section id="projects" className="section" ref={containerRef}>
      <span className="section-label">projects</span>
      <h2 className="section-heading">Lo que he construido</h2>

      <div className="projects-compact-grid stagger-children">
        {projectsData.map((project) => (
          <div key={project.title} className="term-card compact-project">
            <div className="term-header">
              <div className="term-dots">
                <span></span><span></span><span></span>
              </div>
              <span className="term-filename">{project.file}</span>
            </div>
            
            <div className="project-bg-wrap">
              <div
                className="project-bg"
                style={{ backgroundImage: `url('${project.image}')` }}
              ></div>
              <div className="project-overlay">
                 <div className="project-overlay-content">
                    <span className="view-text">Ver Proyecto</span>
                    <i className="fas fa-arrow-right"></i>
                 </div>
              </div>
            </div>

            <div className="term-body">
              <div className="project-title-row">
                <h3>{project.title}</h3>
                <div className="project-links">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn"
                      aria-label={`Demo de ${project.title}`}
                      title="Ver Demo"
                    >
                      <i className="fas fa-external-link-alt"></i>
                      <span>Demo</span>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="project-link-btn project-link-btn--ghost"
                      aria-label={`GitHub de ${project.title}`}
                      title="Ver en GitHub"
                    >
                      <i className="fab fa-github"></i>
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
              <p>{project.desc}</p>
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


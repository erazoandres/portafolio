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
    gsap.from('.project-item', {
      y: 60,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      }
    });
  }, { scope: containerRef });

  return (
    <section id="projects" className="section" ref={containerRef}>
      <span className="section-label">Selected Works</span>
      <h2 className="section-heading">Proyectos destacados</h2>

      <div className="projects-showcase">
        {projectsData.map((project, index) => (
          <div key={project.title} className="project-item">
            <div className="project-image-container">
              <img src={project.image} alt={project.title} loading="lazy" />
            </div>
            
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>

              <div className="project-actions">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Ver Proyecto Live
                  </a>
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


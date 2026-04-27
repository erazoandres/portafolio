import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { projectsData } from '../data';

/**
 * Projects section — compact grid of project cards with hover interactions.
 * Each card shows both Demo and GitHub links, matching the live portfolio.
 */
export default function ProjectsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scopeElement = containerRef.current;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.project-item');
      if (!items || items.length === 0) return;

      const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;

      // Animate the entire grid with softer values
      gsap.from(items, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: scopeElement,
          start: 'top 75%',
        }
      });

      // Parallax only on desktop and when motion is allowed
      if (!prefersReduced && isDesktop) {
        items.forEach((item) => {
          const img = item.querySelector('img');
          if (img) {
            gsap.to(img, {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            });
          }
        });
      }
    }, scopeElement);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="section" ref={containerRef}>
      <span className="section-label">Proyectos Realizados</span>
      <h2 className="section-heading">Showcase de trabajos</h2>

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


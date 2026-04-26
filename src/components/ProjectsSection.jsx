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
    const items = gsap.utils.toArray('.project-item');
    
    items.forEach((item, i) => {
      const isEven = i % 2 === 0;
      const img = item.querySelector('.project-image-container');
      const content = item.querySelector('.project-content');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      tl.from(img, {
        x: isEven ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      })
      .from(content.children, {
        x: isEven ? 50 : -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.8');
      
      // Add subtle parallax to the image while scrolling
      gsap.to(img.querySelector('img'), {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: item,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, { scope: containerRef });

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


import { projectsData } from '../data';
import FadeIn from './FadeIn';

/**
 * Projects section — compact grid of project cards with hover-reveal backgrounds.
 * Uses custom card structure (not TerminalCard) because projects need
 * a background image layer between the header and body.
 */
export default function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <FadeIn as="span" className="section-label">projects</FadeIn>
      <FadeIn as="h2" className="section-heading">Lo que he construido</FadeIn>

      <div className="projects-compact-grid stagger-children">
        {projectsData.map((project) => (
          <FadeIn key={project.title}>
            <div className="term-card compact-project">
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
              </div>
              <div className="term-body">
                <div className="project-title-row">
                  <h3>{project.title}</h3>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" aria-label={`Ver ${project.title}`}>
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  )}
                </div>
                <p>{project.desc}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

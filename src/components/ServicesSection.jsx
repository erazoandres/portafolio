import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';
import { servicesData } from '../data';

/**
 * Services section — presents core offerings as terminal-style cards.
 */
export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <FadeIn as="span" className="section-label">Servicios</FadeIn>
      <FadeIn as="h2" className="section-heading">Soluciones digitales para crecer</FadeIn>
      <FadeIn as="p" className="section-desc">
        Ofrezco soluciones completas: desde páginas que convierten hasta portales empresariales
        y automatizaciones que liberan tiempo al equipo. Trabajo con diseño premium y entrega orientada a negocio.
      </FadeIn>

      <div className="services-grid bento-grid stagger-children">
        {servicesData.map((svc) => (
          <FadeIn key={svc.title}>
            <TerminalCard filename={svc.file} className="service-card">
              <div className="service-icon">
                <i className={svc.icon} aria-hidden="true"></i>
              </div>
              <h3>{svc.title}</h3>
              <p className="service-tagline">{svc.tagline}</p>
              <p>{svc.desc}</p>

              <div className="service-actions">
                <a href="#contact" className="btn btn-primary">{svc.cta}</a>
                {svc.projectsLink && (
                  <a href={svc.projectsLink} target="_blank" rel="noreferrer" className="btn btn-ghost">Ver proyectos</a>
                )}
              </div>
            </TerminalCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

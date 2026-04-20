import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';

/**
 * About section — three terminal cards showing History, Focus, and Education.
 */
export default function AboutSection() {
  return (
    <section id="about" className="section">
      <FadeIn as="span" className="section-label">about</FadeIn>
      <FadeIn as="h2" className="section-heading">Conóceme</FadeIn>
      <FadeIn as="p" className="section-desc">
        Desarrollador con mentalidad de producto. Código funcional y experiencias memorables.
      </FadeIn>

      <div className="bento-grid bento-grid-3 stagger-children">
        <FadeIn>
          <TerminalCard filename="history.ts">
            <div className="about-icon">
              <i className="fas fa-terminal"></i>
            </div>
            <h3>Mi Historia</h3>
            <p>
              Más de 5 años construyendo experiencias web. Empecé con curiosidad, ahora es pasión.
              Especializado en React, Node.js y diseño UI/UX.
            </p>
          </TerminalCard>
        </FadeIn>

        <FadeIn>
          <TerminalCard filename="focus.json">
            <div className="about-icon">
              <i className="fas fa-code-branch"></i>
            </div>
            <h3>Mi Enfoque</h3>
            <p>
              Diseño centrado en el usuario, código limpio y soluciones escalables. Diseño premium y
              rendimiento excepcional.
            </p>
          </TerminalCard>
        </FadeIn>

        <FadeIn>
          <TerminalCard filename="education.log">
            <div className="about-icon">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3>Educación</h3>
            <div className="edu-list">
              <div className="edu-item">
                <span className="degree">Ing. en Sistemas</span>
                <span className="school">Univ. Javeriana Cali</span>
              </div>
              <div className="edu-item">
                <span className="degree">Full Stack Web</span>
                <span className="school">Talento TECH</span>
              </div>
              <div className="edu-item">
                <span className="degree">Android Mobile Dev</span>
                <span className="school">U. Sergio Arboleda</span>
              </div>
            </div>
          </TerminalCard>
        </FadeIn>
      </div>
    </section>
  );
}

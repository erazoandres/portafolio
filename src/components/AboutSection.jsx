import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';
import { achievementsData } from '../data';

/**
 * About section — four terminal cards: History, Focus, Education, and Achievements.
 */
export default function AboutSection() {
  return (
    <section id="about" className="section">
      <FadeIn as="span" className="section-label">about</FadeIn>
      <FadeIn as="h2" className="section-heading">Conóceme</FadeIn>
      <FadeIn as="p" className="section-desc">
      </FadeIn>

      <div className="bento-grid bento-grid-3 stagger-children">
        <FadeIn>
          <TerminalCard filename="history.ts">
            <div className="about-icon">
              <i className="fas fa-terminal"></i>
            </div>
            <h3>Mi Historia</h3>
            <p>
Más de 10 años convirtiendo ideas en productos digitales que la gente disfruta usar. Trabajo con fundadores, empresas y equipos que saben lo que quieren lograr, pero necesitan a alguien que lo haga realidad — con criterio, con calidad y sin vueltas. Si tu producto tiene que verse bien y funcionar mejor, estás en el lugar correcto. 
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
             No entrego código, entrego resultados. Cada proyecto arranca entendiendo el negocio detrás: quién es el usuario, qué necesita y cómo tu producto puede ganar su confianza desde el primer clic. Diseño premium, rendimiento sólido y entregas que no necesitan retrabajo. Así es como trabajo — y por eso mis clientes vuelven.
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

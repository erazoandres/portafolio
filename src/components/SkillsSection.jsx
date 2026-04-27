import { skillGroupsData, productionStackData } from '../data';
import FadeIn from './FadeIn';
import TerminalCard from './TerminalCard';

/**
 * Skills section — bento grid of skill group terminal cards with badge dots.
 */
export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <FadeIn as="span" className="section-label">Skills</FadeIn>


      <div className="bento-grid bento-grid-skills stagger-children">
        {/* Primary Stack Card removed per request */}

        {skillGroupsData.map((group) => (
          <FadeIn key={group.file}>
            <TerminalCard filename={group.file} className="skills-card">
              {group.skills.map((skill) => (
                <div className="modern-badge" key={skill.name}>
                  <span className="badge-dot"></span> {skill.name}
                </div>
              ))}
            </TerminalCard>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

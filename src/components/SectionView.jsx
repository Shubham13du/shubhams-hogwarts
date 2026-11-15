import { useEffect, useRef } from 'react';
import { PROFILE } from '../data/content';
import AboutSection from './sections/AboutSection';
import JourneySection from './sections/JourneySection';
import AchievementsSection from './sections/AchievementsSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import ContactSection from './sections/ContactSection';
import './SectionView.css';
import './sections/sections.css';

const SECTION_COMPONENTS = {
  about: AboutSection,
  journey: JourneySection,
  achievements: AchievementsSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  contact: ContactSection,
};

// Full-screen "archive": a parchment that unrolls to reveal one portfolio section.
export default function SectionView({ section, phase, busy, onClose }) {
  const backRef = useRef(null);
  const Body = SECTION_COMPONENTS[section.id];

  useEffect(() => {
    backRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      className={`archive archive--${section.id}${phase === 'closing' ? ' is-closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="archive-title"
    >
      <div
        className="archive__backdrop"
        style={PROFILE.heroImageSrc ? { backgroundImage: `url(${PROFILE.heroImageSrc})` } : undefined}
      />
      <div className="archive__tint" />

      <div className="parchment">
        <span className="parchment__rod parchment__rod--top" aria-hidden="true" />
        <span className="parchment__rod parchment__rod--bottom" aria-hidden="true" />

        <div className="parchment__paper">
          <div className="archive__bar">
            <button
              type="button"
              className="archive__back"
              onClick={onClose}
              aria-disabled={busy || undefined}
              ref={backRef}
            >
              <span aria-hidden="true">←</span> Return to Hogwarts
            </button>
            <span className="archive__crumb" aria-hidden="true">
              {section.icon} {section.label}
            </span>
          </div>

          <div className="archive__scroll">
            <div className="archive__inner">
              <header className="archive__header">
                <p className="eyebrow reveal" style={{ '--i': 0 }}>{section.label}</p>
                <h2 id="archive-title" className="archive__title reveal" style={{ '--i': 1 }}>
                  {section.title}
                </h2>
                <p className="archive__subtitle reveal" style={{ '--i': 2 }}>{section.subtitle}</p>
                <div className="archive__divider reveal" style={{ '--i': 3 }} aria-hidden="true">
                  <span />
                  <i>✦</i>
                  <span />
                </div>
              </header>

              {Body && <Body />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
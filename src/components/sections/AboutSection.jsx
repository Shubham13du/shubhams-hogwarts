import { ABOUT } from '../../data/content';

export default function AboutSection() {
  return (
    <div className="about">
      <div className="about__grid">
        <div className="about__story">
          {ABOUT.intro.map((paragraph, i) => (
            <p key={i} className="about__para reveal" style={{ '--i': 4 + i }}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className="sheet reveal" style={{ '--i': 5 }} aria-label="Quick facts">
          <h3 className="sheet__title">Character Sheet</h3>
          <dl className="sheet__list">
            {ABOUT.facts.map((fact) => (
              <div className="sheet__row" key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <h3 className="block-title reveal" style={{ '--i': 6 }}>What makes me, me</h3>
      <div className="pillars">
        {ABOUT.pillars.map((pillar, i) => (
          <article className="pillar reveal" style={{ '--i': 7 + i }} key={pillar.title}>
            <span className="pillar__icon" aria-hidden="true">{pillar.icon}</span>
            <h4 className="pillar__title">{pillar.title}</h4>
            <p>{pillar.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
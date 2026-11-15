import { SKILLS } from '../../data/content';

export default function SkillsSection() {
  return (
    <div className="arsenal">
      {SKILLS.categories.map((category, i) => (
        <section
          key={category.id}
          className={`shelf reveal${category.learning ? ' is-learning' : ''}`}
          data-cat={category.id}
          style={{ '--i': 4 + i }}
        >
          <header className="shelf__head">
            <span className="shelf__icon" aria-hidden="true">{category.icon}</span>
            <h3 className="shelf__name">{category.name}</h3>
            {category.learning && (
              <span className="shelf__badge">
                <i aria-hidden="true" />
                In progress
              </span>
            )}
          </header>
          <ul className="rune-list">
            {category.items.map((skill) => (
              <li className="rune" key={skill}>
                <i className="rune__gem" aria-hidden="true" />
                {skill}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
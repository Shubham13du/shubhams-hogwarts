// Renders the body of a modal based on its content type (see data/content.js).
export default function SectionContent({ content }) {
  switch (content.type) {
    case 'text':
      return (
        <div className="content-text">
          {content.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      );

    case 'timeline':
      return (
        <ol className="timeline">
          {content.entries.map((entry, i) => (
            <li className="timeline__item" key={i}>
              <p className="timeline__when">{entry.when}</p>
              <h3 className="timeline__heading">{entry.heading}</h3>
              <p className="timeline__text">{entry.text}</p>
            </li>
          ))}
        </ol>
      );

    case 'list':
      return (
        <ul className="content-list">
          {content.items.map((item, i) => (
            <li key={i}>
              <h3 className="content-list__heading">{item.heading}</h3>
              <p className="content-list__text">{item.text}</p>
            </li>
          ))}
        </ul>
      );

    case 'skills':
      return (
        <div>
          {content.groups.map((group) => (
            <div className="skill-group" key={group.name}>
              <h3 className="skill-group__name">{group.name}</h3>
              <ul className="chips">
                {group.items.map((skill) => (
                  <li className="chip" key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case 'projects':
      return (
        <div className="projects">
          {content.projects.map((project) => (
            <article className="project" key={project.name}>
              <h3 className="project__name">{project.name}</h3>
              <p className="project__text">{project.text}</p>
              <ul className="chips">
                {project.tags.map((tag) => (
                  <li className="chip" key={tag}>{tag}</li>
                ))}
              </ul>
              {project.link && (
                <a className="project__link" href={project.link} target="_blank" rel="noreferrer">
                  View project →
                </a>
              )}
            </article>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div>
          <p className="content-contact__intro">{content.intro}</p>
          <ul className="contact-links">
            {content.links.map((link) => (
              <li key={link.label}>
                <a className="contact-link" href={link.href} target="_blank" rel="noreferrer">
                  <span className="contact-link__label">{link.label}</span>
                  <span className="contact-link__value">{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return null;
  }
}
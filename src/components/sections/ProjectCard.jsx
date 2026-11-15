import MediaSlot from '../MediaSlot';

// Reusable project card. Image, links and status are all optional.
export default function ProjectCard({ project, index = 0 }) {
  const { title, category, status, description, tags = [], image, github, live } = project;

  return (
    <article className="project reveal" style={{ '--i': 4 + index }}>
      <MediaSlot
        src={image}
        alt={`${title} preview`}
        label={`${title} preview`}
        hint="Add a screenshot or poster"
      />
      <div className="project__body">
        <div className="project__meta">
          <span className="project__category">{category}</span>
          {status && <span className="project__status">{status}</span>}
        </div>
        <h3 className="project__title">{title}</h3>
        <p className="project__desc">{description}</p>

        {tags.length > 0 && (
          <ul className="tag-list">
            {tags.map((tag) => (
              <li className="tag" key={tag}>{tag}</li>
            ))}
          </ul>
        )}

        {(github || live) && (
          <div className="project__links">
            {github && (
              <a href={github} target="_blank" rel="noreferrer noopener">GitHub ↗</a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer noopener">Live site ↗</a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
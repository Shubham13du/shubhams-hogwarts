import { JOURNEY } from '../../data/content';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default function JourneySection() {
  return (
    <ol className="journey">
      {JOURNEY.entries.map((entry, i) => (
        <li
          key={entry.id}
          className={`journey__item reveal${entry.current ? ' is-current' : ''}`}
          style={{ '--i': 4 + i }}
        >
          <div className="journey__card">
            <p className="journey__chapter">
              Chapter {ROMAN[i] ?? i + 1} · {entry.kind}
            </p>
            <h3 className="journey__title">{entry.title}</h3>
            <p className={`journey__period${entry.period ? '' : ' is-placeholder'}`}>
              {entry.period ?? 'Add years in content.js'}
            </p>
            <p className="journey__text">{entry.text}</p>
          </div>
          <span className="journey__node" aria-hidden="true" />
        </li>
      ))}
    </ol>
  );
}
import CharacterQuiz from './quiz/CharacterQuiz';
import MagicName from './name/MagicName';

export function OwlIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M32 8c-9 0-16 7-16 16v14c0 9 7 16 16 16s16-7 16-16V24c0-9-7-16-16-16z" fill="currentColor" />
      <path d="M16 30c-6 2-10 8-10 16 6-1 11-4 14-9z" fill="currentColor" opacity="0.7" />
      <path d="M48 30c6 2 10 8 10 16-6-1-11-4-14-9z" fill="currentColor" opacity="0.7" />
      <circle cx="25" cy="26" r="7" fill="#f1e4c3" />
      <circle cx="39" cy="26" r="7" fill="#f1e4c3" />
      <circle cx="25" cy="26" r="3" fill="#1b110b" />
      <circle cx="39" cy="26" r="3" fill="#1b110b" />
      <path d="M32 30l-3 6h6z" fill="#d4af37" />
      <path d="M20 10l4 6M44 10l-4 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default function DestinationPanel({ destinationId }) {
  if (destinationId === 'character') {
    return (
      <div className="panel panel--quiz" key="character">
        <p className="eyebrow">Destination one</p>
        <h3 className="panel__title gold-text">Know Your Character</h3>
        <p className="panel__text">
          Six questions, four choices each. Answer honestly and the wizarding world will tell you
          who you are most like.
        </p>

        <CharacterQuiz />
      </div>
    );
  }

  if (destinationId === 'name') {
    return (
      <div className="panel panel--name" key="name">
        <p className="eyebrow">Destination two</p>
        <h3 className="panel__title gold-text">The Magic Within My Name</h3>

        <MagicName />
      </div>
    );
  }

  return (
    <div className="panel panel--empty">
      <OwlIcon className="panel__owl" />
      <p>Choose a glowing seal on the map to begin your journey.</p>
    </div>
  );
}
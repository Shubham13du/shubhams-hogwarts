// The card that opens when a letter is selected.
// The `reveal` value from the data picks its entrance animation.
export default function LetterDetail({ item, index, total, onPrevious, onNext }) {
  const isThematic = item.matchType === 'thematic';

  return (
    <article
      className={`magic-detail magic-reveal--${item.reveal}`}
      style={{ '--a': item.accent }}
      aria-label={`Letter ${item.letter}: ${item.character}`}
    >
      <div className="magic-detail__ghost" aria-hidden="true">{item.letter}</div>

      <div className="magic-detail__inner">
        <div className="magic-detail__top">
          <span className="magic-detail__letter" aria-hidden="true">{item.letter}</span>
          <span className="magic-detail__symbol" aria-hidden="true">{item.symbol}</span>
        </div>

        <div className="magic-detail__body">
          <p className="eyebrow magic-detail__eyebrow">
            Letter {index + 1} of {total}
          </p>
          <h4 className="magic-detail__character">{item.character}</h4>
          <p className="magic-detail__trait">{item.trait}</p>

          <p className={`magic-detail__match${isThematic ? ' is-thematic' : ''}`}>
            {isThematic ? 'Thematic match' : 'Initial match'}
            {item.matchNote ? ` · ${item.matchNote}` : ''}
          </p>

          <p className="magic-detail__text">{item.description}</p>

          <ul className="chips chips--dark magic-detail__traits">
            {item.traits.map((trait) => (
              <li className="chip" key={trait}>{trait}</li>
            ))}
          </ul>

          <div className="magic-detail__nav">
            <button type="button" className="btn-gold" onClick={onPrevious}>
              ← Previous letter
            </button>
            <button type="button" className="btn-gold" onClick={onNext}>
              Next letter →
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
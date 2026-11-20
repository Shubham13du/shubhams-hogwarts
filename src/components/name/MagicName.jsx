
import { useRef, useState } from 'react';
import { MAGIC_NAME } from '../../data/nameLetters';
import {
  CHARACTER_LETTERS,
  CHARACTER_POOLS,
  MAGIC_ACCENTS,
  MAGIC_REVEALS,
} from '../../data/characterLetters';
import { prefersReducedMotion } from '../../utils/motion';
import MagicBurst from '../MagicBurst';
import LetterTile from './LetterTile';
import LetterDetail from './LetterDetail';
import './MagicName.css';
import { updateVisitorJourney } from '../../utils/visitorJourney';

const ORIGINAL_NAME = 'SHUBHAM';
const SYMBOLS = ['✦', '📖', '🌱', '🧭', '⚡', '🕯️', '✨'];

function createLetters(name) {
  // Keep the handcrafted SHUBHAM sequence and its original descriptions.
  if (name === ORIGINAL_NAME) return MAGIC_NAME.letters;

  const seen = {};
  return [...name].map((letter, index) => {
    const characterData = CHARACTER_LETTERS[letter];
    const pool = CHARACTER_POOLS[letter] || [];
    const occurrence = seen[letter] || 0;
    seen[letter] = occurrence + 1;
    const character = pool.length
      ? pool[occurrence % pool.length]
      : characterData.character;

    return {
      id: `${letter.toLowerCase()}-${index}`,
      letter,
      character,
      matchType: 'initial',
      matchNote: `A Harry Potter character beginning with ${letter}`,
      trait: characterData.trait,
      traits: characterData.traits,
      symbol: characterData.symbol || SYMBOLS[index % SYMBOLS.length],
      description: characterData.description,
      accent: MAGIC_ACCENTS[index % MAGIC_ACCENTS.length],
      reveal: MAGIC_REVEALS[index % MAGIC_REVEALS.length],
    };
  });
}

export default function MagicName() {
  const [nameInput, setNameInput] = useState('');
  const [activeName, setActiveName] = useState(ORIGINAL_NAME);
  const [selected, setSelected] = useState(null);
  const [discovered, setDiscovered] = useState(
    () => Array(MAGIC_NAME.letters.length).fill(false)
  );
  const [bursts, setBursts] = useState([]);

  const tileRefs = useRef([]);
  const burstCounter = useRef(0);

  const letters = createLetters(activeName);
  const TOTAL = letters.length;
  const discoveredCount = discovered.filter(Boolean).length;
  const allDiscovered = discoveredCount === TOTAL;

  const startName = (event) => {
    event.preventDefault();

    const cleanName = nameInput
      .trim()
      .toUpperCase()
      .replace(/[^A-Z]/g, '')
      .slice(0, 12);

    if (cleanName.length < 2) return;

    setActiveName(cleanName);
    updateVisitorJourney({ nameExplored: nameInput.trim().replace(/[^a-zA-Z]/g, '').slice(0, 12), nameCharacters: createLetters(cleanName).map((item) => item.character) });
    setSelected(null);
    setDiscovered(Array(cleanName.length).fill(false));
    setBursts([]);
    tileRefs.current = [];
  };

  const select = (index) => {
    const completesSet =
      !allDiscovered &&
      discovered.every((seen, i) => seen || i === index);

    setSelected(index);

    setDiscovered((previous) =>
      previous.map((seen, i) => (i === index ? true : seen))
    );

    if (completesSet && !prefersReducedMotion()) {
      const rect = tileRefs.current[index]?.getBoundingClientRect();

      if (rect) {
        burstCounter.current += 1;

        setBursts((list) => [
          ...list,
          {
            id: burstCounter.current,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          },
        ]);
      }
    }
  };

  const goPrevious = () => {
    if (selected === null) return;
    select((selected - 1 + TOTAL) % TOTAL);
  };

  const goNext = () => {
    if (selected === null) return;
    select((selected + 1) % TOTAL);
  };

  const startOver = () => {
    setSelected(null);
    setActiveName(ORIGINAL_NAME);
    setNameInput('');
    setDiscovered(Array(MAGIC_NAME.letters.length).fill(false));
    setBursts([]);
    tileRefs.current = [];
  };

  const handleRowKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;

    const focusedIndex = tileRefs.current.indexOf(document.activeElement);

    if (focusedIndex === -1) return;

    event.preventDefault();

    const step = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (focusedIndex + step + TOTAL) % TOTAL;

    select(nextIndex);
    tileRefs.current[nextIndex]?.focus();
  };

  const removeBurst = (id) => {
    setBursts((list) => list.filter((burst) => burst.id !== id));
  };

  return (
    <div className="magic">
      <p className="magic__intro">
        {activeName === ORIGINAL_NAME
          ? MAGIC_NAME.intro
          : `Discover the hidden magic within ${activeName}. Each letter holds a different quality.`}
      </p>

      <form className="magic__name-form" onSubmit={startName}>
        <label htmlFor="magic-name-input">
          Discover the magic in your name
        </label>

        <div className="magic__name-controls">
          <input
            id="magic-name-input"
            type="text"
            value={nameInput}
            onChange={(event) =>
              setNameInput(
                event.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 12)
              )
            }
            placeholder="Enter your name..."
            maxLength={12}
            autoComplete="given-name"
          />

          <button
            type="submit"
            className="btn-gold"
            disabled={nameInput.trim().length < 2}
          >
            Reveal my magic ✦
          </button>
        </div>

        <p className="magic__hint">Use 2–12 letters, A to Z.</p>
      </form>

      <p className="magic__count" aria-live="polite">
        Letters revealed: {discoveredCount} of {TOTAL}
      </p>

      <div
        className="magic__bar"
        role="progressbar"
        aria-label="Letters revealed"
        aria-valuemin={0}
        aria-valuemax={TOTAL}
        aria-valuenow={discoveredCount}
      >
        <div
          className="magic__bar-fill"
          style={{ width: `${(discoveredCount / TOTAL) * 100}%` }}
        />
      </div>

      <div
        className="magic__letters"
        role="group"
        aria-label={`The letters of ${activeName}`}
        onKeyDown={handleRowKeyDown}
      >
        {letters.map((item, index) => (
          <LetterTile
            key={item.id}
            item={item}
            index={index}
            total={TOTAL}
            selected={selected === index}
            discovered={discovered[index]}
            onSelect={() => select(index)}
            buttonRef={(element) => {
              tileRefs.current[index] = element;
            }}
          />
        ))}
      </div>

      {selected === null ? (
        <p className="magic__prompt">
          {activeName === ORIGINAL_NAME
            ? MAGIC_NAME.prompt
            : 'Tap any letter to reveal its magic.'}
        </p>
      ) : (
        <LetterDetail
          key={letters[selected].id}
          item={letters[selected]}
          index={selected}
          total={TOTAL}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      )}

      {allDiscovered && (
        <section className="magic-finale" aria-labelledby="magic-finale-title">
          <h4
            id="magic-finale-title"
            className="magic-finale__title gold-text"
          >
            {activeName === ORIGINAL_NAME
              ? MAGIC_NAME.finaleTitle
              : `The magic within ${activeName}`}
          </h4>

          <ul className="magic-finale__letters">
            {letters.map((item) => (
              <li
                key={item.id}
                className="magic-finale__letter"
                style={{ '--a': item.accent }}
              >
                <span className="magic-finale__char">{item.letter}</span>
                <span
                  className="magic-finale__symbol"
                  aria-hidden="true"
                >
                  {item.symbol}
                </span>
              </li>
            ))}
          </ul>

          <p className="magic-finale__text">
            {activeName === ORIGINAL_NAME
              ? MAGIC_NAME.finale
              : `Your name brings together ${[
                  ...new Set(
                    letters.map((item) => item.trait.toLowerCase())
                  ),
                ].join(', ')}. These are the qualities that make your name uniquely yours.`}
          </p>

          <button
            type="button"
            className="btn-gold"
            onClick={startOver}
          >
            Explore another name
          </button>
        </section>
      )}

      {bursts.map((burst) => (
        <MagicBurst
          key={burst.id}
          x={burst.x}
          y={burst.y}
          onDone={() => removeBurst(burst.id)}
        />
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';
import { HOUSES } from '../../data/quizData';
import { prefersReducedMotion } from '../../utils/motion';
import MagicBurst from '../MagicBurst';
import CharacterPortrait from './CharacterPortrait';

export default function QuizResult({ result, onRetake }) {
  const { winner, runnersUp } = result;
  const house = HOUSES[winner.house];

  const rootRef = useRef(null);
  const headingRef = useRef(null);
  const portraitRef = useRef(null);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    rootRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });

    // Golden particle reveal over the portrait (skipped for reduced motion).
    if (reduced) return undefined;

    const fire = (id) => {
      const rect = portraitRef.current?.getBoundingClientRect();
      if (!rect) return;
      setBursts((list) => [
        ...list,
        { id, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      ]);
    };

    const timers = [window.setTimeout(() => fire(1), 600), window.setTimeout(() => fire(2), 950)];
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const removeBurst = (id) => setBursts((list) => list.filter((burst) => burst.id !== id));

  return (
    <section
      ref={rootRef}
      className="result"
      style={{ '--c1': house.colors[0], '--c2': house.colors[1] }}
      aria-labelledby="quiz-result-name"
    >
      <div className="result__portrait" ref={portraitRef}>
        <CharacterPortrait key={winner.id} character={winner} house={house} />
      </div>

      <div className="result__body">
        <p className="eyebrow">Your character is</p>
        <h4 id="quiz-result-name" className="result__name gold-text" tabIndex={-1} ref={headingRef}>
          {winner.name}
        </h4>
        <p className="result__house">{house.label} House</p>
        <p className="result__description">{winner.description}</p>

        <ul className="chips chips--dark result__traits">
          {winner.traits.map((trait) => (
            <li className="chip" key={trait}>{trait}</li>
          ))}
        </ul>

        <p className="result__message">✦ {winner.message}</p>

        {runnersUp.length > 0 && (
          <p className="result__echo">
            Also echoes of {runnersUp.map((character) => character.name).join(' and ')}.
          </p>
        )}

        <button type="button" className="btn-gold result__retake" onClick={onRetake}>
          Retake Quiz
        </button>
      </div>

      {bursts.map((burst) => (
        <MagicBurst
          key={burst.id}
          x={burst.x}
          y={burst.y}
          onDone={() => removeBurst(burst.id)}
        />
      ))}
    </section>
  );
}
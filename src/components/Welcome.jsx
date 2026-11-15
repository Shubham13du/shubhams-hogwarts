import { Fragment } from 'react';
import { PROFILE } from '../data/content';
import useReveal from '../hooks/useReveal';
import './Welcome.css';

export default function Welcome() {
  const [ref, visible] = useReveal({ threshold: 0.4 });
  const words = ['Welcome', 'to', `${PROFILE.name}'s`, 'Hogwarts'];

  return (
    <section
      id="welcome"
      ref={ref}
      className={`welcome${visible ? ' is-visible' : ''}`}
    >
      <div className="welcome__mist welcome__mist--a" aria-hidden="true" />
      <div className="welcome__mist welcome__mist--b" aria-hidden="true" />

      <div className="welcome__inner">
        <p className="eyebrow welcome__eyebrow">A portfolio, enchanted</p>

        <h2 className="welcome__title gold-text">
          {words.map((word, i) => (
            <Fragment key={word}>
              <span className="word" style={{ '--i': i }}>{word}</span>{' '}
            </Fragment>
          ))}
        </h2>

        <div className="welcome__divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="welcome__subtitle">
          Step through the great doors and wander the corridors. Every staircase hides a story,
          every tower a project, and the map below is your way in.
        </p>

        <a className="btn-gold welcome__cta" href="#map">Unfold the map</a>
      </div>
    </section>
  );
}
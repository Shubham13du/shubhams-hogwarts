import { useEffect } from 'react';
import './Intro.css';

const LETTERS = 'SHUBHAM'.split('');

export default function Intro({ onComplete }) {
  useEffect(() => {
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const timer = window.setTimeout(
      onComplete,
      reduced ? 500 : 3900
    );

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro" role="status" aria-label="Welcome to Shubham's portfolio">
      <div className="intro__stars" aria-hidden="true">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            style={{
              '--x': `${(i * 37) % 100}%`,
              '--y': `${(i * 61) % 100}%`,
              '--delay': `${(i % 9) * 0.12}s`,
            }}
          />
        ))}
      </div>

      <div className="intro__magic" aria-hidden="true" />

      <div className="intro__content">
        <div className="intro__glasses" aria-hidden="true">
          <svg viewBox="0 0 100 42">
            <g fill="none" stroke="#e8cf87" strokeWidth="3">
              <circle cx="23" cy="21" r="16" />
              <circle cx="77" cy="21" r="16" />
              <path d="M39 19 Q50 10 61 19" />
              <path d="M7 17 L0 12 M93 17 L100 12" />
            </g>
          </svg>
        </div>

        <h1 className="intro__title">
          {LETTERS.map((letter, i) => (
            <span key={i} style={{ '--i': i }}>{letter}</span>
          ))}
        </h1>

        <p className="intro__subtitle">A little magic awaits...</p>
      </div>
    </div>
  );
}
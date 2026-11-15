import { PROFILE } from '../data/content';
import ParticleField from './ParticleField';
import PortraitFrame from './PortraitFrame';
import './Hero.css';

const RADIUS = 49;

function slotPosition(index) {
  const angle = ((-120 + index * 60) * Math.PI) / 180;

  return {
    '--x': `${50 + RADIUS * Math.cos(angle)}%`,
    '--y': `${50 + RADIUS * Math.sin(angle)}%`,
    '--d': `${index * -1.1}s`,
  };
}

export default function Hero({
  items,
  onSelect,
  selectedId = null,
  away = false,
  busy = false,
  introDone = false,
}) {
  const className = [
  'hero',
  away && 'is-away',
  busy && 'is-busy',
  introDone && 'is-intro-done',
].filter(Boolean).join(' ');

  const letters = PROFILE.name.toUpperCase().split('');

  return (
    <section id="home" className={className}>
      <div className="hero__bg" aria-hidden="true">
        <div
          className="hero__bg-img"
          style={
            PROFILE.heroImageSrc
              ? { backgroundImage: `url(${PROFILE.heroImageSrc})` }
              : undefined
          }
        />
      </div>

      <div className="hero__overlay" aria-hidden="true" />
      <ParticleField variant="stars" count={60} />
      <div className="hero__moon" aria-hidden="true" />

      <div className="hero__content">
        <header className="hero__header">
          <p className="eyebrow">Portfolio of</p>

          <h1 className="hero__title gold-text">
            {letters.map((letter, index) => (
              <span
                className={index === letters.length - 1 ? 'hero__last-letter' : ''}
                key={`${letter}-${index}`}
              >
                {letter}

                {index === letters.length - 1 && (
                  <span className="hero__spectacles" aria-hidden="true">
                    <svg viewBox="0 0 100 42">
                      <g fill="none" stroke="currentColor" strokeWidth="4">
                        <circle cx="23" cy="21" r="16" />
                        <circle cx="77" cy="21" r="16" />
                        <path d="M39 19 Q50 10 61 19" />
                        <path d="M7 17 L0 12 M93 17 L100 12" />
                      </g>
                    </svg>
                  </span>
                )}
              </span>
            ))}
          </h1>

          <p className="hero__tagline">{PROFILE.tagline}</p>
        </header>

        <div className="orbit">
          <div className="portrait">
            <PortraitFrame
              src={PROFILE.portraitSrc}
              alt={`Portrait of ${PROFILE.name}`}
            />
          </div>

          <nav className="orbit__nav" aria-label="Portfolio sections">
            {items.map((item, index) => (
              <div
                className="orbit__slot"
                key={item.id}
                style={slotPosition(index)}
              >
                <button
                  type="button"
                  className={`orbit__btn${selectedId === item.id ? ' is-selected' : ''}`}
                  aria-disabled={busy || undefined}
                  onClick={(event) => onSelect(item.id, event.currentTarget)}
                >
                  <span className="orbit__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <a
        className="hero__scroll"
        href="#welcome"
        aria-label="Scroll down to continue"
      >
        <span>Scroll</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
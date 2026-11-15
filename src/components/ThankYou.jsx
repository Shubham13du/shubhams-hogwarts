import useReveal from '../hooks/useReveal';
import './ThankYou.css';

export default function ThankYou() {
  const [ref, visible] = useReveal({ threshold: 0.3 });

  return (
    <section
      className={`thankyou${visible ? ' is-visible' : ''}`}
      ref={ref}
      aria-label="Thank you"
    >
      <div className="thankyou__particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
  <span
    key={i}
    style={{
      '--i': i,
      '--left': `${(i * 17 + 5) % 100}%`,
      '--top': `${(i * 29 + 8) % 100}%`,
    }}
  />
))}
      </div>

      <div className="thankyou__content">
        <p className="thankyou__eyebrow">Every story deserves a final page</p>

        <h2 className="thankyou__title">Thank You</h2>

        <div className="thankyou__divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="thankyou__message">
          Thank you for taking a little time to explore my world.
          Until our paths cross again...
        </p>

        <h3 className="thankyou__final">Mischief Managed.</h3>

        <div className="thankyou__wand" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
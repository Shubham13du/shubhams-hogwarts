import { useMemo } from 'react';
import './ParticleField.css';

const rand = (min, max) => min + Math.random() * (max - min);

// variant "embers": golden sparks rising upward. variant "stars": twinkling dots.
export default function ParticleField({ count = 40, variant = 'embers', fixed = false }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: rand(0, 100),
        y: rand(0, 70),
        size: variant === 'stars' ? rand(1, 2.8) : rand(2, 5),
        duration: variant === 'stars' ? rand(2.5, 6) : rand(9, 20),
        delay: rand(-20, 0),
        drift: rand(-70, 70),
      })),
    [count, variant],
  );

  return (
    <div
      className={`particles particles--${variant}${fixed ? ' particles--fixed' : ''}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            '--x': `${p.x}%`,
            '--y': `${p.y}%`,
            '--size': `${p.size}px`,
            '--dur': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
import { useEffect, useMemo, useRef } from 'react';
import './MagicBurst.css';

const SPARKS = 30;
const rand = (min, max) => min + Math.random() * (max - min);

// A one-shot golden particle burst centred on (x, y) in viewport pixels.
export default function MagicBurst({ x, y, onDone }) {
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  const sparks = useMemo(
    () =>
      Array.from({ length: SPARKS }, (_, i) => {
        const angle = (i / SPARKS) * Math.PI * 2 + rand(-0.15, 0.15);
        const distance = rand(70, 200);
        return {
          id: i,
          dx: Math.cos(angle) * distance,
          dy: Math.sin(angle) * distance + rand(10, 50), // slight fall, like embers
          size: rand(4, 9),
          duration: rand(0.7, 1.2),
          delay: rand(0, 0.1),
          star: i % 3 === 0,
        };
      }),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => doneRef.current?.(), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="burst" style={{ left: x, top: y }} aria-hidden="true">
      <span className="burst__flash" />
      <span className="burst__ring" />
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className={`burst__spark${spark.star ? ' burst__spark--star' : ''}`}
          style={{
            '--dx': `${spark.dx}px`,
            '--dy': `${spark.dy}px`,
            '--s': `${spark.size}px`,
            '--t': `${spark.duration}s`,
            '--delay': `${spark.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
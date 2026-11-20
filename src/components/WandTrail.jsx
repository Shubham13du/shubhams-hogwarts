import { useEffect, useRef, useState } from 'react';
import './WandTrail.css';

export default function WandTrail() {
  const [particles, setParticles] = useState([]);
  const nextId = useRef(0);
  const lastPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function handlePointerMove(event) {
      if (event.pointerType !== 'mouse') return;

      const { clientX: x, clientY: y } = event;

      const dx = x - lastPosition.current.x;
      const dy = y - lastPosition.current.y;

      if (Math.hypot(dx, dy) < 18) return;

      lastPosition.current = { x, y };

      const id = nextId.current++;

      setParticles((previous) => [
        ...previous.slice(-18),
        {
          id,
          x,
          y,
          symbol: id % 3 === 0 ? '✦' : id % 3 === 1 ? '✧' : '·',
        },
      ]);
    }

    window.addEventListener('pointermove', handlePointerMove);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  function removeParticle(id) {
    setParticles((previous) =>
      previous.filter((particle) => particle.id !== id)
    );
  }

  return (
    <div className="wand-trail" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="wand-trail__particle"
          style={{
            left: particle.x,
            top: particle.y,
          }}
          onAnimationEnd={() => removeParticle(particle.id)}
        >
          {particle.symbol}
        </span>
      ))}
    </div>
  );
}
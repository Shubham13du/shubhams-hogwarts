
import './ParticleField.css';

export default function ParticleField({
  variant = 'stars',
  count = 40,
  fixed = false,
}) {
  return (
    <div
      className={`particles particles--${variant}${fixed ? ' particles--fixed' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: count }, (_, index) => (
        <span
          key={index}
          className="particle"
          style={{
            '--x': `${(index * 37 + 13) % 100}%`,
            '--y': `${(index * 53 + 17) % 100}%`,
            '--size': `${2 + (index % 4)}px`,
            '--delay': `${(index % 12) * -0.7}s`,
            '--dur': `${5 + (index % 7)}s`,
            '--drift': `${(index % 2 ? 1 : -1) * (15 + index % 30)}px`,
          }}
        />
      ))}
    </div>
  );
}

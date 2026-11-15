const BASE = 420;

const TOWERS = [
  { x: 60, w: 54, h: 130 },
  { x: 130, w: 40, h: 100 },
  { x: 240, w: 70, h: 190 },
  { x: 330, w: 48, h: 150 },
  { x: 420, w: 90, h: 230 },
  { x: 530, w: 56, h: 170 },
  { x: 610, w: 44, h: 270 },
  { x: 670, w: 62, h: 180 },
  { x: 760, w: 50, h: 210 },
  { x: 830, w: 70, h: 150 },
  { x: 930, w: 48, h: 245 },
  { x: 1000, w: 56, h: 140 },
  { x: 1080, w: 44, h: 110 },
];

// Original, stylised castle skyline drawn entirely in SVG.
export default function CastleSilhouette({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="castleFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1233" />
          <stop offset="1" stopColor="#07050f" />
        </linearGradient>
      </defs>

      <g fill="url(#castleFill)">
        <rect x="0" y="335" width="1200" height="90" />
        {TOWERS.map((t, i) => {
          const top = BASE - t.h;
          const windows = Math.min(3, Math.floor(t.h / 70));
          return (
            <g key={i}>
              <rect x={t.x} y={top} width={t.w} height={t.h} />
              <polygon
                points={`${t.x - 5},${top} ${t.x + t.w / 2},${top - t.w * 1.1} ${t.x + t.w + 5},${top}`}
              />
              {Array.from({ length: windows }, (_, k) => (
                <rect
                  key={k}
                  className="castle__window"
                  x={t.x + t.w / 2 - 4}
                  y={top + 40 + k * 46}
                  width="8"
                  height="14"
                  rx="4"
                  style={{ animationDelay: `${(i * 0.7 + k * 1.3) % 5}s` }}
                />
              ))}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
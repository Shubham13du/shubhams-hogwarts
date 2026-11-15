import { useState } from 'react';
import './PortraitFrame.css';

// 36 beads around the rim; the 4 compass positions are replaced by gems.
const BEADS = Array.from({ length: 36 }, (_, i) => {
  const angle = (i / 36) * Math.PI * 2;
  return { id: i, x: 100 + 92 * Math.cos(angle), y: 100 + 92 * Math.sin(angle) };
}).filter((bead) => bead.id % 9 !== 0);

const GEM_ANGLES = [0, 90, 180, 270];

function FallbackPortrait() {
  return (
    <svg viewBox="0 0 200 200" className="frame__fallback" role="img" aria-label="Portrait placeholder">
      <defs>
        <radialGradient id="frameFallbackBg" cx="50%" cy="35%" r="75%">
          <stop offset="0" stopColor="#4a3f7a" />
          <stop offset="1" stopColor="#120c08" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#frameFallbackBg)" />
      <circle cx="100" cy="82" r="30" fill="#e8cf87" opacity="0.9" />
      <path d="M36 200c0-42 28-70 64-70s64 28 64 70z" fill="#e8cf87" opacity="0.9" />
      <text x="100" y="186" textAnchor="middle" fontSize="9" letterSpacing="1" fill="#120c08">
        ADD /images/shubham.jpeg
      </text>
    </svg>
  );
}

export default function PortraitFrame({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="frame">
      <div className="frame__aura" aria-hidden="true" />
      <div className="frame__gold" aria-hidden="true" />

      <svg className="frame__ornament" viewBox="0 0 200 200" aria-hidden="true">
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(58,36,8,0.6)" strokeWidth="1.2" />
        <circle
          cx="100"
          cy="100"
          r="76"
          fill="none"
          stroke="rgba(255,243,192,0.75)"
          strokeWidth="1"
          strokeDasharray="1.5 3.5"
        />
        <g className="frame__beads">
          {BEADS.map((bead) => (
            <circle
              key={bead.id}
              cx={bead.x}
              cy={bead.y}
              r="2.4"
              fill="#fff2b8"
              stroke="#6b4a14"
              strokeWidth="0.8"
            />
          ))}
        </g>
        {GEM_ANGLES.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 100 100)`}>
            <path
              d="M100 -1 l7 9 -7 9 -7 -9z"
              fill="#6f5bd6"
              stroke="#fff2b8"
              strokeWidth="1.2"
            />
          </g>
        ))}
      </svg>

      <div className="frame__groove" aria-hidden="true" />
      <div className="frame__photo">
        {showImage ? (
          <img src={src} alt={alt} onError={() => setFailed(true)} />
        ) : (
          <FallbackPortrait />
        )}
      </div>
    </div>
  );
}
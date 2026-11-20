
import { useState } from 'react';
import './PortraitFrame.css';

function FallbackPortrait() {
  return (
    <div className="frame__fallback">
      Add your portrait
    </div>
  );
}

const magicalObjects = [
  '🪄', '🎩', '🧣', '✨',
  '⚡', '🌟', '🪄', '✨',
];

export default function PortraitFrame({ src, alt }) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className="frame">
      {/* Rotating magical vortex */}
      <div className="frame__aura" aria-hidden="true" />

      {/* Portrait */}
      <div className="frame__photo">
        {showImage ? (
          <img
            src={src}
            alt={alt}
            onError={() => setFailed(true)}
          />
        ) : (
          <FallbackPortrait />
        )}
      </div>

      {/* Golden energy ring */}
      <img
        className="frame__energy-ring"
        src="/images/golden-energy-ring.png"
        alt=""
        aria-hidden="true"
      />

      {/* Escaping magical objects */}
      <div className="magic-escape" aria-hidden="true">
        {magicalObjects.map((item, index) => (
          <span
            className="magic-object"
            key={index}
            style={{
              '--i': index,
              '--angle': `${index * 45}deg`,
              '--delay': `${index * -1.7}s`,
              '--distance': `${65 + (index % 3) * 20}px`,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

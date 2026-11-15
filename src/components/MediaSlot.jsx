import { useState } from 'react';
import './MediaSlot.css';

// Shows an image if `src` is set and loads; otherwise a tidy placeholder (never a broken image).
export default function MediaSlot({
  src,
  alt = '',
  label,
  hint = 'Add an image in content.js',
  ratio = '16 / 10',
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`media-slot ${className}`.trim()} style={{ aspectRatio: ratio }}>
      {showImage ? (
        <img className="media-slot__img" src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="media-slot__placeholder" role="img" aria-label={`${label} placeholder`}>
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <rect x="6" y="9" width="36" height="30" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
            <circle cx="17" cy="20" r="3.5" fill="currentColor" />
            <path
              d="M8 36l11-11 8 8 6-6 9 9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
          <strong>{label}</strong>
          <span>{hint}</span>
        </div>
      )}
    </div>
  );
}
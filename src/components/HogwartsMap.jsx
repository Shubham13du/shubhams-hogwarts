import { useState } from 'react';
import { DESTINATIONS } from '../data/content';
import useReveal from '../hooks/useReveal';
import DestinationPanel from './DestinationPanel';
import './HogwartsMap.css';

const BASE_Y = 390;

const CASTLE_TOWERS = [
  { x: 262, w: 34, top: 290 },
  { x: 306, w: 44, top: 250 },
  { x: 360, w: 56, top: 200 },
  { x: 426, w: 44, top: 262 },
  { x: 480, w: 38, top: 300 },
  { x: 524, w: 34, top: 318 },
  { x: 660, w: 38, top: 160 }, // the owlery, east of the castle
];

// Simple hand-inked trees, laid out in two small woods.
const TREES = [
  ...Array.from({ length: 12 }, (_, i) => ({
    x: 48 + (i % 6) * 34 + (Math.floor(i / 6) % 2) * 17,
    y: 250 + Math.floor(i / 6) * 32,
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    x: 590 + (i % 5) * 34 + (Math.floor(i / 5) % 2) * 17,
    y: 470 + Math.floor(i / 5) * 30,
  })),
];

function Tower({ x, w, top }) {
  return (
    <g>
      <rect x={x} y={top} width={w} height={BASE_Y - top} fill="#d3b57a" stroke="#3b2412" strokeWidth="2" />
      <polygon
        points={`${x - 5},${top} ${x + w / 2},${top - w * 1.1} ${x + w + 5},${top}`}
        fill="#7a3b2a"
        stroke="#3b2412"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <rect x={x + w / 2 - 3.5} y={top + 22} width="7" height="13" rx="3.5" fill="#3b2412" />
      {BASE_Y - top > 110 && (
        <rect x={x + w / 2 - 3.5} y={top + 60} width="7" height="13" rx="3.5" fill="#3b2412" />
      )}
    </g>
  );
}

// labelDx / labelDy move the name banner away from the seal (useful for long names).
function MapHotspot({ id, label, x, y, labelDx = 0, labelDy, active, onSelect }) {
  const width = label.length * 10.5 + 36;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect(id);
    }
  };

  return (
    <g
      className={`hotspot${active ? ' is-active' : ''}`}
      role="button"
      tabIndex={0}
      aria-label={`${label}, open destination`}
      aria-pressed={active}
      onClick={() => onSelect(id)}
      onKeyDown={handleKeyDown}
    >
      <circle className="hotspot__pulse" cx={x} cy={y} r="14" />
      <circle className="hotspot__pulse hotspot__pulse--late" cx={x} cy={y} r="14" />
      <circle className="hotspot__seal" cx={x} cy={y} r="11" />
      <text className="hotspot__star" x={x} y={y} dy="0.35em" textAnchor="middle">✦</text>

      <g transform={`translate(${x + labelDx} ${y + labelDy})`}>
        <rect className="hotspot__banner" x={-width / 2} y="-15" width={width} height="30" rx="15" />
        <text className="hotspot__label" textAnchor="middle" dy="0.35em">{label}</text>
      </g>
    </g>
  );
}

function ParchmentMap({ selected, onSelect }) {
  return (
    <svg
      className="map__svg"
      viewBox="0 0 800 560"
      role="img"
      aria-label="Illustrated parchment map of a magical castle and its grounds"
    >
      <defs>
        <radialGradient id="paperGrad" cx="50%" cy="45%" r="75%">
          <stop offset="0" stopColor="#f6ebcd" />
          <stop offset="0.7" stopColor="#e6d3a2" />
          <stop offset="1" stopColor="#cfb27a" />
        </radialGradient>
        <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0.6" stopColor="rgba(90,50,15,0)" />
          <stop offset="1" stopColor="rgba(90,50,15,0.55)" />
        </radialGradient>
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" />
        </filter>
        <filter id="grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="9" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.35  0 0 0 0 0.22  0 0 0 0 0.1  0 0 0 0.9 0"
          />
        </filter>
      </defs>

      {/* Paper with torn edges, grain and burnt vignette */}
      <g filter="url(#rough)">
        <rect x="14" y="14" width="772" height="532" rx="18" fill="url(#paperGrad)" />
        <rect x="14" y="14" width="772" height="532" rx="18" filter="url(#grain)" opacity="0.22" />
        <rect x="14" y="14" width="772" height="532" rx="18" fill="url(#vignette)" />
      </g>

      {/* Title cartouche */}
      <g className="map__ink">
        <rect x="215" y="32" width="370" height="58" rx="10" fill="rgba(255,250,230,0.5)" stroke="#5a3a1a" strokeWidth="2" />
        <text className="map__title" x="400" y="58" textAnchor="middle">Chart of the Enchanted Grounds</text>
        <text className="map__subtitle" x="400" y="79" textAnchor="middle">as drawn for Shubham's Hogwarts</text>
      </g>

      {/* Mountains */}
      <g className="map__line" fill="none" stroke="#5a3a1a" strokeWidth="2" strokeLinejoin="round">
        <path d="M40 150 l34 -58 l24 34 l22 -30 l36 54" />
        <path d="M120 160 l28 -46 l22 30 l20 -22 l30 40" />
      </g>

      {/* Lake */}
      <path
        d="M70 410 C110 375 210 385 250 420 C285 455 245 515 150 520 C85 523 45 465 70 410 Z"
        fill="rgba(76,120,130,0.32)"
        stroke="#3f5d63"
        strokeWidth="2"
      />
      <g fill="none" stroke="#3f5d63" strokeWidth="1.6" strokeLinecap="round">
        <path d="M100 450 q10 -8 20 0 t20 0" />
        <path d="M140 480 q10 -8 20 0 t20 0" />
        <path d="M170 435 q10 -8 20 0 t20 0" />
      </g>
      <text className="map__place" x="150" y="505" textAnchor="middle">The Still Lake</text>

      {/* Trees */}
      <g stroke="#2f4a2a" strokeWidth="1.5" fill="rgba(79,110,60,0.55)" strokeLinejoin="round">
        {TREES.map((t, i) => (
          <g key={i}>
            <polygon points={`${t.x},${t.y - 24} ${t.x + 12},${t.y} ${t.x - 12},${t.y}`} />
            <line x1={t.x} y1={t.y} x2={t.x} y2={t.y + 7} stroke="#5a3a1a" strokeWidth="2" />
          </g>
        ))}
      </g>
      <text className="map__place" x="110" y="340" textAnchor="middle">The Whispering Wood</text>

      {/* Castle wall, bridge and towers */}
      <rect x="250" y="330" width="318" height="60" fill="#d3b57a" stroke="#3b2412" strokeWidth="2" />
      <g fill="#3b2412">
        {Array.from({ length: 15 }, (_, i) => (
          <rect key={i} x={254 + i * 21} y="322" width="12" height="10" />
        ))}
      </g>
      <rect x="568" y="345" width="92" height="16" fill="#b98f56" stroke="#3b2412" strokeWidth="2" />
      {CASTLE_TOWERS.map((tower) => (
        <Tower key={tower.x} {...tower} />
      ))}
      <path d="M385 390 v-26 a15 15 0 0 1 30 0 v26 z" fill="#3b2412" />

      {/* Footpath to the gate */}
      <path className="map__path" d="M400 535 C360 490 440 455 400 392" fill="none" stroke="#7a3b2a" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 11" />

      {/* Compass rose */}
      <g transform="translate(725 480)" stroke="#5a3a1a" fill="none" strokeWidth="1.8">
        <circle r="30" />
        <path d="M0 -42 L8 0 L0 42 L-8 0 Z" fill="rgba(122,59,42,0.55)" />
        <path d="M-42 0 L0 -8 L42 0 L0 8 Z" fill="rgba(166,124,30,0.4)" />
        <text className="map__title" x="0" y="-48" textAnchor="middle" fontSize="15" fill="#5a3a1a" stroke="none">N</text>
      </g>

      {/* Interactive destinations */}
      <MapHotspot
        id="character"
        label="Know Your Character"
        x={400}
        y={352}
        labelDy={52}
        active={selected === 'character'}
        onSelect={onSelect}
      />
      <MapHotspot
        id="name"
        label="Magic Within My Name"
        x={679}
        y={128}
        labelDx={-10}
        labelDy={-24}
        active={selected === 'name'}
        onSelect={onSelect}
      />
    </svg>
  );
}

export default function HogwartsMap() {
  const [selected, setSelected] = useState(null);
  const [ref, visible] = useReveal({ threshold: 0.2 });

  return (
    <section id="map" ref={ref} className={`map${visible ? ' is-visible' : ''}`}>
      <header className="map__header">
        <p className="eyebrow">The grounds await</p>
        <h2 className="map__heading gold-text">Choose Your Path</h2>
        <p className="map__lead">Tap a glowing seal on the parchment, or pick a destination below.</p>
      </header>

      <div className="map__frame">
        <ParchmentMap selected={selected} onSelect={setSelected} />
      </div>

      <div className="destinations" role="group" aria-label="Destinations">
        {DESTINATIONS.map((d) => (
          <button
            type="button"
            key={d.id}
            className={`destination${selected === d.id ? ' is-active' : ''}`}
            aria-pressed={selected === d.id}
            onClick={() => setSelected(d.id)}
          >
            <span className="destination__icon" aria-hidden="true">{d.icon}</span>
            <span className="destination__title">{d.title}</span>
            <span className="destination__blurb">{d.blurb}</span>
          </button>
        ))}
      </div>

      <div className="map__panel" aria-live="polite">
        <DestinationPanel destinationId={selected} />
      </div>
    </section>
  );
}
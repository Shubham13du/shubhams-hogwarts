import './FloatingCandles.css';

const candles = [
  { left: '8%', delay: '-2s', duration: '13s', height: '34px' },
  { left: '23%', delay: '-8s', duration: '16s', height: '42px' },
  { left: '42%', delay: '-5s', duration: '14s', height: '30px' },
  { left: '63%', delay: '-11s', duration: '17s', height: '38px' },
  { left: '81%', delay: '-4s', duration: '15s', height: '33px' },
  { left: '94%', delay: '-9s', duration: '18s', height: '40px' },
];

export default function FloatingCandles() {
  return (
    <div className="floating-candles" aria-hidden="true">
      {candles.map((candle, index) => (
        <div
          className="floating-candle"
          key={index}
          style={{
            '--left': candle.left,
            '--delay': candle.delay,
            '--duration': candle.duration,
            '--candle-height': candle.height,
          }}
        >
          <span className="floating-candle__flame" />
          <span className="floating-candle__wick" />
          <span className="floating-candle__body" />
          <span className="floating-candle__glow" />
        </div>
      ))}
    </div>
  );
}
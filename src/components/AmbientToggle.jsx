
import { useEffect, useRef, useState } from 'react';
import './AmbientToggle.css';

export default function AmbientToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const startMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      audio.volume = 0.35;
      await audio.play();
      setPlaying(true);
    } catch (error) {
      console.warn('Music could not start:', error);
      setPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await startMusic();
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    const handleEnter = () => {
      startMusic();
    };

    const audio = audioRef.current;

    audio?.addEventListener('play', () => setPlaying(true));
    audio?.addEventListener('pause', () => setPlaying(false));

    window.addEventListener('hogwarts-enter', handleEnter);

    return () => {
      window.removeEventListener('hogwarts-enter', handleEnter);
      audio?.pause();
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/ambient.mp3"
        loop
        preload="auto"
      />

      <button
        type="button"
        className={`ambient-toggle${playing ? ' is-playing' : ''}`}
        onClick={toggleMusic}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <span aria-hidden="true">{playing ? '♫' : '♪'}</span>
        {playing ? 'Pause music' : 'Play music'}
      </button>
    </>
  );
}

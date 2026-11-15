import { useCallback, useEffect, useRef, useState } from 'react';

// Durations in ms. They match the CSS animations in Hero.css and SectionView.css.
const TIMING = { leave: 750, open: 1500, close: 800, return: 900 };

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);

/**
 * Controls the whole "Hogwarts <-> section" transition.
 *
 * view:   'home' or a section id
 * phase:  'idle' | 'leaving' | 'opening' | 'closing' | 'returning'
 *
 * A ref-based lock makes sure clicks during a transition are ignored,
 * so animations can never overlap.
 */
export default function useSectionNavigation() {
  const [view, setView] = useState('home');
  const [phase, setPhase] = useState('idle');
  const [selectedId, setSelectedId] = useState(null);
  const [bursts, setBursts] = useState([]);

  const lockRef = useRef(false);
  const viewRef = useRef('home');
  const originRef = useRef(null);
  const burstIdRef = useRef(0);
  const timersRef = useRef([]);

  const later = useCallback((fn, ms) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, []);

  const openSection = useCallback(
    (id, originEl) => {
      if (lockRef.current || viewRef.current !== 'home') return;
      lockRef.current = true;

      const quick = prefersReducedMotion();
      originRef.current = originEl || null;
      setSelectedId(id);
      setPhase('leaving');

      if (originEl && !quick) {
        const rect = originEl.getBoundingClientRect();
        burstIdRef.current += 1;
        const burst = {
          id: burstIdRef.current,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
        setBursts((list) => [...list, burst]);
      }

      later(() => {
        viewRef.current = id;
        setView(id);
        setPhase('opening');
        later(() => {
          setPhase('idle');
          lockRef.current = false;
        }, quick ? 0 : TIMING.open);
      }, quick ? 0 : TIMING.leave);
    },
    [later],
  );

  const closeSection = useCallback(() => {
    if (lockRef.current || viewRef.current === 'home') return;
    lockRef.current = true;

    const quick = prefersReducedMotion();
    setPhase('closing');

    later(() => {
      viewRef.current = 'home';
      setView('home');
      setSelectedId(null);
      setPhase('returning');
      later(() => {
        setPhase('idle');
        lockRef.current = false;
        originRef.current?.focus?.({ preventScroll: true });
      }, quick ? 0 : TIMING.return);
    }, quick ? 0 : TIMING.close);
  }, [later]);

  const removeBurst = useCallback((id) => {
    setBursts((list) => list.filter((burst) => burst.id !== id));
  }, []);

  // Escape returns to Hogwarts.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeSection();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeSection]);

  return { view, phase, selectedId, bursts, openSection, closeSection, removeBurst };
}
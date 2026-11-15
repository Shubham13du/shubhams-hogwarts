import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS, PROFILE } from './data/content';
import useSectionNavigation from './hooks/useSectionNavigation';

import Hero from './components/Hero';
import Welcome from './components/Welcome';
import HogwartsMap from './components/HogwartsMap';
import SectionView from './components/SectionView';
import MagicBurst from './components/MagicBurst';
import ParticleField from './components/ParticleField';
import Intro from './components/Intro';
import ThankYou from './components/ThankYou';

export default function App() {
  const siteRef = useRef(null);
  const [introVisible, setIntroVisible] = useState(true);

  const finishIntro = useCallback(() => {
    setIntroVisible(false);
  }, []);

  const {
    view,
    phase,
    selectedId,
    bursts,
    openSection,
    closeSection,
    removeBurst,
  } = useSectionNavigation();

  const activeItem = NAV_ITEMS.find((item) => item.id === view);
  const archiveOpen = Boolean(activeItem);
  const busy = phase !== 'idle';

  useEffect(() => {
    document.body.classList.toggle('archive-open', archiveOpen);
    document.body.style.overflow = archiveOpen ? 'hidden' : '';

    siteRef.current?.toggleAttribute('inert', archiveOpen);

    return () => {
      document.body.classList.remove('archive-open');
      document.body.style.overflow = '';
    };
  }, [archiveOpen]);

  return (
    <>
      {introVisible && <Intro onComplete={finishIntro} />}

      <ParticleField variant="embers" count={26} fixed />

      <div className="site" ref={siteRef}>
        <main>
          <Hero
  items={NAV_ITEMS}
  onSelect={openSection}
  selectedId={selectedId}
  away={archiveOpen || phase === 'leaving'}
  busy={busy}
  introDone={!introVisible}
/>
          <Welcome />
          <HogwartsMap />
          <ThankYou />
        </main>

        <footer className="site-footer">
          <p>
            © {new Date().getFullYear()} {PROFILE.name} · Made with a little magic and a lot of code ✦
          </p>
        </footer>
      </div>

      {activeItem && (
        <SectionView
          key={activeItem.id}
          section={activeItem}
          phase={phase}
          busy={busy}
          onClose={closeSection}
        />
      )}

      {bursts.map((burst) => (
        <MagicBurst
          key={burst.id}
          x={burst.x}
          y={burst.y}
          onDone={() => removeBurst(burst.id)}
        />
      ))}
    </>
  );
}
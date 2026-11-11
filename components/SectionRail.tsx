import React, { useEffect, useState } from 'react';
import { SECTIONS, useActiveSection } from '../hooks/useActiveSection';

/** Wide screens only: a small charcoal index pinned to the right edge, so you always see where you are
 *  and what's still below. Hidden over the hero so it doesn't crowd the first screen. */
const SectionRail: React.FC = () => {
  const active = useActiveSection(true);
  const [wide, setWide] = useState(() => window.innerWidth >= 1600);
  useEffect(() => {
    const fn = () => setWide(window.innerWidth >= 1600);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  if (!wide) return null;
  const shown = active !== '';

  return (
    <nav
      aria-label="Page sections"
      className="rail"
      style={{
        position: 'fixed', right: 20, top: '50%', zIndex: 90,
        transform: `translateY(-50%) translateX(${shown ? 0 : 24}px)`,
        opacity: shown ? 1 : 0, pointerEvents: shown ? 'auto' : 'none',
        transition: 'opacity 0.25s, transform 0.25s',
      }}
    >
      {SECTIONS.map(s => (
        <a key={s.id} href={s.href} className={`rail-link${active === s.id ? ' active' : ''}`}>
          {s.label}
          <span className="rail-dot" />
        </a>
      ))}
    </nav>
  );
};

export default SectionRail;

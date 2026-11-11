import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { useRoute } from '../hooks/useRoute';
import { SECTIONS, useActiveSection } from '../hooks/useActiveSection';

/** Charcoal bar that stays readable over any section, and lights up the section you're in. */
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const route = useRoute();
  const onHome = route.page === 'home';
  const section = useActiveSection(onHome);
  const active = onHome ? section : route.page;

  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [route.page]);

  return (
    <>
      <nav className="site-nav" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '0 20px' : '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a href="/" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: '#fff', textDecoration: 'none' }}>
          SO<span style={{ color: 'var(--accent-hi)' }}>.</span>
        </a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: 6 }}>
            {SECTIONS.map(s => (
              <a key={s.id} href={s.href} className={`nav-link${active === s.id ? ' active' : ''}`} aria-current={active === s.id ? 'true' : undefined}>
                {s.label}
              </a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="/#book" className="cta-primary nav-cta" style={{ padding: '10px 20px', fontSize: 10 }}>
            Book a call
          </a>
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} style={{ fontSize: 18, color: '#fff', padding: 4 }}>
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
            </button>
          )}
        </div>

        {/* how far down the page you are */}
        <div aria-hidden style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: `${progress * 100}%`, background: 'var(--accent-hi)', transition: 'width 0.1s linear' }} />
      </nav>

      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, background: 'var(--charcoal)', borderBottom: '1px solid var(--charcoal-line)', padding: '8px 20px 16px', display: 'flex', flexDirection: 'column' }}>
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={s.href}
              className={`nav-link${active === s.id ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
              style={{ padding: '14px 4px', borderBottom: '1px solid var(--charcoal-line)', display: 'flex', gap: 14 }}
            >
              <span style={{ color: '#71717a' }}>{String(i + 1).padStart(2, '0')}</span>{s.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;

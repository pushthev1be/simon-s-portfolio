
import React, { useState, useEffect } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = ['Work', 'Services', 'AI Thoughts', 'Book a Call'];
  const navHrefs = ['#work', '#services', '#thoughts', '#book'];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: isMobile ? '0 20px' : '0 48px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled || menuOpen ? 'rgba(255,255,255,0.97)' : 'transparent',
        borderBottom: scrolled || menuOpen ? '1px solid #e8e8e8' : '1px solid transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        transition: 'all 0.3s ease',
      }}>
        <a href="#top" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: '#0a0a0a', textDecoration: 'none' }}>SO</a>

        {!isMobile && (
          <div style={{ display: 'flex', gap: 36 }}>
            {navLinks.map((label, i) => (
              <a key={label} href={navHrefs[i]} className="nav-link">{label}</a>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <a href="#book" className="cta-primary" style={{ padding: '10px 20px', fontSize: 10 }}>
            Book a call
          </a>
          {isMobile && (
            <button onClick={() => setMenuOpen(o => !o)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} style={{ fontSize: 18, color: '#0a0a0a', padding: 4 }}>
              <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile dropdown */}
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99, background: '#fff', borderBottom: '1px solid #e8e8e8', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 0 }}>
          {navLinks.map((label, i) => (
            <a
              key={label}
              href={navHrefs[i]}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
              style={{ padding: '14px 0', borderBottom: '1px solid #f0f0f0', display: 'block' }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;

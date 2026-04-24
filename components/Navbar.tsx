
import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '0 48px', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      borderBottom: scrolled ? '1px solid #e8e8e8' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <a href="#top" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em', color: '#0a0a0a', textDecoration: 'none' }}>SO</a>
      <div style={{ display: 'flex', gap: 36 }}>
        {['About', 'Projects', 'Skills', 'Debug Logs', 'Contact'].map((label, i) => (
          <a key={label} href={['#about', '#projects', '#skills', '#logs', '#contact'][i]} className="nav-link">{label}</a>
        ))}
      </div>
      <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="cta-outline" style={{ padding: '8px 20px', fontSize: 10 }}>
        <i className="fab fa-github"></i> GitHub
      </a>
    </nav>
  );
};

export default Navbar;

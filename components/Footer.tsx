import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

const LINKS = [
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}` },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
  { label: 'GitHub', href: PERSONAL_INFO.github },
  { label: 'itch.io', href: PERSONAL_INFO.itch },
  { label: 'X', href: PERSONAL_INFO.twitter },
];

const Footer: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <footer id="contact" style={{ background: '#0a0a0a', color: '#fff', padding: isMobile ? '64px 20px 32px' : '88px 48px 40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'flex-end', flexDirection: isMobile ? 'column' : 'row', gap: 32, paddingBottom: 48, borderBottom: '1px solid #1a1a1a' }}>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 44 : 64, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.95 }}>
            Have something<br />to build?
          </h2>
          <a href="#book" className="cta-primary" style={{ background: '#16a34a', borderColor: '#16a34a' }}>Book a 30-min call</a>
        </div>
        <div style={{ paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 28px' }}>
            {LINKS.map(l => (
              <a key={l.label} href={l.href} target={l.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="footer-link">{l.label}</a>
            ))}
          </div>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: '0.12em', textTransform: 'uppercase' }}>© 2026 Simon Olawuyi · {PERSONAL_INFO.location}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  const contacts = [
    { icon: 'fa-envelope', prefix: 'fas', label: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
    { icon: 'fa-linkedin', prefix: 'fab', label: 'LinkedIn', href: PERSONAL_INFO.linkedin },
    { icon: 'fa-github', prefix: 'fab', label: 'github.com/pushthev1be', href: PERSONAL_INFO.github },
  ];

  return (
    <footer id="contact" style={{ background: '#0a0a0a', color: '#fff', padding: '120px 48px 60px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end', marginBottom: 80 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 24 }}>Get In Touch</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 80, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 0.9, marginBottom: 48 }}>
              Let's<br />Build.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contacts.map(({ icon, prefix, label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: '#555', transition: 'color 0.15s', textDecoration: 'none' }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#22c55e'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#555'}
                >
                  <i className={`${prefix} fa-${icon}`} style={{ width: 16, textAlign: 'center' }}></i> {label}
                </a>
              ))}
            </div>
          </div>

          <div style={{ paddingLeft: 60, borderLeft: '1px solid #1a1a1a' }}>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: '-0.04em', marginBottom: 6, background: 'linear-gradient(90deg,#15803d,#22c55e)', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Simon<br />Olawuyi
            </div>
            <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 40 }}>Full-Stack Engineer</div>
            <div style={{ fontSize: 12, color: '#333', lineHeight: 2 }}>
              Indianapolis, IN<br />Open to remote opportunities<br />
              <a
                href={PERSONAL_INFO.website}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#16a34a', transition: 'opacity 0.15s', textDecoration: 'none' }}
                onMouseEnter={e => (e.target as HTMLAnchorElement).style.opacity = '0.7'}
                onMouseLeave={e => (e.target as HTMLAnchorElement).style.opacity = '1'}
              >
                oracleai.live ↗
              </a>
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 10, color: '#333', letterSpacing: '0.15em', textTransform: 'uppercase' }}>© 2026 Simon Olawuyi</div>
          <div style={{ fontSize: 10, color: '#333', letterSpacing: '0.1em' }}>Self-taught. Solo-shipping. Production-grade.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

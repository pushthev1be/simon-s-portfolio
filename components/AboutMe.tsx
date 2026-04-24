
import React from 'react';
import { PERSONAL_INFO, PHILOSOPHY } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

const AboutMe: React.FC = () => {
  const isMobile = useIsMobile();
  const contactItems = [
    ['Email', PERSONAL_INFO.email],
    ['Phone', PERSONAL_INFO.phone],
    ['Location', PERSONAL_INFO.location],
    ['Website', 'oracleai.live'],
  ];

  return (
    <section id="about" style={{ padding: isMobile ? '80px 20px' : '120px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
        <div className="reveal">
          <div style={{ position: 'relative', marginBottom: 2 }}>
            <img
              src="/uploads/photo_upload-1777060534963.jpeg"
              alt="Simon Olawuyi"
              onError={(e) => { (e.target as HTMLImageElement).src = '/profile.jpeg'; }}
              style={{ width: '100%', aspectRatio: isMobile ? '4/3' : '3/4', objectFit: 'cover', objectPosition: 'top', display: 'block', border: '1px solid #e8e8e8' }}
            />
            <div style={{ position: 'absolute', top: 16, left: 16, background: '#16a34a', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', animation: 'pulse 2s infinite' }}></div>
              Active
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, border: '1px solid #e8e8e8', borderTop: 'none' }}>
            {contactItems.map(([label, value], i) => (
              <div key={i} style={{ padding: '14px 16px', borderRight: i % 2 === 0 ? '1px solid #e8e8e8' : 'none', borderBottom: i < 2 ? '1px solid #e8e8e8' : 'none' }}>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 10, color: '#333', wordBreak: 'break-all' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal reveal-delay-1" style={{ paddingTop: isMobile ? 0 : 8 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 20 }}>About</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 32 : 44, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.07, marginBottom: 28 }}>
            Self-taught.<br />Solo-shipping.<br />Production-grade.
          </h2>
          <p style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.85, color: '#444', borderLeft: '3px solid #16a34a', paddingLeft: 20, marginBottom: 40 }}>
            {PERSONAL_INFO.summary}
          </p>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#999', marginBottom: 0 }}>Operating Principles</div>
          {PHILOSOPHY.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, padding: '18px 0', borderBottom: '1px solid #f0f0f0', alignItems: 'start' }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 800, color: '#16a34a', minWidth: 72 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: '#555', lineHeight: 1.65 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

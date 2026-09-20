import React from 'react';
import { SERVICES, STACK } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

const Services: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section id="services" style={{ padding: isMobile ? '80px 20px' : '112px 48px', borderBottom: '1px solid #e8e8e8', background: '#fafafa' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>How I Can Help</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>What we could build</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 20 }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${i + 1}`} style={{ background: '#fff', border: '1px solid #e8e8e8', padding: isMobile ? 24 : 32, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{s.desc}</p>
              <div style={{ marginTop: 'auto', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999' }}>
                Seen in: <span style={{ color: '#16a34a', fontWeight: 800 }}>{s.proof}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginRight: 8 }}>Stack</span>
          {STACK.map(t => <span key={t} className="pill static">{t}</span>)}
        </div>
      </div>
    </section>
  );
};

export default Services;

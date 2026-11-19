import React from 'react';
import { SERVICES, STACK } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

/** What I can build: three short columns in one box, plus the stack on one line (anchor #services). */
const Services: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <div id="services" className="reveal" style={{ marginBottom: 40 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', border: '1px solid #e8e8e8', background: '#fff' }}>
        {SERVICES.map((s, i) => (
          <div key={s.title} style={{ padding: isMobile ? 18 : 22, borderLeft: !isMobile && i > 0 ? '1px solid #e8e8e8' : 'none', borderTop: isMobile && i > 0 ? '1px solid #e8e8e8' : 'none', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>{s.title}</h3>
            <p style={{ fontSize: 12, color: '#555', lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</p>
            <div style={{ marginTop: 'auto', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#999' }}>
              Seen in: <span style={{ color: '#16a34a', fontWeight: 800 }}>{s.proof}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999', marginRight: 6 }}>Stack</span>
        {STACK.map(t => <span key={t} className="pill static">{t}</span>)}
      </div>
    </div>
  );
};

export default Services;

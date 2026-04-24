
import React from 'react';
import { EDUCATION, CERTIFICATIONS } from '../constants';

const EduCerts: React.FC = () => {
  return (
    <section style={{ padding: '80px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <div className="reveal">
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 24 }}>Education</div>
          {EDUCATION.map((e, i) => (
            <div key={i} style={{ padding: '24px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 10, color: '#999', marginBottom: 8 }}>{e.period}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{e.institution}</div>
              <div style={{ fontSize: 12, color: '#777', fontStyle: 'italic' }}>{e.degree} — {e.location}</div>
            </div>
          ))}
        </div>

        <div className="reveal reveal-delay-1">
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 24 }}>Certifications</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CERTIFICATIONS.map((c, i) => (
              <div
                key={i}
                style={{ border: '1px solid #e8e8e8', overflow: 'hidden', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#16a34a'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#e8e8e8'}
              >
                {c.image && <img src={c.image} alt={c.name} style={{ width: '100%', display: 'block' }} />}
                <div style={{ padding: '14px 16px', borderTop: c.image ? '1px solid #f0f0f0' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, lineHeight: 1.3 }}>{c.name}</div>
                  <div style={{ fontSize: 9, color: '#aaa', letterSpacing: '0.06em', flexShrink: 0, marginLeft: 12 }}>ID: {c.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EduCerts;

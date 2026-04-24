
import React, { useState } from 'react';
import { SKILLS } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

const Skills: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const visible = active ? SKILLS.filter(s => s.category === active) : SKILLS;

  return (
    <section id="skills" style={{ padding: isMobile ? '80px 20px' : '120px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Technical Arsenal</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Skills</h2>
          </div>
        </div>

        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}>
          <button onClick={() => setActive(null)} className={`pill${active === null ? ' active' : ''}`}>All</button>
          {SKILLS.map(s => (
            <button key={s.category} onClick={() => setActive(p => p === s.category ? null : s.category)} className={`pill${active === s.category ? ' active' : ''}`}>{s.category}</button>
          ))}
        </div>

        <div className="reveal">
          {visible.map((group, gi) => (
            <div key={gi} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '200px 1fr', gap: isMobile ? 12 : 0, padding: '24px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#16a34a', paddingTop: isMobile ? 0 : 4 }}>{group.category}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {group.items.map((skill, si) => (
                  <span
                    key={si}
                    style={{ fontSize: 12, padding: '7px 14px', border: '1px solid #e8e8e8', color: '#333', background: '#fafafa', transition: 'all 0.15s', cursor: 'default' }}
                    onMouseEnter={e => {
                      const t = e.target as HTMLSpanElement;
                      t.style.borderColor = '#16a34a'; t.style.color = '#16a34a'; t.style.background = '#f0fdf4';
                    }}
                    onMouseLeave={e => {
                      const t = e.target as HTMLSpanElement;
                      t.style.borderColor = '#e8e8e8'; t.style.color = '#333'; t.style.background = '#fafafa';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

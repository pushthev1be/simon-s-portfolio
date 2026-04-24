
import React, { useState } from 'react';
import { DEBUG_LOGS } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

const DIFFICULTY_LABELS = ['', 'Trivial', 'Easy', 'Moderate', 'Hard', 'Critical'];

const DebugLogs: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const isMobile = useIsMobile();

  return (
    <section id="logs" style={{ padding: isMobile ? '80px 20px' : '120px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Real Bugs. Real Commits.</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Debug Logs</h2>
          </div>
          <span className="section-num">10 Entries</span>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 1 }}>
          {DEBUG_LOGS.map((log, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                onClick={() => setOpen(isOpen ? null : i)}
                style={{
                  cursor: 'pointer', padding: isMobile ? '20px 16px' : '28px 32px',
                  border: '1px solid #e8e8e8',
                  borderLeft: isOpen ? '3px solid #16a34a' : '1px solid #e8e8e8',
                  background: isOpen ? '#fafffe' : '#fff',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = '#fafafa'; }}
                onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLDivElement).style.background = '#fff'; }}
              >
                <div style={{ display: 'flex', gap: 3, alignItems: 'center', marginBottom: 14 }}>
                  {[...Array(5)].map((_, d) => (
                    <div key={d} style={{ width: 8, height: 8, border: `1px solid ${d < log.difficulty ? '#16a34a' : '#e0e0e0'}`, background: d < log.difficulty ? '#16a34a' : 'transparent' }}></div>
                  ))}
                  <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginLeft: 8 }}>{DIFFICULTY_LABELS[log.difficulty]}</span>
                </div>
                <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 700, marginBottom: 8, lineHeight: 1.3 }}>{log.title}</h4>
                <div style={{ fontSize: 9, color: '#bbb', marginBottom: 16, letterSpacing: '0.08em' }}>{log.repository} // {log.commit}</div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#ef4444', marginBottom: 6 }}>Symptom</div>
                <p style={{ fontSize: 11, color: '#555', lineHeight: 1.65, borderLeft: '2px solid #fca5a5', paddingLeft: 12 }}>{log.symptom}</p>
                {isOpen && (
                  <div style={{ marginTop: 20 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 6 }}>Resolution</div>
                    <p style={{ fontSize: 11, color: '#444', lineHeight: 1.65, borderLeft: '2px solid #86efac', paddingLeft: 12, marginBottom: 14 }}>{log.resolution}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {log.tags.map(t => (
                        <span key={t} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', border: '1px solid #d1fae5', background: '#f0fdf4', color: '#16a34a' }}>#{t}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 9, fontWeight: 700, color: isOpen ? '#16a34a' : '#ccc', marginTop: 16, textAlign: 'right', transition: 'color 0.15s' }}>
                  {isOpen ? '↑ Close' : '↓ Resolution'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DebugLogs;

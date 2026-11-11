import React from 'react';
import { SECTIONS } from '../hooks/useActiveSection';
import { useIsMobile } from '../hooks/useIsMobile';

const BLURBS: Record<string, string> = {
  work: 'Products & games',
  '3d': 'Blender models & clips',
  services: 'What I can build',
  thoughts: 'Writing on AI',
  mcp: 'Blender + Studio MCP setup',
  book: '30 minutes, free',
};

/** Charcoal "what's on this page" strip under the hero, so nobody scrolls past a section without knowing it's there. */
const JumpStrip: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <nav aria-label="On this page" className="dark" style={{ borderBottom: '1px solid var(--charcoal-line)' }}>
      <div style={{ maxWidth: 1200 + 96, margin: '0 auto', padding: isMobile ? 0 : '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : `repeat(${SECTIONS.length}, 1fr)`, borderLeft: isMobile ? 'none' : '1px solid var(--charcoal-line)' }}>
          {SECTIONS.map((s, i) => (
            <a key={s.id} href={s.href} className="jump-link" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6, borderBottom: isMobile ? '1px solid var(--charcoal-line)' : 'none', position: 'relative' }}>
              <span style={{ color: 'var(--accent-hi)', fontSize: 10 }}>{String(i + 1).padStart(2, '0')}</span>
              <span>{s.label}</span>
              <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.02em', textTransform: 'none', color: '#a1a1aa' }}>{BLURBS[s.id]}</span>
              <span className="jump-arrow" style={{ position: 'absolute', top: 18, right: 16 }}>{s.page === 'mcp' ? '→' : '↓'}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default JumpStrip;

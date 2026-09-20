import React from 'react';
import { THOUGHTS } from '../constants';
import { ThoughtTeaser } from './ThoughtCard';
import { useIsMobile } from '../hooks/useIsMobile';

export const sortedThoughts = () => [...THOUGHTS].sort((a, b) => b.date.localeCompare(a.date));
const SHOWN = 3;

/** Homepage teaser: the latest few posts, linking to the full AI Thoughts page. */
const Thoughts: React.FC = () => {
  const isMobile = useIsMobile();
  const posts = sortedThoughts();

  return (
    <section id="thoughts" style={{ padding: isMobile ? '80px 20px' : '112px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 32 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Writing</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>AI Thoughts</h2>
          </div>
          <a href="#/thoughts" className="cta-outline" style={{ padding: '10px 18px' }}>All posts →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {posts.slice(0, SHOWN).map(p => <ThoughtTeaser key={p.slug} post={p} />)}
        </div>
      </div>
    </section>
  );
};

export default Thoughts;

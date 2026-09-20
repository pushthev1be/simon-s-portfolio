import React from 'react';
import ThoughtCard from './ThoughtCard';
import { sortedThoughts } from './Thoughts';
import { useIsMobile } from '../hooks/useIsMobile';

const ThoughtsPage: React.FC<{ slug?: string }> = ({ slug }) => {
  const isMobile = useIsMobile();
  const posts = sortedThoughts();

  return (
    <main style={{ padding: isMobile ? '104px 20px 80px' : '128px 48px 112px', minHeight: '70vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <a href="#top" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>← Back to home</a>
        <div style={{ padding: '28px 0 24px', borderBottom: '1px solid #e8e8e8', marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Writing</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>AI Thoughts</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {posts.map(p => <ThoughtCard key={p.slug} post={p} defaultOpen={p.slug === slug} />)}
        </div>
      </div>
    </main>
  );
};

export default ThoughtsPage;

import React from 'react';
import { GUIDES } from './Guides';
import { sortedThoughts } from './Thoughts';
import { formatDate, DownloadLink } from './ThoughtCard';
import { useIsMobile } from '../hooks/useIsMobile';
import SectionHead, { GroupHead } from './SectionHead';

/** Guides and AI writing side by side as compact lists (anchors #guides and #thoughts still work). */
const Learn: React.FC = () => {
  const isMobile = useIsMobile();
  const posts = sortedThoughts().slice(0, 3);

  return (
    <section id="learn" className="sec">
      <div className="wrap">
        <SectionHead eyebrow="Learn" title="Guides & writing" intro="How I build things, with screenshots and code you can copy, plus what I think about where AI is going." />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.15fr 1fr', gap: isMobile ? 32 : 28, alignItems: 'start' }}>
          <div id="guides">
            <GroupHead title="Guides" count={GUIDES.length} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {GUIDES.map(g => (
                <a key={g.id} href={g.href} className="reveal row-card">
                  <div style={{ width: 104, aspectRatio: '16/10', flexShrink: 0, overflow: 'hidden', background: g.contain ? '#0f1115' : '#eee', display: 'grid', placeItems: 'center' }}>
                    <img src={g.image} alt="" loading="lazy" style={g.contain ? { width: '46%' } : { width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 4 }}>{g.tag}</div>
                    <div style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 4 }}>{g.title}</div>
                    <div className="clamp-2" style={{ fontSize: 11.5, color: '#666', lineHeight: 1.55 }}>{g.blurb}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div id="thoughts">
            <GroupHead title="AI Thoughts" action={<a href="/thoughts/" className="text-link">All posts →</a>} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {posts.map(p => (
                <article key={p.slug} className="reveal row-card" style={{ display: 'block' }}>
                  <div style={{ fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>{formatDate(p.date)}</div>
                  <a href={`/thoughts/#${p.slug}`} style={{ display: 'block', fontFamily: 'var(--display)', fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.25, marginBottom: 4 }}>{p.title}</a>
                  <div className="clamp-2" style={{ fontSize: 11.5, color: '#666', lineHeight: 1.55, marginBottom: 8 }}>{p.summary}</div>
                  <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
                    <a href={`/thoughts/#${p.slug}`} className="text-link">Read →</a>
                    <DownloadLink post={p} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn;

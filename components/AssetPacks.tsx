import React from 'react';
import { PROJECTS, PERSONAL_INFO } from '../constants';
import SectionHead from './SectionHead';

/** Pixel-art packs, shown like items on a shelf: the sprites big and crisp on black, what's inside, and the
 *  button that matters (get it on itch.io). Data: PROJECTS with category 'Assets'. */
const AssetPacks: React.FC = () => {
  const packs = PROJECTS.filter(p => p.category === 'Assets');
  return (
    <section id="assets">
      <SectionHead
        level={2}
        eyebrow="Pixel art"
        title="Asset packs"
        intro="Sprite packs for game devs: cars, parts, guns and characters, ready to drop into a game."
        action={<a href={PERSONAL_INFO.itch} target="_blank" rel="noopener noreferrer" className="cta-outline small">All packs on itch.io ↗</a>}
      />
      <div className="pack-grid">
        {packs.map(p => (
          <article key={p.id} className="reveal work-card pack-card">
            <div className="pack-shot">
              {p.image && <img src={p.image} alt={p.title} loading="lazy" style={{ imageRendering: 'pixelated' }} />}
            </div>
            <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              <h3 style={{ fontFamily: 'var(--display)', fontSize: 17, fontWeight: 800, letterSpacing: '-0.02em' }}>{p.title}</h3>
              <p className="clamp-3" style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>{p.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {p.tags.slice(0, 3).map(t => <span key={t} className="pill static">{t}</span>)}
              </div>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="cta-primary small" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                  Get it on itch.io ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default AssetPacks;

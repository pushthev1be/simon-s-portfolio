import React from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';
import SectionHead, { GroupHead } from './SectionHead';

/** The Work page: things I've built that run - products as short case studies, games you can play.
 *  Art and asset packs live on the Art & Assets page. */

const PALETTES: Record<string, { bg: string; text: string }> = {
  '003': { bg: '#0f172a', text: '#60a5fa' },
  '004': { bg: '#0a0a0a', text: '#888' },
};
const FALLBACK = { bg: '#0a1a0f', text: '#16a34a' };

const Shot: React.FC<{ project: Project; fill?: boolean; badge?: string }> = ({ project, fill, badge }) => {
  const { bg, text } = PALETTES[project.id] || FALLBACK;
  return (
    <div style={{ width: '100%', aspectRatio: fill ? undefined : '16/9', height: fill ? '100%' : undefined, minHeight: fill ? 220 : undefined, overflow: 'hidden', position: 'relative', background: bg }}>
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" className="cover-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block', imageRendering: project.category === 'Game' ? 'pixelated' : 'auto' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontFamily: 'var(--display)', fontSize: 22, fontWeight: 800, color: text, padding: 12, textAlign: 'center' }}>{project.title}</div>
      )}
      {badge && (
        <div style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{badge}</span>
        </div>
      )}
    </div>
  );
};

/** The flagship: the most room and the coloured button. */
const Featured: React.FC<{ project: Project }> = ({ project }) => {
  const isMobile = useIsMobile();
  return (
    <article className="reveal work-card" style={{ border: '1px solid #e8e8e8', background: '#fff', overflow: 'hidden', marginBottom: 36 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr' }}>
        <Shot project={project} fill={!isMobile} badge="Live" />
        <div style={{ padding: isMobile ? 20 : 28, display: 'flex', flexDirection: 'column' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Featured · {project.label}</div>
          <h2 style={{ fontFamily: 'var(--display)', fontSize: isMobile ? 24 : 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 10 }}>{project.title}</h2>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 14 }}>{project.description}</p>
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, lineHeight: 1.6, color: '#444', marginBottom: 6 }}>
              <span style={{ color: '#16a34a', flexShrink: 0 }}>→</span><span>{f}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '12px 0 20px' }}>
            {project.tags.slice(0, 6).map(t => <span key={t} className="pill static">{t}</span>)}
          </div>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="cta-primary" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
              {project.linkLabel ?? 'Visit live site'} ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

/** A product as a short case study: screenshot, what it is, what it does, what it's built with. */
const CaseRow: React.FC<{ project: Project }> = ({ project }) => {
  const isMobile = useIsMobile();
  return (
    <article className="reveal work-card case-row" style={{ gridTemplateColumns: isMobile ? '1fr' : '280px 1fr' }}>
      <Shot project={project} />
      <div style={{ padding: isMobile ? '14px 16px 16px' : '4px 4px 4px 0', display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999' }}>{project.label}</div>
        <h3 style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em' }}>{project.title}</h3>
        <p className="clamp-2" style={{ fontSize: 12.5, color: '#555', lineHeight: 1.6 }}>{project.description}</p>
        {project.features[0] && (
          <div style={{ display: 'flex', gap: 8, fontSize: 11.5, color: '#444', lineHeight: 1.55 }}>
            <span style={{ color: '#16a34a', flexShrink: 0 }}>→</span><span className="clamp-2">{project.features[0]}</span>
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, alignItems: 'center', marginTop: 'auto' }}>
          {project.tags.slice(0, 4).map(t => <span key={t} className="pill static">{t}</span>)}
          <span style={{ marginLeft: 'auto' }}>
            {project.link
              ? <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-link">{project.linkLabel ?? 'Visit live site'} ↗</a>
              : <a href="/hire/#book" className="text-link muted">Ask me about it →</a>}
          </span>
        </div>
      </div>
    </article>
  );
};

/** A game: the screen and a big "play" button, because playing it is the point. */
const GameCard: React.FC<{ project: Project }> = ({ project }) => (
  <article className="reveal work-card" style={{ border: '1px solid #1f2a22', background: '#0d140f', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <Shot project={project} />
    <div style={{ padding: '14px 16px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1, color: '#e4e4e7' }}>
      <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#4ade80' }}>{project.label}</div>
      <h3 style={{ fontFamily: 'var(--display)', fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', color: '#fafafa' }}>{project.title}</h3>
      <p className="clamp-2" style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.6 }}>{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="cta-primary small" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
          <i className="fas fa-play" style={{ fontSize: 9 }}></i> {project.linkLabel ?? 'Play'} ↗
        </a>
      )}
    </div>
  </article>
);

const Projects: React.FC = () => {
  const featured = PROJECTS.find(p => p.featured)!;
  const products = PROJECTS.filter(p => !p.featured && p.category === 'Product');
  const games = PROJECTS.filter(p => p.category === 'Game');

  return (
    <section id="work" className="sec">
      <div className="wrap">
        <SectionHead eyebrow="Selected work" title="Things I've shipped" intro="Products and games that are live and in use. Sprites, 3D and animation are on the Art & Assets page." />
        <Featured project={featured} />

        <div style={{ marginBottom: 40 }}>
          <GroupHead title="Products" count={products.length} note="AI tools & web apps" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {products.map(p => <CaseRow key={p.id} project={p} />)}
          </div>
        </div>

        <div>
          <GroupHead title="Games" count={games.length} note="Play them in your browser" />
          <div className="game-grid">
            {games.map(p => <GameCard key={p.id} project={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

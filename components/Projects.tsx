import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

type Filter = 'All' | Project['category'];
const FILTERS: Filter[] = ['All', 'Product', 'Game', 'Assets'];
const FILTER_LABELS: Record<Filter, string> = { All: 'All', Product: 'Products', Game: 'Games', Assets: 'Assets' };

const PALETTES: Record<string, { bg: string; line: string; dot: string; text: string }> = {
  '003': { bg: '#0f172a', line: '#1e3a8a', dot: '#3b82f6', text: '#60a5fa' },
  '004': { bg: '#0a0a0a', line: '#333', dot: '#555', text: '#888' },
};
const FALLBACK = { bg: '#0a1a0f', line: '#16a34a', dot: '#22c55e', text: '#16a34a' };

const Cover: React.FC<{ project: Project; fill?: boolean }> = ({ project, fill }) => {
  const { bg, line, dot, text } = PALETTES[project.id] || FALLBACK;
  const pixel = project.category !== 'Product';

  return (
    <div style={{ width: '100%', aspectRatio: fill ? undefined : '16/9', height: fill ? '100%' : undefined, minHeight: fill ? 240 : undefined, overflow: 'hidden', position: 'relative', background: bg }}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="cover-img"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left top', display: 'block', imageRendering: pixel ? 'pixelated' : 'auto' }}
        />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 6, position: 'absolute', top: 14, left: 14 }}>
            {[0, 1, 2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? dot : `${dot}40` }} />)}
          </div>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(20px,3vw,30px)', fontWeight: 800, color: text, letterSpacing: '-0.02em', textAlign: 'center', padding: '0 16px' }}>{project.title}</div>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${text}99` }}>{project.label}</div>
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: `${line}40` }} />
        </div>
      )}
      {project.badge && (
        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{project.badge}</span>
        </div>
      )}
    </div>
  );
};

const Featured: React.FC<{ project: Project }> = ({ project }) => {
  const isMobile = useIsMobile();
  return (
    <article className="reveal work-card" style={{ border: '1px solid #e8e8e8', overflow: 'hidden', marginBottom: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.25fr 1fr' }}>
        <Cover project={{ ...project, badge: 'Live' }} fill={!isMobile} />
        <div style={{ padding: isMobile ? '24px 20px' : '40px 40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 10 }}>Featured · {project.label}</div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 28 : 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>{project.title}</h3>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 18 }}>{project.description}</p>
          {project.features.slice(0, 3).map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, fontSize: 12, lineHeight: 1.6, color: '#444', marginBottom: 8 }}>
              <span style={{ color: '#16a34a', flexShrink: 0 }}>→</span><span>{f}</span>
            </div>
          ))}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '16px 0 24px' }}>
            {project.tags.map(t => <span key={t} className="pill static">{t}</span>)}
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

const Card: React.FC<{ project: Project }> = ({ project }) => {
  const isMobile = useIsMobile();
  const label = project.linkLabel ?? 'Visit live site';
  return (
    <article className="reveal work-card" style={{ border: '1px solid #e8e8e8', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Cover project={project} />
      <div style={{ padding: isMobile ? '20px' : '24px 26px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginBottom: 8 }}>{project.label}</div>
        <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 8 }}>{project.title}</h3>
        <p style={{ fontSize: 12, color: '#555', lineHeight: 1.65, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 18 }}>
          {project.tags.slice(0, 4).map(t => <span key={t} className="pill static">{t}</span>)}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #f0f0f0', minHeight: 44, display: 'flex', alignItems: 'center' }}>
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#16a34a' }}>
              {label} ↗
            </a>
          ) : (
            <a href="#book" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>Ask me about it →</a>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All');
  const isMobile = useIsMobile();
  const featured = PROJECTS.find(p => p.featured)!;
  const others = PROJECTS.filter(p => !p.featured && (filter === 'All' || p.category === filter));

  return (
    <section id="work" style={{ padding: isMobile ? '80px 20px' : '112px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 32 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Selected Work</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Things I've shipped</h2>
        </div>

        <Featured project={featured} />

        <div className="reveal" role="group" aria-label="Filter projects" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, margin: '40px 0 20px' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f} className={`pill${filter === f ? ' active' : ''}`}>{FILTER_LABELS[f]}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {others.map(p => <Card key={p.id} project={p} />)}
        </div>

        <div className="reveal" style={{ marginTop: 32, fontSize: 12, color: '#777' }}>
          More games and asset packs on <a href="https://pushthev1be.itch.io/" target="_blank" rel="noopener noreferrer" style={{ color: '#16a34a', fontWeight: 700 }}>itch.io ↗</a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

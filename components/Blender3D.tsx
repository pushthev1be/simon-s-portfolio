import React, { useEffect, useRef, useState } from 'react';
import { BLENDER_WORKS } from '../constants';
import { BlenderWork } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';
import SectionHead from './SectionHead';

type Filter = 'All' | BlenderWork['kind'];
const FILTERS: Filter[] = ['All', 'Animation', 'Model', 'VFX'];
const FILTER_LABELS: Record<Filter, string> = { All: 'All', Animation: 'Animations', Model: 'Models', VFX: 'VFX' };

/** Plays the clip only while it is on screen, so a page full of loops stays light. */
const Clip: React.FC<{ src: string; poster: string; title: string }> = ({ src, poster, title }) => {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.35 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-label={title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
};

const Tile: React.FC<{ work: BlenderWork }> = ({ work }) => (
  <article className="reveal work-card" style={{ border: '1px solid var(--charcoal-line)', background: 'var(--charcoal-2)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{ aspectRatio: '16/9', background: work.video ? '#2b2b2b' : '#cdcfce', overflow: 'hidden', position: 'relative' }}>
      {work.video
        ? <Clip src={work.video} poster={work.images[0]} title={work.title} />
        : <img src={work.images[0]} alt={work.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />}
      <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(28,28,31,0.9)', padding: '3px 8px', fontSize: 8, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-hi)' }}>{work.kind}</span>
    </div>
    <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h4 style={{ fontFamily: 'var(--display)', fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em', color: '#fafafa' }}>{work.title}</h4>
      <p className="clamp-2" style={{ fontSize: 11.5, color: '#a1a1aa', lineHeight: 1.6 }}>{work.description}</p>
    </div>
  </article>
);

const Blender3D: React.FC = () => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<Filter>('All');
  const works = filter === 'All' ? BLENDER_WORKS : BLENDER_WORKS.filter(w => w.kind === filter);

  return (
    <section id="3d" style={{ marginBottom: 48 }}>
        <div className="dark panel" style={{ padding: isMobile ? '28px 16px' : '36px 32px' }}>
          <SectionHead
            dark
            level={2}
            eyebrow="Blender"
            title="3D & Animation"
            intro="Models, combat animations and effects for my Roblox game, Project Powerhouse, much of it built by driving Blender from an AI agent over MCP."
            action={<a href="/mcp-setup/" className="cta-outline small">Set up Blender MCP →</a>}
          />
          <div className="reveal" role="group" aria-label="Filter 3D work" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {FILTERS.map(f => (
              <button key={f} aria-pressed={filter === f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
                {FILTER_LABELS[f]} <span style={{ opacity: 0.6 }}>{f === 'All' ? BLENDER_WORKS.length : BLENDER_WORKS.filter(w => w.kind === f).length}</span>
              </button>
            ))}
          </div>
          <div className="tile-grid">
            {works.map(w => <Tile key={w.id} work={w} />)}
          </div>
        </div>
    </section>
  );
};

export default Blender3D;

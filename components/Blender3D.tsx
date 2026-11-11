import React, { useEffect, useRef, useState } from 'react';
import { BLENDER_WORKS } from '../constants';
import { BlenderWork } from '../types';
import { useIsMobile } from '../hooks/useIsMobile';

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
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={title}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
};

/** A model's turnaround: every view side by side (renders share the grey studio backdrop). */
const Stills: React.FC<{ images: string[]; title: string }> = ({ images, title }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${images.length}, 1fr)`, height: '100%' }}>
    {images.map((src, k) => (
      <img key={src} src={src} alt={`${title}, view ${k + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
    ))}
  </div>
);

const WorkCard: React.FC<{ work: BlenderWork; wide?: boolean }> = ({ work, wide }) => (
  <article className="reveal work-card" style={{ border: '1px solid var(--charcoal-line)', background: 'var(--charcoal-2)', overflow: 'hidden', display: 'flex', flexDirection: 'column', gridColumn: wide ? '1 / -1' : undefined }}>
    <div style={{ aspectRatio: work.video || work.images.length < 2 ? '16/9' : '2.5/1', background: work.video ? '#2b2b2b' : '#cdcfce', overflow: 'hidden', position: 'relative' }}>
      {work.video ? <Clip src={work.video} poster={work.images[0]} title={work.title} /> : <Stills images={work.images} title={work.title} />}
      <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(28,28,31,0.88)', padding: '4px 10px', fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent-hi)' }}>{work.kind}</span>
    </div>
    <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#fafafa' }}>{work.title}</h3>
      <p style={{ fontSize: 12, color: '#a1a1aa', lineHeight: 1.7 }}>{work.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 6 }}>
        {work.tags.map(t => <span key={t} className="pill static">{t}</span>)}
      </div>
    </div>
  </article>
);

const Blender3D: React.FC = () => {
  const isMobile = useIsMobile();
  const [filter, setFilter] = useState<Filter>('All');
  const works = filter === 'All' ? BLENDER_WORKS : BLENDER_WORKS.filter(w => w.kind === filter);

  return (
    <section id="3d" className="dark" style={{ padding: isMobile ? '80px 20px' : '112px 48px', borderBottom: '1px solid var(--charcoal-line)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1px solid var(--charcoal-line)', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: 'var(--accent-hi)', marginBottom: 12 }}>Blender</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>3D &amp; Animation</h2>
            <p style={{ fontSize: 13, color: '#a1a1aa', lineHeight: 1.7, marginTop: 14, maxWidth: 620 }}>
              Models, combat animations and effects I built in Blender for my Roblox game, Project Powerhouse. Much of it was made by driving Blender from an AI agent over MCP.
            </p>
          </div>
          <a href="#/mcp-setup" className="cta-outline" style={{ padding: '10px 18px' }}>Set up Blender MCP →</a>
        </div>
        <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
          {FILTERS.map(f => (
            <button key={f} className={`pill${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>{FILTER_LABELS[f]}</button>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: 20 }}>
          {works.map(w => <WorkCard key={w.id} work={w} wide={!isMobile && w.kind === 'Model'} />)}
        </div>
      </div>
    </section>
  );
};

export default Blender3D;

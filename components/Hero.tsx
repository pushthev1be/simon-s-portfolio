import React, { useState, useEffect, useRef } from 'react';
import { STATS, PROJECTS, BLENDER_WORKS, THOUGHTS, PERSONAL_INFO } from '../constants';
import { SECTIONS, SectionPage } from '../sections';
import { GUIDES } from './Guides';
import { useIsMobile } from '../hooks/useIsMobile';

function useCounter(target: number, duration = 1400): [number, React.RefObject<HTMLDivElement>] {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null!);
  const started = useRef(false);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      let start = 0;
      const step = target / (duration / 16);
      const tick = () => {
        start += step;
        if (start >= target) { setVal(target); return; }
        setVal(Math.floor(start));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);

  return [val, ref];
}

const StatCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const [count, ref] = useCounter(value);
  return (
    <div ref={ref}>
      <div style={{ fontFamily: 'var(--display)', fontSize: 26, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999', marginTop: 6 }}>{label}</div>
    </div>
  );
};

/** What each quick link shows: a picture from that page and a count of what's inside. */
const QUICK: Record<SectionPage, { image: string; meta: string; hot?: boolean }> = {
  work: { image: '/uploads/oracledashboard.png', meta: `${PROJECTS.filter(p => p.category !== 'Assets').length} products & games` },
  art: { image: (BLENDER_WORKS.find(w => w.id === 'kata-cinematic') ?? BLENDER_WORKS[0]).images[0], meta: `${BLENDER_WORKS.length} 3D pieces · ${PROJECTS.filter(p => p.category === 'Assets').length} sprite packs` },
  guides: { image: GUIDES[0].image, meta: `${GUIDES.length} guides · ${THOUGHTS.length} posts` },
  hire: { image: '/profile.jpeg', meta: 'Free 30-minute call', hot: true },
};

const MORE = [
  { label: 'AI Thoughts', href: '/thoughts/' },
  { label: 'MCP setup guide', href: '/mcp-setup/' },
  { label: 'Aura emitters', href: '/aura-emitters/' },
  { label: 'GitHub badges', href: '/github-badges/' },
  { label: 'itch.io ↗', href: PERSONAL_INFO.itch },
  { label: 'GitHub ↗', href: PERSONAL_INFO.github },
];

/** The whole home page: who I am, the one coloured button, then a quick link to every other page. */
const Hero: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <section id="top" style={{ padding: isMobile ? '100px 20px 48px' : '120px 48px 64px' }}>
      <div className="wrap">
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 18, background: '#fff', padding: '6px 10px', border: '1px solid #dcfce7' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
          Available for new projects
        </div>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(34px, 4.8vw, 62px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em', color: '#0a0a0a', maxWidth: 820, marginBottom: 16 }}>
          I build AI products, web apps and games that <span style={{ color: '#16a34a' }}>ship.</span>
        </h1>
        <p className="reveal reveal-delay-2" style={{ fontSize: isMobile ? 13 : 15, lineHeight: 1.7, color: '#444', maxWidth: 580, marginBottom: 24 }}>
          Hi, I'm Simon, a full-stack engineer. I've taken a live, monetized AI platform from architecture to production on my own, and I can do the same for your idea.
        </p>
        <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
          <a href="/hire/#book" className="cta-primary"><i className="far fa-calendar"></i> Book a 30-min call</a>
          <a href="/work/" className="cta-outline">See my work →</a>
        </div>
        <div className="reveal reveal-delay-3" style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, max-content)', gap: isMobile ? '16px 18px' : 40, paddingTop: 18, borderTop: '1px solid #e8e8e8', maxWidth: 640, marginBottom: isMobile ? 36 : 48 }}>
          {STATS.map((s, i) => <StatCounter key={i} {...s} />)}
        </div>

        <nav aria-label="Pages" className="reveal reveal-delay-3">
          <div className="eyebrow" style={{ marginBottom: 12 }}>Explore</div>
          <div className="quick-grid" style={isMobile ? { gridTemplateColumns: '1fr' } : undefined}>
            {SECTIONS.map((s, i) => {
              const q = QUICK[s.id];
              return (
                <a key={s.id} href={s.href} className={`quick-card${q.hot ? ' hot' : ''}`}>
                  {!isMobile && (
                    <div className="quick-thumb">
                      <img src={q.image} alt="" loading="lazy" style={s.id === 'hire' ? { objectPosition: '50% 78%' } : undefined} />
                    </div>
                  )}
                  <div style={{ padding: '12px 14px 14px', display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#16a34a' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontFamily: 'var(--display)', fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em' }}>{s.label}</span>
                    </div>
                    <span style={{ fontSize: 12, color: '#555', lineHeight: 1.55 }}>{s.blurb}</span>
                    <span style={{ marginTop: 'auto', paddingTop: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: q.hot ? '#16a34a' : '#999' }}>
                      {q.meta}<span style={{ color: '#16a34a', fontSize: 12 }}>→</span>
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="more-links" style={{ marginTop: 18 }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#999' }}>Also</span>
            {MORE.map(m => (
              <a key={m.label} href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{m.label}</a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Hero;

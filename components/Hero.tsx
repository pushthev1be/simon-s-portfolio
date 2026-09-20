
import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../constants';
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
  const isMobile = useIsMobile();
  return (
    <div ref={ref} style={{ textAlign: 'left' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: isMobile ? 30 : 44, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#999', marginTop: 10 }}>{label}</div>
    </div>
  );
};

const Hero: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section id="top" style={{ minHeight: isMobile ? 'auto' : '92vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '110px 20px 64px' : '128px 48px 80px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 10, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 28 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }} />
          Available for new projects
        </div>
        <h1 className="reveal reveal-delay-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(40px, 7.2vw, 96px)', fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.045em', color: '#0a0a0a', maxWidth: 1000, marginBottom: 28 }}>
          I build AI products, web apps and games that <span style={{ color: '#16a34a' }}>ship.</span>
        </h1>
        <p className="reveal reveal-delay-2" style={{ fontSize: isMobile ? 14 : 16, lineHeight: 1.75, color: '#555', maxWidth: 620, marginBottom: 36 }}>
          Hi, I'm Simon, a full-stack engineer. I've taken a live, monetized AI platform from architecture to production on my own, and I can do the same for your idea.
        </p>
        <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: isMobile ? 48 : 72 }}>
          <a href="#book" className="cta-primary"><i className="far fa-calendar"></i> Book a 30-min call</a>
          <a href="#work" className="cta-outline">See my work ↓</a>
        </div>

        <div className="reveal reveal-delay-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: isMobile ? 12 : 24, paddingTop: 28, borderTop: '1px solid #e8e8e8', maxWidth: 800 }}>
          {STATS.map((s, i) => <StatCounter key={i} {...s} />)}
        </div>
      </div>
    </section>
  );
};

export default Hero;

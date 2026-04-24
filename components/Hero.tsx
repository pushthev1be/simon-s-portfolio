
import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, STATS } from '../constants';

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
    <div ref={ref} style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 52, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#999', marginTop: 10 }}>{label}</div>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '128px 48px 80px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div className="reveal" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.5em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 40 }}>
          Full-Stack Engineer — Indianapolis, IN
        </div>
        <div style={{ marginBottom: 56 }}>
          <div className="reveal" style={{ overflow: 'hidden' }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(68px, 11vw, 156px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.045em', color: '#0a0a0a' }}>SIMON</h1>
          </div>
          <div className="reveal reveal-delay-1" style={{ overflow: 'hidden' }}>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(68px, 11vw, 156px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.045em', background: 'linear-gradient(90deg,#15803d 0%,#22c55e 50%,#15803d 100%)', backgroundSize: '200% auto', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'shimmer 5s linear infinite' }}>OLAWUYI</h1>
          </div>
          <div className="reveal reveal-delay-2" style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.35em', textTransform: 'uppercase', color: '#bbb' }}>A.K.A.</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', color: '#0a0a0a' }}>PUSH</span>
            <span style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.04em', fontStyle: 'italic', maxWidth: 280, lineHeight: 1.4 }}>— you can't push something backward, only forward.</span>
          </div>
        </div>
        <div className="reveal reveal-delay-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end' }}>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: '#555', maxWidth: 460 }}>
            Self-taught. Solo-shipping. Building production-grade AI systems used by real people — from architecture to deployment.
          </p>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24, paddingBottom: 32, marginBottom: 32, borderBottom: '1px solid #e8e8e8' }}>
              {STATS.map((s, i) => <StatCounter key={i} {...s} />)}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#projects" className="cta-primary">View Work</a>
              <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer" className="cta-outline">Oracle AI ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

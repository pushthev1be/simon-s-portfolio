import React, { useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../constants';
import { useIsMobile } from '../hooks/useIsMobile';

declare global {
  interface Window { Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void } }
}

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js';
const EMBED_URL = `${PERSONAL_INFO.calendly}?hide_gdpr_banner=1&primary_color=16a34a`;

const Booking: React.FC = () => {
  const isMobile = useIsMobile();
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const mount = () => {
      if (el.childElementCount === 0) window.Calendly?.initInlineWidget({ url: EMBED_URL, parentElement: el });
    };
    if (window.Calendly) { mount(); return; }
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (!script) {
      script = document.createElement('script');
      script.src = SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
    script.addEventListener('load', mount);
    return () => script!.removeEventListener('load', mount);
  }, []);

  return (
    <section id="book" style={{ padding: isMobile ? '80px 20px' : '112px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 72, alignItems: 'start' }}>
        <div className="reveal">
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 16 }}>Book a Call</div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}>Let's talk about your project</h2>
          <p style={{ fontSize: 13, color: '#555', lineHeight: 1.8, marginBottom: 28 }}>
            A free 30-minute call. Tell me what you're building and where you're stuck, and I'll tell you honestly how I'd approach it.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
            {['30 minutes, video call', 'No prep needed, just bring the idea', 'You get a clear next step either way'].map(t => (
              <div key={t} style={{ display: 'flex', gap: 12, fontSize: 12, color: '#333' }}><span style={{ color: '#16a34a' }}>✓</span>{t}</div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid #e8e8e8' }}>
            <img src="/profile.jpeg" alt="Simon Olawuyi" width={52} height={52} style={{ flexShrink: 0, width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', border: '1px solid #e8e8e8' }} />
            <div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>Simon Olawuyi</div>
              <a href={`mailto:${PERSONAL_INFO.email}`} style={{ fontSize: 11, color: '#777' }}>Prefer email? {PERSONAL_INFO.email}</a>
            </div>
          </div>
        </div>

        <div className="reveal reveal-delay-1" style={{ border: '1px solid #e8e8e8', minHeight: 700, position: 'relative' }}>
          <div ref={host} style={{ minWidth: 0, height: isMobile ? 760 : 700, position: 'relative', zIndex: 1 }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, padding: 24, textAlign: 'center' }}>
            <div style={{ fontSize: 12, color: '#777' }}>Loading calendar…</div>
            <a href={PERSONAL_INFO.calendly} target="_blank" rel="noopener noreferrer" className="cta-primary">Open scheduling page ↗</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;


import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const PALETTES: Record<string, { bg: string; line: string; dot: string; text: string }> = {
  '001': { bg: '#0a1a0f', line: '#16a34a', dot: '#22c55e', text: '#16a34a' },
  '002': { bg: '#111827', line: '#374151', dot: '#6b7280', text: '#9ca3af' },
  '003': { bg: '#0f172a', line: '#1e3a8a', dot: '#3b82f6', text: '#60a5fa' },
  '004': { bg: '#0a0a0a', line: '#333', dot: '#555', text: '#888' },
};

const ProjectMockup: React.FC<{ project: Project }> = ({ project }) => {
  const { bg, line, dot, text } = PALETTES[project.id] || PALETTES['001'];

  if (project.image) {
    return (
      <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative', background: bg }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s ease' }}
          onMouseEnter={e => (e.target as HTMLImageElement).style.transform = 'scale(1.03)'}
          onMouseLeave={e => (e.target as HTMLImageElement).style.transform = 'scale(1)'}
        />
        {project.link && (
          <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Live</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', background: bg, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 28, borderBottom: `1px solid ${line}30`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 6, flexShrink: 0 }}>
        {[dot, dot, dot].map((c, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i === 0 ? c : `${c}40` }}></div>)}
        <div style={{ flex: 1, height: 1, background: `${line}20`, margin: '0 12px' }}></div>
        <div style={{ fontSize: 8, color: `${text}80`, letterSpacing: '0.1em' }}>{project.id}</div>
      </div>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}>
        {[...Array(10)].map((_, i) => <line key={`h${i}`} x1="0" y1={`${i * 11}%`} x2="100%" y2={`${i * 11}%`} stroke={line} strokeWidth="0.5" />)}
        {[...Array(14)].map((_, i) => <line key={`v${i}`} x1={`${i * 8}%`} y1="0" x2={`${i * 8}%`} y2="100%" stroke={line} strokeWidth="0.5" />)}
      </svg>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, position: 'relative' }}>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(18px,3vw,32px)', fontWeight: 800, color: text, letterSpacing: '-0.02em', textAlign: 'center', lineHeight: 1.1 }}>{project.title}</div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: `${text}80` }}>{project.label}</div>
      </div>
      <div style={{ height: 24, borderTop: `1px solid ${line}20`, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8, flexShrink: 0 }}>
        {project.tags.slice(0, 4).map(t => <span key={t} style={{ fontSize: 8, color: `${text}60` }}>{t}</span>)}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const featured = PROJECTS[0];
  const others = PROJECTS.slice(1);

  return (
    <section id="projects" style={{ padding: '120px 48px', borderBottom: '1px solid #e8e8e8' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 24, borderBottom: '1px solid #e8e8e8', marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 }}>Production Deployments</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(44px,5vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Projects</h2>
          </div>
          <span className="section-num">04 Works</span>
        </div>

        {/* Featured project */}
        <div
          className="reveal"
          style={{ border: '1px solid #e8e8e8', overflow: 'hidden', marginBottom: 1, transition: 'border-color 0.2s' }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#16a34a'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#e8e8e8'}
        >
          <ProjectMockup project={featured} />
          <div style={{ padding: '40px 48px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56 }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 10 }}>{featured.label}</div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 14 }}>{featured.title}</h3>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 24 }}>{featured.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                {featured.tags.map(t => <span key={t} className="pill">{t}</span>)}
              </div>
              {(expanded === 0 ? featured.features : featured.features.slice(0, 3)).map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, fontSize: 12, lineHeight: 1.65, color: '#444', marginBottom: 10 }}>
                  <span style={{ color: '#16a34a', flexShrink: 0, marginTop: 1 }}>→</span><span>{f}</span>
                </div>
              ))}
              <button
                onClick={() => setExpanded(expanded === 0 ? null : 0)}
                style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999', marginTop: 12, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.target as HTMLButtonElement).style.color = '#16a34a'}
                onMouseLeave={e => (e.target as HTMLButtonElement).style.color = '#999'}
              >
                {expanded === 0 ? '↑ Show less' : `↓ +${featured.features.length - 3} more details`}
              </button>
            </div>
            <div style={{ paddingLeft: 40, borderLeft: '1px solid #e8e8e8', display: 'flex', flexDirection: 'column', gap: 28 }}>
              <div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginBottom: 10 }}>Status</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#16a34a', animation: 'pulse 2s infinite' }}></div>
                  <span style={{ fontSize: 12, fontWeight: 700 }}>Live & Monetized</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#999', marginBottom: 10 }}>Scale</div>
                {[['18', 'Microservices'], ['13', 'External APIs'], ['3', 'Countries (US, NG, GH)'], ['4', 'Subscription Tiers']].map(([n, l]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>
                    <span style={{ fontWeight: 800, color: '#0a0a0a' }}>{n}</span>
                    <span style={{ color: '#777' }}>{l}</span>
                  </div>
                ))}
              </div>
              {featured.link && (
                <a href={featured.link} target="_blank" rel="noopener noreferrer" className="cta-primary" style={{ marginTop: 'auto', justifyContent: 'center' }}>
                  Visit Live Site ↗
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 1 }}>
          {others.map((p, idx) => {
            const isOpen = expanded === idx + 1;
            return (
              <div
                key={p.id}
                className="reveal"
                style={{ border: '1px solid #e8e8e8', overflow: 'hidden', transition: 'border-color 0.2s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#16a34a'}
                onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = '#e8e8e8'}
              >
                <ProjectMockup project={p} />
                <div style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#999' }}>{p.label}</div>
                    <div style={{ fontSize: 9, fontWeight: 700, color: '#ddd', letterSpacing: '0.1em' }}>{p.id}</div>
                  </div>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 10 }}>{p.title}</h3>
                  <p style={{ fontSize: 12, color: '#555', lineHeight: 1.65, marginBottom: 16 }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
                    {p.tags.map(t => <span key={t} className="pill">{t}</span>)}
                  </div>
                  {isOpen && p.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, fontSize: 11, lineHeight: 1.6, color: '#444', marginBottom: 8 }}>
                      <span style={{ color: '#16a34a', flexShrink: 0 }}>→</span><span>{f}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid #f0f0f0', marginTop: 8 }}>
                    <button
                      onClick={() => setExpanded(isOpen ? null : idx + 1)}
                      style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#999', transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.target as HTMLButtonElement).style.color = '#16a34a'}
                      onMouseLeave={e => (e.target as HTMLButtonElement).style.color = '#999'}
                    >
                      {isOpen ? '↑ Less' : '↓ Details'}
                    </button>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#16a34a' }}>
                        Live Site ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

export const GUIDES = [
  {
    id: 'auras', href: '/aura-emitters/', tag: 'Roblox VFX',
    title: 'Fire & lightning aura emitters',
    blurb: 'How the element auras in my Roblox game are built: placement, settings, code and the rules for auras that read well in a fight.',
    image: '/auras/fire-sword.jpg',
  },
  {
    id: 'mcp', href: '/mcp-setup/', tag: 'AI tooling',
    title: 'Blender + Roblox Studio MCP setup',
    blurb: 'Connect Blender and Roblox Studio to Claude, Gemini or Codex so an AI agent can build, rig and script for you.',
    image: '/mcp/studio-mcp-servers.jpg',
  },
  {
    id: 'badges', href: '/github-badges/', tag: 'GitHub',
    title: 'GitHub achievements tracker',
    blurb: 'Which GitHub badges I have earned, what each one needs, and a daily script that tracks progress to the next tier.',
    image: 'https://github.githubassets.com/assets/pull-shark-silver-0643f87ac9fd.png',
    contain: true,
  },
];

const Card: React.FC<{ g: typeof GUIDES[number] }> = ({ g }) => (
  <a href={g.href} className="guide-card" style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e2e2', background: '#fff', color: 'inherit', textDecoration: 'none' }}>
    <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', background: g.contain ? '#0f1115' : '#eee', display: 'grid', placeItems: 'center' }}>
      <img src={g.image} alt="" loading="lazy" style={g.contain ? { width: '38%' } : { width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
      <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#16a34a' }}>{g.tag}</span>
      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{g.title}</span>
      <span style={{ fontSize: 13, color: '#555', lineHeight: 1.65, flex: 1 }}>{g.blurb}</span>
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>Read the guide →</span>
    </div>
  </a>
);

/** Bottom of each guide page: the other guides, so a reader can keep going. */
export const MoreGuides: React.FC<{ current: string }> = ({ current }) => {
  const isMobile = useIsMobile();
  const others = GUIDES.filter(g => g.id !== current);
  return (
    <section style={{ borderTop: '1px solid #e8e8e8', marginTop: 40, paddingTop: 32 }}>
      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 16 }}>More guides</div>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : `repeat(${others.length}, 1fr)`, gap: 16 }}>
        {others.map(g => <Card key={g.id} g={g} />)}
      </div>
    </section>
  );
};


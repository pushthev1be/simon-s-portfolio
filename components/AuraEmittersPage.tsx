import React from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const label: React.CSSProperties = { fontSize: 10, fontWeight: 800, letterSpacing: '0.45em', textTransform: 'uppercase', color: '#16a34a', marginBottom: 12 };
const h2: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(26px,3.4vw,36px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 14 };
const h3: React.CSSProperties = { fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: '-0.02em', margin: '22px 0 8px' };
const body: React.CSSProperties = { fontSize: 13, color: '#444', lineHeight: 1.75 };
const inline: React.CSSProperties = { background: '#f4f4f4', padding: '1px 6px', fontSize: 12 };
const cell: React.CSSProperties = { padding: '8px 10px', borderBottom: '1px solid #eee', fontSize: 12, verticalAlign: 'top', textAlign: 'left' };

const Shot: React.FC<{ src: string; alt: string; caption: string }> = ({ src, alt, caption }) => (
  <figure style={{ margin: 0 }}>
    <a href={src} target="_blank" rel="noopener noreferrer" title="Open full size">
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', display: 'block', border: '1px solid #e2e2e2' }} />
    </a>
    <figcaption style={{ fontSize: 11, color: '#888', marginTop: 6, lineHeight: 1.5 }}>{caption}</figcaption>
  </figure>
);

const Table: React.FC<{ rows: [string, string, string][] }> = ({ rows }) => (
  <div style={{ overflowX: 'auto', margin: '10px 0' }}>
    <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 520 }}>
      <thead>
        <tr>{['Where', 'Emitter', 'Settings'].map(h => <th key={h} style={{ ...cell, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#888' }}>{h}</th>)}</tr>
      </thead>
      <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={cell}>{c}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

const CODE = `-- clone the element's flipbook emitter onto a body point, in the aura's colour
local function addElement(parent, template, def, rate, size)
	local e = template:Clone()
	e.Color = ColorSequence.new(def.edge, def.core)  -- recolour; never swap the texture
	e.LightEmission = 1
	e.Brightness = 3          -- the pack shipped Brightness 0, which drew it black
	e.Rate = rate
	e.Size = NumberSequence.new(size)
	e.LockedToPart = true     -- sticks to the body: nothing left behind while running
	e.VelocityInheritance = 0
	e.Acceleration = Vector3.new(0, 1.2, 0)  -- a slow rise, no sideways sway
	e.Parent = parent
	return e
end

-- Fire: the top of each shoulder + whatever is in the hand
for _, arm in ipairs({ char.LeftUpperArm, char.RightUpperArm }) do
	local a = Instance.new("Attachment")
	a.Position = Vector3.new(0, arm.Size.Y / 2, 0)
	a.Parent = arm
	addElement(a, flameTemplate, def, 5, 1.6)
end

-- the weapon effect follows every weapon swap
local weaponFx
char.ChildAdded:Connect(function(tool)
	local handle = tool:IsA("Tool") and tool:FindFirstChild("Handle")
	if not handle then return end
	if weaponFx then weaponFx.Parent = handle
	else weaponFx = addElement(handle, flameTemplate, def, 7, 1.3) end
end)`;

const RULES: [string, string][] = [
  ['One element, one effect', 'Fire only burns, Lightning only crackles. Mixing every emitter into every aura made them all look the same.'],
  ['Recolour, never re-texture', 'Change Color, LightEmission and Brightness. Swapping a flipbook texture for a plain one sliced the animation into a grid and wrecked the shape.'],
  ['It sticks to the body', 'LockedToPart on, no wind or sway. Released particles made Lightning leave a copy of the player behind and turned Fire into haze while running.'],
  ['Never hide the character', 'Flames sit on the shoulders and weapon, not over the torso. A dense haze reads as a blob in a fight.'],
  ['On all the time', 'The aura shows with any weapon or empty hands, and moves with each weapon swap.'],
  ['Dense enough for daylight', 'A first pass with ~7 particles alive per point is invisible at play distance. Check on screen, from the game camera.'],
  ['No rings', 'Expanding discs read as cheap. Flames, threads and flicks only.'],
];

const AuraEmittersPage: React.FC = () => {
  const isMobile = useIsMobile();
  const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, margin: '16px 0' };

  return (
    <main style={{ padding: isMobile ? '104px 20px 80px' : '128px 48px 112px', minHeight: '70vh' }}>
      <div style={{ maxWidth: 880, margin: '0 auto' }}>
        <a href="/" style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#999' }}>← Back to home</a>

        <header style={{ padding: '28px 0 28px', borderBottom: '1px solid #e8e8e8', marginBottom: 12 }}>
          <div style={label}>Roblox VFX notes</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(38px,6vw,64px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1 }}>Fire &amp; lightning aura emitters</h1>
          <p style={{ ...body, marginTop: 18, maxWidth: 680 }}>
            How the element auras in my Roblox game, Project Powerhouse, are built: where each emitter sits, the settings, and the rules I
            landed on after a lot of play-testing. Every screenshot is from the game in Roblox Studio.
          </p>
        </header>

        <section style={{ padding: '36px 0', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Fire</div>
          <h2 style={h2}>Flames on the shoulders and the weapon</h2>
          <div style={grid}>
            <Shot src="/auras/fire-sword.jpg" alt="Fire aura burning along a raised katana and at the hip" caption="Standing: flames lick off the sword and rise from the shoulders." />
            <Shot src="/auras/fire-run.jpg" alt="Fire aura on a running character" caption="Running: the flames stay on the shoulder instead of trailing behind as haze." />
          </div>
          <Table rows={[
            ['Top of each upper arm', 'Flame flipbook (4x4)', 'Rate 5 · Size 1.6 · aura colour, LightEmission 1'],
            ['Held weapon handle', 'Same flame flipbook', 'Rate 7 · Size 1.3 · moves to each new weapon'],
            ['Base at the feet', 'Flame wisps + rising lines', 'The pack effect, recoloured only'],
          ]} />
          <div style={{ maxWidth: 560 }}>
            <Shot src="/auras/fire-wisps.jpg" alt="Fire aura wisps at the feet" caption="The base wisps, recoloured from black to the aura's orange without touching their texture." />
          </div>
        </section>

        <section style={{ padding: '36px 0', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Lightning</div>
          <h2 style={h2}>Flicks crackling over the body</h2>
          <div style={grid}>
            <Shot src="/auras/lightning-arcs.jpg" alt="Lightning arcs crackling around a running character" caption="Arcs in the aura's colour along the arms and legs." />
            <Shot src="/auras/lightning-run.jpg" alt="Lightning flicks on the shoulder of a running character" caption="Mid-run: the flicks stay on the body, no copy left behind." />
          </div>
          <Table rows={[
            ['Upper and lower torso, both upper arms, both upper legs', 'Lightning flipbook (4x4)', 'Rate 2.4 · Size 1.3 · Brightness 3'],
            ['Held weapon handle', 'Same flipbook', 'Rate 4 · Size 1.0'],
          ]} />
          <p style={body}>
            The pack's lightning shipped with <span style={inline}>Brightness 0</span>, which is why it first drew as black smudges.
            Brightness 3 with <span style={inline}>LightEmission 1</span> lets it glow in the aura's own colour.
          </p>
        </section>

        <section style={{ padding: '36px 0', borderBottom: '1px solid #e8e8e8' }}>
          <div style={label}>Code</div>
          <h2 style={h2}>The emitter helper</h2>
          <p style={body}>Simplified from the game's client aura script. Everything is visual, so each player's game draws every character's aura.</p>
          <pre style={{ margin: '12px 0', padding: '14px 16px', overflowX: 'auto', fontSize: 12, lineHeight: 1.65, color: '#e5e5e5', background: '#0a0a0a', fontFamily: 'var(--mono)' }}>{CODE}</pre>
        </section>

        <section style={{ padding: '36px 0' }}>
          <div style={label}>Guidelines</div>
          <h2 style={h2}>Rules for auras that read well in a fight</h2>
          {RULES.map(([t, d]) => (
            <div key={t}>
              <h3 style={h3}>{t}</h3>
              <p style={body}>{d}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default AuraEmittersPage;

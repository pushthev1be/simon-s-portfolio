import React from 'react';
import SectionHead from './SectionHead';
import Blender3D from './Blender3D';
import AssetPacks from './AssetPacks';

/** Everything visual: Blender models/animations/VFX (dark gallery) and pixel-art packs (sprite shelf). */
const ArtPage: React.FC = () => (
  <section className="sec">
    <div className="wrap">
      <SectionHead
        eyebrow="Art & assets"
        title="Art & Assets"
        intro="3D models, animations and effects from Blender, plus pixel-art sprite packs you can use in your own games."
        action={
          <nav aria-label="On this page" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <a href="#3d" className="jump-chip"><span>01</span>3D & Animation</a>
            <a href="#assets" className="jump-chip"><span>02</span>Asset packs</a>
          </nav>
        }
      />
      <Blender3D />
      <AssetPacks />
    </div>
  </section>
);

export default ArtPage;

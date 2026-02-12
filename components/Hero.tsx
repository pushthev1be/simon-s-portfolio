
import React, { useState } from 'react';
import { PERSONAL_INFO } from '../constants';

const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const images = ['profile.jpg'];

  return (
    <section className="relative flex flex-col items-center text-center max-w-5xl mx-auto py-20 px-4 reveal">
      {/* Subject Information Dossier Frame */}
      <div className="absolute top-0 left-0 text-[10px] font-mono opacity-40 text-left p-4">
        <div>LAT: 39.7684° N</div>
        <div>LON: 86.1581° W</div>
        <div>REF: DOD_SITE_INDY</div>
      </div>

      {/* Animated Background Stamp */}
      <div className="absolute top-1/4 right-0 pointer-events-none -z-10 opacity-40 select-none">
        <div className="classified-stamp-animated text-3xl md:text-5xl">TS/SCI CLEARANCE REQUIRED</div>
      </div>

      <div className="relative mb-20 h-56 w-56 group cursor-pointer" onClick={() => setActiveIndex(prev => (prev + 1) % images.length)}>
        {/* Dossier Corner Accents */}
        <div className="hud-corner hud-tl border-green-500 !w-6 !h-6"></div>
        <div className="hud-corner hud-tr border-green-500 !w-6 !h-6"></div>
        <div className="hud-corner hud-bl border-green-500 !w-6 !h-6"></div>
        <div className="hud-corner hud-br border-green-500 !w-6 !h-6"></div>
        
        {images.map((img, idx) => {
          const offset = (idx - activeIndex + images.length) % images.length;
          return (
            <div
              key={img}
              style={{
                zIndex: images.length - offset,
                transform: offset === 0 ? 'scale(1.05)' : `translate(${offset * 12}px, ${offset * 8}px) scale(${1 - offset * 0.1})`,
                opacity: 1 - offset * 0.4
              }}
              className="absolute inset-0 border-2 border-green-900 bg-black overflow-hidden transition-all duration-700 shadow-[0_0_30px_rgba(34,197,94,0.1)]"
            >
              <img 
                src={img} 
                alt="Subject"
                className={`w-full h-full object-cover transition-all duration-1000 ${offset === 0 ? 'grayscale-0' : 'grayscale brightness-50'}`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=S+O&background=000&color=22c55e&size=512`;
                }}
              />
              {offset === 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-black text-[8px] font-bold py-0.5 animate-pulse uppercase">
                  Subject Verified // Active Target
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-4 mb-10">
        <div className="text-green-500 text-xs font-bold tracking-[0.5em] uppercase">
          [ ACCESSING_CORE_PROTOCOL ]
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight">
          <span className="block opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] [animation-delay:0.2s]">SUBJECT Dossier:</span>
          <span className="block shimmer-text opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] [animation-delay:0.4s]">SIMON_OLAWUYI</span>
        </h1>
      </div>

      <p className="text-green-800 text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-bold uppercase tracking-tight opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] [animation-delay:0.6s]">
        System Architect // Deploying mission-critical full-stack logic across decentralized networks and AI nodes.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-6 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards] [animation-delay:0.8s]">
        <a
          href="#projects"
          className="relative px-12 py-4 bg-green-500 text-black font-black hover:bg-white transition-all hover:scale-105 overflow-hidden group"
        >
          <span className="relative z-10">INITIATE OPERATIONS</span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </a>
        <a
          href={PERSONAL_INFO.github}
          className="px-12 py-4 border-2 border-green-500 text-green-500 font-black hover:bg-green-500 hover:text-black transition-all"
        >
          ENCRYPTED_REPO
        </a>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </section>
  );
};

export default Hero;

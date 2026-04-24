
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const STATS = [
  { value: '18', label: 'Microservices' },
  { value: '13', label: 'API Integrations' },
  { value: '3', label: 'Countries' },
  { value: '2+', label: 'Years Shipped' },
];

const Hero: React.FC = () => {
  return (
    <section className="relative flex flex-col items-center text-center max-w-5xl mx-auto py-16 px-4 reveal">

      {/* Subtle animated classified stamp */}
      <div className="absolute top-8 right-0 pointer-events-none -z-10 select-none hidden md:block">
        <div className="classified-stamp-animated text-2xl">CLASSIFIED // NOFORN</div>
      </div>

      {/* Profile photo */}
      <div className="relative mb-10 h-36 w-36 group">
        <div className="hud-corner hud-tl border-green-400 !w-5 !h-5"></div>
        <div className="hud-corner hud-tr border-green-400 !w-5 !h-5"></div>
        <div className="hud-corner hud-bl border-green-400 !w-5 !h-5"></div>
        <div className="hud-corner hud-br border-green-400 !w-5 !h-5"></div>
        <div className="absolute inset-0 border-2 border-gray-200 bg-gray-50 overflow-hidden">
          <img
            src="profile.jpeg"
            alt="Simon Olawuyi"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=S+O&background=16a34a&color=fff&size=512`;
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-[8px] font-black py-0.5 uppercase tracking-widest text-center">
            Verified
          </div>
        </div>
      </div>

      {/* Name & title */}
      <div className="space-y-3 mb-6">
        <div className="text-green-600 text-[10px] font-black tracking-[0.5em] uppercase">
          [ Full-Stack Engineer // Indianapolis, IN ]
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">
          <span className="block text-slate-900" style={{ animation: 'fadeIn 0.5s ease-out 0.2s both' }}>
            SIMON
          </span>
          <span className="block shimmer-text" style={{ animation: 'fadeIn 0.5s ease-out 0.4s both, shimmer 4s linear 0.4s infinite' }}>
            OLAWUYI
          </span>
        </h1>
      </div>

      {/* Summary */}
      <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed mb-10 font-medium"
        style={{ animation: 'fadeIn 0.5s ease-out 0.6s both' }}>
        Self-taught. Solo-shipping. Building production-grade AI systems and real products used by real people — from architecture to deployment.
      </p>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 w-full max-w-lg mb-10"
        style={{ animation: 'fadeIn 0.5s ease-out 0.7s both' }}>
        {STATS.map((stat, i) => (
          <div key={i} className="border border-gray-200 bg-gray-50 py-3 px-2 text-center hover:border-green-400 hover:bg-green-50 transition-all group cursor-default">
            <div className="text-2xl font-black text-slate-900 group-hover:text-green-600 transition-colors">{stat.value}</div>
            <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4"
        style={{ animation: 'fadeIn 0.5s ease-out 0.8s both' }}>
        <a
          href="#projects"
          className="px-8 py-3 bg-green-500 text-white font-black hover:bg-green-600 transition-all hover:scale-105 active:scale-95 shadow-md shadow-green-100"
        >
          VIEW PROJECTS
        </a>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-slate-900 text-slate-900 font-black hover:bg-slate-900 hover:text-white transition-all"
        >
          GITHUB
        </a>
        <a
          href={PERSONAL_INFO.website}
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-green-500 text-green-600 font-black hover:bg-green-500 hover:text-white transition-all"
        >
          ORACLE AI ↗
        </a>
      </div>
    </section>
  );
};

export default Hero;

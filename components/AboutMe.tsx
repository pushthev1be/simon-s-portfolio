
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const PHILOSOPHY = [
  { label: 'Ship', desc: 'Production deployments, not prototypes sitting in private repos.' },
  { label: 'Systems', desc: 'Think in architecture — every component connects to a larger whole.' },
  { label: 'Outcomes', desc: 'Motivated by real-world impact, not credentials or titles.' },
  { label: 'Compound', desc: 'Build products that get smarter and more valuable over time.' },
];

const AboutMe: React.FC = () => {
  return (
    <section className="relative py-10 reveal">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left: photo + quick facts */}
        <div className="space-y-6">
          <div className="relative border-2 border-gray-200 overflow-hidden group">
            <div className="hud-corner hud-tl border-green-400 !w-5 !h-5"></div>
            <div className="hud-corner hud-br border-green-400 !w-5 !h-5"></div>
            <img
              src="profile.jpeg"
              alt="Simon Olawuyi"
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=S+O&background=16a34a&color=fff&size=512'}
            />
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest">
              Asset #712 // Active
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: 'fa-envelope', text: PERSONAL_INFO.email },
              { icon: 'fa-phone', text: PERSONAL_INFO.phone },
              { icon: 'fa-map-marker-alt', text: PERSONAL_INFO.location },
              { icon: 'fa-globe', text: 'oracleai.live' },
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 p-3 bg-gray-50 hover:border-green-400 hover:bg-green-50 transition-all group">
                <i className={`fas ${item.icon} text-green-500 text-xs mb-1 block`}></i>
                <p className="text-[10px] font-mono text-gray-600 truncate group-hover:text-green-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: philosophy */}
        <div className="space-y-8">
          <div>
            <div className="text-[10px] text-green-600 font-black uppercase tracking-[0.4em] mb-2">Mission Brief</div>
            <h3 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
              About
            </h3>
            <p className="text-gray-600 leading-relaxed text-base border-l-4 border-green-500 pl-5">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          <div>
            <div className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-4">Operating Principles</div>
            <div className="space-y-3">
              {PHILOSOPHY.map((p, i) => (
                <div key={i} className="group flex gap-4 border border-gray-200 p-4 bg-white hover:border-green-400 hover:bg-green-50 hover:shadow-sm transition-all cursor-default">
                  <div className="text-green-500 font-black text-xl w-20 shrink-0">{p.label}</div>
                  <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;

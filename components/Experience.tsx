
import React from 'react';
import { DEBUG_LOGS, EDUCATION } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="space-y-32 py-20 relative">
      <div className="reveal relative">
        <div className="flex items-center gap-6 mb-16 border-b-4 border-green-900 pb-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">INCIDENT_LOGS</h2>
          <div className="flex-grow"></div>
          
          {/* Animated Classified Stamp */}
          <div className="hidden sm:block absolute -top-8 right-0 pointer-events-none">
            <div className="classified-stamp-animated text-3xl" style={{ animationDelay: '4s' }}>TOP SECRET // NOFORN</div>
          </div>
          
          <div className="classified-stamp opacity-40 sm:hidden">Top Secret</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {DEBUG_LOGS.map((log, idx) => (
            <div 
              key={idx} 
              className="group relative bg-black border-2 border-green-900 transition-all duration-500 hover:border-green-500 hover:shadow-[0_0_50px_rgba(34,197,94,0.1)] reveal"
            >
              <div className="hud-corner hud-tl border-green-900 group-hover:border-green-500"></div>
              <div className="hud-corner hud-tr border-green-900 group-hover:border-green-500"></div>
              <div className="hud-corner hud-bl border-green-900 group-hover:border-green-500"></div>
              <div className="hud-corner hud-br border-green-900 group-hover:border-green-500"></div>

              <div className="p-8 border-b-2 border-green-900 bg-green-500/5 flex justify-between items-center">
                <div className="space-y-1">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={`w-3 h-3 border border-green-500 ${i < log.difficulty ? 'bg-green-500' : 'bg-transparent'}`}></div>
                    ))}
                  </div>
                  <h3 className="text-xl font-black uppercase text-green-500">
                    REPORT: {log.title}
                  </h3>
                  <div className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                    REPO: {log.repository} // HASH: {log.commit}
                  </div>
                </div>
              </div>

              <div className="p-8 font-mono text-xs relative overflow-hidden h-[240px]">
                <div className="space-y-4 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="flex items-center gap-3 text-red-500 font-bold mb-4">
                    <span className="animate-pulse">&gt;&gt;&gt; THREAT_DETECTED</span>
                  </div>
                  <p className="opacity-80 leading-relaxed border-l-2 border-red-500/50 pl-4 uppercase">
                    "{log.symptom}"
                  </p>
                </div>

                <div className="absolute inset-0 bg-green-500/5 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col p-8 translate-y-4 group-hover:translate-y-0">
                  <div className="flex items-center gap-3 text-green-400 font-bold mb-6">
                    <i className="fas fa-check-double"></i>
                    <span className="tracking-[0.2em] uppercase">Resolution Verified</span>
                  </div>
                  <p className="text-green-200 text-sm leading-relaxed mb-8 flex-grow">
                    {log.resolution}
                  </p>
                  <div className="flex flex-wrap gap-2 opacity-50">
                    {log.tags.map(tag => (
                      <span key={tag} className="text-[10px] border border-green-500 px-2 py-1">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-green-900/20 h-1">
                <div className="h-full bg-green-500 animate-[progress_10s_linear_infinite]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes progress { 0% { width: 0; } 100% { width: 100%; } }`}</style>
    </section>
  );
};

export default Experience;

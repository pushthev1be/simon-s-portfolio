
import React from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="flex items-center gap-6 mb-16 reveal border-l-8 border-green-500 pl-6 relative">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">OPERATIONS</h2>
          <div className="text-[10px] opacity-40 uppercase tracking-[0.5em]">Active Strategic Deployments</div>
        </div>
        
        {/* Periodic Section Stamp */}
        <div className="absolute -top-10 -right-4 pointer-events-none opacity-20 hidden md:block">
          <div className="classified-stamp-animated text-2xl" style={{ animationDelay: '2s' }}>CONFIDENTIAL SOURCE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, idx) => (
          <div key={idx} className="group relative bg-black border-2 border-green-900 transition-all duration-500 hover:border-green-500 hover:-translate-y-2 reveal">
            <div className="hud-corner hud-tl border-green-900 group-hover:border-green-500"></div>
            <div className="hud-corner hud-tr border-green-900 group-hover:border-green-500"></div>
            <div className="hud-corner hud-bl border-green-900 group-hover:border-green-500"></div>
            <div className="hud-corner hud-br border-green-900 group-hover:border-green-500"></div>
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <div className="text-[10px] font-bold text-green-900 group-hover:text-green-500 transition-colors uppercase">
                  OP_ID: 00{idx + 1}
                </div>
                {project.link && (
                  <a href={project.link} className="text-green-500 hover:text-white"><i className="fas fa-terminal"></i></a>
                )}
              </div>

              <h3 className="text-2xl font-black mb-4 uppercase tracking-tighter text-green-500">{project.title}</h3>
              <p className="text-green-900 text-xs leading-relaxed mb-8 font-bold group-hover:text-green-700 transition-colors">
                {project.description}
              </p>

              <div className="space-y-2 mb-10">
                {project.features.slice(0, 3).map((f, fi) => (
                  <div key={fi} className="flex gap-3 text-[10px] items-center">
                    <span className="text-green-500">▶</span>
                    <span className="opacity-60">{f}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[9px] border border-green-900 group-hover:border-green-500 px-2 py-0.5 text-green-900 group-hover:text-green-500 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

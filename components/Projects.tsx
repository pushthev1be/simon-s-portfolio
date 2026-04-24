
import React, { useState } from 'react';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(PROJECTS.flatMap(p => p.tags)));
  const filtered = activeTag
    ? PROJECTS.filter(p => p.tags.includes(activeTag))
    : PROJECTS;

  const toggle = (idx: number) => setExpandedIdx(prev => prev === idx ? null : idx);

  return (
    <section className="py-10 relative reveal">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8 border-l-8 border-green-500 pl-5">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">PROJECTS</h2>
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] mt-1">Production Deployments</div>
        </div>
        <div className="absolute -top-8 -right-4 pointer-events-none hidden md:block">
          <div className="classified-stamp-animated text-xl" style={{ animationDelay: '3s' }}>CONFIDENTIAL</div>
        </div>
      </div>

      {/* Tag filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
            activeTag === null
              ? 'bg-green-500 text-white border-green-500'
              : 'text-gray-500 border-gray-300 hover:border-green-400 hover:text-green-600'
          }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border-2 transition-all ${
              activeTag === tag
                ? 'bg-green-500 text-white border-green-500'
                : 'text-gray-500 border-gray-300 hover:border-green-400 hover:text-green-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, idx) => {
          const isOpen = expandedIdx === idx;
          return (
            <div
              key={idx}
              className={`group relative bg-white border-2 transition-all duration-300 flex flex-col ${
                isOpen ? 'border-green-500 shadow-lg shadow-green-50' : 'border-gray-200 hover:border-green-400 hover:shadow-md'
              }`}
            >
              <div className="hud-corner hud-tl border-gray-300 group-hover:border-green-400 transition-colors"></div>
              <div className="hud-corner hud-br border-gray-300 group-hover:border-green-400 transition-colors"></div>

              <div className="p-6 flex-grow">
                {/* Card header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    OP_ID: 00{idx + 1}
                  </div>
                  <div className="flex gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-gray-400 hover:text-green-600 transition-colors"
                        title="Live site"
                      >
                        <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-2 tracking-tight text-slate-900">{project.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4">{project.description}</p>

                {/* Features list — toggleable */}
                <div className="space-y-1.5 mb-4">
                  {(isOpen ? project.features : project.features.slice(0, 2)).map((f, fi) => (
                    <div key={fi} className="flex gap-2 text-[11px] items-start">
                      <span className="text-green-500 mt-0.5 shrink-0">▶</span>
                      <span className="text-gray-600 leading-snug">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      onClick={() => setActiveTag(prev => prev === tag ? null : tag)}
                      className={`text-[9px] border px-2 py-0.5 cursor-pointer transition-all font-bold uppercase tracking-wider ${
                        activeTag === tag
                          ? 'bg-green-500 text-white border-green-500'
                          : 'border-gray-200 text-gray-400 hover:border-green-400 hover:text-green-600'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expand toggle */}
              {project.features.length > 2 && (
                <button
                  onClick={() => toggle(idx)}
                  className={`w-full py-2.5 text-[10px] font-black uppercase tracking-widest border-t-2 transition-all ${
                    isOpen
                      ? 'border-green-500 bg-green-50 text-green-700 hover:bg-green-100'
                      : 'border-gray-200 bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                  }`}
                >
                  {isOpen ? '▲ Show Less' : `▼ +${project.features.length - 2} More Details`}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400 font-mono text-sm">
          No projects match that filter.
        </div>
      )}
    </section>
  );
};

export default Projects;

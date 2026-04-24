
import React, { useState } from 'react';
import { DEBUG_LOGS, EDUCATION, CERTIFICATIONS } from '../constants';

const DIFF_LABELS = ['', 'Trivial', 'Easy', 'Moderate', 'Hard', 'Critical'];

const Experience: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const toggle = (idx: number) => setExpandedIdx(prev => prev === idx ? null : idx);

  return (
    <section id="experience" className="space-y-24 py-10 relative">

      {/* Debug Logs */}
      <div className="reveal">
        <div className="flex items-center gap-6 mb-8 border-l-8 border-green-500 pl-5 relative">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">DEBUG LOGS</h2>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] mt-1">
              Real bugs. Real fixes. Real commits.
            </div>
          </div>
          <div className="absolute -top-8 right-0 pointer-events-none hidden md:block">
            <div className="classified-stamp-animated text-xl" style={{ animationDelay: '5s' }}>TOP SECRET</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DEBUG_LOGS.map((log, idx) => {
            const isOpen = expandedIdx === idx;
            return (
              <div
                key={idx}
                className={`group relative bg-white border-2 transition-all duration-300 cursor-pointer ${
                  isOpen ? 'border-green-500 shadow-md shadow-green-50' : 'border-gray-200 hover:border-green-400 hover:shadow-sm'
                }`}
                onClick={() => toggle(idx)}
              >
                <div className="hud-corner hud-tl border-gray-200 group-hover:border-green-400 transition-colors"></div>
                <div className="hud-corner hud-br border-gray-200 group-hover:border-green-400 transition-colors"></div>

                {/* Card header */}
                <div className="p-5 border-b-2 border-gray-100 group-hover:border-green-100 transition-colors flex justify-between items-start gap-4">
                  <div className="space-y-2 min-w-0">
                    {/* Difficulty */}
                    <div className="flex gap-1 items-center">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-2.5 h-2.5 border ${
                          i < log.difficulty
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 bg-transparent'
                        }`}></div>
                      ))}
                      <span className="text-[9px] text-gray-400 ml-2 uppercase font-bold">{DIFF_LABELS[log.difficulty]}</span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 leading-snug">{log.title}</h3>
                    <div className="text-[10px] font-mono text-gray-400 uppercase">
                      {log.repository} // {log.commit}
                    </div>
                  </div>
                  <div className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <i className="fas fa-chevron-down text-xs"></i>
                  </div>
                </div>

                {/* Symptom always visible */}
                <div className="p-5">
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-red-500 text-[10px] font-black uppercase tracking-widest">Symptom</span>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed border-l-2 border-red-300 pl-3">
                    {log.symptom}
                  </p>
                </div>

                {/* Resolution — expanded only */}
                {isOpen && (
                  <div className="px-5 pb-5 border-t-2 border-green-100 pt-4 bg-green-50">
                    <div className="flex gap-2 items-center mb-2">
                      <i className="fas fa-check-double text-green-600 text-xs"></i>
                      <span className="text-green-700 text-[10px] font-black uppercase tracking-widest">Resolution</span>
                    </div>
                    <p className="text-gray-700 text-xs leading-relaxed mb-4">
                      {log.resolution}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {log.tags.map(tag => (
                        <span key={tag} className="text-[9px] border border-green-300 bg-white text-green-700 px-2 py-0.5 font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Progress bar */}
                <div className="h-0.5 bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-400" style={{ animation: 'progress 12s linear infinite' }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education & Certs */}
      <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <div className="border-l-8 border-green-500 pl-5 mb-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">EDUCATION</h2>
          </div>
          <div className="space-y-4">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="border border-gray-200 p-5 bg-white hover:border-green-400 hover:bg-green-50 transition-all">
                <div className="text-[10px] font-mono text-gray-400 mb-1">{edu.period}</div>
                <h4 className="text-base font-black text-slate-900">{edu.institution}</h4>
                <p className="text-sm text-gray-500 italic">{edu.degree}</p>
                {edu.location && <p className="text-[10px] text-gray-400 mt-1">{edu.location}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <div className="border-l-8 border-green-500 pl-5 mb-6">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">CERTS</h2>
          </div>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="border border-gray-200 p-5 bg-white hover:border-green-400 hover:bg-green-50 transition-all group">
                <div className="flex gap-3 items-start">
                  <div className="w-8 h-8 bg-green-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fas fa-certificate text-xs"></i>
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-snug">{cert.name}</p>
                    <p className="text-[10px] font-mono text-gray-400 mt-1">ID: {cert.id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

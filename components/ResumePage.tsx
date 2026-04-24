
import React from 'react';
import { PERSONAL_INFO, EXPERIENCE, PROJECTS, SKILLS, EDUCATION, CERTIFICATIONS } from '../constants';

const ResumePage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 md:px-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Floating Action Button for Printing */}
      <button 
        onClick={handlePrint}
        className="fixed bottom-24 left-6 z-50 w-12 h-12 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group print:hidden"
      >
        <i className="fas fa-print"></i>
        <span className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-gray-800">
          Print Resume / Save PDF
        </span>
      </button>

      <div className="bg-gray-900/40 border border-gray-800 rounded-3xl p-8 md:p-16 shadow-2xl backdrop-blur-sm relative overflow-hidden print:bg-white print:text-black print:p-0 print:border-none print:shadow-none">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] rounded-full pointer-events-none print:hidden"></div>
        
        {/* Header Section */}
        <header className="border-b border-gray-800 pb-10 mb-12 print:border-gray-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter print:text-black">
                {PERSONAL_INFO.name.toUpperCase()}
              </h1>
              <p className="text-xl text-green-500 font-bold uppercase tracking-widest print:text-green-600">
                {PERSONAL_INFO.title}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-right md:text-right text-gray-400 font-mono text-sm print:text-gray-600">
              <p><i className="fas fa-envelope mr-2 text-xs"></i> {PERSONAL_INFO.email}</p>
              <p><i className="fas fa-phone mr-2 text-xs"></i> {PERSONAL_INFO.phone}</p>
              <p><i className="fas fa-map-marker-alt mr-2 text-xs"></i> {PERSONAL_INFO.location}</p>
              <p><i className="fas fa-globe mr-2 text-xs"></i> {PERSONAL_INFO.website}</p>
              <div className="flex gap-4 justify-start md:justify-end mt-2 print:hidden">
                <a href={PERSONAL_INFO.linkedin} className="hover:text-white transition-colors"><i className="fab fa-linkedin"></i></a>
                <a href={PERSONAL_INFO.github} className="hover:text-white transition-colors"><i className="fab fa-github"></i></a>
                <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors"><i className="fas fa-globe"></i></a>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Summary */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                Professional Summary
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg print:text-gray-800">
                {PERSONAL_INFO.summary}
              </p>
            </section>

            {/* Experience */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                Experience
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <div className="space-y-10">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                      <h3 className="text-xl font-bold text-white print:text-black">{exp.role}</h3>
                      <span className="text-sm font-mono text-green-500 font-bold">{exp.period}</span>
                    </div>
                    <p className="text-gray-400 font-medium mb-4 print:text-gray-600 italic">{exp.company} • {exp.location}</p>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, bidx) => (
                        <li key={bidx} className="text-gray-400 text-sm flex gap-3 print:text-gray-700 leading-relaxed">
                          <span className="text-green-500 font-bold print:text-gray-400">/</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                Key Projects
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <div className="space-y-8">
                {PROJECTS.map((project, idx) => (
                  <div key={idx}>
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h3 className="text-lg font-bold text-white print:text-black">{project.title}</h3>
                      <span className="text-xs font-mono text-gray-500">{project.tags.join(' | ')}</span>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 print:text-gray-600">{project.description}</p>
                    <ul className="space-y-1">
                      {project.features.slice(0, 2).map((feat, fidx) => (
                        <li key={fidx} className="text-xs text-gray-500 flex gap-2 print:text-gray-700">
                          <span className="text-gray-700">•</span> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-12">
            {/* Skills */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                Skills & Technologies
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <div className="space-y-6">
                {SKILLS.map((group, idx) => ( group.items.length > 0 && (
                  <div key={idx}>
                    <h4 className="text-[10px] font-mono text-green-500 font-bold uppercase mb-2">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, iidx) => (
                        <span key={iidx} className="text-xs text-gray-300 bg-gray-800/50 px-2 py-0.5 rounded border border-gray-700/50 print:bg-gray-100 print:text-black print:border-gray-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                Education
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <div className="space-y-6">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="border-l-2 border-green-500/20 pl-4 py-1 print:border-gray-200">
                    <p className="text-xs font-mono text-gray-500 mb-1">{edu.period}</p>
                    <h4 className="text-sm font-bold text-white print:text-black">{edu.institution}</h4>
                    <p className="text-xs text-gray-400 italic print:text-gray-600">{edu.degree}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                Certifications
                <div className="h-[1px] flex-grow bg-gray-800 print:bg-gray-200"></div>
              </h2>
              <ul className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <li key={idx} className="border-l-2 border-green-500/20 pl-4 py-1 print:border-gray-200">
                    <p className="text-xs font-bold text-white print:text-black leading-snug">{cert.name}</p>
                    <p className="text-[10px] font-mono text-gray-500 mt-1">ID: {cert.id}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800 text-center print:border-gray-100">
          <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            Generated via SimonOlawuyi.portfolio // System Ref: {new Date().getFullYear()}
          </p>
        </footer>
      </div>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .glass { background: white !important; border: none !important; }
          #root { padding: 0 !important; }
        }
      `}</style>
    </div>
  );
};

export default ResumePage;

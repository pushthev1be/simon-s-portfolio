
import React, { useState } from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visible = SKILLS.filter(s => activeCategory === null || s.category === activeCategory);

  return (
    <section className="py-10 reveal">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8 border-l-8 border-green-500 pl-5">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">SKILLS</h2>
          <div className="text-[10px] text-gray-400 uppercase tracking-[0.4em] mt-1">Technical Arsenal</div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-2 transition-all ${
            activeCategory === null
              ? 'bg-green-500 text-white border-green-500'
              : 'text-gray-500 border-gray-300 hover:border-green-400 hover:text-green-600'
          }`}
        >
          All
        </button>
        {SKILLS.map(s => (
          <button
            key={s.category}
            onClick={() => setActiveCategory(prev => prev === s.category ? null : s.category)}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-2 transition-all ${
              activeCategory === s.category
                ? 'bg-green-500 text-white border-green-500'
                : 'text-gray-500 border-gray-300 hover:border-green-400 hover:text-green-600'
            }`}
          >
            {s.category}
          </button>
        ))}
      </div>

      {/* Skills grid — grouped by category */}
      <div className="space-y-6">
        {visible.map((group, gi) => (
          <div key={gi} className="group">
            <div className="text-[10px] font-black text-green-600 uppercase tracking-[0.4em] mb-3">{group.category}</div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill, si) => (
                <div
                  key={si}
                  className="px-3 py-2 border border-gray-200 bg-white text-sm text-gray-700 font-medium hover:border-green-400 hover:bg-green-50 hover:text-green-700 hover:-translate-y-0.5 hover:shadow-sm transition-all cursor-default"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

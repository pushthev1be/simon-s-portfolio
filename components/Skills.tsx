
import React, { useState } from 'react';
import { SKILLS } from '../constants';

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = SKILLS.map(s => s.category);

  return (
    <section>
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold">Skills & Stack</h2>
        <div className="h-[1px] flex-grow bg-gray-800"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm transition-all ${
            activeCategory === null
              ? 'bg-green-500 text-gray-950 font-bold'
              : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              activeCategory === cat
                ? 'bg-green-500 text-gray-950 font-bold'
                : 'bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {SKILLS.filter(s => activeCategory === null || s.category === activeCategory).flatMap(s => s.items).map((skill, idx) => (
          <div
            key={idx}
            className="group px-4 py-3 bg-gray-900/40 border border-gray-800 rounded-xl text-center transition-all duration-300 hover:border-green-500/40 hover:bg-gray-900 hover:scale-105 hover:-rotate-1 active:scale-95 cursor-default animate-in fade-in zoom-in"
          >
            <span className="text-sm font-medium text-gray-400 group-hover:text-green-400 transition-colors">
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;

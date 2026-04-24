
import React, { useState, useEffect } from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  onViewSwitch: (view: ViewMode) => void;
  currentView: ViewMode;
}

const Navbar: React.FC<NavbarProps> = ({ onViewSwitch, currentView }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#experience', label: 'Debug Logs' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 px-4 py-3 print:hidden transition-all duration-300`}>
      <div className={`max-w-6xl mx-auto flex items-center justify-between px-6 py-3 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 border border-gray-200 shadow-sm backdrop-blur-md'
          : 'bg-transparent'
      }`}>

        {/* Logo */}
        <button className="flex items-center gap-3 group" onClick={() => onViewSwitch('gui')}>
          <div className="w-9 h-9 bg-green-500 flex items-center justify-center font-black text-white text-sm group-hover:bg-green-600 transition-colors">
            SO
          </div>
          <span className="font-black text-lg tracking-tight text-slate-900 hidden sm:block">
            Simon Olawuyi
          </span>
        </button>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => { if (currentView !== 'gui') onViewSwitch('gui'); }}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-green-600 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewSwitch('resume')}
            className={`px-4 py-2 text-xs font-black uppercase tracking-widest border-2 transition-all ${
              currentView === 'resume'
                ? 'bg-green-500 text-white border-green-500'
                : 'text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-600'
            }`}
          >
            Resume
          </button>
          <button
            onClick={() => onViewSwitch(currentView === 'terminal' ? 'gui' : 'terminal')}
            className="px-4 py-2 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all text-xs font-black"
          >
            {currentView === 'terminal' ? '← GUI' : '$ CLI'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

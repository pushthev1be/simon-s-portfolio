
import React from 'react';
import { ViewMode } from '../types';

interface NavbarProps {
  onViewSwitch: (view: ViewMode) => void;
  currentView: ViewMode;
}

const Navbar: React.FC<NavbarProps> = ({ onViewSwitch, currentView }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 print:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-black/80 border-b-2 border-green-900 backdrop-blur-md px-8 py-3 relative">
        <div className="hud-corner hud-tl border-green-500 !w-3 !h-3"></div>
        <div className="hud-corner hud-tr border-green-500 !w-3 !h-3"></div>
        
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => onViewSwitch('gui')}>
          <div className="w-10 h-10 border-2 border-green-500 flex items-center justify-center font-black text-green-500 hover:bg-green-500 hover:text-black transition-all">
            S
          </div>
          <span className="font-black text-xl tracking-tighter uppercase hidden sm:block">Simon_OS_v2.5</span>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewSwitch('resume')}
              className={`px-6 py-1.5 text-[10px] font-black uppercase tracking-widest border-2 transition-all ${
                currentView === 'resume' ? 'bg-green-500 text-black border-green-500' : 'text-green-500 border-green-900 hover:border-green-500'
              }`}
            >
              Dossier_Print
            </button>
            <button
              onClick={() => onViewSwitch(currentView === 'terminal' ? 'gui' : 'terminal')}
              className="px-4 py-1.5 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all text-[10px] font-black"
            >
              {currentView === 'terminal' ? 'GUI_LINK' : 'SECURE_CLI'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

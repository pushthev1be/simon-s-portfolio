
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AboutMe from './components/AboutMe';
import ResumePage from './components/ResumePage';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import AIAssistant from './components/AIAssistant';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('gui');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState<string[]>([]);

  const bootSequence = [
    "U.S. DEPT OF DEFENSE // NETWORK ACCESS PORTAL",
    "ESTABLISHING SECURE HANDSHAKE...",
    "BYPASSING LOCAL PROXY... [OK]",
    "DECRYPTING SUBJECT_DOSSIER_ID: OLAWUYI... [OK]",
    "VERIFYING CLEARANCE LEVEL: TS/SCI...",
    "ACCESS GRANTED.",
    "LOADING HUD COMPONENTS..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 500);
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const handleViewSwitch = (newView: ViewMode) => {
    setViewMode(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono p-6 text-green-500">
        <div className="w-full max-w-lg space-y-2">
          {bootText.map((line, i) => (
            <div key={i} className="flex gap-2 animate-in fade-in slide-in-from-left-2 duration-150">
              <span className="opacity-50">[{i}]</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="w-full h-1 bg-green-900 mt-8 overflow-hidden">
            <div className="h-full bg-green-500 animate-[load_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
        <style>{`@keyframes load { 0% { width: 0; } 100% { width: 100%; } }`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-black text-green-500 selection:bg-green-500/30">
      {/* Grid Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e_1px,transparent_1px),linear-gradient(to_bottom,#22c55e_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <Navbar onViewSwitch={handleViewSwitch} currentView={viewMode} />

      <main className="container mx-auto px-4 relative z-10">
        {viewMode === 'gui' && (
          <div className="pt-24 space-y-32">
            <Hero />
            <div id="about">
              <AboutMe />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="experience">
              <Experience />
            </div>
            <Footer />
          </div>
        )}

        {viewMode === 'resume' && <ResumePage />}
        {viewMode === 'terminal' && <Terminal onExit={() => handleViewSwitch('gui')} />}
      </main>

      {/* Tactical AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="w-16 h-16 bg-black border-2 border-green-500 text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.2)] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-green-500/10 group-hover:bg-green-500/20"></div>
          {isAiOpen ? <i className="fas fa-times text-xl"></i> : <i className="fas fa-shield-halved text-xl"></i>}
          <div className="hud-corner hud-tl !w-2 !h-2 border-green-500"></div>
          <div className="hud-corner hud-tr !w-2 !h-2 border-green-500"></div>
          <div className="hud-corner hud-bl !w-2 !h-2 border-green-500"></div>
          <div className="hud-corner hud-br !w-2 !h-2 border-green-500"></div>
        </button>
      </div>

      {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
    </div>
  );
};

export default App;


import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import AboutMe from './components/AboutMe';
import Skills from './components/Skills';
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
    "INITIALIZING PORTFOLIO SYSTEM...",
    "LOADING SUBJECT_DOSSIER: OLAWUYI...",
    "VERIFYING CREDENTIALS... [OK]",
    "COMPILING PROJECT DATABASE... [OK]",
    "ESTABLISHING SECURE CONNECTION... [OK]",
    "ACCESS GRANTED.",
    "RENDERING INTERFACE..."
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setBootText(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setIsBooting(false), 400);
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
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center font-mono p-6 text-green-400">
        <div className="w-full max-w-lg space-y-2">
          {bootText.map((line, i) => (
            <div key={i} className="flex gap-2" style={{ animation: 'fadeIn 0.2s ease-out forwards' }}>
              <span className="opacity-40 text-green-600">[{String(i).padStart(2, '0')}]</span>
              <span>{line}</span>
            </div>
          ))}
          <div className="w-full h-0.5 bg-green-900 mt-10 overflow-hidden">
            <div className="h-full bg-green-400" style={{ animation: 'load 1.8s ease-in-out forwards' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-green-200">
      {/* Subtle dot grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <Navbar onViewSwitch={handleViewSwitch} currentView={viewMode} />

      <main className="container mx-auto px-4 relative z-10">
        {viewMode === 'gui' && (
          <div className="pt-24 space-y-28">
            <Hero />
            <div id="about">
              <AboutMe />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="skills">
              <Skills />
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

      {/* AI Assistant Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Ask AI about Simon"
        >
          {isAiOpen ? <i className="fas fa-times text-lg"></i> : <i className="fas fa-robot text-lg"></i>}
        </button>
      </div>

      {isAiOpen && <AIAssistant onClose={() => setIsAiOpen(false)} />}
    </div>
  );
};

export default App;

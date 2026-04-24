
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import DebugLogs from './components/DebugLogs';
import EduCerts from './components/EduCerts';
import Footer from './components/Footer';

const BOOT_LINES = [
  "INITIALIZING PORTFOLIO v2.0...",
  "LOADING SUBJECT: S.OLAWUYI...",
  "VERIFYING CREDENTIALS ......... [OK]",
  "ORACLE ODDS AI STATUS: LIVE ✓",
  "ACCESS GRANTED.",
];

const Boot: React.FC<{ onDone: () => void }> = ({ onDone }) => {
  const [shown, setShown] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setShown(p => [...p, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(iv);
        setTimeout(onDone, 600);
      }
    }, 220);
    return () => clearInterval(iv);
  }, []);

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, fontFamily: 'var(--mono)' }}>
      <div style={{ maxWidth: 480, width: '100%', padding: 40 }}>
        {shown.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, lineHeight: 2.2, animation: 'fadeIn 0.25s ease-out' }}>
            <span style={{ color: '#16a34a', fontSize: 11, fontWeight: 800, minWidth: 28 }}>{String(i + 1).padStart(2, '0')}</span>
            <span style={{ fontSize: 12, color: '#0a0a0a' }}>{line}</span>
          </div>
        ))}
        {shown.length === BOOT_LINES.length && (
          <div style={{ marginTop: 32, height: 2, background: '#f0f0f0', overflow: 'hidden' }}>
            <div style={{ height: '100%', background: '#16a34a', animation: 'load 0.8s ease-out forwards', width: '100%' }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <Boot onDone={() => setBooted(true)} />}
      {booted && (
        <div>
          <Navbar />
          <Hero />
          <AboutMe />
          <Projects />
          <Skills />
          <DebugLogs />
          <EduCerts />
          <Footer />
        </div>
      )}
    </>
  );
};

export default App;

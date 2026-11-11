import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Thoughts from './components/Thoughts';
import ThoughtsPage from './components/ThoughtsPage';
import Blender3D from './components/Blender3D';
import McpSetupPage from './components/McpSetupPage';
import JumpStrip from './components/JumpStrip';
import SectionRail from './components/SectionRail';
import Booking from './components/Booking';
import Footer from './components/Footer';
import { useRoute } from './hooks/useRoute';

const App: React.FC = () => {
  const route = useRoute();
  const slug = route.page === 'thoughts' ? route.slug : undefined;

  // Hash routing: keep scroll position sensible when switching pages.
  useEffect(() => {
    const id = route.page === 'thoughts' ? (slug ? `thought-${slug}` : null) : route.page === 'mcp' ? null : decodeURIComponent(window.location.hash.slice(1));
    const t = requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else if (route.page !== 'home') window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(t);
  }, [route.page, slug]);

  return (
    <>
      <Navbar />
      {route.page === 'thoughts' ? (
        <ThoughtsPage slug={slug} />
      ) : route.page === 'mcp' ? (
        <McpSetupPage />
      ) : (
        <main>
          <Hero />
          <JumpStrip />
          <SectionRail />
          <Projects />
          <Blender3D />
          <Services />
          <Thoughts />
          <Booking />
        </main>
      )}
      <Footer />
    </>
  );
};

export default App;

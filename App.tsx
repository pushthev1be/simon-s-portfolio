import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Services from './components/Services';
import Thoughts from './components/Thoughts';
import ThoughtsPage from './components/ThoughtsPage';
import Booking from './components/Booking';
import Footer from './components/Footer';
import { useRoute } from './hooks/useRoute';

const App: React.FC = () => {
  const route = useRoute();
  const slug = route.page === 'thoughts' ? route.slug : undefined;

  // Hash routing: keep scroll position sensible when switching pages.
  useEffect(() => {
    const id = route.page === 'thoughts' ? (slug ? `thought-${slug}` : null) : decodeURIComponent(window.location.hash.slice(1));
    const t = requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else if (route.page === 'thoughts') window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(t);
  }, [route.page, slug]);

  return (
    <>
      <Navbar />
      {route.page === 'thoughts' ? (
        <ThoughtsPage slug={slug} />
      ) : (
        <main>
          <Hero />
          <Projects />
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

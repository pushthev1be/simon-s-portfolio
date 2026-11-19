import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import ArtPage from './components/ArtPage';
import Learn from './components/Learn';
import Hire from './components/Hire';
import ThoughtsPage from './components/ThoughtsPage';
import McpSetupPage from './components/McpSetupPage';
import AuraEmittersPage from './components/AuraEmittersPage';
import GithubBadgesPage from './components/GithubBadgesPage';
import SpaceGame from './components/SpaceGame';
import Footer from './components/Footer';
import { useRoute } from './hooks/useRoute';

/** The home page is just the hero and quick links; Work, Art & Assets, Guides & Writing and Hire me each
 *  have their own page. The dotted space shooter plays behind those five, not behind the long articles. */
const App: React.FC = () => {
  const route = useRoute();
  const slug = route.page === 'thoughts' ? route.slug : undefined;

  // land on the anchor in the URL (/hire/#book, /thoughts/#post), else at the top of the page
  useEffect(() => {
    const id = route.page === 'thoughts' ? (slug ? `thought-${slug}` : null) : decodeURIComponent(window.location.hash.slice(1)) || null;
    const t = requestAnimationFrame(() => {
      const el = id ? document.getElementById(id) : null;
      if (el) el.scrollIntoView();
      else window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(t);
  }, [route.page, slug]);

  const page =
    route.page === 'home' ? <Hero /> :
    route.page === 'work' ? <Projects /> :
    route.page === 'art' ? <ArtPage /> :
    route.page === 'guides' ? <Learn /> :
    route.page === 'hire' ? <Hire /> : null;

  return (
    <>
      <Navbar />
      {page ? (
        <>
          <SpaceGame />
          <main className={route.page === 'home' ? undefined : 'page'} style={route.page === 'home' ? { position: 'relative', zIndex: 1 } : undefined}>
            {page}
          </main>
        </>
      ) : route.page === 'thoughts' ? (
        <ThoughtsPage slug={slug} />
      ) : route.page === 'mcp' ? (
        <McpSetupPage />
      ) : route.page === 'auras' ? (
        <AuraEmittersPage />
      ) : (
        <GithubBadgesPage />
      )}
      <Footer />
    </>
  );
};

export default App;

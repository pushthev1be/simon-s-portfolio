import { useState, useEffect } from 'react';

export type Route = { page: 'home' } | { page: 'thoughts'; slug?: string };

function parse(hash: string): Route {
  const m = hash.match(/^#\/thoughts(?:\/([\w-]+))?\/?$/);
  return m ? { page: 'thoughts', slug: m[1] } : { page: 'home' };
}

export function useRoute(): Route {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const fn = () => setHash(window.location.hash);
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);
  return parse(hash);
}

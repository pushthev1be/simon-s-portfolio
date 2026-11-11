import { useState, useEffect } from 'react';

export type Route = { page: 'home' } | { page: 'thoughts'; slug?: string } | { page: 'mcp' };

function parse(hash: string): Route {
  if (/^#\/mcp-setup\/?$/.test(hash)) return { page: 'mcp' };
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

import { useState, useEffect } from 'react';

export type Route = { page: 'home' } | { page: 'thoughts'; slug?: string } | { page: 'mcp' };

/**
 * Real URLs (indexable by search engines): /mcp-setup/ and /thoughts/ (a post opens with /thoughts/#slug).
 * The old hash links (#/mcp-setup, #/thoughts/slug) still work so nothing already shared breaks.
 */
function parse(path: string, hash: string): Route {
  if (/^\/mcp-setup\/?$/.test(path)) return { page: 'mcp' };
  if (/^\/thoughts\/?$/.test(path)) {
    const slug = hash.match(/^#([\w-]+)$/)?.[1];
    return { page: 'thoughts', slug };
  }
  if (/^#\/mcp-setup\/?$/.test(hash)) return { page: 'mcp' };
  const m = hash.match(/^#\/thoughts(?:\/([\w-]+))?\/?$/);
  return m ? { page: 'thoughts', slug: m[1] } : { page: 'home' };
}

export function useRoute(): Route {
  const [loc, setLoc] = useState(() => [window.location.pathname, window.location.hash]);
  useEffect(() => {
    const fn = () => setLoc([window.location.pathname, window.location.hash]);
    window.addEventListener('hashchange', fn);
    window.addEventListener('popstate', fn);
    return () => {
      window.removeEventListener('hashchange', fn);
      window.removeEventListener('popstate', fn);
    };
  }, []);
  return parse(loc[0], loc[1]);
}

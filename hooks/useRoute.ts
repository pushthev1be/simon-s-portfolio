import { useState, useEffect } from 'react';
import { OLD_ANCHORS, SectionPage } from '../sections';

export type Route = { page: 'home' } | { page: SectionPage } | { page: 'thoughts'; slug?: string } | { page: 'mcp' } | { page: 'auras' } | { page: 'badges' };

/**
 * Real URLs (indexable by search engines): /mcp-setup/ and /thoughts/ (a post opens with /thoughts/#slug).
 * The old hash links (#/mcp-setup, #/thoughts/slug) still work so nothing already shared breaks.
 */
function parse(path: string, hash: string): Route {
  if (/^\/work\/?$/.test(path)) return { page: 'work' };
  if (/^\/art\/?$/.test(path)) return { page: 'art' };
  if (/^\/guides\/?$/.test(path)) return { page: 'guides' };
  if (/^\/hire\/?$/.test(path)) return { page: 'hire' };
  if (/^\/mcp-setup\/?$/.test(path)) return { page: 'mcp' };
  if (/^\/aura-emitters\/?$/.test(path)) return { page: 'auras' };
  if (/^\/github-badges\/?$/.test(path)) return { page: 'badges' };
  if (/^\/thoughts\/?$/.test(path)) {
    const slug = hash.match(/^#([\w-]+)$/)?.[1];
    return { page: 'thoughts', slug };
  }
  if (/^#\/mcp-setup\/?$/.test(hash)) return { page: 'mcp' };
  const m = hash.match(/^#\/thoughts(?:\/([\w-]+))?\/?$/);
  return m ? { page: 'thoughts', slug: m[1] } : { page: 'home' };
}

/** The site used to be one long page: send old anchors (/#work, /#book ...) to the page that has them now. */
function upgradeOldAnchor() {
  const to = window.location.pathname === '/' ? OLD_ANCHORS[window.location.hash] : undefined;
  if (to) window.history.replaceState(null, '', to);
}

export function useRoute(): Route {
  const [loc, setLoc] = useState(() => { upgradeOldAnchor(); return [window.location.pathname, window.location.hash]; });
  useEffect(() => {
    const fn = () => { upgradeOldAnchor(); setLoc([window.location.pathname, window.location.hash]); };
    window.addEventListener('hashchange', fn);
    window.addEventListener('popstate', fn);
    return () => {
      window.removeEventListener('hashchange', fn);
      window.removeEventListener('popstate', fn);
    };
  }, []);
  return parse(loc[0], loc[1]);
}

import { useEffect, useState } from 'react';

/** The site's main stops, in page order. `page` entries open their own route instead of scrolling. */
export const SECTIONS: { id: string; label: string; href: string; page?: 'thoughts' | 'mcp' }[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: '3d', label: '3D', href: '#3d' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'thoughts', label: 'AI Thoughts', href: '#thoughts', page: 'thoughts' },
  { id: 'mcp', label: 'MCP Guide', href: '#/mcp-setup', page: 'mcp' },
  { id: 'book', label: 'Book a Call', href: '#book' },
];

/** Which home-page section is in the middle of the screen right now ('' above the first one). */
export function useActiveSection(enabled: boolean): string {
  const [active, setActive] = useState('');
  useEffect(() => {
    if (!enabled) { setActive(''); return; }
    const ids = SECTIONS.filter(s => s.id !== 'mcp').map(s => s.id);
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    // sections mount after the first paint
    const t = window.setTimeout(update, 300);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      window.clearTimeout(t);
    };
  }, [enabled]);
  return active;
}

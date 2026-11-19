/** The site's main pages (the navbar, the home page's quick links). Each opens its own URL. */
export type SectionPage = 'work' | 'art' | 'guides' | 'hire';

export const SECTIONS: { id: SectionPage; label: string; href: string; blurb: string }[] = [
  { id: 'work', label: 'Work', href: '/work/', blurb: 'AI products and browser games that are live and in use.' },
  { id: 'art', label: 'Art & Assets', href: '/art/', blurb: 'Blender models, combat animations and VFX, plus pixel-art sprite packs.' },
  { id: 'guides', label: 'Guides & Writing', href: '/guides/', blurb: 'Step-by-step build guides, plus my writing on where AI is going.' },
  { id: 'hire', label: 'Hire me', href: '/hire/', blurb: 'What I can build for you, and a free 30-minute call.' },
];

/** Old one-page anchors (/#work, /#book ...) and where they live now. */
export const OLD_ANCHORS: Record<string, string> = {
  '#work': '/work/', '#3d': '/art/', '#learn': '/guides/', '#guides': '/guides/', '#thoughts': '/guides/#thoughts',
  '#services': '/hire/', '#hire': '/hire/', '#book': '/hire/#book',
};

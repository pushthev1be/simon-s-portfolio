import { THOUGHTS } from '../constants';

/** Newest first; used by the AI Thoughts page and the home page's Guides & writing section. */
export const sortedThoughts = () => [...THOUGHTS].sort((a, b) => b.date.localeCompare(a.date));

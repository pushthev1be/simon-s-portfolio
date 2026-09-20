
export interface Project {
  id: string;
  title: string;
  label: string;
  description: string;
  link?: string;
  image?: string;
  featured?: boolean;
  category: 'Product' | 'Game' | 'Assets';
  linkLabel?: string;
  badge?: string;
  tags: string[];
  features: string[];
}

export interface DebugLog {
  title: string;
  repository: string;
  commit: string;
  difficulty: number;
  symptom: string;
  investigation: string;
  resolution: string;
  tags: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Education {
  institution: string;
  period: string;
  degree: string;
  location?: string;
}

export interface Certification {
  name: string;
  id: string;
  image?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Thought {
  slug: string;
  title: string;
  /** ISO date, e.g. 2026-08-04. Posts are shown newest first. */
  date: string;
  author: string;
  summary: string;
  /** Path under /public, e.g. /thoughts/my-post.pdf. Shows a Download PDF button. */
  pdf?: string;
  cover?: string;
  /** Optional. Include it to make the post readable on the page; leave it out for PDF-only posts. */
  /** Paragraphs shown before the first section. Wrap text in *asterisks* for italics. */
  intro?: string[];
  sections?: { heading: string; paragraphs: string[]; footnote?: string }[];
  postscript?: string;
}

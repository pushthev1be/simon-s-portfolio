
export interface Project {
  title: string;
  description: string;
  link?: string;
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
}

export type ViewMode = 'gui' | 'terminal' | 'resume';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export type Mode = 'ai' | 'web' | null;

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  type: 'ai' | 'web';
}

export interface Skill {
  name: string;
  icon: any;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

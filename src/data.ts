import { Project, Skill, Experience } from './types';
import { BrainCircuit, Database, Server, Code2, Cpu, Wrench, Layers, Workflow, Terminal } from 'lucide-react';

export const SOCIAL_LINKS = {
  github: 'https://github.com/chsagar141',
  linkedin: 'https://www.linkedin.com/in/ch-sagar/',
  civitai: 'https://civitai.com/user/Dead_Sec',
  huggingface: 'https://huggingface.co/chsagar141',
  email: 'mailto:Chsagar141@gmail.com',
  phone: 'tel:+918458050298',
};

export const AI_SKILLS: Skill[] = [
  { name: 'Generative AI Workflows', icon: BrainCircuit },
  { name: 'ComfyUI & Kohya_ss', icon: Workflow },
  { name: 'LoRA Training', icon: Layers },
  { name: 'Dataset Management', icon: Database },
  { name: 'LLM Integrations', icon: Cpu },
  { name: 'Python Automation', icon: Terminal },
];

export const WEB_SKILLS: Skill[] = [
  { name: 'FastAPI', icon: Server },
  { name: 'MySQL Database', icon: Database },
  { name: 'REST APIs', icon: Code2 },
  { name: 'Python Backend', icon: Terminal },
  { name: 'Java & Spring Boot', icon: Layers },
  { name: 'HTML/CSS/JS', icon: Wrench },
];

export const PROJECTS: Project[] = [
  {
    id: 'ai-1',
    title: 'Advanced ComfyUI Workflows',
    description: 'Developed and optimized custom ComfyUI workflows for high-quality image generation, utilizing custom nodes and LoRA sequencing.',
    tech: ['ComfyUI', 'Stable Diffusion', 'Python', 'JSON'],
    type: 'ai'
  },
  {
    id: 'ai-2',
    title: 'LoRA Model Fine-Tuning',
    description: 'Managed and refined datasets to train highly accurate LoRA models using kohya_ss, improving output consistency for specialized generative tasks.',
    tech: ['kohya_ss', 'Dataset Curation', 'PyTorch'],
    type: 'ai'
  },
  {
    id: 'ai-3',
    title: 'Google Modal Notebooks',
    description: 'Experimental AI systems, cloud-based notebook integrations, and automation scripts for scalable generative models.',
    tech: ['Python', 'Jupyter', 'Modal', 'APIs'],
    link: 'https://github.com/chsagar141/Google-Modal-Noteboks',
    type: 'ai',
  },
  {
    id: 'web-1',
    title: 'Student ERP Backend System',
    description: 'Developing a secure student management system backend with authentication, dashboard analytics, and robust REST APIs.',
    tech: ['FastAPI', 'MySQL', 'Python'],
    link: 'https://github.com/chsagar141/Student-ERP',
    type: 'web'
  },
  {
    id: 'web-2',
    title: 'E-Library Web Application',
    description: 'Lightweight web application for managing and displaying book data with Python-based backend logic and JSON storage.',
    tech: ['Python', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/chsagar141/E-library',
    type: 'web'
  },
  {
    id: 'web-3',
    title: 'Scalable REST APIs',
    description: 'Designed and implemented high-performance backend endpoints using FastAPI and MySQL query optimization for reliable server-side solutions.',
    tech: ['FastAPI', 'MySQL Optimization', 'Pydantic'],
    type: 'web'
  }
];

export const EXPERIENCE_AI: Experience[] = [
  {
    role: 'Freelance AI Tools Developer',
    company: 'Self-Employed',
    period: '2024 - Present',
    description: [
      'Executed AI-driven workflows using ComfyUI and kohya_ss for image generation and LoRA-based model usage.',
      'Managed and refined datasets to improve model performance and output quality.',
      'Delivered 30+ AI-based projects for 12+ clients, ensuring consistent and high-quality results.',
      'Generated $1,500+ in freelance earnings through independent project work.'
    ]
  }
];

export const EXPERIENCE_WEB: Experience[] = [
  {
    role: 'Freelance Backend Developer',
    company: 'Self-Employed',
    period: '2024 - Present',
    description: [
      'Leveraged Python for scripting and automating repetitive tasks within server workflows.',
      'Designed well-structured MySQL databases and wrote efficient queries for Backend systems.',
      'Developed robust REST APIs using FastAPI for various independent projects.',
      'Passionate about clean architecture and solving real-world problems through reliable server-side solutions.'
    ]
  }
];

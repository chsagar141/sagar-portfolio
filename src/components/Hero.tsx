import { motion } from 'motion/react';
import { Mode } from '../types';
import { SOCIAL_LINKS } from '../data';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Hero({ mode }: { mode: Mode }) {
  const isAi = mode === 'ai';
  
  const accentColor = isAi ? 'text-indigo-400' : 'text-emerald-400';
  const role = isAi ? 'AI Tools & Systems Developer' : 'Backend & Web Developer';
  const description = isAi 
    ? 'Building scalable ComfyUI workflows, LoRA models, and AI automation pipelines. Specializing in generative models and data curation.'
    : 'Architecting robust REST APIs, optimizing MySQL databases, and building full-stack applications with FastAPI and React.';
    
  return (
    <section className="pt-40 pb-24 md:pt-56 md:pb-32 px-8 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          key={`hero-tag-${mode}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center space-x-4"
        >
          <div className={`w-8 h-[1px] ${isAi ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
          <span className={`text-[10px] uppercase tracking-[0.4em] font-bold ${accentColor}`}>
            {isAi ? 'Generative AI Engineering' : 'Backend & Systems Architecture'}
          </span>
          <div className={`w-8 h-[1px] ${isAi ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
        </motion.div>
        
        <motion.h1 
          key={`hero-title-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter mb-8 leading-none"
        >
          Developing <br className="hidden md:block"/>
          <span className={`font-black italic text-transparent bg-clip-text bg-gradient-to-r ${isAi ? 'from-indigo-400 to-violet-500' : 'from-emerald-400 to-cyan-500'}`}>
            {isAi ? 'Scalable Systems' : 'Robust Backends'}
          </span>
        </motion.h1>
        
        <motion.p 
          key={`hero-desc-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base font-mono tracking-wide text-black/50 dark:text-white/50 max-w-2xl leading-loose mb-12 uppercase"
        >
          {description}
        </motion.p>
        
        <motion.div 
          key={`hero-links-${mode}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center space-x-6"
        >
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href={SOCIAL_LINKS.email} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          {isAi && (
            <>
              <a href={SOCIAL_LINKS.civitai} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-indigo-500 dark:hover:text-indigo-400 font-bold transition-colors">
                CivitAI
              </a>
              <a href={SOCIAL_LINKS.huggingface} target="_blank" rel="noreferrer" className="text-[10px] uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-indigo-500 dark:hover:text-indigo-400 font-bold transition-colors">
                HuggingFace
              </a>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

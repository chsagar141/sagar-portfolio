import { motion } from 'motion/react';
import { Mode } from '../types';
import { PROJECTS } from '../data';
import { ArrowUpRight } from 'lucide-react';

export function Projects({ mode }: { mode: Mode }) {
  const isAi = mode === 'ai';
  const projects = PROJECTS.filter(p => p.type === mode);
  const hoverBorder = isAi ? 'group-hover:border-indigo-500/30' : 'group-hover:border-emerald-500/30';
  const tagColor = isAi ? 'text-indigo-400' : 'text-emerald-400';

  return (
    <section className="py-24 px-8 border-t border-white/5 relative z-10 bg-[#050505]/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Featured Work</span>
          <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group flex flex-col p-10 bg-[#080808] border border-white/5 transition-all duration-300 h-full ${hoverBorder} hover:bg-[#0a0a0a]`}
            >
              <div className="flex justify-between items-start mb-8">
                <h4 className="text-xl font-light tracking-tight text-white/90 group-hover:text-white transition-colors">
                  {project.title}
                </h4>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="opacity-40 hover:opacity-100 transition-opacity p-2 border border-white/10 hover:border-white/30">
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
              
              <p className="text-[13px] opacity-60 font-light leading-relaxed flex-grow mb-10">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                {project.tech.map(tech => (
                  <span key={tech} className={`text-[9px] uppercase tracking-widest font-mono ${tagColor} opacity-70`}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

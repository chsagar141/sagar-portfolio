import { motion } from 'motion/react';
import { Mode } from '../types';
import { EXPERIENCE_AI, EXPERIENCE_WEB } from '../data';

export function Experience({ mode }: { mode: Mode }) {
  const isAi = mode === 'ai';
  const experiences = isAi ? EXPERIENCE_AI : EXPERIENCE_WEB;
  const accentColor = isAi ? 'text-indigo-400' : 'text-emerald-400';

  return (
    <section id="experience-section" className="py-24 px-8 border-t border-black/5 dark:border-white/5 relative z-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-16">
          <div className="flex-1 h-[1px] bg-black/5 dark:bg-white/5"></div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-black dark:text-white">Experience</span>
        </div>
        
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div 
              key={`${mode}-${exp.role}-${index}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-black/5 dark:border-white/5 bg-white dark:bg-[#080808] p-8 md:p-12 transition-colors duration-300"
            >
              <div className="md:grid md:grid-cols-[1fr_3fr] md:gap-12 items-start">
                <div className="mb-8 md:mb-0">
                  <div className={`text-[10px] uppercase font-mono tracking-widest mb-3 ${accentColor}`}>
                    {exp.period}
                  </div>
                  <div className="flex items-center space-x-3">
                    {exp.logoUrl ? (
                      <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img src={exp.logoUrl} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                    ) : exp.icon ? (
                      <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                        <exp.icon className="w-4 h-4 opacity-50 text-black dark:text-white" />
                      </div>
                    ) : null}
                    <div className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-50 text-black dark:text-white">{exp.company}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-2xl font-light tracking-tight text-black dark:text-white mb-6 leading-tight transition-colors duration-300">{exp.role}</h4>
                  <ul className="space-y-4">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-[13px] opacity-70 font-light leading-relaxed flex items-start text-black dark:text-white text-opacity-70">
                        <span className={`mr-4 mt-1.5 block w-1 h-1 bg-black/20 dark:bg-white/20 shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

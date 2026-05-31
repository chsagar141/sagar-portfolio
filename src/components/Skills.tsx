import { motion } from 'motion/react';
import { Mode } from '../types';
import { AI_SKILLS, WEB_SKILLS } from '../data';

export function Skills({ mode }: { mode: Mode }) {
  const isAi = mode === 'ai';
  const skills = isAi ? AI_SKILLS : WEB_SKILLS;
  const accentColor = isAi ? 'text-indigo-400' : 'text-emerald-400';
  const hoverBorderColor = isAi ? 'group-hover:border-indigo-500/30' : 'group-hover:border-emerald-500/30';
  const iconBgClass = isAi ? 'bg-indigo-500/5' : 'bg-emerald-500/5';

  return (
    <section className="py-24 px-8 border-t border-black/5 dark:border-white/5 relative z-10 bg-slate-50/50 dark:bg-[#050505]/50 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-black dark:text-white">Core Competencies</span>
          <div className="flex-1 h-[1px] bg-black/5 dark:bg-white/5"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={`${mode}-${skill.name}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`p-10 border border-black/5 dark:border-white/5 transition-all duration-300 group ${hoverBorderColor} bg-white dark:bg-[#080808] hover:bg-slate-50 dark:hover:bg-[#0a0a0a]`}
              >
                <div className={`w-12 h-12 flex items-center justify-center mb-8 border border-black/10 dark:border-white/10 ${iconBgClass}`}>
                  <Icon className={`w-5 h-5 ${accentColor} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h4 className="text-[11px] uppercase tracking-widest font-mono text-black/80 dark:text-white/80 group-hover:text-black dark:group-hover:text-white transition-colors leading-relaxed">
                  {skill.name}
                </h4>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

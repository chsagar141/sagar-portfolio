import { motion } from 'motion/react';
import { SOCIAL_LINKS } from '../data';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact-section" className="py-32 px-8 border-t border-black/5 dark:border-white/5 relative z-10 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="flex flex-col items-center"
        >
          <div className="mb-10 flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-black/20 dark:bg-white/20"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50 text-black dark:text-white">Initiate Contact</span>
            <div className="w-8 h-[1px] bg-black/20 dark:bg-white/20"></div>
          </div>

          <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-b from-black to-black/40 dark:from-white dark:to-white/40">
            Let's build <br className="hidden md:block"/> something.
          </h2>
          
          <p className="text-[11px] font-mono uppercase tracking-widest leading-loose opacity-40 text-black dark:text-white mb-16 max-w-xl mx-auto">
            Available for freelance opportunities, backend architecture, and AI integrations.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-1 text-[11px] font-mono uppercase tracking-widest text-black dark:text-white flex-wrap">
            <a href={SOCIAL_LINKS.email} className="px-8 py-4 border border-black/5 dark:border-white/5 bg-white dark:bg-[#080808] hover:bg-slate-50 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all flex items-center justify-center space-x-3 w-full md:w-auto">
              <Mail className="w-4 h-4 opacity-50" />
              <span>chsagar141@gmail.com</span>
            </a>
            
            <a href={SOCIAL_LINKS.phone} className="px-8 py-4 border border-black/5 dark:border-white/5 bg-white dark:bg-[#080808] hover:bg-slate-50 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all flex items-center justify-center space-x-3 w-full md:w-auto">
              <Phone className="w-4 h-4 opacity-50" />
              <span>+91 8458050298</span>
            </a>
            
            <a href={SOCIAL_LINKS.linktree} target="_blank" rel="noreferrer" className="px-8 py-4 border border-black/5 dark:border-white/5 bg-white dark:bg-[#080808] hover:bg-slate-50 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all flex items-center justify-center space-x-3 w-full md:w-auto">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-50"><path d="M13.73,12.33h6.39L14.77,5.43h3.58l5.24,6.9H18.7l4.7,5.92H17.43l-2.07-2.61-2.63,3.32v5.6h-2.92v-5.6l-2.63-3.32-2.07,2.61H-.38l4.7-5.92H-1l5.24-6.9h3.58l-5.35,6.9h6.39v.03L12,7.74l3.14,4.59h-1.41Z" /></svg>
              <span>linktr.ee/Xue145</span>
            </a>

            <div className="px-8 py-4 border border-black/5 dark:border-white/5 bg-white dark:bg-[#080808] flex items-center justify-center space-x-3 w-full md:w-auto mt-4 md:mt-0">
              <MapPin className="w-4 h-4 opacity-50" />
              <span className="opacity-70">Odisha, India</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

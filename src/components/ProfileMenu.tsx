import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sun, Monitor, Linkedin, Mail, User } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import { useTheme } from './ThemeProvider';

interface ProfileMenuProps {
  onNavigate?: (id: string) => void;
}

export function ProfileMenu({ onNavigate }: ProfileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative z-50" ref={menuRef}>
      <button 
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 overflow-hidden hover:border-black/50 dark:hover:border-white/50 transition-colors cursor-pointer focus:outline-none focus:border-black/50 dark:focus:border-white/50 block bg-white dark:bg-[#0a0a0a]"
      >
        <img src="https://i.ibb.co/gZD34s8T/Untitled-design.png" alt="CH SAGAR" className="w-full h-full object-cover" />
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-4 w-56 bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col">
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Linkedin className="w-4 h-4 mr-3 opacity-70" />
                Visit my LinkedIn
              </a>
              <button 
                onClick={() => handleNavigate('contact-section')}
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
              >
                <Mail className="w-4 h-4 mr-3 opacity-70" />
                Contact Me
              </button>
              <button 
                onClick={() => handleNavigate('experience-section')}
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
              >
                <User className="w-4 h-4 mr-3 opacity-70" />
                More about me
              </button>
            </div>
            
            <div className="flex border-t border-black/5 dark:border-white/5 mt-2 pt-2 gap-1 px-4 py-2">
              <button onClick={() => setTheme('light')} className={`p-1.5 rounded-lg border flex-1 flex justify-center items-center transition-colors ${theme === 'light' ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-black dark:text-white' : 'border-transparent text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5'}`} title="Light Mode"><Sun className="w-4 h-4"/></button>
              <button onClick={() => setTheme('dark')} className={`p-1.5 rounded-lg border flex-1 flex justify-center items-center transition-colors ${theme === 'dark' ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-black dark:text-white' : 'border-transparent text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5'}`} title="Dark Mode"><Moon className="w-4 h-4"/></button>
              <button onClick={() => setTheme('system')} className={`p-1.5 rounded-lg border flex-1 flex justify-center items-center transition-colors ${theme === 'system' ? 'bg-black/5 dark:bg-white/10 border-black/10 dark:border-white/20 text-black dark:text-white' : 'border-transparent text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5'}`} title="System Match"><Monitor className="w-4 h-4"/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

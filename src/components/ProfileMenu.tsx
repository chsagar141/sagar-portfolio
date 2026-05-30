import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Mail, User } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';

interface ProfileMenuProps {
  onNavigate?: (id: string) => void;
}

export function ProfileMenu({ onNavigate }: ProfileMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        className="w-10 h-10 rounded-full border border-white/20 overflow-hidden hover:border-white/50 transition-colors cursor-pointer focus:outline-none focus:border-white/50 block bg-[#0a0a0a]"
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
            className="absolute right-0 mt-4 w-56 bg-[#0a0a0a] border border-white/10 p-2 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col">
              <a 
                href={SOCIAL_LINKS.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <Linkedin className="w-4 h-4 mr-3 opacity-70" />
                Visit my LinkedIn
              </a>
              <button 
                onClick={() => handleNavigate('contact-section')}
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <Mail className="w-4 h-4 mr-3 opacity-70" />
                Contact Me
              </button>
              <button 
                onClick={() => handleNavigate('experience-section')}
                className="flex items-center px-4 py-3 text-[10px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-colors text-left"
              >
                <User className="w-4 h-4 mr-3 opacity-70" />
                More about me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

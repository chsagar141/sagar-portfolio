import { motion } from 'motion/react';
import { Mode } from '../types';
import { ProfileMenu } from './ProfileMenu';

interface HeaderProps {
  mode: Mode;
  onSwitchMode: (mode: Mode) => void;
}

export function Header({ mode, onSwitchMode }: HeaderProps) {
  if (!mode) return null;

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-slate-50/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between relative">
        <div className="flex items-center space-x-3">
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-80">
            CH Sagar — Portfolio
          </span>
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="hidden md:flex space-x-2 md:space-x-4">
            <button
              onClick={() => onSwitchMode('ai')}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${
                mode === 'ai' 
                  ? 'border-indigo-500/50 text-indigo-500 dark:text-indigo-300 bg-indigo-500/5' 
                  : 'border-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/10 dark:hover:border-white/10'
              }`}
            >
              Gen AI
            </button>
            <button
              onClick={() => onSwitchMode('web')}
              className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${
                mode === 'web' 
                  ? 'border-emerald-500/50 text-emerald-600 dark:text-emerald-300 bg-emerald-500/5' 
                  : 'border-transparent text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:border-black/10 dark:hover:border-white/10'
              }`}
            >
              Web & Backend
            </button>
          </div>

          <ProfileMenu />
        </div>
      </div>
    </motion.header>
  );
}

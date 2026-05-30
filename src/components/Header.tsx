import { motion } from 'motion/react';
import { Mode } from '../types';

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
      className="fixed top-0 left-0 right-0 z-40 bg-[#050505]/80 backdrop-blur-md border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-white/20 flex items-center justify-center">
            <span className="text-xs font-bold tracking-widest">CH</span>
          </div>
          <span className="hidden md:inline-block text-[10px] uppercase tracking-[0.3em] font-medium opacity-80">
            Sagar — Portfolio
          </span>
        </div>
        
        <div className="flex space-x-2 md:space-x-4">
          <button
            onClick={() => onSwitchMode('ai')}
            className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${
              mode === 'ai' 
                ? 'border-indigo-500/50 text-indigo-300 bg-indigo-500/5' 
                : 'border-transparent text-white/50 hover:text-white hover:border-white/10'
            }`}
          >
            Gen AI
          </button>
          <button
            onClick={() => onSwitchMode('web')}
            className={`px-4 py-2 text-[10px] uppercase tracking-widest transition-all border ${
              mode === 'web' 
                ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/5' 
                : 'border-transparent text-white/50 hover:text-white hover:border-white/10'
            }`}
          >
            Web & Backend
          </button>
        </div>
      </div>
    </motion.header>
  );
}

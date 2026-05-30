import { motion } from 'motion/react';
import { BrainCircuit, Server, ChevronRight } from 'lucide-react';
import { Mode } from '../types';

interface GatewayProps {
  onSelect: (mode: Mode) => void;
}

export function Gateway({ onSelect }: GatewayProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#050505] text-[#e5e5e5] font-sans overflow-hidden">
      {/* Left side: AI */}
      <motion.div 
        className="flex-1 relative group cursor-pointer border-b md:border-b-0 md:border-r border-white/5 transition-all duration-700 flex flex-col items-center justify-center"
        initial={{ y: '-100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onSelect('ai')}
      >
        <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col items-center justify-center p-8 text-center transition-transform duration-500">
          <div className="mb-8 flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-indigo-500"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-indigo-400 font-bold">Agentic Systems</span>
          </div>

          <BrainCircuit className="w-8 h-8 mb-6 text-indigo-400/50 group-hover:text-indigo-400 transition-colors duration-500" />
          
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-center leading-none">
            GENERATIVE<br/><span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-500">AI</span>
          </h2>

          <div className="mt-8 md:mt-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden group-hover:overflow-visible">
            <p className="text-[10px] md:text-[11px] font-mono tracking-wide uppercase leading-loose opacity-60">
              ComfyUI Workflows • LLM Pipelines<br/>
              Gemini & Claude Implementation<br/>
              Diffusion Models • Experimental APIs
            </p>
          </div>

          <div className="mt-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="px-8 py-3 border border-white/10 group-hover:border-indigo-500/50 transition-colors text-[10px] tracking-widest uppercase flex items-center space-x-2">
              <span>Explore AI Projects</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right side: Web */}
      <motion.div 
        className="flex-1 relative group cursor-pointer transition-all duration-700 flex flex-col items-center justify-center p-8 text-center"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        onClick={() => onSelect('web')}
      >
        <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-500">
          <div className="mb-8 flex items-center space-x-4">
            <div className="w-8 h-[1px] bg-emerald-500"></div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-emerald-400 font-bold">Engineered Scale</span>
          </div>

          <Server className="w-8 h-8 mb-6 text-emerald-400/50 group-hover:text-emerald-400 transition-colors duration-500" />
          
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-center leading-none">
            BACKEND<br/><span className="font-black italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">DEV</span>
          </h2>

          <div className="mt-8 md:mt-12 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 h-0 group-hover:h-auto overflow-hidden group-hover:overflow-visible">
            <p className="text-[10px] md:text-[11px] font-mono tracking-wide uppercase leading-loose opacity-60">
              FastAPI & Python Architecture<br/>
              MySQL Database Management<br/>
              JS Interfaces • REST API Design
            </p>
          </div>

          <div className="mt-10 opacity-70 group-hover:opacity-100 transition-opacity">
            <div className="px-8 py-3 border border-white/10 group-hover:border-emerald-500/50 transition-colors text-[10px] tracking-widest uppercase flex items-center space-x-2">
              <span>View Technical Stack</span>
              <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Center divider brand */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-[#050505] border border-white/10 z-20 pointer-events-none"
        initial={{ scale: 0, opacity: 0, rotate: 45 }}
        animate={{ scale: 1, opacity: 1, rotate: 45 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-[#e5e5e5] -rotate-45">CH</span>
      </motion.div>
    </div>
  );
}

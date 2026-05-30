// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';

// ... (No need to touch this as it's fine, I'm just creating the root app structure in App.tsx)

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gateway } from './components/Gateway';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Mode } from './types';

export default function App() {
  const [mode, setMode] = useState<Mode>(null);

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-white/10 selection:text-white font-sans antialiased overflow-x-hidden relative flex flex-col">
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <AnimatePresence mode="wait">
        {!mode ? (
          <Gateway key="gateway" onSelect={(m) => setMode(m)} />
        ) : (
          <motion.div
            key="portfolio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Header mode={mode} onSwitchMode={setMode} />
            
            <main>
              <Hero mode={mode} />
              <Skills mode={mode} />
              <Experience mode={mode} />
              <Projects mode={mode} />
              <Contact />
            </main>
            
            <footer className="py-8 px-8 border-t border-white/5 bg-[#050505] relative z-20 flex flex-col md:flex-row justify-between items-center text-[9px] uppercase tracking-[0.3em] opacity-40">
              <div className="mb-4 md:mb-0">
                © {new Date().getFullYear()} CH Sagar.
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0 animate-pulse"></div>
                <span>Open for Collaboration</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

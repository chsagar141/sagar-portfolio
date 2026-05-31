import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Download, Heart } from 'lucide-react';

interface CivitaiModel {
  id: number;
  name: string;
  description: string;
  stats: {
    downloadCount: number;
    heartCount: number;
    thumbsUpCount: number;
  };
  modelVersions: {
    images: {
      url: string;
      nsfwLevel?: number;
      nsfw?: string | boolean;
    }[];
  }[];
}

export function CivitaiShowcase() {
  const [models, setModels] = useState<CivitaiModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModels() {
      try {
        const res = await fetch('https://civitai.com/api/v1/models?username=Dead_Sec');
        if (!res.ok) throw new Error('Failed to fetch from Civitai');
        const data = await res.json();
        if (data && data.items) {
          // Get the first 6 items to keep the portfolio clean and balanced
          setModels(data.items.slice(0, 6));
        }
      } catch (error) {
        console.error('Error fetching Civitai models:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchModels();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-8 border-t border-black/5 dark:border-white/5 relative z-10 bg-slate-50/40 dark:bg-[#050505]/40 backdrop-blur-sm transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center space-x-4 mb-16">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-black dark:text-white">Civitai Models</span>
            <div className="flex-1 h-[1px] bg-black/5 dark:bg-white/5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/5] bg-slate-100 dark:bg-[#0a0a0a] animate-pulse border border-black/5 dark:border-white/5"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (models.length === 0) {
    return null; // Don't show the section if no models or failed to load
  }

  return (
    <section className="py-24 px-8 border-t border-black/5 dark:border-white/5 relative z-10 bg-slate-50/40 dark:bg-[#050505]/40 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center space-x-4 mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 text-black dark:text-white">Civitai Models</span>
          <div className="flex-1 h-[1px] bg-black/5 dark:bg-white/5"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {models.map((model, index) => {
            // Safely extract the first image
            const imageUrl = model.modelVersions?.[0]?.images?.[0]?.url;

            return (
              <motion.a
                href={`https://civitai.com/models/${model.id}`}
                target="_blank"
                rel="noreferrer"
                key={model.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative block aspect-[4/5] bg-white dark:bg-[#080808] border border-black/5 dark:border-white/5 overflow-hidden"
              >
                {/* Background Image */}
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={model.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-slate-100 dark:bg-[#0a0a0a] flex items-center justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-black/20 dark:text-white/20">No Image Preview</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-[#050505] via-slate-50/40 dark:via-[#050505]/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center space-x-3 mb-4 opacity-70">
                      <div className="flex items-center space-x-1">
                        <Download className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-[9px] font-mono tracking-widest text-black/70 dark:text-white/70">
                          {model.stats?.downloadCount > 1000 
                            ? (model.stats.downloadCount / 1000).toFixed(1) + 'K' 
                            : model.stats?.downloadCount || 0}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-[9px] font-mono tracking-widest text-black/70 dark:text-white/70">
                          {model.stats?.heartCount || model.stats?.thumbsUpCount || 0}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-lg font-light tracking-tight text-black dark:text-white mb-2 line-clamp-2 leading-snug">
                      {model.name}
                    </h4>

                    <div className="flex items-center space-x-2 text-[9px] uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      <span>View on Civitai</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://civitai.com/user/Dead_Sec" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3 border border-black/10 dark:border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all text-[10px] tracking-[0.2em] uppercase text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
          >
            <span>View All Profiles & LoRAs</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

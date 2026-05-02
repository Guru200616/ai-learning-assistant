import React from 'react';
import { motion } from 'motion/react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-48 pb-24 container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <p className="text-champagne uppercase tracking-[0.4em] text-xs">Our Heritage</p>
            <h1 className="text-6xl font-serif">A Legacy of <br />Refinement</h1>
          </div>
          
          <div className="space-y-8 text-white/70 font-sans leading-loose tracking-wide">
            <p>
              Founded in the cobblestone whispers of Florence, AURELIA was born from a singular obsession: the pursuit of the perfect tactile experience. We believe that what you wear is not merely an outer layer, but an extension of your legacy.
            </p>
            <p>
              Our artisans are masters of forgotten techniques. From the hand-rolling of silk edges to the intricate beading of our obsidian evening wear, every stitch represents an hourglass of dedication.
            </p>
            <p>
              We source only the rarest fibers—Mongolian cashmere, Egyptian cotton, and Italian silks—ensuring that each AURELIA piece remains an heirloom for generations to come.
            </p>
          </div>

          <div className="flex gap-12 border-t border-white/10 pt-12">
            <div>
              <p className="text-3xl font-serif text-champagne">1974</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Founding</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-champagne">32</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Master Artisans</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="relative aspect-[4/5] border border-white/10 p-8 bg-obsidian-light"
        >
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
            alt="Interior Atelier"
            className="w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 border border-champagne/20 m-12 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

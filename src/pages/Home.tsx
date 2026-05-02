import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <section className="container mx-auto px-12 mb-48 flex flex-col lg:flex-row min-h-[70vh] items-center">
        <div className="lg:w-1/2 relative py-24">
          <div className="absolute -top-10 -left-10 text-[180px] font-serif italic opacity-5 pointer-events-none select-none">
            Silk
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-champagne uppercase tracking-[0.4em] text-[10px] mb-8 font-bold"
          >
            Spring Summer 2024
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-8xl leading-[1] mb-12 font-extralight tracking-tight"
          >
            The New <br />
            <span className="text-champagne italic font-serif">Ethereal</span> <br />
            Standard.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm font-light opacity-60 leading-relaxed max-w-sm mb-16"
          >
            Hand-sourced Italian cashmere and reclaimed mulberry silks. A study in minimalist architectural draping for the modern silhouette.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-8"
          >
            <button className="px-10 py-5 bg-champagne text-obsidian text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors">
              Shop Collection
            </button>
            <button className="px-10 py-5 border border-white/20 text-[11px] uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
              Explore Archive
            </button>
          </motion.div>
        </div>

        <div className="lg:w-1/2 h-[600px] w-full relative mt-24 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent z-10" />
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full bg-[#1A1A1A] flex items-center justify-center overflow-hidden border border-white/5"
          >
            <div className="w-[80%] h-[80%] border border-champagne/30 relative flex items-center justify-center bg-obsidian">
               <div className="text-[10px] text-champagne absolute top-4 left-4 tracking-widest opacity-40">MODEL_AURE_HERO</div>
               <div className="w-[85%] h-[90%] bg-[#111] relative overflow-hidden group">
                  <div className="absolute inset-0 opacity-20" style={{ background: 'repeating-linear-gradient(45deg, #000, #000 10px, #111 10px, #111 20px)' }} />
                  <img 
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200" 
                    className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-[3s]"
                    alt="Hero Collection"
                  />
                  <div className="absolute bottom-8 right-8 text-right z-20">
                     <div className="text-2xl font-serif italic text-white drop-shadow-lg">Catenary Gown</div>
                     <div className="text-[11px] tracking-widest opacity-60 text-white">Ref. 001-S24</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Grid Header */}
      <div className="container mx-auto px-12 mb-16 flex items-center gap-8">
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-champagne font-bold whitespace-nowrap">Selected Works</h2>
        <div className="flex-grow h-px bg-white/10" />
      </div>

      {/* Product Grid */}
      <section className="container mx-auto px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-32">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="aspect-[3/4] bg-white/5" />
              <div className="h-4 bg-white/5 w-1/2" />
              <div className="h-4 bg-white/5 w-1/4" />
            </div>
          ))
        ) : (
          products.map((product: any, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))
        )}
      </section>

      {/* Statement Section */}
      <section className="mt-48 container mx-auto px-6 text-center max-w-2xl">
        <p className="font-serif italic text-2xl text-white/70 leading-relaxed">
          "True elegance is not being noticed, it is being remembered. AURELIA exists to provide the canvas for your most significant moments."
        </p>
      </section>
    </div>
  );
};

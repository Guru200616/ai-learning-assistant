import React from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative h-full flex flex-col"
      id={`product-${product.id}`}
    >
      <div className="flex-grow aspect-[3/4] border border-champagne/20 relative group bg-obsidian-light p-4 flex items-center justify-center overflow-hidden">
        <div className="absolute top-2 left-2 text-[8px] text-champagne uppercase tracking-widest opacity-40">
          MODEL_AURE_{product.id.padStart(3, '0')}
        </div>
        
        <div className="w-[90%] h-[92%] relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-in-out" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <button
          onClick={() => addToCart(product)}
          className="absolute bottom-6 right-6 w-11 h-11 champagne-button flex items-center justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(197,160,89,0.2)]"
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="mt-8 text-right space-y-1 pr-1">
        <h3 className="text-xl font-serif italic tracking-wide group-hover:text-champagne transition-colors">
          {product.name}
        </h3>
        <p className="text-[11px] tracking-[0.2em] opacity-60">
          ${product.price.toLocaleString()}.00
        </p>
      </div>
    </motion.div>
  );
};

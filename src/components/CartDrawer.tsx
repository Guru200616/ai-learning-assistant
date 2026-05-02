import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, isCartOpen, setIsCartOpen, total } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            id="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidian shadow-2xl z-[110] flex flex-col border-l border-white/10"
          >
            <div className="p-8 flex justify-between items-center border-b border-white/10">
              <h2 className="text-xl font-serif tracking-widest uppercase">Your Collection</h2>
              <button 
                id="close-cart"
                onClick={() => setIsCartOpen(false)} 
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-8 space-y-8">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="font-serif italic">Your tray is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <img src={item.image} alt={item.name} className="w-24 h-32 object-cover" />
                    <div className="flex-grow space-y-1">
                      <h3 className="font-serif text-sm tracking-wide">{item.name}</h3>
                      <p className="text-champagne font-medium">${item.price.toLocaleString()}</p>
                      <p className="text-xs text-white/40">Qty: {item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-white/[0.02]">
                <div className="flex justify-between items-center mb-8">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/60">Subtotal</span>
                  <span className="text-xl font-serif">${total.toLocaleString()}</span>
                </div>
                <button
                  id="checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full champagne-gradient text-obsidian py-4 text-xs uppercase tracking-[0.3em] font-bold hover:brightness-110 transition-all font-sans"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

import { ShoppingBag } from 'lucide-react';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { cart, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
      });
      await res.json();
      setIsSuccess(true);
      clearCart();
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-8 max-w-lg"
        >
          <div className="flex justify-center">
            <CheckCircle size={80} className="text-champagne shrink-0" strokeWidth={1} />
          </div>
          <h1 className="text-5xl font-serif">Order Confirmed</h1>
          <p className="text-white/60 leading-relaxed font-sans">
            Your AURELIA collection is being prepared by our artisans. A shipment advisor will be assigned to your order within the hour.
          </p>
          <div className="pt-8">
            <Link 
              to="/" 
              className="inline-block border border-champagne text-champagne px-12 py-4 text-xs uppercase tracking-[0.4em] hover:bg-champagne hover:text-obsidian transition-all"
            >
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-obsidian">
        <div className="text-center space-y-6">
          <p className="font-serif italic text-white/40">Your collection is empty.</p>
          <Link to="/" className="text-champagne text-xs uppercase tracking-widest border-b border-champagne flex items-center gap-2 mx-auto w-fit pb-1">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-48 pb-24 container mx-auto px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        
        {/* Order Summary */}
        <div className="space-y-12">
          <div className="space-y-4">
            <p className="text-champagne uppercase tracking-[0.4em] text-xs">Review Order</p>
            <h1 className="text-5xl font-serif">Your Collection</h1>
          </div>

          <div className="space-y-8">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-6 items-center border-b border-white/5 pb-8">
                <img src={item.image} alt={item.name} className="w-20 h-28 object-cover" />
                <div className="flex-grow">
                  <h3 className="font-serif text-sm tracking-wide">{item.name}</h3>
                  <p className="text-xs text-white/40 mt-1">Quantity: {item.quantity}</p>
                </div>
                <p className="font-serif">${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-12">
            <div className="flex justify-between text-white/40 text-xs uppercase tracking-widest font-sans">
              <span>Subtotal</span>
              <span>${total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white/40 text-xs uppercase tracking-widest font-sans">
              <span>Shipping</span>
              <span>Complimentary</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-white/10">
              <span className="text-xs uppercase tracking-[0.2em] font-sans">Total Investment</span>
              <span className="text-2xl font-serif text-champagne">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payment Simulation */}
        <div className="bg-white/[0.02] border border-white/5 p-12 space-y-12 h-fit">
          <h2 className="text-xl font-serif tracking-widest uppercase">Payment Information</h2>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block">Cardholder Name</label>
              <div className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-white/80">
                L’ÉLÉGANCE
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block">Card Details</label>
              <div className="w-full bg-transparent border-b border-white/10 py-4 font-serif text-white/80 flex justify-between">
                <span>•••• •••• •••• 1974</span>
                <span className="text-xs text-white/30">SIMULATED</span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button 
              id="confirm-payment"
              disabled={isProcessing}
              onClick={handlePayment}
              className="w-full champagne-gradient text-obsidian py-5 text-xs uppercase tracking-[0.4em] font-bold hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing Securely..." : `Confirm Payment ($${total.toLocaleString()})`}
            </button>
            <p className="text-[9px] text-center text-white/20 mt-6 uppercase tracking-widest leading-relaxed">
              Secure 256-Bit Encryption • White-Glove Shipping Included
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

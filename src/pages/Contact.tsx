import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      setStatus(data.message);
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-48 pb-24 container mx-auto px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-24">
        
        {/* Contact Info */}
        <div className="lg:w-1/3 space-y-16">
          <div className="space-y-4">
            <p className="text-champagne uppercase tracking-[0.4em] text-xs">Contact Us</p>
            <h1 className="text-6xl font-serif">Bespoke <br />Inquiries</h1>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Email</p>
                <p className="font-serif">advisors@aurelia.luxury</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Phone</p>
                <p className="font-serif">+39 055 888 230</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-10 h-10 rounded-full border border-champagne/30 flex items-center justify-center text-champagne shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Flagship Atelier</p>
                <p className="font-serif">Via dei Tornabuoni, 15 <br />Florence, Italy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-2/3">
          <form 
            onSubmit={handleSubmit}
            id="contact-form"
            className="space-y-12 glass-panel p-12 lg:p-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-white/40 block">Full Name</label>
                <input 
                  type="text" 
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-champagne transition-colors tracking-wide" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-widest text-white/40 block">Email Address</label>
                <input 
                  type="email" 
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-champagne transition-colors tracking-wide" 
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-white/40 block">Your Inquiry</label>
              <textarea 
                rows={4}
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                required
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-champagne transition-colors tracking-wide resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="champagne-button px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-bold flex items-center gap-4 disabled:opacity-50 transition-all hover:scale-[1.02]"
            >
              {isSubmitting ? "Sending..." : "Submit Inquiry"}
              <Send size={14} />
            </button>

            {status && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-champagne font-serif italic text-sm"
              >
                {status}
              </motion.p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

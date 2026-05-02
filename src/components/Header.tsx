import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { setIsCartOpen, cart } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 h-20 flex items-center ${
        isScrolled ? 'glass-nav backdrop-blur-md' : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="container mx-auto px-12 flex justify-between items-center">
        {/* Mobile Menu Toggle */}
        <button 
          id="mobile-menu-btn"
          className="lg:hidden text-white" 
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={20} />
        </button>

        {/* Logo */}
        <Link 
          id="logo-link"
          to="/" 
          className="text-2xl font-light tracking-[0.3em] text-white"
        >
          AURELIA
        </Link>

        {/* Desktop Nav */}
        <nav id="desktop-nav" className="hidden lg:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
                location.pathname === link.path ? 'text-champagne' : 'text-white/60 hover:text-champagne'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-8">
          <button 
            id="cart-toggle"
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setIsCartOpen(true)}
          >
            <span className="text-[10px] uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">Cart</span>
            <span className="bg-champagne text-obsidian px-1.5 py-0.5 text-[9px] rounded-full font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-obsidian z-[60] flex flex-col p-12"
          >
            <button 
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="mt-24 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-3xl font-serif text-white hover:text-champagne"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { ChatConcierge } from './components/ChatConcierge';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Checkout } from './pages/Checkout';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-obsidian min-h-screen text-white overflow-hidden">
          <Header />
          <CartDrawer />
          <AnimatedRoutes />
          <ChatConcierge />
          
          <footer className="bg-obsidian border-t border-white/5 py-12">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              <span className="text-xl font-serif tracking-[0.3em] font-medium text-white/40">AURELIA</span>
              <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/30">
                <a href="#" className="hover:text-champagne transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-champagne transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-champagne transition-colors">Accessibility</a>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-white/10 italic">
                © 2026 Aurelia Luxury Group. Produced in Florence.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </CartProvider>
  );
}

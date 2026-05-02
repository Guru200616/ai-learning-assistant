import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'concierge';
}

export const ChatConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Welcome to AURELIA. I am your personal concierge. How may I assist you this evening?', sender: 'concierge' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      
      const conciergeMsg: Message = { id: (Date.now() + 1).toString(), text: data.response, sender: 'concierge' };
      setMessages(prev => [...prev, conciergeMsg]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-72 bg-obsidian border border-champagne/40 p-5 backdrop-blur-xl shadow-2xl rounded-sm flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-champagne rounded-full animate-pulse shadow-[0_0_8px_rgba(197,160,89,0.5)]"></div>
                <span className="text-[10px] uppercase tracking-widest text-champagne font-bold">AI Concierge</span>
              </div>
              <button 
                id="close-chat"
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-grow max-h-[300px] overflow-y-auto space-y-4 mb-4 scrollbar-hide"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <p className={`text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'text-white text-right opacity-80' 
                      : 'text-white opacity-90 italic font-light'
                  }`}>
                    {msg.sender === 'concierge' ? `"${msg.text}"` : msg.text}
                  </p>
                </div>
              ))}
              {isTyping && (
                <div className="text-[10px] text-champagne/40 italic">Concierge is curating...</div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="border-b border-white/20 pb-2 flex items-center">
              <input
                id="chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Inquire here..."
                className="flex-grow bg-transparent text-[10px] focus:outline-none placeholder:text-white/20 tracking-wider"
              />
              <button 
                type="submit"
                className="text-white/40 hover:text-white transition-colors"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-champagne rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)] flex items-center justify-center text-obsidian hover:scale-105 transition-transform"
      >
        <MessageSquare size={22} />
      </button>
    </div>
  );
};

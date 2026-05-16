import { useRef, useEffect, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { getChatResponse, extractLeadInfo } from '../services/ai';
import { saveLead } from '../services/firebase';
import { cn } from '../lib/utils';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Welcome to SOHI Realty. I am your personal real estate advisor. How may I assist you in your search for excellence today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));
      
      const response = await getChatResponse(userMessage, history);
      setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm sorry, I couldn't process that. Please try again." }]);

      // Attempt to extract lead info in the background
      const newHistory = [...history, { role: 'user', parts: [{ text: userMessage }] }];
      const leadInfo = await extractLeadInfo(newHistory);
      if (leadInfo && leadInfo.name && leadInfo.contact) {
        console.log("Lead captured:", leadInfo);
        await saveLead(leadInfo);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="glass mb-4 w-[90vw] sm:w-[400px] h-[500px] rounded-2xl flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-bottom border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-black">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-medium">SOHI Advisor</h3>
                  <p className="text-[10px] text-white/50 uppercase tracking-widest">Always active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={cn("flex gap-3", m.role === 'user' ? "flex-row-reverse" : "")}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center",
                    m.role === 'user' ? "bg-white/10" : "bg-brand-gold/20 text-brand-gold"
                  )}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed",
                    m.role === 'user' 
                      ? "bg-white text-black rounded-tr-none" 
                      : "bg-white/5 border border-white/10 rounded-tl-none"
                  )}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-3 text-sm italic text-white/40">
                    SOHI Advisor is thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about properties, neighborhoods..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-brand-gold transition-colors pr-12"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden relative"
      >
        <motion.div
           animate={{ rotate: isOpen ? 90 : 0 }}
           className="relative z-10"
        >
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.div>
        <div className="absolute inset-0 bg-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}

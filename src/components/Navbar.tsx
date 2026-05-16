import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Portfolio', href: '#properties' },
    { name: 'Neighborhoods', href: '#' },
    { name: 'Company', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <svg width="45" height="45" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Minimalist house outline based on user logo */}
            <path d="M40 90V40L60 15L80 40V90H40Z" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M40 90H80" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M55 90V75H65V90" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M30 48L60 20L90 48" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
            <path d="M30 48V100H90V48" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.3" />
          </svg>
          <div className="flex flex-col">
            <span className="text-2xl font-serif tracking-[0.25em] uppercase leading-none">SOHI</span>
            <span className="text-[10px] uppercase tracking-[0.6em] text-brand-gold mt-1">Realty</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] hover:text-brand-gold transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <button className="px-6 py-2 border border-white/20 rounded-full text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
            Inquire
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass overflow-hidden"
          >
            <div className="px-6 py-12 flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-2xl font-serif italic"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full max-w-xs py-4 bg-brand-gold text-white uppercase tracking-widest text-sm rounded-full">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

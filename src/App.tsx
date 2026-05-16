import Hero from './components/Hero';
import Properties from './components/Properties';
import Navbar from './components/Navbar';
import About from './components/About';
import AIChatbot from './components/AIChatbot';
import { useEffect } from 'react';
import { testConnection } from './services/firebase';

export default function App() {
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="relative min-h-screen bg-brand-dark overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Properties />
        
        {/* Contact CTA */}
        <section className="py-32 px-6 bg-white text-black text-center">
          <div className="max-w-4xl mx-auto">
            <span className="uppercase tracking-[0.4em] text-[10px] mb-8 block opacity-60">Begin Your Journey</span>
            <h2 className="text-4xl md:text-7xl font-serif mb-12">Elevate your standards.</h2>
            <button className="px-12 py-5 bg-black text-white text-sm uppercase tracking-widest rounded-full hover:bg-brand-gold transition-colors">
              Schedule a Consultation
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-24 px-6 md:px-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16">
            <div className="max-w-xs">
               <div className="flex items-center gap-3 mb-6">
                <svg width="35" height="35" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 90V40L60 15L80 40V90H40Z" stroke="#D4AF37" strokeWidth="1.5" />
                  <path d="M40 90H80" stroke="#D4AF37" strokeWidth="1.5" />
                  <path d="M55 90V75H65V90" stroke="#D4AF37" strokeWidth="1.5" />
                </svg>
                <span className="text-xl font-serif tracking-widest uppercase">SOHI</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed mb-8 font-light">
                The global authority in extraordinary real estate and architectural heritage.
              </p>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-widest text-white/60">Instagram</span>
                <span className="text-[10px] uppercase tracking-widest text-white/60">LinkedIn</span>
                <span className="text-[10px] uppercase tracking-widest text-white/60">Twitter</span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 text-sm font-light">
              <div className="flex flex-col gap-4 text-white/50">
                <p className="text-white uppercase tracking-widest text-[10px] mb-2">Offices</p>
                <p>Beverly Hills</p>
                <p>New York City</p>
                <p>Lonon, Mayfair</p>
                <p>Dubai, Jumeirah</p>
              </div>
              <div className="flex flex-col gap-4 text-white/50">
                 <p className="text-white uppercase tracking-widest text-[10px] mb-2">Global</p>
                <p>Market Reports</p>
                <p>Investment Advisory</p>
                <p>Private Office</p>
                <p>Luxury Index</p>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-white/20">
            <p>&copy; 2026 SOHI Realty. All rights reserved.</p>
            <p>Privacy Policy / Terms of Service</p>
          </div>
        </footer>
      </main>
      
      <AIChatbot />
    </div>
  );
}

import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef(null);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(".hero-title", { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power4.out" })
      .to(".hero-sub", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.8")
      .to(".hero-cta", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6");
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Mansion" 
          className="w-full h-full object-cover transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-block text-brand-gold uppercase tracking-[0.3em] text-xs mb-6 font-medium"
        >
          Redefining the Horizon
        </motion.span>
        <h1 className="hero-title opacity-0 translate-y-12 text-6xl md:text-8xl lg:text-9xl font-light mb-8 leading-tight tracking-tight">
          Exquisite <br />
          <span className="italic font-normal">Living.</span>
        </h1>
        <p className="hero-sub opacity-0 translate-y-8 text-lg md:text-xl text-white/70 font-light max-w-xl mx-auto mb-10 leading-relaxed">
          Curating the world's most prestigious architectural landmarks for those who demand ultimate distinction.
        </p>
        <div className="hero-cta opacity-0 scale-90 w-full max-w-2xl mx-auto">
          <div className="glass p-2 rounded-full flex items-center gap-2 mb-8 shadow-2xl">
            <input 
              type="text" 
              placeholder="Search by neighborhood, city or zip code..." 
              className="bg-transparent border-none focus:ring-0 text-white placeholder-white/40 flex-1 px-6 py-2 text-sm"
            />
            <button className="bg-brand-gold text-black px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all duration-300">
              Search
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button className="px-10 py-4 bg-white text-black font-medium text-sm hover:bg-brand-gold hover:text-white transition-all duration-500 rounded-full flex items-center gap-2 group">
              Explore Portfolio
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-500 rounded-full">
              Our Legacy
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-gold to-transparent" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </section>
  );
}

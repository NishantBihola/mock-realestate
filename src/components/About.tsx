import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const chars = textRef.current.querySelectorAll('.char');
    
    gsap.to(chars, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      color: "#FFFFFF",
      opacity: 1,
      stagger: 0.1,
    });
  }, { scope: sectionRef });

  const text = "At SOHI Realty, we believe that a home is more than an address. It's a statement of identity, a legacy in the making. We specialize in the acquisition and curation of architectural masterworks that redefine the boundaries of luxury living.";
  const words = text.split(" ");

  return (
    <section ref={sectionRef} className="py-40 px-6 bg-brand-dark min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Subtle background decorative element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.span 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-brand-gold uppercase tracking-[0.5em] text-[10px] mb-16 block font-bold"
        >
          Our Core Values
        </motion.span>
        <p ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight font-light text-white/10 italic select-none">
          {words.map((word, i) => (
            <span key={i} className="char inline-block mx-2 transition-colors duration-300">
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

import { motion } from "motion/react";

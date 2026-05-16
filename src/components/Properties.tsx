import { motion } from "motion/react";
import { Bed, Bath, Square, ArrowUpRight } from "lucide-react";

const properties = [
  {
    id: "1",
    title: "Obidian Sanctum",
    location: "Beverly Hills, CA",
    price: "$24,500,000",
    beds: 6,
    baths: 8,
    sqft: "12,400",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "2",
    title: "The Ethereal Pavilion",
    location: "Malibu, CA",
    price: "$18,200,000",
    beds: 5,
    baths: 6,
    sqft: "8,900",
    image: "https://images.unsplash.com/photo-1600607687940-4e2a09695d51?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "3",
    title: "Golden Hour Estate",
    location: "Bel Air, CA",
    price: "$32,000,000",
    beds: 8,
    baths: 12,
    sqft: "22,000",
    image: "https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1000"
  },
  {
    id: "4",
    title: "Summit Ridge",
    location: "Aspen, CO",
    price: "$15,750,000",
    beds: 4,
    baths: 5,
    sqft: "6,200",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=1000"
  }
];

export default function Properties() {
  return (
    <section id="properties" className="py-24 px-6 md:px-12 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-gold uppercase tracking-[0.3em] text-xs font-medium mb-4 block"
            >
              Curated Selection
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-light leading-tight">
              Exceptional Properties <br />
              <span className="italic">for Exceptional Lives.</span>
            </h2>
          </div>
          <button className="text-sm border-b border-brand-gold/50 pb-1 hover:border-brand-gold transition-all text-brand-gold">
            View All Listings
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {properties.map((prop, index) => (
            <motion.div
              key={prop.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-6">
                <img 
                  src={prop.image} 
                  alt={prop.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                <div className="absolute top-4 right-4 px-4 py-2 glass rounded-full text-xs font-medium">
                  {prop.price}
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-light mb-1">{prop.title}</h3>
                  <p className="text-white/50 text-sm font-light uppercase tracking-widest">{prop.location}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-8 border-t border-white/10 pt-6">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Bed size={14} className="text-brand-gold" />
                  <span>{prop.beds} Beds</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Bath size={14} className="text-brand-gold" />
                  <span>{prop.baths} Baths</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Square size={14} className="text-brand-gold" />
                  <span>{prop.sqft} Sq Ft</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

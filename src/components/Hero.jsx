import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SmokeBackground } from './ui/SmokeBackground';

export default function Hero() {
  const roles = ['Research Assistant at Brown', 'ML Engineer', 'Backend Developer'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* WebGL smoke fills the entire background */}
      <div className="absolute inset-0">
        <SmokeBackground smokeColor="#2563EB" />
      </div>

      {/* Subtle blue/gold glow orbs layered above the shader */}
      <motion.div
        animate={{ y: [0, 40, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-20 right-10 w-80 h-80 bg-blue-500 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 13, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-6 text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #93C5FD 40%, #F59E0B 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Hi, I'm Shravya.
            </motion.h1>

            <div className="h-12 mb-8">
              <motion.div
                key={roleIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="inline-block w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <p className="text-xl md:text-2xl font-semibold text-blue-300">
                  {roles[roleIndex]}
                </p>
              </motion.div>
            </div>

            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-12 leading-relaxed">
              CS Master's student at Brown University — I build AI systems that are rigorous, scalable, and actually useful.
            </p>

            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(37,99,235,0.5)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProjects}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-900/40 hover:shadow-blue-500/40 transition-all"
              >
                Explore Projects ↓
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToContact}
                className="px-8 py-4 border border-white/20 text-white/80 rounded-xl font-semibold hover:text-white backdrop-blur-sm transition-all"
              >
                Get in Touch →
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

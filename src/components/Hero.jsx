import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-300 to-blue-100 rounded-full opacity-20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 left-5 w-96 h-96 bg-gradient-to-tr from-amber-200 to-amber-100 rounded-full opacity-15 blur-3xl"
      />

      {/* Decorative shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute top-32 left-20 w-32 h-32 border-2 border-blue-200 rounded-lg opacity-10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-40 right-32 w-40 h-40 border-2 border-amber-200 rounded-full opacity-10"
      />

      <div className="max-w-4xl mx-auto px-6 text-left relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #111827 0%, #2563EB 50%, #F59E0B 100%)',
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="inline-block w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <p className="text-xl md:text-2xl bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent font-semibold">
                {roles[roleIndex]}
              </p>
            </motion.div>
          </div>

          <p className="text-lg text-[#64748B] max-w-2xl mb-10 leading-relaxed">
            CS Master's student at Brown University — I build AI systems that are rigorous, scalable, and actually useful.
          </p>

          <div className="flex gap-4 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
            >
              Explore Projects ↓
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all"
            >
              Get in Touch →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

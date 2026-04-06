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
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-[#111827] mb-4">
            Hi, I'm Shravya.
          </h1>

          <div className="h-12 mb-6">
            <motion.p
              key={roleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="text-xl text-[#2563EB] font-semibold"
            >
              {roles[roleIndex]}
            </motion.p>
          </div>

          <p className="text-lg text-[#64748B] max-w-2xl mb-8 leading-relaxed">
            CS Master's student at Brown University — I build AI systems that are rigorous, scalable, and actually useful.
          </p>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="px-6 py-3 bg-[#2563EB] text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              See My Work ↓
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

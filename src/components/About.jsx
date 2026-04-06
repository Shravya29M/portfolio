import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-16"
        >
          About
        </motion.h2>

        <div className="grid md:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-5"
          >
            <p className="text-lg text-white/70 leading-relaxed">
              I'm a CS grad student at Brown with a 4.0 GPA, a patent, and a genuine obsession with making machine learning solve real problems — from diagnosing Alzheimer's to helping people process emotions.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              Before Brown, I studied at VIT Chennai (3.97 GPA) and spent time at research labs and cloud engineering internships. I care about systems that scale, code that's readable, and research that ships.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4"
          >
            <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-sm font-semibold text-white">Brown University</p>
              <p className="text-sm text-white/50 mt-1">MS Computer Science &middot; 4.0</p>
              <p className="text-xs text-white/30 mt-1">Expected May 2027</p>
            </div>

            <div className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.06]">
              <p className="text-sm font-semibold text-white">VIT Chennai</p>
              <p className="text-sm text-white/50 mt-1">BTech Computer Science &middot; 3.97</p>
              <p className="text-xs text-white/30 mt-1">May 2025</p>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 text-xs text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/5">
                AWS Cloud Practitioner
              </span>
              <span className="px-3 py-1 text-xs text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/5">
                Google Cloud Digital Leader
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

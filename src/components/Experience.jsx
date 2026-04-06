import { motion } from 'framer-motion';
import { experience } from '../data/experience';
import { FiBriefcase } from 'react-icons/fi';

export default function Experience() {
  const getRoleIcon = (index) => {
    const icons = ['🔬', '☁️', '🏥'];
    return icons[index] || '🎯';
  };

  return (
    <section id="experience" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-amber-500 to-blue-500 opacity-20" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-[#111827]">My </span>
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                whileHover={{ x: 8 }}
                className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-blue-300 transition-all hover:shadow-lg"
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-10 top-8 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"
                  whileHover={{ scale: 1.3 }}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{getRoleIcon(index)}</span>
                      <div>
                        <h3 className="text-xl font-bold text-[#111827] group-hover:text-blue-600 transition-colors">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-semibold text-blue-600">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <motion.span
                      className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full whitespace-nowrap ml-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      {exp.date}
                    </motion.span>
                  </div>

                  <ul className="mt-5 space-y-3 ml-11">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-sm text-[#64748B] flex gap-3 group-hover:text-[#111827] transition-colors"
                      >
                        <motion.span
                          className="text-amber-500 font-bold mt-1 flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          ▸
                        </motion.span>
                        <span className="leading-relaxed">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-16"
        >
          Experience
        </motion.h2>

        <div className="space-y-px">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 -mx-6 rounded-lg hover:bg-white/[0.03] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-1 md:gap-6">
                <span className="text-xs text-white/30 font-mono md:w-36 flex-shrink-0 pt-1">
                  {exp.date}
                </span>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-white/40 mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-white/50 leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[9px] before:w-1.5 before:h-px before:bg-white/20"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

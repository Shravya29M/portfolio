import { motion } from 'framer-motion';
import { experience } from '../data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#111827] mb-12"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-l-4 border-[#2563EB] pl-6"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-[#111827]">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[#2563EB]">{exp.company}</p>
                </div>
                <span className="text-xs text-[#64748B] whitespace-nowrap ml-4">
                  {exp.date}
                </span>
              </div>
              <ul className="mt-4 space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="text-sm text-[#64748B] flex gap-3">
                    <span className="text-[#2563EB] mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

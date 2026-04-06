import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Skills() {
  const skillGroups = [
    {
      category: 'Languages',
      icon: '💻',
      skills: ['Python', 'Java', 'C', 'C++', 'SQL', 'JavaScript'],
    },
    {
      category: 'Backend & APIs',
      icon: '⚙️',
      skills: ['FastAPI', 'REST APIs', 'Microservices', 'AWS Lambda', 'React'],
    },
    {
      category: 'Cloud & DevOps',
      icon: '☁️',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    },
    {
      category: 'ML & AI',
      icon: '🤖',
      skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'NLP', 'Computer Vision', 'LLMs'],
    },
    {
      category: 'Data & Databases',
      icon: '🗄️',
      skills: ['SQL', 'ETL Pipelines', 'Relational DB Design'],
    },
    {
      category: 'Tools',
      icon: '🛠️',
      skills: ['Git', 'Linux', 'Agile/Scrum'],
    },
  ];

  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#111827]">What I </span>
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Work With
            </span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <motion.h3
                className="text-sm font-bold text-[#111827] mb-4 flex items-center gap-2"
                whileHover={{ x: 4 }}
              >
                <span className="text-2xl">{group.icon}</span>
                {group.category}
              </motion.h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, skillIndex) => (
                  <motion.button
                    key={skillIndex}
                    onHoverStart={() =>
                      setHoveredSkill(`${groupIndex}-${skillIndex}`)
                    }
                    onHoverEnd={() => setHoveredSkill(null)}
                    whileHover={{ y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                  >
                    {/* Background gradient */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100 to-amber-100 opacity-0 group-hover:opacity-40 transition-opacity" />

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-lg border-2 border-blue-300"
                      animate={{
                        borderColor:
                          hoveredSkill === `${groupIndex}-${skillIndex}`
                            ? '#F59E0B'
                            : '#BFDBFE',
                      }}
                    />

                    {/* Text */}
                    <motion.span
                      className="relative text-blue-700 flex items-center gap-2"
                      animate={{
                        color:
                          hoveredSkill === `${groupIndex}-${skillIndex}`
                            ? '#F59E0B'
                            : '#1E40AF',
                      }}
                    >
                      {hoveredSkill === `${groupIndex}-${skillIndex}` && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-lg"
                        >
                          ✨
                        </motion.span>
                      )}
                      {skill}
                    </motion.span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

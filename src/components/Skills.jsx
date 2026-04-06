import { motion } from 'framer-motion';

export default function Skills() {
  const skillGroups = [
    {
      category: 'Languages',
      skills: ['Python', 'Java', 'C', 'C++', 'SQL', 'JavaScript'],
    },
    {
      category: 'Backend & APIs',
      skills: ['FastAPI', 'REST APIs', 'Microservices', 'AWS Lambda', 'React'],
    },
    {
      category: 'Cloud & DevOps',
      skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'GitHub Actions'],
    },
    {
      category: 'ML & AI',
      skills: ['PyTorch', 'TensorFlow', 'HuggingFace', 'NLP', 'Computer Vision', 'LLMs'],
    },
    {
      category: 'Data & Databases',
      skills: ['SQL', 'ETL Pipelines', 'Relational DB Design'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'Linux', 'Agile/Scrum'],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-16"
        >
          What I Work With
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1.5 text-sm text-white/60 border border-white/[0.06] rounded-lg bg-white/[0.02] hover:text-white hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

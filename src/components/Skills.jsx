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
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#111827] mb-12"
        >
          What I Work With
        </motion.h2>

        <div className="space-y-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-sm font-semibold text-[#111827] mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 transition-colors hover:bg-blue-100"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

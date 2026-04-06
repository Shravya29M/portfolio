import { motion } from 'framer-motion';
import {
  SiPython,
  SiOpenjdk,
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPostgresql,
  SiFastapi,
  SiReact,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
  SiGithubactions,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiGit,
  SiLinux,
} from 'react-icons/si';

const iconMap = {
  Python: SiPython,
  Java: SiOpenjdk,
  C: SiC,
  'C++': SiCplusplus,
  SQL: SiPostgresql,
  JavaScript: SiJavascript,
  FastAPI: SiFastapi,
  React: SiReact,
  GCP: SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  'CI/CD': SiGithubactions,
  'GitHub Actions': SiGithubactions,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  HuggingFace: SiHuggingface,
  Git: SiGit,
  Linux: SiLinux,
};

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
    skills: [
      'PyTorch',
      'TensorFlow',
      'HuggingFace',
      'NLP',
      'Computer Vision',
      'LLMs',
    ],
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

function SkillTile({ name }) {
  const Icon = iconMap[name];
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="group flex items-center gap-2.5 px-3 py-2.5 border border-white/[0.06] rounded-lg bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/[0.04] transition-all"
    >
      {Icon ? (
        <Icon
          size={16}
          className="text-white/50 group-hover:text-blue-400 transition-colors flex-shrink-0"
        />
      ) : (
        <span className="w-1 h-1 rounded-full bg-white/30 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
      )}
      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
        {name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.06 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {group.skills.map((skill) => (
                  <SkillTile key={skill} name={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

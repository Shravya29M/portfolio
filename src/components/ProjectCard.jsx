import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-md ${
        project.featured ? 'lg:col-span-2 ring-2 ring-[#2563EB] ring-opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-[#111827]">
          {project.title}
        </h3>
        {project.badge && (
          <span className="px-2 py-1 bg-[#2563EB] text-white text-xs rounded-full whitespace-nowrap ml-2">
            {project.badge}
          </span>
        )}
      </div>

      <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:text-blue-700 transition-colors"
        >
          <FiGithub size={16} />
          GitHub
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[#2563EB] hover:text-blue-700 transition-colors"
          >
            <FiExternalLink size={16} />
            Live
          </a>
        )}
      </div>
    </motion.div>
  );
}

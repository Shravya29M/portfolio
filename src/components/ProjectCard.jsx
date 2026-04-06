import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative group bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-all hover:shadow-xl hover:border-amber-200 cursor-pointer ${
        project.featured
          ? 'lg:col-span-2 ring-2 ring-blue-500 ring-opacity-40'
          : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#111827] group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 items-center">
            {project.badge && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs rounded-full font-semibold whitespace-nowrap"
              >
                {project.badge}
              </motion.span>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown
                size={20}
                className="text-blue-600 group-hover:text-amber-500 transition-colors"
              />
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-[#64748B] mb-4 leading-relaxed group-hover:text-[#111827] transition-colors">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05 }}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 text-xs rounded-full border border-blue-200 group-hover:border-amber-300 transition-colors font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Expandable content */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-gray-200 mt-4">
            <p className="text-sm text-[#64748B] mb-4">
              This project showcases expertise in {project.tags[0]} and related technologies. Built with attention to scalability and production readiness.
            </p>
          </div>
        </motion.div>

        <div className="flex gap-4 pt-2">
          <motion.a
            whileHover={{ x: 4 }}
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-amber-500 transition-colors font-semibold"
          >
            <FiGithub size={16} />
            GitHub
          </motion.a>
          {project.live && (
            <motion.a
              whileHover={{ x: 4 }}
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-amber-500 transition-colors font-semibold"
            >
              <FiExternalLink size={16} />
              Live
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

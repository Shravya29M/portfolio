import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { GlowCard } from './ui/GlowCard';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const glowColor = project.featured ? 'blue' : 'purple';

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`group cursor-pointer transition-all ${
        project.featured ? 'lg:col-span-2' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <GlowCard
        glowColor={glowColor}
        className={`h-full ${
          project.featured ? 'ring-2 ring-blue-400/40' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-[#111827] group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 items-center flex-shrink-0 ml-2">
            {project.badge && (
              <span className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs rounded-full font-semibold whitespace-nowrap">
                {project.badge}
              </span>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FiChevronDown
                size={18}
                className="text-blue-500 group-hover:text-amber-500 transition-colors"
              />
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-[#64748B] mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-50 to-amber-50 text-blue-700 text-xs rounded-full border border-blue-200 font-medium"
            >
              {tag}
            </span>
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
          <div className="pt-4 border-t border-gray-100 mt-2">
            <p className="text-sm text-[#64748B]">
              Built with attention to scalability and production readiness, this project reflects my focus on {project.tags[0]} and real-world deployment.
            </p>
          </div>
        </motion.div>

        <div className="flex gap-4 pt-3 mt-auto">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-amber-500 transition-colors font-semibold"
          >
            <FiGithub size={15} />
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-amber-500 transition-colors font-semibold"
            >
              <FiExternalLink size={15} />
              Live
            </a>
          )}
        </div>
      </GlowCard>
    </motion.div>
  );
}

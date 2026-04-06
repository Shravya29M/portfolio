import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiChevronDown } from 'react-icons/fi';
import { GlowCard } from './ui/GlowCard';

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`group cursor-pointer ${
        project.featured ? 'md:col-span-2' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <GlowCard
        glowColor={project.featured ? 'blue' : 'purple'}
        className="h-full"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 items-center flex-shrink-0 ml-2">
            {project.badge && (
              <span className="px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/10 whitespace-nowrap">
                {project.badge}
              </span>
            )}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiChevronDown size={14} className="text-white/20" />
            </motion.div>
          </div>
        </div>

        <p className="text-sm text-white/40 mb-4 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 text-[11px] text-white/50 border border-white/[0.06] rounded-full bg-white/[0.02]"
            >
              {tag}
            </span>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? 'auto' : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="pt-3 border-t border-white/[0.06] mt-2">
            <p className="text-sm text-white/30">
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
            className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-blue-400 transition-colors"
          >
            <FiGithub size={13} />
            Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-blue-400 transition-colors"
            >
              <FiExternalLink size={13} />
              Live
            </a>
          )}
        </div>
      </GlowCard>
    </div>
  );
}

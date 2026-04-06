import { Link } from 'react-router-dom';
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi';
import { GlowCard } from './ui/GlowCard';

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/project/${project.id}`}
      className={`group block ${project.featured ? 'md:col-span-2' : ''}`}
    >
      <GlowCard
        glowColor={project.featured ? 'blue' : 'purple'}
        className="h-full !p-0 overflow-hidden"
      >
        {project.heroImage && (
          <div className="relative h-40 w-full overflow-hidden">
            <img
              src={project.heroImage}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f12] via-transparent to-transparent" />
          </div>
        )}

        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {project.badge && (
              <span className="px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/10 whitespace-nowrap ml-2">
                {project.badge}
              </span>
            )}
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

          <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
            <div className="flex gap-4">
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
            <span className="inline-flex items-center gap-1 text-xs text-white/40 group-hover:text-blue-400 transition-colors">
              Read more
              <FiArrowRight
                size={12}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </span>
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}

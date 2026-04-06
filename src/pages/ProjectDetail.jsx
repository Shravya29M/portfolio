import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(
    (p) => String(p.id) === id || p.slug === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white/60">
        <div className="text-center">
          <p className="mb-4">Project not found.</p>
          <Link to="/" className="text-blue-400 hover:underline">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      {/* Sticky back nav */}
      <div className="sticky top-0 z-40 backdrop-blur-md bg-[#09090B]/70 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to portfolio
          </Link>
        </div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[55vh] min-h-[380px] w-full overflow-hidden"
      >
        <img
          src={project.heroImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/70 to-[#09090B]/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-12 w-full">
            {project.badge && (
              <span className="inline-block px-2 py-0.5 mb-4 text-[10px] font-semibold text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/10">
                {project.badge}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-mono text-white/40 uppercase tracking-wider">
              <span>{project.year}</span>
              <span>{project.role}</span>
              <span>{project.duration}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Intro: two columns */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4 text-base text-white/60 leading-relaxed whitespace-pre-line"
          >
            {project.longDescription}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex flex-col gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white border border-white/[0.08] rounded-lg bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05] transition-all"
              >
                <FiGithub size={14} /> View Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white border border-blue-500/30 rounded-lg bg-blue-500/10 hover:bg-blue-500/15 transition-all"
                >
                  <FiExternalLink size={14} /> Live Demo
                </a>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-3">
                Tech Stack
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-[11px] text-white/60 border border-white/[0.06] rounded bg-white/[0.02]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Problem */}
        <Section title="The Problem">{project.problem}</Section>

        {/* Solution + first image */}
        <Section title="Approach">
          {project.solution}
          {project.images?.[0] && (
            <img
              src={project.images[0]}
              alt=""
              className="mt-8 w-full rounded-xl border border-white/[0.06]"
            />
          )}
        </Section>

        {/* Architecture */}
        <Section title="Architecture">{project.architecture}</Section>

        {/* Challenges */}
        {project.challenges?.length > 0 && (
          <Section title="Challenges">
            <ul className="space-y-2">
              {project.challenges.map((c, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-400 mt-1">—</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Outcomes + second image */}
        {project.outcomes?.length > 0 && (
          <Section title="Outcomes">
            <ul className="space-y-2">
              {project.outcomes.map((o, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            {project.images?.[1] && (
              <img
                src={project.images[1]}
                alt=""
                className="mt-8 w-full rounded-xl border border-white/[0.06]"
              />
            )}
          </Section>
        )}

        {/* Closing CTA */}
        <div className="mt-24 pt-12 border-t border-white/[0.06] text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to all projects
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '-50px' }}
      className="mb-16"
    >
      <h2 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
        {title}
      </h2>
      <div className="text-base text-white/60 leading-relaxed">{children}</div>
    </motion.section>
  );
}

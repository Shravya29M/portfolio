import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Contact() {
  const links = [
    {
      icon: FiGithub,
      label: 'GitHub',
      href: 'https://github.com/Shravya29M',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/shravya29M',
    },
    {
      icon: FiMail,
      label: 'Email',
      href: 'mailto:shravya_munugala@brown.edu',
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Let's Talk
          </h2>

          <p className="text-base text-white/40 max-w-lg mb-12 leading-relaxed">
            I'm open to SWE and ML roles for Summer/Fall 2027. If you're working on something interesting, I'd love to hear about it.
          </p>

          <div className="flex gap-4 mb-20">
            {links.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={idx}
                  href={link.href}
                  target={link.label !== 'Email' ? '_blank' : undefined}
                  rel={link.label !== 'Email' ? 'noopener noreferrer' : undefined}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-white/40 border border-white/[0.06] rounded-lg bg-white/[0.02] hover:text-white hover:border-white/15 transition-all"
                >
                  <Icon size={15} />
                  {link.label}
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <div className="border-t border-white/5 pt-8">
          <p className="text-xs text-white/20">
            &copy; 2026 Shravya Munugala
          </p>
        </div>
      </div>
    </section>
  );
}

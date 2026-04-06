import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { useState } from 'react';

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('shravya_munugala@brown.edu');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const socialLinks = [
    {
      icon: FiGithub,
      label: 'GitHub',
      href: 'https://github.com/Shravya29M',
      color: 'from-gray-700 to-gray-900',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/shravya29M',
      color: 'from-blue-600 to-blue-800',
    },
    {
      icon: FiMail,
      label: 'Email',
      href: 'mailto:shravya_munugala@brown.edu',
      color: 'from-amber-500 to-amber-700',
      onClick: copyEmail,
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/20 to-transparent rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 left-20 w-80 h-80 bg-gradient-to-tr from-amber-400/20 to-transparent rounded-full blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-[#111827]">Let's </span>
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 bg-clip-text text-transparent">
              Build
            </span>
            <span className="text-[#111827]"> Something Great</span>
          </h2>

          <p className="text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            I'm currently open to SWE and ML internship/full-time roles for Summer/Fall 2027. If you're working on something interesting, I'd love to hear about it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 mb-16 flex-wrap"
        >
          {socialLinks.map((social, idx) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={idx}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                onClick={social.onClick}
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div
                  className={`p-4 rounded-full bg-gradient-to-br ${social.color} text-white shadow-lg hover:shadow-2xl transition-all`}
                >
                  <Icon size={28} />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-[#111827] text-white px-3 py-1 rounded-lg text-sm font-semibold whitespace-nowrap"
                >
                  {emailCopied && social.label === 'Email'
                    ? '✓ Copied!'
                    : social.label}
                </motion.div>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t-2 border-gradient-to-r from-blue-200 via-purple-200 to-amber-200 pt-12"
        >
          <p className="text-sm text-[#64748B] font-semibold">
            © 2026 Shravya Munugala. Crafted with care.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

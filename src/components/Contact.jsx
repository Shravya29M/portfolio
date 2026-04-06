import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-[#111827] mb-6">
            Let's Talk
          </h2>

          <p className="text-lg text-[#64748B] max-w-2xl mx-auto mb-12">
            I'm currently open to SWE and ML internship/full-time roles for Summer/Fall 2027. If you're working on something interesting, I'd love to hear about it.
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/Shravya29M"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-50 text-[#2563EB] rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiGithub size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="https://linkedin.com/in/shravya29M"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-50 text-[#2563EB] rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiLinkedin size={24} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:shravya_munugala@brown.edu"
              className="p-3 bg-blue-50 text-[#2563EB] rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FiMail size={24} />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 pt-8 text-sm text-[#64748B]"
        >
          <p>© 2026 Shravya Munugala. All rights reserved.</p>
        </motion.div>
      </div>
    </section>
  );
}

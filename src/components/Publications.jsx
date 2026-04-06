import { motion } from 'framer-motion';
import { publications } from '../data/publications';

export default function Publications() {
  return (
    <section className="py-24 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white mb-16"
        >
          Publications & Patents
        </motion.h2>

        <div className="space-y-3">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/10 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20 rounded-full bg-blue-500/10">
                      {pub.type}
                    </span>
                    <span className="text-xs text-white/20">{pub.date}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-xs text-white/30 mt-1">{pub.details}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { publications } from '../data/publications';

export default function Publications() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#111827] mb-12"
        >
          Publications & Patents
        </motion.h2>

        <div className="space-y-4">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2 py-1 bg-[#2563EB] text-white text-xs rounded-full font-semibold mr-3">
                    {pub.type}
                  </span>
                  <h3 className="font-semibold text-[#111827] mt-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mt-1">{pub.details}</p>
                </div>
                <span className="text-xs text-[#64748B] whitespace-nowrap ml-4">
                  {pub.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

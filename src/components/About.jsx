import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#111827] mb-12"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              I'm a CS grad student at Brown with a 4.0 GPA, a patent, and a genuine obsession with making machine learning solve real problems — from diagnosing Alzheimer's to helping people process emotions.
            </p>
            <p className="text-lg text-[#64748B] leading-relaxed">
              Before Brown, I studied at VIT Chennai (3.97 GPA) and spent time at research labs and cloud engineering internships. I care about systems that scale, code that's readable, and research that ships.
            </p>
          </motion.div>

          {/* Right side - education & certs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#111827]">Brown University</h3>
              <p className="text-sm text-[#64748B] mt-1">
                MS Computer Science
              </p>
              <p className="text-sm text-[#64748B]">GPA: 4.0/4.0</p>
              <p className="text-xs text-[#64748B] mt-2">Expected May 2027</p>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-[#111827]">VIT Chennai</h3>
              <p className="text-sm text-[#64748B] mt-1">
                BTech Computer Science
              </p>
              <p className="text-sm text-[#64748B]">GPA: 3.97/4.0</p>
              <p className="text-xs text-[#64748B] mt-2">May 2025</p>
            </div>

            <div className="pt-4">
              <p className="text-sm font-semibold text-[#111827] mb-3">Certifications</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                  AWS Cloud Practitioner
                </span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full border border-blue-200">
                  Google Cloud Digital Leader
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

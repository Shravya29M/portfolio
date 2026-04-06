import { motion } from 'framer-motion';

export default function About() {
  const educationCards = [
    {
      school: 'Brown University',
      degree: 'MS Computer Science',
      gpa: '4.0/4.0',
      date: 'Expected May 2027',
      icon: '🎓',
    },
    {
      school: 'VIT Chennai',
      degree: 'BTech Computer Science',
      gpa: '3.97/4.0',
      date: 'May 2025',
      icon: '📚',
    },
  ];

  const certs = [
    { name: 'AWS Cloud Practitioner', year: '2024' },
    { name: 'Google Cloud Digital Leader', year: '2023' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#111827]">About </span>
            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <motion.p
                className="text-lg text-[#64748B] leading-relaxed"
                whileInView={{ color: '#111827' }}
                transition={{ duration: 0.3 }}
              >
                I'm a CS grad student at Brown with a 4.0 GPA, a patent, and a genuine obsession with making machine learning solve real problems — from diagnosing Alzheimer's to helping people process emotions.
              </motion.p>
            </div>
            <div>
              <motion.p className="text-lg text-[#64748B] leading-relaxed">
                Before Brown, I studied at VIT Chennai (3.97 GPA) and spent time at research labs and cloud engineering internships. I care about systems that scale, code that's readable, and research that ships.
              </motion.p>
            </div>
          </motion.div>

          {/* Right side - education & certs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Education Cards */}
            {educationCards.map((card, idx) => (
              <motion.div
                key={idx}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
                }}
                className="group relative bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all overflow-hidden"
              >
                {/* Gradient accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 to-amber-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{card.icon}</span>
                    <div>
                      <h3 className="font-bold text-[#111827]">{card.school}</h3>
                      <p className="text-sm text-blue-600 font-semibold">
                        {card.degree}
                      </p>
                    </div>
                  </div>
                  <div className="ml-11 space-y-1">
                    <p className="text-sm text-[#64748B]">
                      GPA: <span className="font-semibold text-[#111827]">{card.gpa}</span>
                    </p>
                    <p className="text-xs text-[#64748B]">{card.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <p className="text-sm font-bold text-[#111827] mb-3 flex items-center gap-2">
                <span className="text-lg">🏆</span>
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {certs.map((cert, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-amber-100 text-blue-700 text-xs font-semibold rounded-full border border-blue-200 hover:border-amber-400 transition-all"
                  >
                    {cert.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

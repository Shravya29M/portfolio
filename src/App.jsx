import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ThreeDMarquee from './components/ui/ThreeDMarquee';
import { motion } from 'framer-motion';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />

      {/* 3D Tech Showcase strip */}
      <section className="py-12 bg-[#FAFAFA] overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 mb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-[#64748B] text-center"
          >
            Built across AI · Cloud · Healthcare · Visualization
          </motion.p>
        </div>
        <ThreeDMarquee />
      </section>

      <Skills />
      <Contact />
    </div>
  );
}

export default App;

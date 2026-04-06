import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-[#09090B]">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Contact />
    </div>
  );
}

export default App;

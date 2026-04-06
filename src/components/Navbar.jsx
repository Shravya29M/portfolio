import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const links = ['about', 'experience', 'projects', 'skills', 'contact'];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/80 backdrop-blur-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-semibold text-lg text-white/90 hover:text-white transition-colors"
        >
          SM
        </button>
        <div className="hidden md:flex gap-8 text-sm text-white/40">
          {links.map((id) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="hover:text-white transition-colors capitalize"
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

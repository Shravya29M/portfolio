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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="font-semibold text-lg text-[#111827]">
          Shravya Munugala
        </div>
        <div className="flex gap-8 text-sm text-[#64748B]">
          <button
            onClick={() => scrollToSection('about')}
            className="hover:text-[#111827] transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('experience')}
            className="hover:text-[#111827] transition-colors"
          >
            Experience
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className="hover:text-[#111827] transition-colors"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="hover:text-[#111827] transition-colors"
          >
            Skills
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="hover:text-[#111827] transition-colors"
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

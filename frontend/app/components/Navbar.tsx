'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Command, Cpu, Shield, Sparkles, Terminal, Code2, Mail, FileText, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Systems', to: 'projects', icon: Cpu },
    { name: 'Case Studies', to: 'case-studies', icon: Code2 },
    { name: 'Architecture', to: 'architecture', icon: Terminal },
    { name: 'Arsenal', to: 'skills', icon: Sparkles },
    { name: 'Governance', to: 'certifications', icon: Shield },
    { name: 'Badges', to: 'registry', icon: ShieldCheck },
    { name: 'Contact', to: 'contact', icon: Mail },
  ];

  const handleOpenCommandPalette = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
    document.dispatchEvent(event);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-slate-950/80 backdrop-blur-xl py-3 border-b border-white/[0.08] shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo / Monogram */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center font-mono font-black text-white text-xs shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:shadow-cyan-500/30 transition-all duration-300 border border-white/20">
              AM
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                Abdullah Malik
              </span>
              <span className="text-[10px] font-mono text-slate-400 tracking-wider">
                Agentic AI Engineer
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 items-center glass px-3 py-1.5 rounded-full border border-white/[0.08] bg-slate-900/40">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                activeClass="!text-cyan-400 !bg-white/[0.08]"
                className="cursor-pointer text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Header Actions: Quick Nav & Terminal */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handleOpenCommandPalette}
              className="glass px-3 py-1.5 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 text-slate-400 hover:text-white text-xs font-mono flex items-center gap-2 transition-all duration-200 cursor-pointer"
              title="Open Command Palette (⌘K / Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-cyan-400" />
              <span>⌘K</span>
            </button>

            <Link
              to="contact"
              smooth={true}
              offset={-70}
              duration={500}
              className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm shadow-indigo-500/20"
            >
              Initiate Contact
            </Link>

            <a
              href="/resume"
              className="glass px-3.5 py-1.5 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all duration-200"
              title="View Abdullah Malik's Resume"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={handleOpenCommandPalette}
              className="p-2 rounded-xl glass border border-white/[0.08] text-slate-300"
              aria-label="Command palette"
            >
              <Command className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              className="p-2 rounded-xl glass border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-3 pt-3 border-t border-white/[0.08]' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 space-y-2">
              <Link
                to="contact"
                smooth={true}
                offset={-70}
                duration={500}
                className="w-full text-center block px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-xs font-bold rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Initiate Contact
              </Link>
              <a
                href="/resume"
                className="w-full text-center flex items-center justify-center gap-2 px-4 py-2.5 glass border border-white/10 text-slate-200 text-xs font-semibold rounded-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Full Resume</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

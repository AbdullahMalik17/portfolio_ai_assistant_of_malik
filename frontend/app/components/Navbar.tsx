'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Command, Sparkles, Cpu, Layers, Terminal, User, FileText } from 'lucide-react';

const navItems = [
  { name: 'Work', to: 'projects', icon: Cpu },
  { name: 'Case Studies', to: 'case-studies', icon: Layers },
  { name: 'Architecture', to: 'architecture', icon: Terminal },
  { name: 'Skills', to: 'skills', icon: Sparkles },
  { name: 'About', to: 'about', icon: User },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-[#05070e]/85 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[var(--shell)] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-[var(--nav-h)] items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="home"
            smooth={true}
            duration={500}
            className="flex shrink-0 items-center gap-2.5 cursor-pointer group"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-accent font-mono text-xs font-bold text-accent-ink">
              AM
            </span>
            <span className="hidden sm:block min-w-0">
              <span className="block truncate text-sm font-semibold tracking-tight text-ink">
                Abdullah Malik
              </span>
              <span className="block truncate font-mono text-[11px] text-ink-subtle">
                Agentic AI Engineer
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 rounded-full border border-line bg-white/5 px-2 py-1.5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                spy={true}
                smooth={true}
                offset={-80}
                duration={500}
                activeClass="!text-accent !bg-white/5"
                className="cursor-pointer whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-wide text-ink-muted transition-colors hover:text-ink"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenCommandPalette}
              className="hidden md:inline-flex items-center gap-2 rounded-xl border border-line bg-white/5 px-3 py-2 font-mono text-[12px] text-ink-muted transition-colors hover:border-accent/40 hover:text-ink cursor-pointer"
              title="Open Command Palette (Ctrl+K)"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5 text-accent" />
              <span>K</span>
            </button>

            <a
              href="/resume"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-line bg-white/5 px-3 py-2 text-[13px] font-medium text-ink-muted transition-colors hover:border-accent/40 hover:text-ink"
              title="View resume"
            >
              <FileText className="h-3.5 w-3.5 text-accent" />
              <span>Resume</span>
            </a>

            <Link
              to="contact"
              smooth={true}
              offset={-80}
              duration={500}
              className="cursor-pointer whitespace-nowrap rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink transition-colors hover:bg-accent-bright"
            >
              Contact
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-xl border border-line bg-white/5 text-ink-muted hover:text-ink transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile sheet */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[28rem] opacity-100 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-3 mt-1 border-t border-line space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-80}
                  duration={500}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-muted hover:text-ink hover:bg-white/5 transition-colors cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="w-4 h-4 text-accent" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-3 py-2.5 text-[13px] font-medium text-ink-muted"
              >
                <Command className="w-4 h-4 text-accent" />
                Commands
              </button>
              <a
                href="/resume"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white/5 px-3 py-2.5 text-[13px] font-medium text-ink-muted"
              >
                <FileText className="w-4 h-4 text-accent" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

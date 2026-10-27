'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Cpu, Sparkles, Activity, 
  Mail, FileText, Github, Linkedin, Search, 
  Bot, Terminal, Layers, ShieldCheck, CornerDownLeft,
  type LucideIcon
} from 'lucide-react';

interface Command {
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const commands: Command[] = [
    {
      id: 'home',
      label: 'Home / Hero',
      description: 'Navigate to hero section and identity overview',
      icon: Home,
      action: () => scrollToSection('home'),
      keywords: ['home', 'hero', 'start', 'top'],
    },
    {
      id: 'projects',
      label: 'Flagship Agentic Systems',
      description: 'Inspect MalikClaw, Digital FTE, and Customer Success systems',
      icon: Cpu,
      action: () => scrollToSection('projects'),
      keywords: ['projects', 'flagship', 'malikclaw', 'bento', 'fte'],
    },
    {
      id: 'case-studies',
      label: 'Engineering Case Studies',
      description: '12-point architectural breakdown of flagship runtimes',
      icon: Layers,
      action: () => scrollToSection('case-studies'),
      keywords: ['case studies', 'architecture', 'breakdown', 'deep dive'],
    },
    {
      id: 'architecture',
      label: 'Agentic System Architecture',
      description: 'Explore the 6-node autonomous agent pipeline blueprint',
      icon: Terminal,
      action: () => scrollToSection('architecture'),
      keywords: ['system architecture', 'blueprint', 'mcp', 'gateway'],
    },
    {
      id: 'skills',
      label: 'Capabilities Matrix',
      description: 'Explore frameworks, Go, Python, models, and vector stores',
      icon: Sparkles,
      action: () => scrollToSection('skills'),
      keywords: ['skills', 'arsenal', 'tech stack', 'matrix'],
    },
    {
      id: 'certifications',
      label: 'A2AS Governance & Certifications',
      description: 'Verify A2AS Behavior Certificate and Panaversity credentials',
      icon: ShieldCheck,
      action: () => scrollToSection('certifications'),
      keywords: ['certifications', 'a2as', 'panaversity', 'governance'],
    },
    {
      id: 'registry',
      label: '37 Badges & Trust Registry',
      description: 'Audit live SVG badges, Skills Directory Grade A skills, and Go quality card',
      icon: ShieldCheck,
      action: () => scrollToSection('registry'),
      keywords: ['badges', 'registry', 'skills directory', 'snyk', 'shield', 'audit', 'grade a'],
    },
    {
      id: 'github',
      label: 'GitHub Engineering Velocity',
      description: 'View repository statistics and open-source contributions',
      icon: Activity,
      action: () => scrollToSection('github'),
      keywords: ['github', 'stats', 'activity', 'commits'],
    },
    {
      id: 'about',
      label: 'About Abdullah Malik',
      description: 'Engineering mindset, background, and career timeline',
      icon: User,
      action: () => scrollToSection('about'),
      keywords: ['about', 'bio', 'journey', 'timeline'],
    },
    {
      id: 'contact',
      label: 'Initiate Contact',
      description: 'Send a message or collaborate on autonomous systems',
      icon: Mail,
      action: () => scrollToSection('contact'),
      keywords: ['contact', 'email', 'message', 'collaborate'],
    },
    {
      id: 'resume',
      label: 'Download Resume (PDF)',
      description: 'View & download Abdullah Malik\'s official CV',
      icon: FileText,
      action: () => window.open('/Abdullah_resume.pdf', '_blank'),
      keywords: ['resume', 'cv', 'download', 'pdf'],
    },
    {
      id: 'github-profile',
      label: 'Open GitHub Profile',
      description: 'github.com/AbdullahMalik17',
      icon: Github,
      action: () => window.open('https://github.com/AbdullahMalik17', '_blank'),
      keywords: ['github', 'profile', 'source', 'code'],
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn Profile',
      description: 'Connect with Abdullah on LinkedIn',
      icon: Linkedin,
      action: () => window.open('https://www.linkedin.com/in/muhammad-abdullah-athar', '_blank'),
      keywords: ['linkedin', 'social', 'network'],
    },
  ];

  const filteredCommands = commands.filter((command) => {
    const searchLower = search.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchLower) ||
      command.description.toLowerCase().includes(searchLower) ||
      command.keywords?.some((keyword) => keyword.includes(searchLower))
    );
  });

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }

      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }

      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
        setSearch('');
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const openFromDock = () => setIsOpen(true);
    window.addEventListener('open-command-palette', openFromDock);
    return () => window.removeEventListener('open-command-palette', openFromDock);
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50 px-4"
            >
              <div className="glass-strong overflow-hidden rounded-[var(--radius-panel)]">
                {/* Search Input Bar */}
                <div className="p-4 border-b border-line">
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-accent shrink-0" />
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Type a section name, system, or command..."
                      className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-ink-subtle font-sans"
                      autoFocus
                    />
                    <kbd className="px-2 py-0.5 text-[10px] font-mono bg-surface rounded border border-line text-ink-muted">
                      ESC
                    </kbd>
                  </div>
                </div>

                {/* Commands List */}
                <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                  {filteredCommands.length > 0 ? (
                    filteredCommands.map((command, index) => {
                      const Icon = command.icon;
                      const isSelected = index === selectedIndex;

                      return (
                        <button
                          key={command.id}
                          onClick={() => {
                            command.action();
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-3.5 p-3 rounded-2xl text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-accent/15 border border-accent/40 text-ink shadow-sm'
                              : 'text-ink-muted hover:text-ink hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-xl glass border border-line flex items-center justify-center shrink-0 ${isSelected ? 'text-accent bg-accent/20' : 'text-ink-muted'}`}>
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-xs font-bold truncate ${isSelected ? 'text-ink' : 'text-ink'}`}>
                              {command.label}
                            </div>
                            <div className="text-[11px] text-ink-muted truncate">
                              {command.description}
                            </div>
                          </div>

                          {isSelected && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-accent shrink-0" />
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-2">
                      <button
                        onClick={() => {
                          const event = new CustomEvent('open-portfolio-chat', { detail: search });
                          window.dispatchEvent(event);
                          setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-3.5 rounded-2xl text-left bg-accent/10 border border-accent/40 text-ink cursor-pointer"
                      >
                        <Bot className="w-5 h-5 text-accent shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-accent truncate">
                            Ask AI Assistant: &quot;{search}&quot;
                          </div>
                          <div className="text-[11px] text-ink-muted truncate">
                            Send this query directly to the portfolio digital FTE
                          </div>
                        </div>
                        <CornerDownLeft className="w-3.5 h-3.5 text-accent shrink-0" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="px-4 py-2.5 border-t border-line bg-surface/60 flex items-center justify-between text-[11px] font-mono text-ink-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-canvas rounded border border-line">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <kbd className="px-1.5 py-0.5 bg-canvas rounded border border-line">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span>Press ⌘K anytime</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

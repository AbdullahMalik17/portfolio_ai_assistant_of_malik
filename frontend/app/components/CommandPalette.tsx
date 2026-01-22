'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  id: string;
  label: string;
  description: string;
  icon: string;
  action: () => void;
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    {
      id: 'home',
      label: 'Go to Home',
      description: 'Navigate to the hero section',
      icon: '🏠',
      action: () => scrollToSection('home'),
      keywords: ['home', 'hero', 'start', 'top'],
    },
    {
      id: 'about',
      label: 'Go to About',
      description: 'Learn more about me',
      icon: '👤',
      action: () => scrollToSection('about'),
      keywords: ['about', 'bio', 'info'],
    },
    {
      id: 'skills',
      label: 'Go to Skills',
      description: 'View my technical skills',
      icon: '💻',
      action: () => scrollToSection('skills'),
      keywords: ['skills', 'technologies', 'tech stack'],
    },
    {
      id: 'projects',
      label: 'Go to Projects',
      description: 'Explore my portfolio projects',
      icon: '🚀',
      action: () => scrollToSection('projects'),
      keywords: ['projects', 'portfolio', 'work'],
    },
    {
      id: 'github',
      label: 'Go to GitHub Stats',
      description: 'View GitHub activity',
      icon: '📊',
      action: () => scrollToSection('github'),
      keywords: ['github', 'stats', 'activity'],
    },
    {
      id: 'contact',
      label: 'Go to Contact',
      description: 'Get in touch with me',
      icon: '📧',
      action: () => scrollToSection('contact'),
      keywords: ['contact', 'email', 'message', 'reach'],
    },
    {
      id: 'resume',
      label: 'Download Resume',
      description: 'Download my resume PDF',
      icon: '📄',
      action: () => window.open('/Abdullah_resume.pdf', '_blank'),
      keywords: ['resume', 'cv', 'download'],
    },
    {
      id: 'github-profile',
      label: 'Open GitHub Profile',
      description: 'Visit my GitHub profile',
      icon: '🔗',
      action: () => window.open('https://github.com/AbdullahMalik17', '_blank'),
      keywords: ['github', 'profile', 'code'],
    },
    {
      id: 'linkedin',
      label: 'Open LinkedIn',
      description: 'Connect on LinkedIn',
      icon: '💼',
      action: () => window.open('https://www.linkedin.com/in/muhammad-abdullah-athar', '_blank'),
      keywords: ['linkedin', 'professional', 'network'],
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

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
      // Toggle command palette with Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearch('');
      }

      if (!isOpen) return;

      // Navigation
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

      // Execute command
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

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 glass px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition-transform group"
        aria-label="Open command palette"
      >
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 text-xs bg-[color:var(--background)] rounded border border-[color:var(--card-border)]">
            ⌘K
          </kbd>
          <span className="text-sm font-medium hidden md:inline">Quick Nav</span>
        </div>
      </button>

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
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Command Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-[15%] sm:top-1/4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
            >
              <div className="glass rounded-2xl shadow-2xl border-2 border-[color:var(--accent)]/20 overflow-hidden">
                {/* Search Input */}
                <div className="p-4 border-b border-[color:var(--card-border)]">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔍</span>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Type a command or search..."
                      className="flex-1 bg-transparent outline-none text-lg placeholder:text-gray-400"
                      autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs bg-[color:var(--background)] rounded border border-[color:var(--card-border)]">
                      ESC
                    </kbd>
                  </div>
                </div>

                {/* Commands List */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredCommands.length > 0 ? (
                    <div className="p-2">
                      {filteredCommands.map((command, index) => (
                        <button
                          key={command.id}
                          onClick={() => {
                            command.action();
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(index)}
                          className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all ${
                            index === selectedIndex
                              ? 'bg-[color:var(--accent)] text-white'
                              : 'hover:bg-[color:var(--background-secondary)]'
                          }`}
                        >
                          <span className="text-2xl">{command.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">
                              {command.label}
                            </div>
                            <div
                              className={`text-sm truncate ${
                                index === selectedIndex
                                  ? 'text-white/80'
                                  : 'text-gray-500 dark:text-gray-400'
                              }`}
                            >
                              {command.description}
                            </div>
                          </div>
                          {index === selectedIndex && (
                            <kbd className="px-2 py-1 text-xs bg-white/20 rounded">
                              ↵
                            </kbd>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-2">
                         <button
                          onClick={() => {
                            const event = new CustomEvent('open-portfolio-chat', { detail: search });
                            window.dispatchEvent(event);
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(0)}
                          className={`w-full flex items-center gap-4 p-3 rounded-lg text-left transition-all bg-[color:var(--accent)] text-white`}
                        >
                          <span className="text-2xl">🤖</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold truncate">
                              Ask AI: &quot;{search}&quot;
                            </div>
                            <div className="text-sm truncate text-white/80">
                              Send this query to the AI Assistant
                            </div>
                          </div>
                          <kbd className="px-2 py-1 text-xs bg-white/20 rounded">
                            ↵
                          </kbd>
                        </button>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="p-3 border-t border-[color:var(--card-border)] bg-[color:var(--background-secondary)]/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex gap-4">
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-[color:var(--background)] rounded border border-[color:var(--card-border)]">
                          ↑↓
                        </kbd>
                        Navigate
                      </span>
                      <span className="flex items-center gap-1">
                        <kbd className="px-1.5 py-0.5 bg-[color:var(--background)] rounded border border-[color:var(--card-border)]">
                          ↵
                        </kbd>
                        Select
                      </span>
                    </div>
                    <span>⌘K to toggle</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

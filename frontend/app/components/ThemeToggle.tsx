'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type Theme = 'light' | 'dark' | 'auto';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('auto');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'auto';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;

    if (newTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.style.colorScheme = prefersDark ? 'dark' : 'light';
    } else {
      root.style.colorScheme = newTheme;
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="glass rounded-full p-2 flex gap-2 shadow-lg"
      >
        <button
          onClick={() => handleThemeChange('light')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            theme === 'light'
              ? 'bg-[color:var(--accent)] text-white'
              : 'hover:bg-[color:var(--accent)]/10'
          }`}
          aria-label="Light mode"
          title="Light mode"
        >
          ☀️
        </button>
        <button
          onClick={() => handleThemeChange('auto')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            theme === 'auto'
              ? 'bg-[color:var(--accent)] text-white'
              : 'hover:bg-[color:var(--accent)]/10'
          }`}
          aria-label="Auto mode"
          title="Auto mode (System)"
        >
          💻
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            theme === 'dark'
              ? 'bg-[color:var(--accent)] text-white'
              : 'hover:bg-[color:var(--accent)]/10'
          }`}
          aria-label="Dark mode"
          title="Dark mode"
        >
          🌙
        </button>
      </motion.div>
    </div>
  );
}

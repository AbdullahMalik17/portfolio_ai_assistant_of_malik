'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, Copy, Terminal, Layers, Home, Check } from 'lucide-react';

export default function ContextMenu() {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      let x = e.pageX;
      let y = e.pageY;
      
      const menuWidth = 220;
      const menuHeight = 260;
      
      if (x + menuWidth > window.innerWidth) x -= menuWidth;
      if (y + menuHeight > window.innerHeight) y -= menuHeight;
      
      setPosition({ x, y });
      setVisible(true);
    };

    const handleClick = () => {
      setVisible(false);
    };

    const handleScroll = () => {
      if (visible) setVisible(false);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('scroll', handleScroll);
    };
  }, [visible]);

  const menuItems = [
    {
      label: 'Ask AI Assistant',
      icon: Bot,
      action: () => {
        const event = new CustomEvent('open-portfolio-chat');
        window.dispatchEvent(event);
      }
    },
    {
      label: 'Download Resume (PDF)',
      icon: FileText,
      action: () => window.open('/Abdullah_resume.pdf', '_blank')
    },
    {
      label: copied ? 'Copied URL!' : 'Copy Portfolio URL',
      icon: copied ? Check : Copy,
      action: () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      label: 'Developer Terminal',
      icon: Terminal,
      action: () => {
        window.dispatchEvent(new CustomEvent('toggle-dev-terminal'));
      }
    },
    {
      label: 'Toggle Architecture X-Ray',
      icon: Layers,
      action: () => {
        document.body.classList.toggle('xray-mode');
      }
    },
    { separator: true },
    {
      label: 'Back to Top',
      icon: Home,
      action: () => {
        const home = document.getElementById('home');
        if (home) home.scrollIntoView({ behavior: 'smooth' });
      }
    }
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[9999] w-56 glass border border-white/15 rounded-2xl shadow-2xl backdrop-blur-2xl bg-canvas/95 overflow-hidden p-1.5"
        >
          <div className="space-y-0.5">
            {menuItems.map((item, index) => {
              if (item.separator) {
                return <div key={index} className="h-px bg-white/5 my-1" />;
              }

              const Icon = item.icon!;

              return (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full text-left px-3 py-2 rounded-xl text-xs text-ink hover:text-ink hover:bg-white/5 transition-colors flex items-center gap-2.5 cursor-pointer font-sans"
                >
                  <Icon className="w-4 h-4 text-accent shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

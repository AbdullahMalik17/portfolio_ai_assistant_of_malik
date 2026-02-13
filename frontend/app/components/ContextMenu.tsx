'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      
      // Calculate position to keep menu within viewport
      let x = e.pageX;
      let y = e.pageY;
      
      const menuWidth = 200;
      const menuHeight = 250;
      
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
    }

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
      label: '✨ Ask AI Assistant',
      action: () => {
        const event = new CustomEvent('open-portfolio-chat');
        window.dispatchEvent(event);
      }
    },
    {
      label: '📄 Download Resume',
      action: () => window.open('/Abdullah_resume.pdf', '_blank')
    },
    {
      label: '📋 Copy URL',
      action: () => navigator.clipboard.writeText(window.location.href)
    },
    {
      label: '💻 Developer Mode',
      action: () => {
         const event = new KeyboardEvent('keydown', { key: '`', code: 'Backquote', ctrlKey: true });
         document.dispatchEvent(event);
         // Also dispatch a custom event just in case
         window.dispatchEvent(new CustomEvent('toggle-dev-terminal'));
      }
    },
    {
        label: '👁️ Toggle Architecture',
        action: () => {
            document.body.classList.toggle('xray-mode');
        }
    },
    { separator: true },
    {
      label: '🏠 Go Home',
      action: () => {
        const home = document.getElementById('home');
        if(home) home.scrollIntoView({ behavior: 'smooth'});
      }
    }
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.1 }}
          style={{ top: position.y, left: position.x }}
          className="fixed z-[9999] w-56 glass border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl bg-black/80 overflow-hidden"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              item.separator ? (
                <div key={index} className="h-px bg-white/10 my-1" />
              ) : (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full text-left px-4 py-2.5 text-sm text-gray-200 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2"
                >
                    {item.label}
                </button>
              )
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;

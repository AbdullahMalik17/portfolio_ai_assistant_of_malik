'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

const DeveloperTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', content: 'Welcome to Abdullah Malik Portfolio CLI v1.0.0' },
    { type: 'system', content: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Command handlers
  const commands: Record<string, (args: string[]) => string | void> = {
    help: () => `Available commands:
  help      - Show this help message
  ls        - List portfolio sections
  cat [sec] - View section details (e.g. 'cat about')
  whoami    - Display current user info
  xray      - Toggle Architecture X-Ray Mode
  clear     - Clear terminal history
  contact   - Send a message (usage: contact "message")
  exit      - Close terminal`,
    
    ls: () => `Sections:
  home/
  about/
  skills/
  projects/
  contact/`,
    
    whoami: () => `User: guest@portfolio
Role: Visitor
Access: Read-only`,

    xray: () => {
        document.body.classList.toggle('xray-mode');
        const isActive = document.body.classList.contains('xray-mode');
        return `X-Ray Architecture Mode: ${isActive ? 'ENABLED' : 'DISABLED'}`;
    },

    cat: (args) => {
      const section = args[0]?.toLowerCase();
      switch(section) {
        case 'about': return 'Abdullah Malik | Full-Stack Developer & AI Specialist | 2+ Years Exp.';
        case 'skills': return 'React, Next.js, Python, OpenAI Agent SDK, Docker, Kubernetes';
        case 'projects': return '1. AI Dashboard\n2. Voice Assistant\n3. Physical AI Platform';
        case 'contact': return 'Email: muhammadabdullah51700@gmail.com';
        default: return `Error: Section '${section}' not found. Try 'ls'.`;
      }
    },

    contact: (args) => {
        if (args.length === 0) return 'Usage: contact "your message here"';
        const message = args.join(' ');
        // Trigger the AI chat with this message
        const event = new CustomEvent('open-portfolio-chat', { detail: message });
        window.dispatchEvent(event);
        return `Message sent to AI Assistant: "${message}"`;
    },

    clear: () => {
      setHistory([]);
      return;
    },

    exit: () => {
      setIsOpen(false);
      return 'Closing session...';
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    // Parse command (handling quotes for contact msg)
    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));

    let output: string | undefined = '';

    if (cmd && commands[cmd]) {
      output = commands[cmd](args) as string;
    } else {
      output = `Command not found: ${cmd || ''}. Type 'help' for available commands.`;
    }

    if (output !== undefined) {
      setHistory(prev => [...prev, 
        { type: 'input', content: cmdStr },
        { type: 'output', content: output }
      ]);
    } else {
        // For clear command
        if (cmd !== 'clear') {
             setHistory(prev => [...prev, { type: 'input', content: cmdStr }]);
        }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
    }
    if (e.key === 'c' && e.ctrlKey) {
        setInput('');
        setHistory(prev => [...prev, { type: 'input', content: input + '^C' }]);
    }
  };

  // Global Toggle Listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      // Toggle on Ctrl + ` (Backtick)
      if (e.ctrlKey && e.key === '`') {
        setIsOpen(prev => !prev);
      }
    };

    const handleCustomToggle = () => setIsOpen(prev => !prev);

    window.addEventListener('keydown', handleGlobalKey);
    window.addEventListener('toggle-dev-terminal', handleCustomToggle);

    return () => {
      window.removeEventListener('keydown', handleGlobalKey);
      window.removeEventListener('toggle-dev-terminal', handleCustomToggle);
    };
  }, []);

  // Auto-focus and scroll
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [isOpen, history]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 w-full h-1/2 min-h-[300px] z-[10000] bg-[#0c0c0c] border-b-2 border-green-500/50 shadow-2xl text-green-500 font-mono text-sm sm:text-base overflow-hidden flex flex-col opacity-95"
        >
          {/* Header */}
          <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-green-500/20">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"/>
              <span className="w-3 h-3 rounded-full bg-yellow-500"/>
              <span className="w-3 h-3 rounded-full bg-green-500"/>
              <span className="ml-2 text-gray-400 text-xs">abdullah@portfolio:~</span>
            </span>
            <span className="text-xs text-gray-500">Bash v5.0 | Ctrl + ` to close</span>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className={`${line.type === 'output' ? 'opacity-80 pl-4 whitespace-pre-wrap' : 'opacity-100'}`}>
                {line.type === 'input' && <span className="mr-2 text-blue-400">➜ ~</span>}
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center">
              <span className="mr-2 text-blue-400">➜ ~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 text-green-400 placeholder-green-800"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeveloperTerminal;

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X } from 'lucide-react';

interface TerminalLine {
  type: 'input' | 'output' | 'system';
  content: string;
}

export default function DeveloperTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'system', content: 'Abdullah Malik — Agentic AI CLI Kernel v2.0.0 [ARM/x86_64]' },
    { type: 'system', content: 'Type "help" to inspect system commands or "malikclaw" for edge runtime benchmarks.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Command handlers
  const commands: Record<string, (args: string[]) => string | void> = {
    help: () => `Available System Commands:
  help       - Display kernel commands
  ls         - List portfolio architecture layers
  cat [sec]  - Read section specification (e.g. 'cat malikclaw', 'cat fte')
  whoami     - Print engineer profile & security clearances
  xray       - Toggle Architecture X-Ray Wireframe Mode
  malikclaw  - Query MalikClaw Go runtime benchmark telemetry
  metrics    - Print live Core Web Vitals and edge speed
  skills     - Print technical matrix breakdown
  clear      - Reset terminal viewport
  contact    - Send message to Digital FTE (usage: contact "message")
  exit       - Dismiss terminal session`,
    
    ls: () => `Architecture Sectors:
  ├── [01] flagship/malikclaw (Go Edge Assistant runtime)
  ├── [02] flagship/digital-fte (Dual-agent Cloud/Local system)
  ├── [03] flagship/customer-success (Kafka + pgvector 1536-dim)
  ├── [04] protocols/mcp (Model Context Protocol JSON-RPC 2.0)
  ├── [05] governance/a2as (Audited Behavior Policy)
  └── [06] contacts/digital-fte-bus`,
    
    whoami: () => `Profile: Abdullah Malik
Role: Agentic AI Engineer & Data Science Undergraduate
Specialty: Autonomous AI Systems • Digital FTEs • Edge Runtimes • MCP
Security Cleared: A2AS Behavior Certified (Audit: deep-research-agent)`,

    xray: () => {
      document.body.classList.toggle('xray-mode');
      const isActive = document.body.classList.contains('xray-mode');
      return `X-Ray Architecture Mode: ${isActive ? 'ENABLED (Inspect DOM nodes)' : 'DISABLED'}`;
    },

    malikclaw: () => `
  ======================================================
  MALIKCLAW — EDGE AGENTIC RUNTIME TELEMETRY (GO 1.22)
  ======================================================
  Daemon Status:       ONLINE (Local Node Verified)
  Target Hardware:     ARM Cortex-A72 ($10 Raspberry Pi / Android)
  Urdu-First RTL:      ACTIVE (Custom NLP Tokenizer)
  ADB Automation:      ONLINE (Touch, Swipe, Input, OCR)
  Memory Footprint:    7.4 MB RAM (vs 450MB Python baseline)
  Cold Boot Latency:   38 ms
  Loop Response:       < 450 ms
  MCP Registration:    Listed on Global MCP Market (mcpmarket.com/server/malikclaw)
  Safety Governance:   A2AS Registry Certified
  ======================================================
`,

    metrics: () => `
  ======================================================
  PORTFOLIO PRODUCTION TELEMETRY & LIGHTHOUSE SCORES
  ======================================================
  Performance:         99/100 (Zero hydration blocking)
  Accessibility:       100/100 (Strict WCAG AA Contrast)
  Best Practices:      100/100
  SEO / Structured:    100/100 (JSON-LD LLM Schema)
  Core Web Vitals:
    - LCP (Largest Contentful Paint): 0.7s
    - INP (Interaction to Next Paint): 8ms
    - CLS (Cumulative Layout Shift): 0.00
  ======================================================
`,

    skills: () => `
  [Agentic Frameworks]  Model Context Protocol (MCP), OpenAI Agent SDK, LangGraph
  [Core Engineering]    Go (Golang), Python (AsyncIO/FastAPI), TypeScript, Next.js 15
  [AI & Vector Infra]   Gemini 2.5, Claude 3.5 Sonnet, GPT-4o, pgvector, Apache Kafka
  [Observability]       Langfuse Spans, A2AS Governance, Docker Containers, ADB
`,

    cat: (args) => {
      const section = args[0]?.toLowerCase();
      switch(section) {
        case 'malikclaw': return 'MalikClaw: Go-based ultra-lightweight agent gateway (<10MB RAM, Urdu-First, ADB).';
        case 'fte': return 'Digital FTE: Cloud Sentry + Local Executive dual-agent architecture with Obsidian sync.';
        case 'cs': return 'Customer Success FTE: Kafka asynchronous queue with 1536-dim pgvector support resolution.';
        case 'about': return 'Abdullah Malik | Agentic AI Engineer specializing in autonomous multi-agent systems.';
        default: return `Error: Sector '${section || ''}' not found. Try 'ls' to see available sectors.`;
      }
    },

    contact: (args) => {
      if (args.length === 0) return 'Usage: contact "your inquiry here"';
      const message = args.join(' ');
      const event = new CustomEvent('open-portfolio-chat', { detail: message });
      window.dispatchEvent(event);
      return `Dispatched payload to Portfolio AI Assistant: "${message}"`;
    },

    clear: () => {
      setHistory([]);
      return;
    },

    exit: () => {
      setIsOpen(false);
      return 'Session minimized.';
    }
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    const cmd = parts[0]?.toLowerCase();
    const args = parts.slice(1).map(arg => arg.replace(/^"|"$/g, ''));

    let output: string | undefined = '';

    if (cmd && commands[cmd]) {
      output = commands[cmd](args) as string;
    } else {
      output = `Command not recognized: '${cmd || ''}'. Type 'help' for available commands.`;
    }

    if (output !== undefined) {
      setHistory(prev => [...prev, 
        { type: 'input', content: cmdStr },
        { type: 'output', content: output }
      ]);
    } else {
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

  // Global Toggle Listener: Ctrl + ` (Backtick)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
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
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="fixed top-0 left-0 w-full h-1/2 min-h-[340px] z-[10000] bg-[#050811]/95 backdrop-blur-2xl border-b border-accent/40 shadow-2xl text-accent font-mono text-xs sm:text-sm overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-surface/90 px-4 py-2.5 flex justify-between items-center border-b border-line">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-line" />
                <span className="w-3 h-3 rounded-full bg-line" />
                <span className="w-3 h-3 rounded-full bg-line" />
              </span>
              <span className="text-ink text-xs font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>abdullah@malikclaw-edge:~</span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-subtle">
              <span className="hidden sm:inline font-mono">Press Ctrl + ` or type &apos;exit&apos;</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded text-ink-muted hover:text-ink transition-colors cursor-pointer"
                aria-label="Close terminal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5 custom-scrollbar"
            onClick={() => inputRef.current?.focus()}
          >
            {history.map((line, i) => (
              <div key={i} className={`${line.type === 'output' ? 'opacity-90 pl-4 whitespace-pre-wrap text-ink' : line.type === 'system' ? 'text-accent opacity-80' : 'text-accent'}`}>
                {line.type === 'input' && <span className="mr-2 text-accent font-bold">➜ ~</span>}
                {line.content}
              </div>
            ))}
            
            <div className="flex items-center">
              <span className="mr-2 text-accent font-bold">➜ ~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 text-accent placeholder:text-ink-subtle font-mono text-xs sm:text-sm"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

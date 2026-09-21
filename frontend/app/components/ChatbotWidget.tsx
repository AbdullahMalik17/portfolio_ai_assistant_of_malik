'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scroller } from 'react-scroll';
import {
  Send, Bot, Minimize2,
  Copy, Check, RotateCcw, Mic, MicOff,
  Zap
} from 'lucide-react';

// ---------- Types ----------
interface ToolCallEvent {
  action: string;
  args?: Record<string, unknown>;
  timestamp: Date;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reaction?: 'like' | 'dislike';
  toolCalls?: ToolCallEvent[];
}

interface SpeechRecognitionEvent {
  results: { [i: number]: { [j: number]: { transcript: string } } };
}
interface SpeechRecognitionErrorEvent { error: string }
interface SpeechRecognition {
  continuous: boolean; interimResults: boolean; lang: string;
  start: () => void; stop: () => void;
  onstart: (() => void) | null;
  onresult: ((e: SpeechRecognitionEvent) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}
interface IWebkitSpeechRecognition { new(): SpeechRecognition }
declare global { interface Window { webkitSpeechRecognition: IWebkitSpeechRecognition } }

const STORAGE_KEY = 'portfolio-chat-history-v2';

function loadMessages(): Message[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Message[];
    return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch { return []; }
}

function saveMessages(msgs: Message[]) {
  try {
    const toSave = msgs.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch { /* storage quota */ }
}

const quickPromptChips = [
  'How does MalikClaw run on edge hardware?',
  'Explain the Digital FTE dual-agent isolation',
  'Show Customer Success Kafka architecture',
  'What are your top Go & Python skills?',
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const welcomeMsg: Message = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm Abdullah's AI Assistant. I can explain his autonomous systems, inspect MalikClaw's Go runtime, or navigate portfolio sections for you. What would you like to explore?",
    timestamp: new Date(),
  };

  const [messages, setMessages] = useState<Message[]>([welcomeMsg]);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const saved = loadMessages();
    if (saved.length > 0) setMessages(saved);
    setHydrated(true);
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (hydrated) saveMessages(messages);
  }, [messages, hydrated]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen, activeTool]);

  // Toast timer
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Browser actions execution
  const executeBrowserAction = useCallback((action: string, args?: Record<string, unknown>) => {
    switch (action) {
      case 'scroll_to_section':
        if (args && typeof args.section === 'string') {
          const sectionId = args.section.toLowerCase();
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setToast(`Navigating to ${sectionId}...`);
          } else {
            scroller.scrollTo(sectionId, {
              duration: 500,
              delay: 0,
              smooth: 'easeInOutQuart',
              offset: -70
            });
            setToast(`Navigating to ${sectionId}...`);
          }
        }
        break;
      case 'open_resume':
        window.open('/resume', '_blank');
        setToast('Opening Abdullah Malik Resume...');
        break;
      case 'focus_contact_form':
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setTimeout(() => {
          const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
          if (nameInput) {
            nameInput.focus();
            setToast('Focusing contact message input...');
          }
        }, 800);
        break;
      default:
        console.warn('Unknown tool action:', action);
    }
  }, []);

  // Send message with streaming tool execution support
  const sendMessage = useCallback(async (textOverride?: string) => {
    const text = (textOverride || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setActiveTool('Querying Agent Reasoning Core...');

    const assistantMsgId = (Date.now() + 1).toString();
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      toolCalls: [],
    };

    setMessages((prev) => [...prev, assistantMsg]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-8).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';
        const executedTools: ToolCallEvent[] = [];

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6).trim();
                if (dataStr === '[DONE]') continue;

                try {
                  const parsed = JSON.parse(dataStr);
                  if (parsed.text) {
                    fullText += parsed.text;
                    setActiveTool(null);
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMsgId ? { ...m, content: fullText } : m
                      )
                    );
                  } else if (parsed.action) {
                    setActiveTool(`Tool: ${parsed.action.replace(/_/g, ' ')}`);
                    executeBrowserAction(parsed.action, parsed.args);
                    executedTools.push({
                      action: parsed.action,
                      args: parsed.args,
                      timestamp: new Date(),
                    });
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMsgId ? { ...m, toolCalls: [...executedTools] } : m
                      )
                    );
                  }
                } catch {
                  // Ignore JSON parse chunk errors
                }
              }
            }
          }
        }
      } else {
        const data = await response.json();
        const fallbackText = data.response || "I'm Abdullah's AI Assistant. Ask me about MalikClaw, Digital FTEs, or his skills!";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, content: fallbackText } : m
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  "Abdullah specializes in Agentic AI Systems, Go Edge runtimes (MalikClaw), Model Context Protocol (MCP), and Kafka-driven Digital FTEs. Feel free to explore the sections or ask specific questions!",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      setActiveTool(null);
    }
  }, [input, isLoading, messages, executeBrowserAction]);

  // Custom Event Listener to trigger AI Chat externally
  useEffect(() => {
    const handleCustomOpen = (e: Event) => {
      const customEvent = e as CustomEvent<string | undefined>;
      setIsOpen(true);
      if (customEvent.detail) {
        setTimeout(() => {
          sendMessage(customEvent.detail);
        }, 300);
      }
    };

    window.addEventListener('open-portfolio-chat', handleCustomOpen);
    return () => window.removeEventListener('open-portfolio-chat', handleCustomOpen);
  }, [sendMessage]);

  // Speech Recognition Setup
  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      const r = new window.webkitSpeechRecognition();
      r.continuous = false;
      r.interimResults = false;
      r.lang = 'en-US';
      r.onstart = () => setIsListening(true);
      r.onresult = (e: SpeechRecognitionEvent) => {
        setInput(e.results[0][0].transcript);
      };
      r.onerror = () => setIsListening(false);
      r.onend = () => setIsListening(false);
      recognitionRef.current = r;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      setToast('Voice input is not supported in this browser.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
    }
  };

  const handleCopyText = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setToast('Copied to clipboard');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([welcomeMsg]);
    localStorage.removeItem(STORAGE_KEY);
    setToast('Conversation reset');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', damping: 15 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 border border-white/20 flex items-center gap-3 cursor-pointer group"
        aria-label="Toggle AI Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-400"></span>
        </span>
        <Bot className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider hidden sm:inline">
          Ask AI Assistant
        </span>
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 w-[94vw] sm:w-[440px] h-[600px] max-h-[82vh] z-50 glass rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Window Header */}
            <div className="px-5 py-4 bg-slate-900/90 border-b border-white/[0.08] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white tracking-tight">
                      Portfolio Digital FTE
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-mono font-semibold">
                      Gemini 2.5
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Autonomous RAG & Function Calling
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Reset Conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  title="Minimize Assistant"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Scroll Area */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 font-sans text-xs custom-scrollbar"
            >
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';

                return (
                  <div
                    key={msg.id || index}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[86%] p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-br-sm shadow-md'
                          : 'glass bg-slate-900/70 border border-white/[0.08] text-slate-200 rounded-bl-sm shadow-sm'
                      }`}
                    >
                      {/* Tool Calls Execution Badge */}
                      {msg.toolCalls && msg.toolCalls.length > 0 && (
                        <div className="mb-2.5 pb-2 border-b border-white/10 space-y-1">
                          {msg.toolCalls.map((tc, tcIdx) => (
                            <span
                              key={tcIdx}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-medium block"
                            >
                              <Zap className="w-3 h-3 text-cyan-400" />
                              <span>Tool Executed: {tc.action}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      <span>{msg.content}</span>
                    </div>

                    {/* Message Actions */}
                    {!isUser && msg.content && (
                      <div className="flex items-center gap-2 mt-1.5 pl-1 text-slate-500 text-[10px] font-mono">
                        <button
                          onClick={() => handleCopyText(msg.content, index)}
                          className="hover:text-slate-300 flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedIndex === index ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                        <span>•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Active Tool Execution Indicator */}
              {activeTool && (
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono animate-pulse">
                  <Zap className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>{activeTool}</span>
                </div>
              )}

              {/* Typing bounce */}
              {isLoading && !activeTool && (
                <div className="glass p-3 rounded-2xl border border-white/5 bg-slate-900/40 max-w-[100px] flex items-center justify-center">
                  <div className="chat-typing-indicator">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}
            </div>

            {/* Quick Prompt Starter Chips */}
            <div className="px-4 py-2 border-t border-white/[0.06] bg-slate-900/60 overflow-x-auto flex gap-2 custom-scrollbar">
              {quickPromptChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(chip)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-xl glass border border-white/[0.08] hover:border-cyan-500/40 text-[11px] text-slate-300 hover:text-white whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Chat Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="p-3 bg-slate-950 border-t border-white/[0.08] flex items-center gap-2"
            >
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse'
                    : 'glass border-white/[0.08] text-slate-400 hover:text-white'
                }`}
                title={isListening ? 'Stop listening' : 'Voice Input'}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about MalikClaw, MCP, or Digital FTEs..."
                className="flex-1 bg-slate-900/80 border border-white/[0.08] rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors font-sans"
              />

              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-opacity cursor-pointer shadow-md shadow-indigo-500/20"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Notification Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl glass border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-2xl bg-slate-950/90 pointer-events-none"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

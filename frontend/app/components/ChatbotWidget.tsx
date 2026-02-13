'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Bot, User, Loader2, Minimize2,
  Sparkles, ThumbsUp, ThumbsDown, Copy,
  RotateCcw, Mic,
} from 'lucide-react';

// ---------- Types ----------
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reaction?: 'like' | 'dislike';
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

// ---------- Helpers ----------
function cx(...c: (string | false | undefined | null)[]) { return c.filter(Boolean).join(' '); }

const STORAGE_KEY = 'portfolio-chat-history';

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
    // Keep last 50 messages to avoid bloating storage
    const toSave = msgs.slice(-50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch { /* quota exceeded - ignore */ }
}

const suggestedQuestions = [
  'What are your top skills?',
  'Tell me about your projects',
  "What's your experience?",
  'How can I contact you?',
];

// ---------- Component ----------
export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const welcomeMsg: Message = {
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm Abdullah's AI assistant. Ask me anything about his skills, projects, or experience.",
    timestamp: new Date(),
  };
  const [messages, setMessages] = useState<Message[]>([welcomeMsg]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted messages on mount (client only)
  useEffect(() => {
    const saved = loadMessages();
    if (saved.length > 0) setMessages(saved);
    setHydrated(true);
  }, []);

  // Persist messages whenever they change
  useEffect(() => {
    if (hydrated) saveMessages(messages);
  }, [messages, hydrated]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  // Hide suggestions after 2 messages
  useEffect(() => { if (messages.length > 2) setShowSuggestions(false); }, [messages]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toast) { const t = setTimeout(() => setToast(null), 2500); return () => clearTimeout(t); }
  }, [toast]);

  // Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      const r = new window.webkitSpeechRecognition();
      r.continuous = false; r.interimResults = false; r.lang = 'en-US';
      r.onstart = () => setIsListening(true);
      r.onresult = (e: SpeechRecognitionEvent) => { setInput(e.results[0][0].transcript); };
      r.onerror = () => setIsListening(false);
      r.onend = () => setIsListening(false);
      recognitionRef.current = r;
    }
  }, []);

  // Simulated fallback responses
  function getSimulatedResponse(msg: string): string {
    const m = msg.toLowerCase();
    if (m.includes('skill') || m.includes('tech'))
      return "Abdullah specializes in:\n\n• AI/ML: OpenAI GPT-4, Gemini, Claude, LangChain, pgvector\n• Backend: Python, FastAPI, PostgreSQL, Kafka, Docker\n• Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS\n• Cloud: Vercel, Azure, Kubernetes, CI/CD\n\nWant to know about a specific technology?";
    if (m.includes('project'))
      return "Abdullah has built 7+ production AI projects:\n\n1. Digital FTE - AI agent for 24/7 personal automation\n2. Customer Success FTE - Multi-channel AI support (Email, WhatsApp, Web)\n3. Physical AI Platform - Educational robotics with RAG chatbot\n4. Voice Assistant - Privacy-first voice AI\n5. AI Code Assistant - Code generation & debugging\n\nAsk about any specific project for more details!";
    if (m.includes('contact') || m.includes('email') || m.includes('reach'))
      return "You can reach Abdullah at:\n\n• Email: muhammadabdullah51700@gmail.com\n• LinkedIn: linkedin.com/in/muhammad-abdullah-athar\n• GitHub: github.com/AbdullahMalik17\n\nOr use the contact form on this page!";
    if (m.includes('experience') || m.includes('work'))
      return "Abdullah is a Full-Stack Developer & AI Specialist building intelligent solutions. He combines AI/ML with modern web tech to create production-grade systems.\n\nHighlights:\n• Built autonomous AI agents with dual-architecture design\n• Implemented event-driven systems with Kafka\n• Deployed to Kubernetes with full CI/CD pipelines";
    if (m.includes('hello') || m.includes('hi') || m.includes('hey'))
      return "Hello! Great to meet you! I can tell you about Abdullah's:\n\n• Technical skills & expertise\n• AI/ML projects\n• Work experience\n• Contact information\n\nWhat would you like to know?";
    return "Thanks for your interest! I can tell you about Abdullah's skills, projects, experience, or how to contact him. What would you like to know?";
  }

  // Send message with streaming support
  const sendMessage = useCallback(async (textOverride?: string) => {
    const text = (textOverride || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setShowSuggestions(false);

    const assistantId = (Date.now() + 1).toString();

    try {
      // Build conversation history for persistent memory (exclude welcome msg)
      const history = [...messages, userMsg]
        .filter(m => m.id !== 'welcome')
        .slice(-20) // send last 20 messages for context
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) }), // history = prior messages, not current
      }).catch(() => null);

      if (!res) {
        // No connection - use simulated response
        setMessages(prev => [...prev, {
          id: assistantId, role: 'assistant',
          content: getSimulatedResponse(text), timestamp: new Date(),
        }]);
        return;
      }

      const contentType = res.headers.get('content-type') || '';

      if (contentType.includes('text/event-stream')) {
        // Streaming response - show tokens in real-time
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        // Add empty assistant message to fill
        setMessages(prev => [...prev, {
          id: assistantId, role: 'assistant', content: '', timestamp: new Date(),
        }]);

        if (reader) {
          setIsLoading(false); // Stop loading indicator once streaming starts
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ') && line !== 'data: [DONE]') {
                try {
                  const data = JSON.parse(line.slice(6));
                  if (data.text) {
                    fullText += data.text;
                    const captured = fullText;
                    setMessages(prev =>
                      prev.map(m => m.id === assistantId ? { ...m, content: captured } : m)
                    );
                  }
                } catch { /* skip parse errors */ }
              }
            }
          }
        }
        if (!fullText) {
          setMessages(prev =>
            prev.map(m => m.id === assistantId ? { ...m, content: getSimulatedResponse(text) } : m)
          );
        }
      } else {
        // JSON response (fallback mode)
        const data = await res.json();
        const reply = data.response || getSimulatedResponse(text);
        setMessages(prev => [...prev, {
          id: assistantId, role: 'assistant', content: reply, timestamp: new Date(),
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        id: assistantId, role: 'assistant',
        content: getSimulatedResponse(text), timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading]);

  // Custom event handler for CommandPalette / ContextMenu / DeveloperTerminal
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      setIsOpen(true);
      if (e.detail) setTimeout(() => sendMessage(e.detail), 100);
    };
    window.addEventListener('open-portfolio-chat', handler as EventListener);
    return () => window.removeEventListener('open-portfolio-chat', handler as EventListener);
  }, [sendMessage]);

  const handleReaction = (id: string, reaction: 'like' | 'dislike') => {
    setMessages(prev => prev.map(m =>
      m.id === id ? { ...m, reaction: m.reaction === reaction ? undefined : reaction } : m
    ));
    setToast(reaction === 'like' ? 'Thanks for the feedback!' : "We'll improve!");
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    setToast('Copied to clipboard!');
  };

  const clearChat = () => {
    const freshMsg: Message = {
      id: 'welcome-new', role: 'assistant',
      content: "Chat cleared! Ask me anything about Abdullah's portfolio.",
      timestamp: new Date(),
    };
    setMessages([freshMsg]);
    setShowSuggestions(true);
    setToast('Chat cleared!');
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) { alert('Speech recognition not supported in this browser.'); return; }
    if (isListening) recognitionRef.current.stop(); else recognitionRef.current.start();
  };

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="chat-toast"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.button
            key="open"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full shadow-lg shadow-[color:var(--accent-glow)] flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent)]"
            style={{ background: 'var(--gradient-button)' }}
            aria-label="Open chat"
          >
            <Bot className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mt-3 w-[320px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[color:var(--card-border)]"
            style={{ background: 'var(--card-bg)', backdropFilter: 'blur(20px)' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-3.5 text-white"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-secondary))' }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/20 shadow-inner">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-sm tracking-tight">AI Assistant</p>
                  <p className="text-[10px] text-white/80 uppercase tracking-widest">
                    {isLoading ? 'Thinking...' : 'Online'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                  title="Clear chat"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors"
                  title="Close"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 chat-scrollbar">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cx('flex gap-2.5', msg.role === 'user' ? 'flex-row-reverse' : 'flex-row')}
                  >
                    {/* Avatar */}
                    <div className={cx(
                      'h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs',
                      msg.role === 'user'
                        ? 'bg-[color:var(--accent)]/30'
                        : ''
                    )} style={msg.role === 'assistant' ? { background: 'var(--gradient-button)' } : {}}>
                      {msg.role === 'user' ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div className={cx('max-w-[78%] group', msg.role === 'user' ? 'items-end' : 'items-start')}>
                      <div className={cx(
                        'px-3.5 py-2.5 text-sm whitespace-pre-wrap leading-relaxed',
                        msg.role === 'user' ? 'chat-msg-user' : 'chat-msg-assistant'
                      )}>
                        {msg.content || (
                          <div className="chat-typing-indicator">
                            <span /><span /><span />
                          </div>
                        )}
                      </div>

                      {/* Meta row */}
                      <div className={cx(
                        'flex items-center gap-1.5 mt-1 px-1',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}>
                        <span className="text-[10px] text-gray-500">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {msg.role === 'assistant' && msg.content && (
                          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleReaction(msg.id, 'like')}
                              className={cx('h-5 w-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors', msg.reaction === 'like' && 'text-emerald-400')}
                              title="Helpful"
                            >
                              <ThumbsUp className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => handleReaction(msg.id, 'dislike')}
                              className={cx('h-5 w-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors', msg.reaction === 'dislike' && 'text-red-400')}
                              title="Not helpful"
                            >
                              <ThumbsDown className="h-3 w-3" />
                            </button>
                            <button
                              onClick={() => copyMessage(msg.content)}
                              className="h-5 w-5 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
                              title="Copy"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading indicator */}
              <AnimatePresence>
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2.5"
                  >
                    <div className="h-7 w-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs" style={{ background: 'var(--gradient-button)' }}>
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                    <div className="chat-msg-assistant px-3.5 py-2.5">
                      <div className="chat-typing-indicator">
                        <span /><span /><span />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suggested Questions */}
            <AnimatePresence>
              {showSuggestions && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-2.5 border-t border-[color:var(--card-border)]"
                >
                  <p className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider font-medium">Suggestions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((q) => (
                      <motion.button
                        key={q}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => sendMessage(q)}
                        className="text-[11px] px-3 py-1.5 rounded-full border border-[color:var(--card-border)] text-gray-400 hover:text-white hover:border-[color:var(--accent)] hover:bg-[color:var(--accent)]/10 transition-all"
                      >
                        {q}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="p-3 border-t border-[color:var(--card-border)]"
            >
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleListening}
                  className={cx(
                    'h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-all',
                    isListening
                      ? 'bg-red-500 text-white animate-pulse'
                      : 'bg-[color:var(--background-secondary)] text-gray-400 hover:text-white hover:bg-[color:var(--accent)]/20'
                  )}
                  title={isListening ? 'Stop listening' : 'Voice input'}
                >
                  <Mic className="h-4 w-4" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? 'Listening...' : 'Ask about Abdullah...'}
                  disabled={isLoading}
                  className="flex-1 h-10 rounded-xl border border-[color:var(--card-border)] bg-[color:var(--background)] px-3 text-sm text-[color:var(--foreground)] placeholder-gray-500 outline-none focus:ring-2 focus:ring-[color:var(--accent)]/50 disabled:opacity-50 transition-all"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="h-10 w-10 rounded-xl flex items-center justify-center text-white shrink-0 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg transition-all"
                  style={{ background: 'var(--gradient-button)' }}
                >
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </motion.button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-gray-600">
                Powered by AI &bull; Press Enter to send
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const PUBLIC_BACKEND_URL =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BACKEND_URL) || '';

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

interface IWebkitSpeechRecognition {
  new (): SpeechRecognition;
}

// Extend Window interface for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: IWebkitSpeechRecognition;
  }
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm your portfolio chatbot. Ask anything about me, my skills, projects, or experience.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        // Optional: Auto-send after voice input
        // sendMessage(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const sendMessage = useCallback(async (textOverride?: string) => {
    const textToSend = textOverride || input;
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);
    try {
      const endpoint = PUBLIC_BACKEND_URL
        ? `${PUBLIC_BACKEND_URL}/api/assistant/chat`
        : `/api/chat`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          thread_id: threadId, // Include thread_id for conversation context
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = (await response.json()) as { response?: string; thread_id?: string };
      const assistantReply = data.response || 'Sorry, I could not generate a response.';

      // Update thread_id for conversation continuity
      if (data.thread_id) {
        setThreadId(data.thread_id);
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantReply }]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `I ran into an error: ${message}. Please try again.` },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages, threadId]);

  // Handle Custom Event for Smart Search
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent) => {
      setIsOpen(true);
      if (event.detail) {
        // Wait for state update then send
        setTimeout(() => sendMessage(event.detail), 100);
      }
    };

    window.addEventListener('open-portfolio-chat', handleOpenChat as EventListener);
    return () => {
      window.removeEventListener('open-portfolio-chat', handleOpenChat as EventListener);
    };
  }, [sendMessage]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="fixed z-50 bottom-6 right-6">
      {/* Toggle Button */}
      <button
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        onClick={() => setIsOpen((v) => !v)}
        className="h-14 w-14 rounded-full shadow-lg bg-[color:var(--accent)] text-white flex items-center justify-center hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--accent)]"
      >
        {isOpen ? (
          // Close icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Chat icon
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
            <path d="M7.5 8.25a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm3.75.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm2.25.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
            <path
              fillRule="evenodd"
              d="M12 1.5C6.201 1.5 1.5 5.548 1.5 10.5c0 2.39 1.144 4.553 3 6.138V21a.75.75 0 0 0 1.2.6l3.336-2.502c.93.254 1.917.402 2.964.402 5.799 0 10.5-4.048 10.5-9 0-4.952-4.701-9-10.5-9Zm-9 9c0-4.002 4.163-7.5 9-7.5s9 3.498 9 7.5-4.163 7.5-9 7.5c-1.08 0-2.097-.15-3.025-.424a.75.75 0 0 0-.627.106L6 19.11v-2.365a.75.75 0 0 0-.276-.578C4.15 14.873 3 12.81 3 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="mt-3 w-[280px] xs:w-[320px] sm:w-[380px] h-[440px] max-h-[90vh] bg-[color:var(--background)] border border-[color:var(--foreground)]/[0.1] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-[color:var(--foreground)]/[0.1] flex items-center justify-between">
            <div className="text-sm">
              <div className="font-semibold text-gray-900 dark:text-gray-100">Ask about me</div>
              <div className="text-gray-500 dark:text-gray-400">Powered by OpenAI</div>
            </div>
            <span aria-live="polite" className={`text-xs ${isLoading ? 'text-[color:var(--accent)]' : 'text-gray-400'}`}>{isLoading ? 'Thinking…' : 'Online'}</span>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`${
                    m.role === 'user'
                      ? 'bg-[color:var(--accent)] text-white'
                      : 'bg-[color:var(--background-secondary)] text-[color:var(--foreground)]'
                  } max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm whitespace-pre-wrap`}
                >
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-xl transition-all ${
                  isListening 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                  <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
                </svg>
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? 'Listening...' : 'Ask anything about me...'}
                className="flex-1 rounded-xl border border-[color:var(--foreground)]/[0.1] bg-[color:var(--background)] px-3 py-2 text-sm text-[color:var(--foreground)] outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
              />
              <button
                onClick={() => sendMessage()}
                disabled={isLoading || input.trim().length === 0}
                className="rounded-xl bg-[color:var(--accent)] text-white px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
            <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
              Tip: Try &quot;What are your top skills?&quot; or &quot;Tell me about your projects&quot;.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, AlertCircle, Loader2 } from 'lucide-react';
import { sendChatMessage, getStarterQuestions } from '../../lib/anthropic';
import { useChatStore } from '../../store/chatStore';
import type { ChatMessage } from '../../types/content';

const EMPTY_MESSAGES: ChatMessage[] = [];

interface AIChatProps {
  sectionId: string;
  moduleTitle: string;
}

export default function AIChat({ sectionId, moduleTitle }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const messages = useChatStore((s) => s.histories[sectionId] ?? EMPTY_MESSAGES);
  const addMessage = useChatStore((s) => s.addMessage);
  const starters = getStarterQuestions(sectionId);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streaming, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setError(null);
      const userMsg: ChatMessage = { role: 'user', content: text.trim() };
      addMessage(sectionId, userMsg);
      setInput('');
      setIsLoading(true);
      setStreaming('');

      const allMessages = [...messages, userMsg];

      try {
        const full = await sendChatMessage(sectionId, allMessages, (chunk) => {
          setStreaming(chunk);
        });
        addMessage(sectionId, { role: 'assistant', content: full });
        setStreaming('');
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : 'Failed to get response';
        if (msg.includes('API')) {
          setError(
            'API key not configured. Set VITE_ANTHROPIC_API_KEY in your .env file.'
          );
        } else {
          setError(msg);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [sectionId, messages, addMessage, isLoading]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <>
      {/* FAB button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-teal text-white shadow-lg shadow-teal/25 flex items-center justify-center hover:bg-teal-dark transition-colors"
            aria-label="Open AI chat"
          >
            <MessageCircle size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] rounded-xl border border-[var(--border)] bg-[var(--bg-card)] shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-raised)] border-b border-[var(--border)] shrink-0">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[var(--text)] truncate">
                  AI Mentor
                </div>
                <div className="text-xs text-[var(--text-muted)] truncate">
                  {moduleTitle}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--bg-surface)] transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.length === 0 && !streaming && (
                <div className="space-y-3 pt-2">
                  <p className="text-xs text-[var(--text-muted)] text-center">
                    Ask me anything about this topic
                  </p>
                  <div className="space-y-2">
                    {starters.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="w-full text-left text-xs text-[var(--text-secondary)] bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2.5 hover:bg-[var(--bg-raised)] hover:border-[var(--text-faint)] transition-colors leading-snug"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-teal text-white rounded-br-sm'
                        : 'bg-[var(--bg-raised)] text-[var(--text-secondary)] rounded-bl-sm'
                    }`}
                  >
                    <div className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Streaming response */}
              {streaming && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg rounded-bl-sm bg-[var(--bg-raised)] text-[var(--text-secondary)] px-3.5 py-2.5 text-sm leading-relaxed">
                    <div className="whitespace-pre-wrap break-words">
                      {streaming}
                    </div>
                  </div>
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && !streaming && (
                <div className="flex justify-start">
                  <div className="rounded-lg rounded-bl-sm bg-[var(--bg-raised)] px-3.5 py-2.5">
                    <Loader2
                      size={16}
                      className="animate-spin text-[var(--text-muted)]"
                    />
                  </div>
                </div>
              )}

              {/* Error display */}
              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-red/10 border border-red/25 px-3 py-2.5">
                  <AlertCircle
                    size={14}
                    className="text-red mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-red leading-snug">{error}</p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 py-3 border-t border-[var(--border)] shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a question..."
                  disabled={isLoading}
                  className="flex-1 bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-faint)] focus:outline-none focus:border-teal disabled:opacity-50"
                />
                <button
                  onClick={() => handleSend(input)}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-9 h-9 rounded-lg bg-teal text-white flex items-center justify-center hover:bg-teal-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

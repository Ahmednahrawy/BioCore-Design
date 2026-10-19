import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Bot, 
  User, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock,
  HelpCircle,
  Calculator,
  Layers,
  FileCheck2
} from 'lucide-react';
import { ChatMessage, sendChatMessage } from '../services/geminiChat';

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Welcome to BioCore-Design Customer Support! I am your AI engineering support agent. How can I assist you with your mechanical project, tolerances, or quote estimates today?",
    timestamp: 'Just now'
  }
];

const STARTER_PROMPTS = [
  {
    label: 'Estimate project cost',
    icon: Calculator,
    prompt: 'How do you estimate project costs and labor hours for a new mechanical assembly?'
  },
  {
    label: 'Material selection advice',
    icon: Layers,
    prompt: 'Can you provide advice on choosing between Titanium Ti-6Al-4V, 7075-T6 aluminum, and medical-grade PEEK?'
  },
  {
    label: 'DFM guidelines',
    icon: FileCheck2,
    prompt: 'What are your Design for Manufacturing (DFM) guidelines and precision machining tolerance limits?'
  }
];

export const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('biocore_chat_history');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_MESSAGES;
  });

  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of conversation
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, isGenerating]);

  // Save conversation to session storage
  useEffect(() => {
    try {
      sessionStorage.setItem('biocore_chat_history', JSON.stringify(messages));
    } catch {}
  }, [messages]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || isGenerating) return;

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsGenerating(true);

    try {
      const replyText = await sendChatMessage(messages, query);
      const assistantMessage: ChatMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: "I encountered a transient error connecting to Gemini. Our engineering support desk is also reachable at inquiries@biocoredesign.com or +1 (415) 555-0198.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearChat = () => {
    setMessages(INITIAL_MESSAGES);
    try {
      sessionStorage.removeItem('biocore_chat_history');
    } catch {}
  };

  const jumpTo = (elementId: string) => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside 
          aria-label="Customer Support Chat"
          className="w-screen max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center text-white dark:text-neutral-950 font-mono text-xs font-black">
                BD
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white leading-none">
                    BioCore Support AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                  Customer Support & Solutions Desk
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                title="Reset conversation"
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
                aria-label="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-md transition-colors cursor-pointer"
                aria-label="Close chat drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages scroll area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
            {/* Quick Starters Carousel / Pill area */}
            {messages.length <= 2 && (
              <div className="p-3.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-neutral-950/60 space-y-2 mb-2">
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
                  Quick Consultation Inquiries
                </span>
                <div className="flex flex-col gap-1.5">
                  {STARTER_PROMPTS.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.prompt)}
                        className="flex items-center justify-between gap-2 p-2 rounded-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-left text-xs text-neutral-800 dark:text-neutral-200 hover:border-amber-500 dark:hover:border-amber-400 transition-colors cursor-pointer shadow-2xs group"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <Icon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-amber-500 transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Conversation Thread */}
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-lg px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-neutral-900 text-white dark:bg-amber-500 dark:text-neutral-950 rounded-br-none'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-bl-none border border-neutral-200/80 dark:border-neutral-700/60'
                    }`}
                  >
                    {/* Render message lines with basic bold/list support */}
                    <div className="space-y-1.5 whitespace-pre-wrap">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((chunk, cIdx) => 
                            cIdx % 2 === 1 ? <strong key={cIdx} className="font-bold">{chunk}</strong> : chunk
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Contextual navigation buttons inside AI answers */}
                    {!isUser && msg.text.toLowerCase().includes('quote estimator') && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700 flex flex-wrap gap-2">
                        <button
                          onClick={() => jumpTo('quote-estimator')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded cursor-pointer hover:border-amber-500"
                        >
                          <span>Open Quote Estimator</span>
                          <ArrowUpRight className="w-3 h-3 text-amber-500" />
                        </button>
                      </div>
                    )}

                    {!isUser && (msg.text.toLowerCase().includes('contact form') || msg.text.toLowerCase().includes('inquiries@biocoredesign.com')) && (
                      <div className="mt-3 pt-2.5 border-t border-neutral-200 dark:border-neutral-700 flex flex-wrap gap-2">
                        <button
                          onClick={() => jumpTo('contact')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-600 rounded cursor-pointer hover:border-amber-500"
                        >
                          <span>View Contact Form & Labs</span>
                          <ArrowUpRight className="w-3 h-3 text-amber-500" />
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {/* Typing / Generating indicator */}
            {isGenerating && (
              <div className="flex items-center gap-2 p-3 max-w-[70%] bg-neutral-100 dark:bg-neutral-800 text-neutral-500 rounded-lg rounded-bl-none text-xs">
                <Bot className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                <span className="font-mono">BioCore AI is formulating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 shrink-0 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about project costs, DFM, alloys, or turnaround..."
                disabled={isGenerating}
                className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isGenerating}
                className="p-2.5 bg-neutral-900 dark:bg-amber-500 text-white dark:text-neutral-950 rounded-md hover:bg-neutral-800 dark:hover:bg-amber-400 transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send inquiry"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-neutral-500" />
                <span>Under Mutual NDA Confidentiality</span>
              </span>
              <span>Gemini 3.8 Flash</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  'What AI projects has he built?',
  'What are his core technical skills?',
  'Does he have leadership experience?',
  'How can I hire him?',
];

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Mustajaab's portfolio assistant. I can answer questions about his AI projects, technical skills, leadership roles, or sharing contact information. What are you looking to know?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages((prev) => [...prev, { role: 'assistant', content: data.content }]);
      } else {
        throw new Error('Chat generation failed');
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I am facing an API timeout. Please feel free to email Mustajaab directly at mustajaabx@gmail.com!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-[330px] sm:w-[380px] h-[480px] rounded-3xl bg-bg-tertiary border border-border-color shadow-2xl overflow-hidden flex flex-col mb-4 glass-panel animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-accent-teal text-white flex justify-between items-center shadow">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/10 border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">AI Portfolio Copilot</h4>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] text-teal-100 font-medium">Ready to assist</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white cursor-pointer transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3.5 no-scrollbar bg-bg-primary/20">
            {messages.map((m, idx) => {
              const isAssistant = m.role === 'assistant';
              return (
                <div
                  key={idx}
                  className={`flex gap-2.5 max-w-[85%] ${
                    isAssistant ? 'self-start' : 'self-end flex-row-reverse'
                  }`}
                >
                  <div className={`p-2 w-fit h-fit rounded-lg border text-text-secondary shrink-0 ${
                    isAssistant ? 'bg-bg-secondary border-border-color' : 'bg-accent-teal/10 border-accent-teal/20 text-accent-teal'
                  }`}>
                    {isAssistant ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>
                  
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isAssistant
                        ? 'bg-bg-tertiary border border-border-color text-text-primary rounded-tl-none shadow-sm'
                        : 'bg-accent-teal text-white rounded-tr-none shadow shadow-accent-teal/10'
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              );
            })}

            {/* Bouncing Dot Loader */}
            {loading && (
              <div className="flex gap-2.5 max-w-[85%] self-start">
                <div className="p-2 rounded-lg bg-bg-secondary border border-border-color text-text-secondary shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="p-3 bg-bg-tertiary border border-border-color rounded-2xl rounded-tl-none flex gap-1 items-center justify-center min-w-[50px]">
                  <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-text-tertiary rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick chip queries */}
          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-border-color/40 flex flex-wrap gap-1.5 bg-bg-primary/10">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 bg-bg-secondary hover:bg-accent-teal/10 hover:border-accent-teal/30 border border-border-color text-text-secondary hover:text-accent-teal rounded-lg text-[10px] font-semibold text-left transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input control */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 border-t border-border-color flex gap-2 items-center bg-bg-tertiary"
          >
            <input
              type="text"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border border-border-color bg-bg-primary rounded-xl text-xs outline-none text-text-primary focus:border-accent-teal focus:ring-1 focus:ring-accent-teal transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2 bg-accent-teal hover:bg-accent-teal/80 text-white rounded-xl transition-all cursor-pointer disabled:opacity-50"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-accent-teal text-white shadow-2xl flex items-center justify-center hover:bg-accent-teal/80 hover:scale-105 transition-all cursor-pointer border border-teal-400/20 group relative"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6 animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 text-[8px] font-bold items-center justify-center text-white">AI</span>
          </span>
        )}
      </button>
    </div>
  );
}

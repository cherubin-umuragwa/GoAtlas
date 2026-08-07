'use client';

import React, { useState, useRef, useEffect } from 'react';
import { generateId } from '@/lib/utils';
import type { AtlasItem, ChatMessage } from '@/types/atlas';

import {
  Sparkles,
  Send,
  Bot,
  User,
  BookOpen,
  ArrowRight,
  Loader2,
  Trash2,
  HelpCircle,
} from 'lucide-react';

interface AtlasChatProps {
  items: AtlasItem[];
  onOpenReader: (item: AtlasItem) => void;
}

export function AtlasChat({ items, onOpenReader }: AtlasChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am Atlas AI. Ask me anything about your saved articles, videos, code snippets, podcasts, or notes. I synthesize answers exclusively from your saved library.`,
      timestamp: 'Today',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isGenerating]);

  const handleSendMessage = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: generateId('msg'),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsGenerating(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          items,
          messages,
        }),
      });

      const data = await res.json();

      const botMsg: ChatMessage = {
        id: generateId('msg'),
        sender: 'assistant',
        text: data.answer || 'I evaluated your saved items but could not construct a response.',
        citedItemIds: data.citedItemIds || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Error sending chat message:', err);
      const errorMsg: ChatMessage = {
        id: generateId('msg'),
        sender: 'assistant',
        text: 'Sorry, I encountered an issue connecting to Atlas AI. Please try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    'Find the Next.js performance guide I saved',
    'What videos did I save about startups and product design?',
    'Summarize everything I have saved about AI & Latency',
    'List all cooking and recipe notes',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 h-[calc(100vh-100px)] flex flex-col font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC] mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#111111] tracking-tight flex items-center gap-2">
              Atlas AI Chat
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-medium">
                Library Guarded
              </span>
            </h1>
            <p className="text-xs text-neutral-500">
              Synthesize answers directly across your {items.length} saved resources
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg-reset',
                sender: 'assistant',
                text: 'Chat cleared. How can I assist with your saved knowledge today?',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ])
          }
          className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Prompts Grid */}
      {messages.length <= 1 && (
        <div className="mb-4 bg-neutral-50 border border-neutral-200 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-700 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
            <span>Suggested Questions:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {examplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                className="text-left text-xs p-2.5 bg-white hover:bg-neutral-100/80 border border-neutral-200 rounded-lg transition-all text-neutral-800 flex items-center justify-between group font-medium"
              >
                <span>&quot;{prompt}&quot;</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Stream Body */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs ${
                msg.sender === 'user'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-900 border border-neutral-200'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-[#ECECEC] text-[#111111] shadow-sm'
              }`}
            >
              <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

              {/* Cited Items Cards */}
              {msg.citedItemIds && msg.citedItemIds.length > 0 && (
                <div className="mt-3 pt-3 border-t border-neutral-200/60">
                  <div className="text-[10px] font-mono font-semibold text-neutral-400 mb-1.5 uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Cited Knowledge Resources:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {msg.citedItemIds.map((id) => {
                      const citedItem = items.find((i) => i.id === id);
                      if (!citedItem) return null;
                      return (
                        <button
                          key={id}
                          onClick={() => onOpenReader(citedItem)}
                          className="px-2.5 py-1 bg-neutral-100 hover:bg-neutral-200/70 border border-neutral-200 text-neutral-800 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <BookOpen className="w-3 h-3 text-neutral-500" />
                          <span className="truncate max-w-[180px]">{citedItem.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <span className="block text-[10px] font-mono opacity-40 mt-2 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-neutral-100 border border-neutral-200 text-neutral-900 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="bg-white border border-neutral-200 text-neutral-600 px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-sm font-sans">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-900" />
              <span>Atlas AI is searching your saved knowledge...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Footer */}
      <div className="pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask Atlas about your saved items..."
            className="w-full pl-4 pr-12 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-[#ECECEC] rounded-xl focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white shadow-sm transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || isGenerating}
            className="absolute right-1.5 p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-40 transition-all shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}


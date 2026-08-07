'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Compass,
  Inbox,
  Sparkles,
  Search,
  FolderKanban,
  BookOpen,
  ArrowRight,
  Clock,
  CheckCircle2,
  Tag,
  Share2,
} from 'lucide-react';

export function ProductPreviewSection() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'reader' | 'chat' | 'digest'>('inbox');

  const previewItems = [
    {
      id: '1',
      title: 'Comparing Hello World in C and Python',
      type: 'article',
      category: 'Software Development',
      summary:
        'A concise comparison analyzing syntax efficiency, execution speed, and mental models between compiled C and interpreted Python.',
      takeaways: ['C uses explicit main entry point and stdio.h header.', 'Python prioritizes human readability.'],
      readTime: '3m',
      tags: ['Programming', 'C', 'Python', 'Syntax'],
    },
    {
      id: '2',
      title: 'System Architecture Guidelines 2026',
      type: 'pdf',
      category: 'Engineering',
      summary:
        'Comprehensive architectural patterns for distributed microservices, caching strategies, and event-driven backends.',
      takeaways: ['Prefer asynchronous event busses for decoupling.', 'Always implement circuit breakers.'],
      readTime: '8m',
      tags: ['Architecture', 'Backend', 'System Design'],
    },
    {
      id: '3',
      title: 'Voice Note: Product Ideas for Knowledge Graph',
      type: 'voice',
      category: 'Ideas',
      summary:
        'Audio transcript regarding automatic entity extraction and graph visualizations for saved web articles.',
      takeaways: ['Extract entities automatically using AI model.', 'Show cross-topic relations.'],
      readTime: '2m',
      tags: ['Voice', 'Ideas', 'AI'],
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#2563EB] bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-1 rounded-md inline-block">
            LIVE PRODUCT INTERFACE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Designed for clarity, built for speed.
          </h2>
          <p className="text-sm sm:text-base text-[#666666]">
            Explore an interactive preview of the actual GoAtlas interface below.
          </p>
        </div>

        {/* Application Browser Frame */}
        <div className="max-w-5xl mx-auto bg-white border border-[#EAEAEA] rounded-2xl shadow-xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="bg-[#FAFAFA] border-b border-[#EAEAEA] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
              <span className="text-xs font-mono text-[#666666] ml-2 hidden sm:inline-block">
                goatlas.app/inbox
              </span>
            </div>

            {/* Interactive Preview View Switcher */}
            <div className="flex items-center bg-white border border-[#EAEAEA] rounded-lg p-0.5 text-xs font-medium">
              <button
                onClick={() => setActiveTab('inbox')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'inbox' ? 'bg-[#111111] text-white font-semibold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Universal Inbox
              </button>
              <button
                onClick={() => setActiveTab('reader')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'reader' ? 'bg-[#111111] text-white font-semibold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                Smart Reader
              </button>
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'chat' ? 'bg-[#111111] text-white font-semibold' : 'text-[#666666] hover:text-[#111111]'
                }`}
              >
                AI Memory Chat
              </button>
            </div>

            <Link
              href="/app"
              className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1 hidden sm:flex"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Window Body */}
          <div className="p-4 sm:p-6 bg-[#FAFAFA] min-h-[420px]">
            {activeTab === 'inbox' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#111111]">
                    <Inbox className="w-4 h-4 text-[#2563EB]" />
                    <span>Universal Inbox (11 Saved Items)</span>
                  </div>
                  <span className="text-xs font-mono text-[#666666] bg-white border border-[#EAEAEA] px-2 py-0.5 rounded">
                    Sorted by Recent
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previewItems.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="bg-white border border-[#EAEAEA] rounded-xl p-4 space-y-3 shadow-xs hover:border-[#2563EB] transition-colors cursor-pointer"
                      onClick={() => setActiveTab('reader')}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] font-mono text-[#666666] capitalize">
                          {item.type}
                        </span>
                        <span className="text-[#2563EB] font-medium bg-blue-50 px-2 py-0.5 rounded-full text-[11px]">
                          {item.category}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-[#111111] leading-snug">
                        {item.title}
                      </h4>

                      <p className="text-xs text-[#666666] line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>

                      <div className="pt-2 border-t border-[#EAEAEA] flex items-center justify-between text-[11px] text-[#666666]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-400" />
                          {item.readTime} read
                        </span>
                        <span className="text-[#2563EB] font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Read with AI
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reader' && (
              <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-4 max-w-2xl mx-auto shadow-xs">
                <div className="flex items-center justify-between text-xs text-[#666666] border-b border-[#EAEAEA] pb-3">
                  <span className="font-mono text-[#2563EB] uppercase font-bold">
                    Smart Reader Mode
                  </span>
                  <span>3 min read</span>
                </div>

                <h3 className="text-xl font-bold text-[#111111]">
                  Comparing Hello World in C and Python
                </h3>

                <div className="p-3.5 bg-blue-50/60 border border-blue-200/60 rounded-xl space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2563EB]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Executive Synthesis</span>
                  </div>
                  <p className="text-xs text-[#111111] leading-relaxed">
                    C requires manual header imports, explicit data types, and compilation steps, yielding ultra-low memory overhead. Python abstracts memory management and relies on an interpreter loop.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-[#111111] uppercase tracking-wider font-mono">
                    Key Insights
                  </div>
                  <ul className="text-xs text-[#666666] space-y-1.5 list-disc pl-4">
                    <li>C code compiles directly to machine code instructions.</li>
                    <li>Python code translates to bytecode executed by the CPython VM.</li>
                    <li>GoAtlas stores both implementations with code block syntax highlighting.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="bg-white border border-[#EAEAEA] rounded-xl p-6 space-y-4 max-w-2xl mx-auto shadow-xs">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#111111]">
                    <Sparkles className="w-4 h-4 text-[#2563EB]" />
                    <span>Atlas AI Assistant (Grounding on your library)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    11 Saved Items Indexed
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-[#FAFAFA] p-3 rounded-lg border border-[#EAEAEA] font-medium text-[#111111]">
                    &ldquo;What have I saved recently regarding system architecture guidelines?&rdquo;
                  </div>

                  <div className="bg-blue-50/40 border border-blue-100 p-3.5 rounded-lg text-[#111111] leading-relaxed space-y-2">
                    <p>
                      Based on your saved PDF <span className="font-semibold text-[#2563EB]">&ldquo;System Architecture Guidelines 2026&rdquo;</span>:
                    </p>
                    <ul className="list-disc pl-4 space-y-1 text-[#666666]">
                      <li>Adopt asynchronous event busses for microservice decoupling.</li>
                      <li>Implement circuit breaker patterns to guard against cascading failures.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Callout in Frame */}
          <div className="bg-[#FAFAFA] border-t border-[#EAEAEA] p-4 text-center">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <span>Explore the full GoAtlas Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

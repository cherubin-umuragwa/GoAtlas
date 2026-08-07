'use client';

import React from 'react';
import { Sparkles, MessageSquare, Search } from 'lucide-react';

export function AISection() {
  const queryExamples = [
    '“Find the React performance article I saved last month.”',
    '“Show everything I’ve saved about software architecture.”',
    '“Summarize what I’ve collected about cybersecurity.”',
    '“Which resources have I saved but never finished reading?”',
  ];

  return (
    <section className="py-20 md:py-32 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#2563EB] bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-1 rounded-md inline-block">
            AI-POWERED KNOWLEDGE SYNTHESIS
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            Your library shouldn&apos;t just store information. <br />
            <span className="text-[#2563EB]">It should understand it.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#666666] leading-relaxed max-w-2xl mx-auto">
            GoAtlas indexation goes beyond keywords. Ask natural language questions and receive accurate answers derived exclusively from your saved articles, repos, and notes.
          </p>
        </div>

        {/* Natural Language Query Showcase */}
        <div className="mt-12 max-w-3xl mx-auto bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111111] border-b border-[#EAEAEA] pb-3">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>NATURAL LANGUAGE QUERY INTERFACE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {queryExamples.map((q, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#EAEAEA] p-3.5 rounded-xl text-xs font-mono text-[#111111] flex items-start gap-2.5 shadow-2xs hover:border-[#2563EB] transition-colors"
              >
                <Search className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                <span>{q}</span>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-mono text-[#666666] text-center pt-2">
            Grounded directly on your saved content • Zero hallucinated web results
          </p>
        </div>
      </div>
    </section>
  );
}

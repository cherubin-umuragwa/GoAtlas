'use client';

import React from 'react';

export function HowItWorksSection() {
  const steps = [
    {
      number: '01',
      title: 'SAVE',
      subtitle: 'Capture anything in a second',
      description:
        'Articles, YouTube links, PDFs, GitHub repositories, quick notes, audio memos, or raw screenshots. GoAtlas accepts any format of web discovery without friction.',
    },
    {
      number: '02',
      title: 'UNDERSTAND',
      subtitle: 'Automatic synthesis & indexing',
      description:
        'GoAtlas automatically parses content, extracts key executive summaries, tags topics, and builds a semantic index of your personal library.',
    },
    {
      number: '03',
      title: 'REDISCOVER',
      subtitle: 'Surface knowledge when it matters',
      description:
        'Ask natural language questions across your library or receive daily intelligent digests that resurface relevant past captures right when you need them.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666] bg-white border border-[#EAEAEA] px-2.5 py-1 rounded-md inline-block mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Designed for effortless retention.
          </h2>
        </div>

        {/* Editorial Numbered Step Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 relative">
          {steps.map((step, idx) => (
            <div key={step.number} className="space-y-4 pt-6 border-t border-[#EAEAEA] relative">
              {/* Large Number */}
              <div className="text-4xl lg:text-5xl font-mono font-bold text-[#2563EB]">
                {step.number}
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#111111] tracking-tight uppercase">
                  {step.title}
                </h3>
                <p className="text-xs font-mono text-[#666666] uppercase">{step.subtitle}</p>
              </div>

              {/* Description */}
              <p className="text-sm text-[#666666] leading-relaxed font-sans">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

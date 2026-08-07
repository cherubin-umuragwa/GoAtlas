'use client';

import React from 'react';
import { RefreshCw, Clock, Link2, AlertCircle, Layers } from 'lucide-react';

export function RediscoverySection() {
  const triggers = [
    {
      icon: <Clock className="w-4 h-4 text-[#2563EB]" />,
      tag: 'Time Capsule',
      title: '“You saved this article 7 months ago.”',
      desc: 'Resurfaces valuable long-form reads you bookmarked for later when you have downtime.',
    },
    {
      icon: <Link2 className="w-4 h-4 text-[#2563EB]" />,
      tag: 'Smart Connection',
      title: '“This connects to something you saved yesterday.”',
      desc: 'Automatically connects new bookmarks with historical notes or research saved months ago.',
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-[#2563EB]" />,
      tag: 'Incomplete Read',
      title: '“You never finished reading this paper.”',
      desc: 'Prompts you to complete high-priority items with progress bars and key executive summaries.',
    },
    {
      icon: <Layers className="w-4 h-4 text-[#2563EB]" />,
      tag: 'Topic Cluster',
      title: '“These 4 things you saved are closely related.”',
      desc: 'Groups scattered captures into automated collections for ongoing projects or research.',
    },
  ];

  return (
    <section id="rediscovery" className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666] bg-white border border-[#EAEAEA] px-2.5 py-1 rounded-md inline-block mb-4">
            ACTIVE MEMORY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Don&apos;t just save it. <br />
            <span className="text-[#2563EB]">Rediscover it.</span>
          </h2>
          <p className="text-base text-[#666666] mt-3">
            Saving content is only half the problem. The other half is bringing it back into your life right when it matters.
          </p>
        </div>

        {/* Rediscovery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
          {triggers.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EAEAEA] rounded-2xl p-6 space-y-3 shadow-xs hover:border-[#2563EB] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold text-[#2563EB] bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {t.tag}
                </span>
                {t.icon}
              </div>
              <h3 className="text-base font-bold text-[#111111] leading-snug">{t.title}</h3>
              <p className="text-xs text-[#666666] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Bookmark, HelpCircle, Layers } from 'lucide-react';

export function ProblemSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666] bg-white border border-[#EAEAEA] px-2.5 py-1 rounded-md inline-block">
            THE REALITY OF MODERN DISCOVERY
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
            You save everything. <br />
            <span className="text-[#666666]">You remember almost none of it.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
            Every day, you encounter brilliant ideas: a deep-dive technical article, a video essay, a code repository, a research paper, or a screenshot of an interface. You bookmark it or save it in browser tabs.
          </p>
        </div>

        {/* Visual Problem Representation */}
        <div className="mt-16 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Scattered Chaos side */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEAEA] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] border-b border-[#EAEAEA] pb-3">
              <span className="flex items-center gap-1.5 text-red-600 font-semibold">
                <HelpCircle className="w-4 h-4" /> The Disconnected Save
              </span>
              <span>Scattered across 12 apps</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-[#666666] flex items-center justify-between">
                <span>Browser Bookmarks (742 items)</span>
                <span className="text-[10px] text-neutral-400">Forgotten</span>
              </div>
              <div className="p-2.5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-[#666666] flex items-center justify-between">
                <span>Reading List / Open Tabs (53 tabs)</span>
                <span className="text-[10px] text-neutral-400">Lost on restart</span>
              </div>
              <div className="p-2.5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-[#666666] flex items-center justify-between">
                <span>Downloads folder / PDFs</span>
                <span className="text-[10px] text-neutral-400">Unsearchable</span>
              </div>
              <div className="p-2.5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-[#666666] flex items-center justify-between">
                <span>Screenshots & Photos</span>
                <span className="text-[10px] text-neutral-400">No context</span>
              </div>
            </div>

            <div className="pt-2 text-xs font-serif italic text-center text-[#666666]">
              &ldquo;Where was that article I saved 3 months ago?&rdquo;
            </div>
          </div>

          {/* Solution concept side */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EAEAEA] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-[#666666] border-b border-[#EAEAEA] pb-3">
              <span className="flex items-center gap-1.5 text-[#2563EB] font-semibold">
                <Layers className="w-4 h-4" /> GoAtlas Personal OS
              </span>
              <span>Single Memory System</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-xs space-y-1">
                <div className="font-semibold text-[#111111]">Automatic Context & Insights</div>
                <div className="text-[#666666] text-[11px]">
                  GoAtlas reads, synthesizes key takeaways, and indexes every item.
                </div>
              </div>

              <div className="p-3 bg-[#FAFAFA] border border-[#EAEAEA] rounded-lg text-xs space-y-1">
                <div className="font-semibold text-[#111111]">Natural Language Rediscovery</div>
                <div className="text-[#666666] text-[11px]">
                  Ask questions or search concept fragments. No rigid folder structures required.
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs font-medium text-center text-[#2563EB]">
              Saved once. Retained forever.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

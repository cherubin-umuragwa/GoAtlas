'use client';

import React from 'react';

export function IdeaSection() {
  return (
    <section id="product" className="py-20 md:py-32 bg-white border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#2563EB] bg-[#FAFAFA] border border-[#EAEAEA] px-3 py-1 rounded-md inline-block">
            THE UNIFIED MEMORY LAYER
          </span>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight leading-tight uppercase">
            ONE PLACE FOR EVERYTHING YOU FIND.
          </h2>

          <div className="text-lg sm:text-2xl text-[#111111] font-medium leading-relaxed max-w-2xl mx-auto space-y-2">
            <p>Save a link. Drop a PDF. Upload a screenshot.</p>
            <p>Write a note. Record a voice memo.</p>
            <p className="text-[#2563EB] font-bold pt-2">GoAtlas brings it all together.</p>
          </div>

          <div className="pt-8 border-t border-[#EAEAEA] max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div className="p-5 bg-[#FAFAFA] border border-[#EAEAEA] rounded-xl space-y-2">
              <span className="text-xs font-mono text-[#666666] uppercase">The Old Way</span>
              <p className="text-sm text-[#111111] font-semibold">
                &ldquo;Which app did I save that in? Pocket? Notion? Screenshots folder? Chrome tabs?&rdquo;
              </p>
            </div>

            <div className="p-5 bg-white border-2 border-[#2563EB] rounded-xl space-y-2 shadow-xs">
              <span className="text-xs font-mono text-[#2563EB] font-bold uppercase">The GoAtlas Way</span>
              <p className="text-sm text-[#111111] font-bold">
                You don&apos;t have to remember where you saved it. GoAtlas does.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

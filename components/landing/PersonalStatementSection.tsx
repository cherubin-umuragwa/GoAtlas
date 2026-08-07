'use client';

import React from 'react';

export function PersonalStatementSection() {
  return (
    <section className="py-28 md:py-44 bg-white border-b border-[#EAEAEA] text-center">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-black text-[#111111] tracking-tighter leading-[1.05] uppercase">
          YOUR INTERNET. <br />
          <span className="text-[#2563EB]">YOUR MEMORY.</span> <br />
          YOUR ATLAS.
        </h2>

        <p className="text-sm sm:text-base text-[#666666] font-mono tracking-widest uppercase max-w-md mx-auto pt-4 border-t border-[#EAEAEA]">
          A personal memory layer for the web
        </p>
      </div>
    </section>
  );
}

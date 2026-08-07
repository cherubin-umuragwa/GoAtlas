'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Compass } from 'lucide-react';

export function FinalCTASection() {
  return (
    <section className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#EAEAEA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="w-12 h-12 rounded-2xl bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-6 h-6 text-white" />
        </div>

        <h2 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight uppercase">
          START REMEMBERING.
        </h2>

        <p className="text-base sm:text-xl text-[#666666] max-w-xl mx-auto leading-relaxed">
          Give everything you find online a place to live. Free, private, and powered by local storage & AI.
        </p>

        <div className="pt-4 flex justify-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-base font-semibold px-8 py-4 rounded-xl transition-colors shadow-sm"
          >
            <span>Open GoAtlas</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

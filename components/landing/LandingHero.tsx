'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, Video, Github, FileCode, Camera, StickyNote, Compass } from 'lucide-react';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 md:pt-20 md:pb-32 border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#EAEAEA] text-xs font-mono text-[#666666]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            <span>PERSONAL INTERNET OPERATING SYSTEM</span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.08] uppercase">
            THE INTERNET IS FULL OF THINGS <br className="hidden sm:inline" />
            <span className="text-[#111111]">WORTH REMEMBERING.</span>
          </h1>

          {/* Sub-headline core statement */}
          <p className="text-xl sm:text-2xl font-semibold text-[#111111] max-w-2xl mx-auto">
            GoAtlas remembers them for you.
          </p>

          <p className="text-base sm:text-lg text-[#666666] max-w-2xl mx-auto leading-relaxed">
            One personal place to save, organize, search, understand, and rediscover everything you find online.
          </p>

          {/* CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/app"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-6 py-3.5 rounded-lg transition-colors shadow-xs"
            >
              <span>Open GoAtlas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#666666] hover:text-[#111111] px-5 py-3 rounded-lg border border-transparent hover:border-[#EAEAEA] transition-colors"
            >
              <span>See how it works</span>
              <span className="text-xs">↓</span>
            </a>
          </div>
        </div>

        {/* Abstract Geometric Information Flow Visual */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto relative">
          <div className="bg-[#FAFAFA] border border-[#EAEAEA] rounded-2xl p-6 sm:p-10 relative overflow-hidden shadow-xs">
            {/* Grid line backdrop */}
            <div
              className="absolute inset-0 opacity-[0.4]"
              style={{
                backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Geometric convergence diagram */}
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {/* Content Fragment Nodes */}
              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">Articles & Blogs</div>
                  <div className="text-[10px] text-[#666666] font-mono">web.archive / read</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <Video className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">YouTube & Media</div>
                  <div className="text-[10px] text-[#666666] font-mono">youtube.com / watch</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">GitHub Repos</div>
                  <div className="text-[10px] text-[#666666] font-mono">github.com / code</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <FileCode className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">PDFs & Docs</div>
                  <div className="text-[10px] text-[#666666] font-mono">arxiv.org / pdf</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <Camera className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">Screenshots & OCR</div>
                  <div className="text-[10px] text-[#666666] font-mono">img / text extract</div>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-white border border-[#EAEAEA] rounded-xl flex items-center gap-3 shadow-xs">
                <div className="p-2 rounded-md bg-[#FAFAFA] text-[#111111] border border-[#EAEAEA]">
                  <StickyNote className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#111111] truncate">Notes & Thoughts</div>
                  <div className="text-[10px] text-[#666666] font-mono">markdown / memo</div>
                </div>
              </div>
            </div>

            {/* Convergence lines & Central Core */}
            <div className="my-6 flex flex-col items-center">
              <div className="h-8 w-px bg-gradient-to-b from-[#EAEAEA] to-[#2563EB]" />
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#2563EB] shadow-sm text-xs font-bold text-[#111111]">
                <Compass className="w-4 h-4 text-[#2563EB]" />
                <span>GoAtlas Central Memory Layer</span>
              </div>
            </div>

            {/* Structured Output Indicator */}
            <div className="p-4 bg-white border border-[#EAEAEA] rounded-xl max-w-xl mx-auto flex items-center justify-between text-xs text-[#666666]">
              <span className="font-medium text-[#111111]">Unified Indexing & Synthesis</span>
              <span className="font-mono text-[10px] bg-[#FAFAFA] px-2 py-0.5 rounded border border-[#EAEAEA] text-[#2563EB]">
                Auto-Categorized
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

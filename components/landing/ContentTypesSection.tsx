'use client';

import React from 'react';
import {
  Globe,
  FileText,
  Video,
  FileCode2,
  Camera,
  StickyNote,
  Mic,
  Image as ImageIcon,
} from 'lucide-react';

export function ContentTypesSection() {
  const contentTypes = [
    {
      title: 'LINKS & WEBPAGES',
      icon: <Globe className="w-5 h-5 text-[#111111]" />,
      desc: 'Bookmarked URLs, documentation, and web pages archived with full offline text.',
    },
    {
      title: 'ARTICLES & ESSAYS',
      icon: <FileText className="w-5 h-5 text-[#111111]" />,
      desc: 'Distraction-free smart reader mode with automated executive summaries.',
    },
    {
      title: 'VIDEOS & MEDIA',
      icon: <Video className="w-5 h-5 text-[#111111]" />,
      desc: 'YouTube lectures, webinars, and video essays indexed with key takeaways.',
    },
    {
      title: 'PDFs & RESEARCH',
      icon: <FileCode2 className="w-5 h-5 text-[#111111]" />,
      desc: 'Whitepapers, guides, and academic documents indexed for full-text search.',
    },
    {
      title: 'SCREENSHOTS & OCR',
      icon: <Camera className="w-5 h-5 text-[#111111]" />,
      desc: 'Visual references and UI screenshots with automatic optical character recognition.',
    },
    {
      title: 'MARKDOWN NOTES',
      icon: <StickyNote className="w-5 h-5 text-[#111111]" />,
      desc: 'Quick thoughts, code snippets, outlines, and structured personal notes.',
    },
    {
      title: 'VOICE MEMOS',
      icon: <Mic className="w-5 h-5 text-[#111111]" />,
      desc: 'Audio recordings transcribed automatically into searchable text notes.',
    },
    {
      title: 'IMAGES & GRAPHICS',
      icon: <ImageIcon className="w-5 h-5 text-[#111111]" />,
      desc: 'Design assets, charts, and diagrams organized into topic collections.',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-32 bg-[#FAFAFA] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666] bg-white border border-[#EAEAEA] px-2.5 py-1 rounded-md inline-block mb-4">
            UNIVERSAL SUPPORT
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
            Everything you discover, preserved.
          </h2>
          <p className="text-base text-[#666666] mt-3">
            GoAtlas unifies every format of web content into a single cohesive personal ecosystem.
          </p>
        </div>

        {/* Content Type Ecosystem Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypes.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#EAEAEA] rounded-xl p-5 space-y-3 shadow-xs hover:border-[#2563EB] transition-all"
            >
              <div className="w-9 h-9 rounded-lg bg-[#FAFAFA] border border-[#EAEAEA] flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-xs font-mono font-bold tracking-wider text-[#111111] uppercase">
                {item.title}
              </h3>
              <p className="text-xs text-[#666666] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import { Compass } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-white py-12 border-t border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
            <Compass className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-[#111111] tracking-tight">GoAtlas</span>
          <span className="text-[10px] font-mono text-[#666666] uppercase bg-[#FAFAFA] border border-[#EAEAEA] px-2 py-0.5 rounded">
            PERSONAL INTERNET OS
          </span>
        </div>

        {/* Copyright */}
        <div className="text-xs font-mono text-[#666666]">
          &copy; {new Date().getFullYear()} GoAtlas. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

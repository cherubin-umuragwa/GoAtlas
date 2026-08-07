'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';

export function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '#product', label: 'Product' },
    { href: '#how-it-works', label: 'How it works' },
    { href: '#features', label: 'Features' },
    { href: '#rediscovery', label: 'Rediscovery' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold tracking-tight text-[#111111]">
                GoAtlas
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest text-[#666666] bg-[#FAFAFA] border border-[#EAEAEA] px-2 py-0.5 rounded-md">
                PERSONAL INTERNET OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium text-[#666666] hover:text-[#111111] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-xs"
            >
              <span>Open GoAtlas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 bg-[#2563EB] text-white text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              <span>Open</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#111111] rounded-lg hover:bg-[#FAFAFA] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Navigation Layer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200">
          {/* Header row */}
          <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-[#111111]">GoAtlas</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#111111] rounded-lg hover:bg-[#FAFAFA]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-6 py-8">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666]">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold text-[#111111] hover:text-[#2563EB] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="space-y-4 pt-6 border-t border-[#EAEAEA]">
            <Link
              href="/app"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] text-white text-sm font-semibold py-3.5 rounded-lg"
            >
              <span>Open GoAtlas</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-center text-xs text-[#666666]">
              Personal Internet OS — No setup required
            </p>
          </div>
        </div>
      )}
    </>
  );
}

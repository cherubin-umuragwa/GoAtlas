'use client';

import React, { useEffect } from 'react';
import type { NavTab } from './SidebarNav';
import {
  Search,
  Plus,
  Bell,
  Menu,
  Sparkles,
  Compass,
  X,
  Inbox,
  Folder,
  Sun,
  FileCode2,
  Mic,
  Camera,
  Settings,
} from 'lucide-react';

interface HeaderNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickCapture: () => void;
  onOpenNotifications: () => void;
  unreadNotifCount: number;
  itemCount: number;
}

export function HeaderNav({
  activeTab,
  onSelectTab,
  onOpenQuickCapture,
  onOpenNotifications,
  unreadNotifCount,
  itemCount,
}: HeaderNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Lock body scroll when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navItems: Array<{ tab: NavTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { tab: 'inbox', label: 'Universal Inbox', icon: <Inbox className="w-5 h-5" />, badge: itemCount },
    { tab: 'chat', label: 'Atlas AI Chat', icon: <Sparkles className="w-5 h-5" /> },
    { tab: 'digest', label: 'Daily Rediscovery', icon: <Sun className="w-5 h-5" /> },
    { tab: 'collections', label: 'Collections', icon: <Folder className="w-5 h-5" /> },
    { tab: 'search', label: 'Universal Search', icon: <Search className="w-5 h-5" /> },
    { tab: 'notes', label: 'Markdown Notes', icon: <FileCode2 className="w-5 h-5" /> },
    { tab: 'voice', label: 'Voice Memos', icon: <Mic className="w-5 h-5" /> },
    { tab: 'screenshots', label: 'Screenshots & OCR', icon: <Camera className="w-5 h-5" /> },
    { tab: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'inbox':
        return 'Universal Inbox';
      case 'chat':
        return 'Atlas AI Chat';
      case 'digest':
        return 'Daily Rediscovery';
      case 'collections':
        return 'Collections';
      case 'search':
        return 'Universal Search';
      case 'notes':
        return 'Markdown Notes';
      case 'voice':
        return 'Voice Memos';
      case 'screenshots':
        return 'Screenshots & OCR';
      case 'settings':
        return 'Settings';
      default:
        return 'GoAtlas';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#ECECEC] px-4 sm:px-6 py-3 font-sans">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Mobile Navigation Trigger & Brand */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="p-2 text-neutral-800 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div
              onClick={() => onSelectTab('inbox')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-neutral-900 tracking-tight">
                GoAtlas
              </span>
            </div>
          </div>

          {/* Desktop Left: Current View Indicator */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <span className="text-xs font-semibold text-neutral-400 font-mono tracking-wider uppercase">
              GoAtlas
            </span>
            <span className="text-xs text-neutral-300">/</span>
            <span className="text-xs font-semibold text-neutral-900 truncate max-w-[120px] lg:max-w-none">
              {getTabTitle(activeTab)}
            </span>
          </div>

          {/* Global Search Bar Trigger (Middle) */}
          <div
            onClick={() => onSelectTab('search')}
            className="hidden sm:flex items-center gap-2 flex-1 min-w-0 max-w-xs md:max-w-md px-3 py-1.5 bg-neutral-50 hover:bg-neutral-100/80 border border-[#ECECEC] rounded-lg text-xs text-neutral-500 cursor-pointer transition-all"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">Search items, AI summaries...</span>
            <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-neutral-400 hidden md:inline-block shrink-0">
              ⌘K
            </kbd>
          </div>

          {/* Right Primary Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile Search Button */}
            <button
              onClick={() => onSelectTab('search')}
              className="sm:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* ONE Primary Save Anything Action - "+" on screens < xl, "Save Anything" on xl+ */}
            <button
              onClick={onOpenQuickCapture}
              aria-label="Save Anything"
              className="px-2.5 py-1.5 xl:px-3.5 xl:py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xl:inline">Save Anything</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col justify-between p-6 overflow-y-auto animate-in fade-in duration-200 font-sans text-neutral-900">
          <div>
            {/* Top Bar of Mobile Menu */}
            <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-neutral-900">GoAtlas</h2>
                  <p className="text-[10px] text-neutral-400 font-mono">Personal Internet OS</p>
                </div>
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-6 space-y-1.5">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => {
                      onSelectTab(item.tab);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full py-3 px-4 rounded-xl text-sm font-medium flex items-center justify-between transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-white' : 'text-neutral-500'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-mono ${
                          isActive ? 'bg-blue-700 text-white' : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer Info in Fullscreen Mobile Drawer */}
          <div className="pt-6 border-t border-neutral-100 space-y-3">
            <div className="text-xs text-neutral-500 font-mono">
              IndexedDB Storage • {itemCount} items
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              &quot;The internet is full of things worth remembering. GoAtlas remembers them for you.&quot;
            </p>
          </div>
        </div>
      )}
    </>
  );
}


'use client';

import React from 'react';
import Link from 'next/link';
import {
  Inbox,
  Sparkles,
  Folder,
  Search,
  FileCode2,
  Mic,
  Camera,
  Sun,
  Settings,
  Compass,
  HardDrive,
  Plus,
} from 'lucide-react';

export type NavTab =
  | 'inbox'
  | 'chat'
  | 'collections'
  | 'search'
  | 'notes'
  | 'voice'
  | 'screenshots'
  | 'digest'
  | 'settings';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenQuickCapture?: () => void;
  itemCount: number;
  unreadCount?: number;
}

export function SidebarNav({
  activeTab,
  onSelectTab,
  onOpenQuickCapture,
  itemCount,
}: SidebarNavProps) {
  const navItems: Array<{ tab: NavTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { tab: 'inbox', label: 'Universal Inbox', icon: <Inbox className="w-4 h-4" />, badge: itemCount },
    { tab: 'chat', label: 'Atlas AI Chat', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'digest', label: 'Daily Rediscovery', icon: <Sun className="w-4 h-4" /> },
    { tab: 'collections', label: 'Collections', icon: <Folder className="w-4 h-4" /> },
    { tab: 'search', label: 'Universal Search', icon: <Search className="w-4 h-4" /> },
    { tab: 'notes', label: 'Markdown Notes', icon: <FileCode2 className="w-4 h-4" /> },
    { tab: 'voice', label: 'Voice Memos', icon: <Mic className="w-4 h-4" /> },
    { tab: 'screenshots', label: 'Screenshots & OCR', icon: <Camera className="w-4 h-4" /> },
    { tab: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#ECECEC] flex flex-col justify-between h-screen fixed top-0 left-0 bottom-0 z-30 shrink-0 hidden md:flex font-sans select-none overflow-hidden">
      <div className="p-4 space-y-4 overflow-y-auto">
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3 px-1 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm transition-transform group-hover:scale-105">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#111111] tracking-tight leading-none">
              GoAtlas
            </h1>
            <span className="text-[10px] text-neutral-400 font-mono tracking-wider">
              INTERNET OS
            </span>
          </div>
        </Link>

        {/* Quick Capture Button */}
        {onOpenQuickCapture && (
          <button
            onClick={onOpenQuickCapture}
            className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Save Anything</span>
          </button>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-between transition-all group ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/80'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`transition-colors shrink-0 ${
                      isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-800'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold shrink-0 ml-1 ${
                      isActive ? 'bg-blue-700 text-white' : 'bg-neutral-100 text-neutral-500'
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

      {/* Footer Storage / Offline Badge */}
      <div className="p-4 border-t border-[#ECECEC] bg-neutral-50/60 shrink-0">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 mb-0.5">
          <HardDrive className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>Local Storage Engine</span>
        </div>
        <p className="text-[10px] text-neutral-400 font-mono">
          {itemCount} items synced • Offline Ready
        </p>
      </div>
    </aside>
  );
}


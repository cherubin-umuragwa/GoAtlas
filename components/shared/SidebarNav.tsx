'use client';

import React from 'react';
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
  Plus,
  Compass,
  HardDrive,
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
  onOpenQuickCapture: () => void;
  itemCount: number;
  unreadCount: number;
}

export function SidebarNav({
  activeTab,
  onSelectTab,
  onOpenQuickCapture,
  itemCount,
  unreadCount,
}: SidebarNavProps) {
  const navItems: Array<{ tab: NavTab; label: string; icon: React.ReactNode; badge?: number }> = [
    { tab: 'inbox', label: 'Universal Inbox', icon: <Inbox className="w-4 h-4" />, badge: itemCount },
    { tab: 'chat', label: 'Atlas AI Chat', icon: <Sparkles className="w-4 h-4 text-blue-500" /> },
    { tab: 'collections', label: 'Collections', icon: <Folder className="w-4 h-4" /> },
    { tab: 'search', label: 'Universal Search', icon: <Search className="w-4 h-4" /> },
    { tab: 'digest', label: 'Daily Rediscovery', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { tab: 'notes', label: 'Markdown Notes', icon: <FileCode2 className="w-4 h-4" /> },
    { tab: 'voice', label: 'Voice Memos', icon: <Mic className="w-4 h-4 text-red-500" /> },
    { tab: 'screenshots', label: 'Screenshots & OCR', icon: <Camera className="w-4 h-4 text-purple-500" /> },
    { tab: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#ECECEC] flex flex-col justify-between h-screen sticky top-0 shrink-0 hidden md:flex font-sans">
      <div className="p-5 space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#111111] tracking-tight leading-none">
              GoAtlas
            </h1>
            <span className="text-[10px] text-[#666666] font-mono tracking-wider">
              PERSONAL INTERNET OS
            </span>
          </div>
        </div>

        {/* Quick Capture Button */}
        <button
          onClick={onOpenQuickCapture}
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Save Anything</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onSelectTab(item.tab)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'
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
      <div className="p-4 border-t border-[#ECECEC] bg-neutral-50/50">
        <div className="flex items-center gap-2 text-xs font-medium text-neutral-600 mb-1">
          <HardDrive className="w-3.5 h-3.5 text-blue-600" />
          <span>Offline Storage Engine</span>
        </div>
        <p className="text-[11px] text-neutral-500 font-mono">
          {itemCount} items synced • IndexedDB
        </p>
      </div>
    </aside>
  );
}

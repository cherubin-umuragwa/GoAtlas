'use client';

import React from 'react';
import { NavTab } from './SidebarNav';
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

  const navItems: Array<{ tab: NavTab; label: string; icon: React.ReactNode }> = [
    { tab: 'inbox', label: 'Inbox', icon: <Inbox className="w-4 h-4" /> },
    { tab: 'chat', label: 'AI Chat', icon: <Sparkles className="w-4 h-4 text-blue-500" /> },
    { tab: 'collections', label: 'Collections', icon: <Folder className="w-4 h-4" /> },
    { tab: 'search', label: 'Search', icon: <Search className="w-4 h-4" /> },
    { tab: 'digest', label: 'Daily Digest', icon: <Sun className="w-4 h-4 text-amber-500" /> },
    { tab: 'notes', label: 'Notes', icon: <FileCode2 className="w-4 h-4" /> },
    { tab: 'voice', label: 'Voice', icon: <Mic className="w-4 h-4 text-red-500" /> },
    { tab: 'screenshots', label: 'Screenshots', icon: <Camera className="w-4 h-4 text-purple-500" /> },
    { tab: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#ECECEC] px-4 sm:px-6 py-3 font-sans">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Mobile Brand / Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-xl"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm text-neutral-900 tracking-tight">
              GoAtlas
            </span>
          </div>
        </div>

        {/* Global Search Trigger Bar */}
        <div
          onClick={() => onSelectTab('search')}
          className="hidden sm:flex items-center gap-2 flex-1 max-w-md px-3.5 py-2 bg-neutral-50 hover:bg-neutral-100 border border-[#ECECEC] rounded-xl text-xs text-neutral-500 cursor-pointer transition-all"
        >
          <Search className="w-4 h-4 text-neutral-400" />
          <span className="truncate">Search saved articles, notes, podcasts, OCR text...</span>
          <kbd className="ml-auto text-[10px] font-mono px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-neutral-400">
            ⌘K
          </kbd>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenQuickCapture}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Save Anything</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 border-t border-neutral-100 mt-3 space-y-1 animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                onSelectTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                activeTab === item.tab
                  ? 'bg-neutral-900 text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

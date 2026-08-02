'use client';

import React, { useMemo } from 'react';
import { AtlasItem } from '@/types/atlas';
import {
  Sun,
  BookOpen,
  Calendar,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface DailyDigestViewProps {
  items: AtlasItem[];
  onOpenReader: (item: AtlasItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddToCollection: (itemId: string, collectionId: string) => void;
}

export function DailyDigestView({
  items,
  onOpenReader,
}: DailyDigestViewProps) {
  const revisitItems = useMemo(() => {
    return items
      .filter((i) => !i.isArchived && (i.readingProgress || 0) < 90)
      .slice(0, 3);
  }, [items]);

  const timeCapsuleItem = useMemo(() => {
    return items.find((i) => !i.isArchived) || items[0] || null;
  }, [items]);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            GoAtlas Daily Rediscovery Digest
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Good Morning. Here is what is worth revisiting today.
          </h1>

          <p className="text-xs text-slate-300 font-mono">
            {todayFormatted} • Curated from your {items.length} saved knowledge resources
          </p>
        </div>
      </div>

      {/* Section 1: In Progress & Revisit */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <h2 className="text-base font-bold text-neutral-900">
            Continue Reading & Revisit
          </h2>
        </div>

        {revisitItems.length === 0 ? (
          <p className="text-xs text-neutral-500">You&apos;re all caught up!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {revisitItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenReader(item)}
                className="bg-white border border-[#ECECEC] hover:border-blue-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span className="font-semibold text-blue-600">{item.category}</span>
                  <span>{item.readingProgress || 0}% Completed</span>
                </div>
                <h3 className="text-sm font-bold text-neutral-900 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-2">
                  {item.summary}
                </p>
                <div className="pt-2 flex justify-end text-xs font-semibold text-blue-600 items-center gap-1">
                  <span>Resume Reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Section 2: Time Capsule Rediscovery */}
      {timeCapsuleItem && (
        <div className="bg-amber-50/50 border border-amber-200/80 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-amber-600" />
            Time Capsule Rediscovery
          </div>

          <h3 className="text-base font-extrabold text-neutral-900">
            {timeCapsuleItem.title}
          </h3>

          <p className="text-xs text-neutral-700 leading-relaxed font-sans">
            {timeCapsuleItem.summary}
          </p>

          <button
            onClick={() => onOpenReader(timeCapsuleItem)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Rediscover Saved Item
          </button>
        </div>
      )}
    </div>
  );
}


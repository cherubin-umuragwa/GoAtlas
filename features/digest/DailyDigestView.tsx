'use client';

import React, { useMemo } from 'react';
import type { AtlasItem } from '@/types/atlas';
import {
  Sun,
  BookOpen,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  Compass,
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
  // Items with incomplete reading progress
  const unfinishedItems = useMemo(() => {
    return items
      .filter((i) => !i.isArchived && (i.readingProgress || 0) > 0 && (i.readingProgress || 0) < 100)
      .slice(0, 3);
  }, [items]);

  // Older saved item for time capsule
  const timeCapsuleItem = useMemo(() => {
    const active = items.filter((i) => !i.isArchived);
    if (active.length === 0) return items[0] || null;
    // pick an item or oldest saved item
    return active[active.length - 1] || active[0];
  }, [items]);

  // Featured recommendation item
  const featuredItem = useMemo(() => {
    return items.find((i) => !i.isArchived && i.isFavorite) || items[0] || null;
  }, [items]);

  const [todayFormatted, setTodayFormatted] = React.useState('Today');

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTodayFormatted(
        new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
        })
      );
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10 font-sans text-neutral-900">
      {/* Editorial Header Banner */}
      <div className="bg-neutral-900 text-white rounded-2xl p-8 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 text-xs font-mono">
          <Sun className="w-3.5 h-3.5 text-neutral-300" />
          <span>Daily Rediscovery • {todayFormatted}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
          &quot;The internet is full of things worth remembering. GoAtlas remembers them for you.&quot;
        </h1>

        <p className="text-xs text-neutral-400 font-mono">
          Curated automatically from your {items.length} saved knowledge resources.
        </p>
      </div>

      {/* Featured Rediscovery: Something Worth Revisiting */}
      {featuredItem && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-400 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-neutral-800" />
            <span>Something Worth Revisiting Today</span>
          </div>

          <div
            onClick={() => onOpenReader(featuredItem)}
            className="group bg-white border border-[#ECECEC] hover:border-neutral-900 rounded-2xl p-6 shadow-sm transition-all cursor-pointer space-y-3"
          >
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span className="font-semibold text-neutral-900">{featuredItem.category}</span>
              {featuredItem.domain && <span>{featuredItem.domain}</span>}
            </div>

            <h2 className="text-lg font-bold text-neutral-900 group-hover:text-black transition-colors">
              {featuredItem.title}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
              {featuredItem.summary}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-neutral-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featuredItem.readingTimeMinutes || 4} min read
              </span>

              <span className="font-medium text-neutral-900 group-hover:underline flex items-center gap-1">
                <span>Read in Reader</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Unfinished Reads Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-2">
          <BookOpen className="w-4 h-4 text-neutral-700" />
          <h2 className="text-sm font-bold text-neutral-900">
            You Never Finished Reading These
          </h2>
        </div>

        {unfinishedItems.length === 0 ? (
          <p className="text-xs text-neutral-500 font-mono">
            You are all caught up on your active reading queue!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {unfinishedItems.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenReader(item)}
                className="bg-white border border-[#ECECEC] hover:border-neutral-400 rounded-xl p-5 shadow-sm transition-all cursor-pointer space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mb-2">
                    <span className="capitalize text-neutral-900 font-medium">{item.type}</span>
                    <span>{item.readingProgress}% completed</span>
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 line-clamp-2 mt-1">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-900">
                  <span>Resume Reading</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Time Capsule Rediscovery Section */}
      {timeCapsuleItem && (
        <section className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-500 uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-neutral-700" />
            <span>Time Capsule • Saved in your archive</span>
          </div>

          <h3 className="text-base font-bold text-neutral-900">
            {timeCapsuleItem.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
            {timeCapsuleItem.summary}
          </p>

          <button
            onClick={() => onOpenReader(timeCapsuleItem)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm inline-flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>Rediscover Saved Knowledge</span>
          </button>
        </section>
      )}
    </div>
  );
}



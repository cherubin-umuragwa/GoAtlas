'use client';

import React, { useState, useEffect } from 'react';
import type { AtlasItem, PrimaryCategory, ItemType } from '@/types/atlas';
import {
  Search,
  X,
  Filter,
  Tag,
  BookOpen,
  Video,
  Camera,
  FileText,
  Mic,
  FileCode2,
  Clock,
  ArrowRight,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface UniversalSearchProps {
  items: AtlasItem[];
  onOpenReader: (item: AtlasItem) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export function UniversalSearch({
  items,
  onOpenReader,
  isOpenModal,
  onCloseModal,
}: UniversalSearchProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PrimaryCategory | 'All'>('All');
  const [selectedType, setSelectedType] = useState<ItemType | 'All'>('All');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // Collect all unique tags across items
  const allTags = Array.from(
    new Set(items.flatMap((item) => item.tags || []))
  ).slice(0, 15);

  const results = items.filter((item) => {
    if (item.isArchived) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (selectedType !== 'All' && item.type !== selectedType) return false;
    if (selectedTag && !item.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())) return false;

    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSummary = item.summary.toLowerCase().includes(q);
    const matchContent = item.content.toLowerCase().includes(q);
    const matchDomain = item.domain?.toLowerCase().includes(q);
    const matchCategory = item.category.toLowerCase().includes(q);
    const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));

    return (
      matchTitle ||
      matchSummary ||
      matchContent ||
      matchDomain ||
      matchCategory ||
      matchTags
    );
  });

  const getTypeIcon = (type: ItemType) => {
    switch (type) {
      case 'article':
        return <BookOpen className="w-3.5 h-3.5 text-emerald-600" />;
      case 'video':
        return <Video className="w-3.5 h-3.5 text-rose-600" />;
      case 'screenshot':
        return <Camera className="w-3.5 h-3.5 text-purple-600" />;
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-amber-600" />;
      case 'note':
        return <FileCode2 className="w-3.5 h-3.5 text-indigo-600" />;
      case 'voice':
        return <Mic className="w-3.5 h-3.5 text-red-500" />;
      default:
        return <Search className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Search Bar Header */}
      <div className="bg-white border border-[#ECECEC] rounded-2xl p-4 shadow-md space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Universal Search across titles, AI summaries, text body, domains, and tags..."
            className="w-full pl-12 pr-10 py-3.5 text-base bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filters:
            </span>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-700 font-medium focus:outline-none"
            >
              <option value="All">All Categories</option>
              <option value="Programming">Programming</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Recipes">Recipes</option>
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-2.5 py-1 bg-neutral-100 border border-neutral-200 rounded-lg text-neutral-700 font-medium focus:outline-none"
            >
              <option value="All">All Formats</option>
              <option value="article">Articles</option>
              <option value="video">Videos</option>
              <option value="screenshot">Screenshots</option>
              <option value="pdf">PDFs</option>
              <option value="note">Notes</option>
              <option value="voice">Voice</option>
            </select>
          </div>

          <span className="text-neutral-500 font-mono">
            {results.length} results matching
          </span>
        </div>

        {/* Tag Pills */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs">
            <Tag className="w-3 h-3 text-neutral-400" />
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-2 py-0.5 rounded-full font-mono transition-all ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {results.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl">
            <Search className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-neutral-800">
              No matching search results
            </h3>
            <p className="text-xs text-neutral-500 mt-1">
              Try searching with broader terms or clear your active filters.
            </p>
          </div>
        ) : (
          results.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenReader(item)}
              className="group bg-white border border-[#ECECEC] hover:border-neutral-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded bg-neutral-100">
                    {getTypeIcon(item.type)}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                    {item.type} • {item.category}
                  </span>
                  {item.domain && (
                    <span className="text-xs text-neutral-400 font-mono">
                      ({item.domain})
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 text-xs font-medium text-blue-600 group-hover:translate-x-1 transition-transform">
                <span>Read & Explore</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

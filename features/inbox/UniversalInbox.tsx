'use client';

import React, { useState } from 'react';
import type { AtlasItem, AtlasCollection, ItemType, PrimaryCategory } from '@/types/atlas';
import { ItemCard } from './ItemCard';
import {
  Search,
  LayoutGrid,
  List,
  Inbox as InboxIcon,
  BookOpen,
  Video,
  Camera,
  FileText,
  Mic,
  FileCode2,
  Plus,
} from 'lucide-react';

interface UniversalInboxProps {
  items: AtlasItem[];
  collections: AtlasCollection[];
  onOpenQuickCapture: () => void;
  onOpenReader: (item: AtlasItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddToCollection: (itemId: string, collectionId: string) => void;
}

export function UniversalInbox({
  items,
  collections,
  onOpenQuickCapture,
  onOpenReader,
  onToggleFavorite,
  onToggleArchive,
  onDeleteItem,
  onAddToCollection,
}: UniversalInboxProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ItemType | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<PrimaryCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'visited' | 'progress'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtering
  const filteredItems = items.filter((item) => {
    if (item.isArchived) return false;

    if (selectedType !== 'All' && item.type !== selectedType) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchContent = item.content.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchDomain = item.domain?.toLowerCase().includes(q);

      return (
        matchTitle ||
        matchSummary ||
        matchContent ||
        matchTags ||
        matchCategory ||
        matchDomain
      );
    }

    return true;
  });

  // Sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sortBy === 'visited') {
      return (b.visitCount || 0) - (a.visitCount || 0);
    }
    if (sortBy === 'progress') {
      return (b.readingProgress || 0) - (a.readingProgress || 0);
    }
    return 0;
  });

  const typeFilterTabs: Array<{ label: string; value: ItemType | 'All'; icon?: React.ReactNode }> = [
    { label: 'All Items', value: 'All' },
    { label: 'Articles', value: 'article', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { label: 'Videos', value: 'video', icon: <Video className="w-3.5 h-3.5" /> },
    { label: 'Screenshots', value: 'screenshot', icon: <Camera className="w-3.5 h-3.5" /> },
    { label: 'PDFs', value: 'pdf', icon: <FileText className="w-3.5 h-3.5" /> },
    { label: 'Notes', value: 'note', icon: <FileCode2 className="w-3.5 h-3.5" /> },
    { label: 'Voice', value: 'voice', icon: <Mic className="w-3.5 h-3.5" /> },
  ];

  const categoriesList: PrimaryCategory[] = [
    'Programming',
    'Business',
    'Design',
    'Finance',
    'Travel',
    'Health',
    'Recipes',
    'Shopping',
    'Education',
    'Entertainment',
    'General',
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 font-sans">
      {/* Editorial Header Section */}
      <div className="pb-4 border-b border-[#ECECEC]">
        <div className="flex items-center gap-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight">
            Universal Inbox
          </h1>
          <span className="px-2 py-0.5 rounded font-mono text-xs font-medium bg-neutral-100 text-neutral-600 border border-neutral-200">
            {filteredItems.length}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#666666] mt-1 leading-relaxed max-w-2xl">
          Everything you save, remembered in one place. Links, articles, podcasts, screenshots, and notes.
        </p>
      </div>

      {/* Control Bar: Unified Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items, AI summaries, domain, or #tags..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50/80 border border-[#ECECEC] rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all font-sans"
          />
        </div>

        {/* Filters & View Toggle */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white border border-[#ECECEC] rounded-lg text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer font-medium"
          >
            <option value="All">All Categories</option>
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white border border-[#ECECEC] rounded-lg text-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer font-medium"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="visited">Sort: Most Visited</option>
            <option value="progress">Sort: Progress</option>
          </select>

          <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-[#ECECEC]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Type Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-neutral-100 text-xs">
        {typeFilterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value)}
            className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              selectedType === tab.value
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Items Display or Empty State */}
      {sortedItems.length === 0 ? (
        <div className="bg-white border border-dashed border-neutral-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-12">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <InboxIcon className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-neutral-900 mb-1">
            Your Internet starts here.
          </h3>
          <p className="text-xs text-neutral-500 mb-5 leading-relaxed">
            {searchQuery
              ? `No items matched "${searchQuery}". Try clearing your filter criteria.`
              : 'Save an article, video, screenshot, PDF, or note. GoAtlas will remember it for you.'}
          </p>
          <button
            onClick={onOpenQuickCapture}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Save First Item</span>
          </button>
        </div>
      ) : (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'
              : 'space-y-4'
          }
        >
          {sortedItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              collections={collections}
              onOpenReader={onOpenReader}
              onToggleFavorite={onToggleFavorite}
              onToggleArchive={onToggleArchive}
              onDelete={onDeleteItem}
              onAddToCollection={onAddToCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
}


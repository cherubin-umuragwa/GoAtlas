'use client';

import React, { useState } from 'react';
import { AtlasItem, AtlasCollection, ItemType, PrimaryCategory } from '@/types/atlas';
import { ItemCard } from './ItemCard';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Filter,
  Sparkles,
  Inbox as InboxIcon,
  BookOpen,
  Video,
  Camera,
  FileText,
  Mic,
  FileCode2,
  CheckCircle2,
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
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-[#111111] tracking-tight">
              Universal Inbox
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filteredItems.length} Saved
            </span>
          </div>
          <p className="text-sm text-[#666666] mt-1">
            One personal Internet Operating System for all your links, articles, voice memos, screenshots, and notes.
          </p>
        </div>

        <button
          onClick={onOpenQuickCapture}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Save Anything</span>
        </button>
      </div>

      {/* Control Bar: Search + Category + View Mode */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
        {/* Instant Filter Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved items by title, AI summary, domain, or #tags..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-neutral-50 border border-[#ECECEC] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-sans"
          />
        </div>

        {/* Filters & Sorting Controls */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-3 py-2 text-xs bg-white border border-[#ECECEC] rounded-xl text-neutral-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-medium"
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
            className="px-3 py-2 text-xs bg-white border border-[#ECECEC] rounded-xl text-neutral-700 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer font-medium"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="visited">Sort: Most Visited</option>
            <option value="progress">Sort: Reading Progress</option>
          </select>

          <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-[#ECECEC]">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Type Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-neutral-100 text-xs">
        {typeFilterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value)}
            className={`px-3 py-1.5 rounded-xl font-medium flex items-center gap-1.5 transition-all whitespace-nowrap ${
              selectedType === tab.value
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Grid or List Display */}
      {sortedItems.length === 0 ? (
        <div className="bg-neutral-50/50 border border-dashed border-neutral-200 rounded-2xl p-12 text-center max-w-lg mx-auto my-8">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
            <InboxIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-neutral-900 mb-1">
            No items found in your inbox
          </h3>
          <p className="text-xs text-neutral-500 mb-4 leading-relaxed">
            {searchQuery
              ? `No saved items match "${searchQuery}". Try adjusting your filters.`
              : 'Save articles, videos, code snippets, screenshots, or voice memos to build your second brain.'}
          </p>
          <button
            onClick={onOpenQuickCapture}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Save First Item
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

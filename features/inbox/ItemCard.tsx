'use client';

import React, { useState } from 'react';
import type { AtlasItem, AtlasCollection } from '@/types/atlas';
import {
  Link2,
  FileText,
  Video,
  Camera,
  FileCode2,
  Mic,
  Image as ImageIcon,
  File,
  Star,
  Archive,
  BookOpen,
  FolderPlus,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ItemCardProps {
  item: AtlasItem;
  collections: AtlasCollection[];
  onOpenReader: (item: AtlasItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onAddToCollection: (itemId: string, collectionId: string) => void;
}

export function ItemCard({
  item,
  collections,
  onOpenReader,
  onToggleFavorite,
  onToggleArchive,
  onDelete,
  onAddToCollection,
}: ItemCardProps) {
  const [showTakeaways, setShowTakeaways] = useState(false);
  const [showCollectionMenu, setShowCollectionMenu] = useState(false);

  const getTypeIcon = () => {
    switch (item.type) {
      case 'link':
        return <Link2 className="w-3.5 h-3.5 text-neutral-500" />;
      case 'article':
        return <BookOpen className="w-3.5 h-3.5 text-neutral-500" />;
      case 'video':
        return <Video className="w-3.5 h-3.5 text-neutral-500" />;
      case 'screenshot':
        return <Camera className="w-3.5 h-3.5 text-neutral-500" />;
      case 'pdf':
        return <FileText className="w-3.5 h-3.5 text-neutral-500" />;
      case 'note':
        return <FileCode2 className="w-3.5 h-3.5 text-neutral-500" />;
      case 'voice':
        return <Mic className="w-3.5 h-3.5 text-neutral-500" />;
      case 'image':
        return <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />;
      default:
        return <File className="w-3.5 h-3.5 text-neutral-500" />;
    }
  };

  const getCategoryBadgeColor = () => {
    return 'bg-neutral-100 text-neutral-700 border-neutral-200';
  };

  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="group relative bg-white border border-[#ECECEC] rounded-xl p-4 sm:p-5 hover:border-neutral-300 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between w-full max-w-full overflow-hidden box-border">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap min-w-0 max-w-[calc(100%-80px)]">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-50 border border-neutral-200 text-neutral-700 shrink-0">
              {getTypeIcon()}
              <span className="capitalize">{item.type}</span>
            </span>

            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-medium border truncate max-w-[120px] ${getCategoryBadgeColor()}`}
              title={item.category}
            >
              {item.category}
            </span>

            {item.domain && (
              <span className="text-xs text-[#666666] font-mono truncate max-w-[100px]">
                {item.domain}
              </span>
            )}
          </div>

          <div className="flex items-center gap-0.5 shrink-0 ml-auto">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                item.isFavorite
                  ? 'text-amber-500 bg-amber-50'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
              title={item.isFavorite ? 'Unfavorite' : 'Favorite'}
            >
              <Star className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => onToggleArchive(item.id)}
              className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                item.isArchived
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100'
              }`}
              title={item.isArchived ? 'Unarchive' : 'Archive'}
            >
              <Archive className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Reading Trigger */}
        <h3
          onClick={() => onOpenReader(item)}
          className="text-base font-semibold text-[#111111] hover:text-blue-600 cursor-pointer line-clamp-2 transition-colors leading-snug mb-2 break-words"
        >
          {item.title}
        </h3>

        {/* AI Executive Summary */}
        <p className="text-sm text-[#666666] line-clamp-3 mb-3 leading-relaxed font-sans break-words">
          {item.summary}
        </p>

        {/* Key Takeaways Collapsible */}
        {item.keyTakeaways && item.keyTakeaways.length > 0 && (
          <div className="mb-3">
            <button
              onClick={() => setShowTakeaways(!showTakeaways)}
              className="text-xs font-medium text-neutral-600 hover:text-blue-600 flex items-center gap-1 py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0" />
              <span>{showTakeaways ? 'Hide AI Key Insights' : 'Show AI Key Insights'}</span>
              {showTakeaways ? <ChevronUp className="w-3.5 h-3.5 shrink-0" /> : <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
            </button>

            {showTakeaways && (
              <ul className="mt-2 space-y-1.5 text-xs text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-lg p-3">
                {item.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Tags Row */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 font-mono truncate max-w-[100px]"
              >
                #{tag}
              </span>
            ))}
            {item.tags.length > 3 && (
              <span className="text-[11px] px-1.5 py-0.5 rounded text-neutral-400 font-mono">
                +{item.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer Meta & Actions */}
      <div className="pt-3 border-t border-[#ECECEC] flex flex-wrap items-center justify-between gap-y-2 gap-x-1.5 text-xs text-[#666666] mt-auto w-full max-w-full">
        <div className="flex items-center gap-2 flex-wrap min-w-0">
          <span className="flex items-center gap-1 shrink-0" title="Reading time">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            {item.readingTimeMinutes || 3}m
          </span>

          {item.readingProgress !== undefined && item.readingProgress > 0 && (
            <div className="flex items-center gap-1 shrink-0">
              <div className="w-8 sm:w-10 bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full"
                  style={{ width: `${item.readingProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-500">
                {item.readingProgress}%
              </span>
            </div>
          )}

          {item.isRead && (
            <span className="flex items-center gap-1 text-emerald-600 font-medium text-[11px] shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Read
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0 ml-auto">
          {/* External Link if URL exists */}
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 hover:bg-neutral-100 rounded text-neutral-500 hover:text-neutral-900 transition-colors"
              title="Open Source URL"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}

          {/* Add to Collection Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCollectionMenu(!showCollectionMenu)}
              className="p-1.5 hover:bg-neutral-100 rounded text-neutral-500 hover:text-neutral-900 transition-colors"
              title="Add to Collection"
            >
              <FolderPlus className="w-3.5 h-3.5" />
            </button>

            {showCollectionMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg py-1 z-20">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                  Collections
                </div>
                {collections.length === 0 ? (
                  <div className="px-3 py-2 text-xs text-neutral-500">
                    No collections yet
                  </div>
                ) : (
                  collections.map((col) => {
                    const isInCollection = item.collectionIds.includes(col.id);
                    return (
                      <button
                        key={col.id}
                        onClick={() => {
                          onAddToCollection(item.id, col.id);
                          setShowCollectionMenu(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                          isInCollection ? 'text-blue-600 font-medium' : 'text-neutral-700'
                        }`}
                      >
                        <span className="truncate">{col.name}</span>
                        {isInCollection && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />}
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Open Reader Primary Action */}
          <button
            onClick={() => onOpenReader(item)}
            className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors"
          >
            Read
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(item.id)}
            className="p-1.5 hover:bg-red-50 rounded text-neutral-400 hover:text-red-600 transition-colors"
            title="Delete Item"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

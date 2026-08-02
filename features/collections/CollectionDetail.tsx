'use client';

import React from 'react';
import { AtlasCollection, AtlasItem } from '@/types/atlas';
import { ItemCard } from '../inbox/ItemCard';
import { ArrowLeft, Trash2, FolderOpen, Sparkles } from 'lucide-react';

interface CollectionDetailProps {
  collection: AtlasCollection;
  items: AtlasItem[];
  allCollections: AtlasCollection[];
  onBack: () => void;
  onOpenReader: (item: AtlasItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddToCollection: (itemId: string, collectionId: string) => void;
  onDeleteCollection: (id: string) => void;
}

export function CollectionDetail({
  collection,
  items,
  allCollections,
  onBack,
  onOpenReader,
  onToggleFavorite,
  onToggleArchive,
  onDeleteItem,
  onAddToCollection,
  onDeleteCollection,
}: CollectionDetailProps) {
  const collectionItems = items.filter((item) =>
    item.collectionIds.includes(collection.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#ECECEC]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-neutral-700" />
          </button>

          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm shrink-0"
            style={{ backgroundColor: collection.color }}
          >
            <FolderOpen className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-neutral-900">
                {collection.name}
              </h1>
              <span className="text-xs font-mono px-2 py-0.5 bg-neutral-100 border border-neutral-200 rounded-full text-neutral-600">
                {collectionItems.length} items
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {collection.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            if (confirm(`Delete collection "${collection.name}"? Saved items won't be deleted.`)) {
              onDeleteCollection(collection.id);
              onBack();
            }
          }}
          className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          title="Delete Collection"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Item List */}
      {collectionItems.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl p-12 text-center">
          <FolderOpen className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-neutral-800">
            This collection is empty
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Add saved items from your inbox to this collection using the &quot;Folder&quot; button on item cards.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {collectionItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              collections={allCollections}
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

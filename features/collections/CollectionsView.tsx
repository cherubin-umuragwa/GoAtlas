'use client';

import React, { useState } from 'react';
import { AtlasCollection, AtlasItem } from '@/types/atlas';
import {
  Folder,
  Cpu,
  Sparkles,
  Palette,
  Lightbulb,
  Utensils,
  BookOpen,
  Compass,
  Plus,
  Trash2,
  FolderOpen,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface CollectionsViewProps {
  collections: AtlasCollection[];
  items: AtlasItem[];
  onSelectCollection: (col: AtlasCollection) => void;
  onCreateCollection: (col: AtlasCollection) => void;
  onDeleteCollection: (id: string) => void;
}

export function CollectionsView({
  collections,
  items,
  onSelectCollection,
  onCreateCollection,
  onDeleteCollection,
}: CollectionsViewProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColDesc, setNewColDesc] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2563eb');
  const [selectedIcon, setSelectedIcon] = useState('Folder');

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Palette':
        return <Palette className="w-5 h-5" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5" />;
      case 'Compass':
        return <Compass className="w-5 h-5" />;
      default:
        return <Folder className="w-5 h-5" />;
    }
  };

  const handleCreate = () => {
    if (!newColName.trim()) return;
    const newCol: AtlasCollection = {
      id: `col-${Date.now()}`,
      name: newColName,
      description: newColDesc || 'Custom GoAtlas collection',
      icon: selectedIcon,
      color: selectedColor,
      isAiSuggested: false,
      createdAt: new Date().toISOString(),
    };
    onCreateCollection(newCol);
    setNewColName('');
    setNewColDesc('');
    setShowCreateModal(false);
  };

  const availableColors = ['#2563eb', '#7c3aed', '#ec4899', '#10b981', '#f59e0b', '#06b6d4', '#64748b'];
  const availableIcons = ['Folder', 'Cpu', 'Sparkles', 'Palette', 'Lightbulb', 'Utensils', 'BookOpen', 'Compass'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div>
          <h1 className="text-2xl font-bold text-[#111111] tracking-tight">
            Intelligent Collections
          </h1>
          <p className="text-sm text-[#666666] mt-1">
            Organize knowledge by projects, research topics, hobbies, or AI auto-clusters.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" /> New Collection
        </button>
      </div>

      {/* Grid of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col) => {
          const colItems = items.filter((i) => i.collectionIds.includes(col.id));
          return (
            <div
              key={col.id}
              onClick={() => onSelectCollection(col)}
              className="group bg-white border border-[#ECECEC] hover:border-neutral-300 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-sm"
                    style={{ backgroundColor: col.color }}
                  >
                    {getIconComponent(col.icon)}
                  </div>

                  {col.isAiSuggested && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI Suggested
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                    {col.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                    {col.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-600">
                <span>{colItems.length} Saved Items</span>
                <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
            <h2 className="text-base font-bold text-neutral-900">Create New Collection</h2>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Collection Name
              </label>
              <input
                type="text"
                value={newColName}
                onChange={(e) => setNewColName(e.target.value)}
                placeholder="e.g. AI Systems & Architecture"
                className="w-full px-3 py-2 text-sm bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                value={newColDesc}
                onChange={(e) => setNewColDesc(e.target.value)}
                placeholder="What is this collection for?"
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Color
              </label>
              <div className="flex gap-2">
                {availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColor === color ? 'border-black scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 text-xs font-medium text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newColName.trim()}
                className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

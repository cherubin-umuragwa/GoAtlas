'use client';

import React, { useState } from 'react';
import { AtlasItem } from '@/types/atlas';
import { ItemCard } from '../inbox/ItemCard';
import { Camera, Upload, Copy, Check, Sparkles, Search } from 'lucide-react';

interface ScreenshotManagerProps {
  items: AtlasItem[];
  onOpenReader: (item: AtlasItem) => void;
  onToggleFavorite: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDeleteItem: (id: string) => void;
  onAddToCollection: (itemId: string, collectionId: string) => void;
  onUploadScreenshot: () => void;
}

export function ScreenshotManager({
  items,
  onOpenReader,
  onToggleFavorite,
  onToggleArchive,
  onDeleteItem,
  onAddToCollection,
  onUploadScreenshot,
}: ScreenshotManagerProps) {
  const screenshots = items.filter(
    (item) => item.type === 'screenshot' || item.type === 'image'
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div>
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-purple-600" />
            <h1 className="text-xl font-bold text-neutral-900">
              Screenshots & Visual OCR Library
            </h1>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Extract text, code, metrics, recipes, and UI design tokens from your captured screenshots.
          </p>
        </div>

        <button
          onClick={onUploadScreenshot}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Upload className="w-4 h-4" /> Upload Screenshot
        </button>
      </div>

      {/* Grid Display */}
      {screenshots.length === 0 ? (
        <div className="bg-neutral-50 border border-dashed border-neutral-200 rounded-2xl p-12 text-center max-w-md mx-auto">
          <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-neutral-800">
            No screenshots saved
          </h3>
          <p className="text-xs text-neutral-500 mt-1 mb-4">
            Upload UI dashboards, tweets, invoices, code snippets, or recipes to run automatic Gemini OCR text extraction.
          </p>
          <button
            onClick={onUploadScreenshot}
            className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700"
          >
            Upload First Screenshot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {screenshots.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#ECECEC] rounded-2xl p-5 space-y-3 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                    OCR Captured
                  </span>
                  <button
                    onClick={() => handleCopyText(item.id, item.content)}
                    className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 p-1 hover:bg-neutral-100 rounded transition-colors"
                    title="Copy extracted OCR text"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Text
                      </>
                    )}
                  </button>
                </div>

                <h3
                  onClick={() => onOpenReader(item)}
                  className="text-base font-bold text-neutral-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                >
                  {item.title}
                </h3>

                <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed font-sans">
                  {item.summary}
                </p>

                {/* OCR Snippet Box */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-3 font-mono text-[11px] text-neutral-700 max-h-24 overflow-y-auto">
                  {item.content}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div className="flex gap-1">
                  {item.tags.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-100 rounded text-neutral-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onOpenReader(item)}
                  className="px-3 py-1 bg-neutral-900 text-white text-xs font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

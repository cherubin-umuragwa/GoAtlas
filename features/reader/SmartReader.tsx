'use client';

import React, { useState, useEffect } from 'react';
import { generateId } from '@/lib/utils';
import { AtlasItem, Highlight } from '@/types/atlas';
import {
  X,
  Type,
  Sun,
  Moon,
  Highlighter,
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle2,
  ExternalLink,
  Share2,
  Bookmark,
  MessageSquare,
  ArrowLeft,
  Volume2,
} from 'lucide-react';

interface SmartReaderProps {
  item: AtlasItem | null;
  onClose: () => void;
  onUpdateItem: (item: AtlasItem) => void;
}

export function SmartReader({ item, onClose, onUpdateItem }: SmartReaderProps) {
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [lineHeight, setLineHeight] = useState<'compact' | 'normal' | 'spacious'>('normal');
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');

  const [highlights, setHighlights] = useState<Highlight[]>(item?.highlights || []);
  const [annotation, setAnnotation] = useState(item?.annotations || '');
  const [selectedText, setSelectedText] = useState('');
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [readingProgress, setReadingProgress] = useState(item?.readingProgress || 0);

  const [prevItemId, setPrevItemId] = useState(item?.id);
  if (item && item.id !== prevItemId) {
    setPrevItemId(item.id);
    setHighlights(item.highlights || []);
    setAnnotation(item.annotations || '');
    setReadingProgress(item.readingProgress || 0);
  }

  if (!item) return null;


  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const progress = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100) || 0;
    setReadingProgress(progress);

    if (progress > (item.readingProgress || 0)) {
      onUpdateItem({
        ...item,
        readingProgress: progress,
        isRead: progress >= 95,
      });
    }
  };

  const handleAddHighlight = (color: Highlight['color']) => {
    if (!selectedText) return;
    const newHl: Highlight = {
      id: generateId('hl'),
      text: selectedText,
      color,
      createdAt: new Date().toISOString(),
    };
    const updated = [...highlights, newHl];
    setHighlights(updated);
    onUpdateItem({ ...item, highlights: updated });
    setSelectedText('');
    setShowHighlightMenu(false);
  };

  const handleSaveAnnotation = () => {
    onUpdateItem({ ...item, annotations: annotation });
  };

  const getFontFamilyClass = () => {
    if (fontFamily === 'serif') return 'font-serif';
    if (fontFamily === 'mono') return 'font-mono';
    return 'font-sans';
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-sm';
    if (fontSize === 'large') return 'text-lg';
    return 'text-base';
  };

  const getLineHeightClass = () => {
    if (lineHeight === 'compact') return 'leading-snug';
    if (lineHeight === 'spacious') return 'leading-loose';
    return 'leading-relaxed';
  };

  const getThemeClass = () => {
    if (readerTheme === 'sepia') return 'bg-[#FBF0D9] text-[#2D2B2A]';
    if (readerTheme === 'dark') return 'bg-[#121212] text-[#E1E1E1]';
    return 'bg-white text-[#111111]';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex justify-end">
      <div
        className={`w-full max-w-4xl h-full flex flex-col transition-all duration-300 shadow-2xl ${getThemeClass()}`}
      >
        {/* Reader Top Bar */}
        <div className="px-6 py-4 border-b border-neutral-200/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral-200/30 transition-colors"
              title="Close Reader"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider opacity-60">
              Smart Reader • {item.type}
            </span>
          </div>

          {/* Reader Preferences Bar */}
          <div className="flex items-center gap-3">
            {/* Font Family Selector */}
            <div className="flex items-center bg-neutral-200/40 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2.5 py-1 rounded-lg font-sans font-medium transition-colors ${
                  fontFamily === 'sans' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2.5 py-1 rounded-lg font-serif font-medium transition-colors ${
                  fontFamily === 'serif' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('mono')}
                className={`px-2.5 py-1 rounded-lg font-mono font-medium transition-colors ${
                  fontFamily === 'mono' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                Mono
              </button>
            </div>

            {/* Size Selector */}
            <div className="flex items-center bg-neutral-200/40 p-1 rounded-xl text-xs">
              <button
                onClick={() => setFontSize('small')}
                className={`px-2 py-1 rounded-lg transition-colors ${
                  fontSize === 'small' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('medium')}
                className={`px-2 py-1 rounded-lg font-bold transition-colors ${
                  fontSize === 'medium' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded-lg text-sm font-bold transition-colors ${
                  fontSize === 'large' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
              >
                A+
              </button>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center bg-neutral-200/40 p-1 rounded-xl text-xs">
              <button
                onClick={() => setReaderTheme('light')}
                className={`p-1.5 rounded-lg transition-colors ${
                  readerTheme === 'light' ? 'bg-white shadow text-black' : 'opacity-70'
                }`}
                title="Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`p-1.5 rounded-lg transition-colors ${
                  readerTheme === 'sepia' ? 'bg-[#FBF0D9] text-[#2D2B2A] shadow' : 'opacity-70'
                }`}
                title="Sepia Theme"
              >
                <BookOpen className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`p-1.5 rounded-lg transition-colors ${
                  readerTheme === 'dark' ? 'bg-[#121212] text-white shadow' : 'opacity-70'
                }`}
                title="Dark Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Reading Progress Indicator Line */}
        <div className="w-full bg-neutral-200/30 h-1">
          <div
            className="bg-blue-600 h-full transition-all duration-150"
            style={{ width: `${readingProgress}%` }}
          />
        </div>

        {/* Reader Main Content Body */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-8 md:px-16 py-8 space-y-8 max-w-3xl mx-auto w-full"
        >
          {/* Header Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-xs font-mono opacity-70">
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                {item.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {item.readingTimeMinutes || 3} min read
              </span>
              {item.domain && (
                <>
                  <span>•</span>
                  <span>{item.domain}</span>
                </>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight mb-4">
              {item.title}
            </h1>

            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:underline mb-6"
              >
                Visit Source URL <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* AI Synthesis Executive Box */}
          <div className="bg-blue-50/50 border border-blue-200/80 rounded-2xl p-5 text-sm space-y-3">
            <div className="flex items-center gap-2 font-semibold text-blue-900 text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Atlas AI Executive Synthesis
            </div>
            <p className="text-neutral-800 leading-relaxed font-sans">{item.summary}</p>

            {item.keyTakeaways && item.keyTakeaways.length > 0 && (
              <ul className="space-y-1.5 pt-2 border-t border-blue-200/60 text-xs text-neutral-800 font-sans">
                {item.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Article / Content Text Body */}
          <div
            className={`prose max-w-none ${getFontFamilyClass()} ${getFontSizeClass()} ${getLineHeightClass()}`}
          >
            {item.type === 'code' ? (
              <pre className="bg-neutral-900 text-neutral-100 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-neutral-800">
                <code>{item.content}</code>
              </pre>
            ) : (
              <div className="whitespace-pre-wrap leading-relaxed space-y-4">
                {item.content}
              </div>
            )}
          </div>

          {/* User Annotation Section */}
          <div className="pt-8 border-t border-neutral-200/50 space-y-3">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Personal Notes & Commentary
            </h3>
            <textarea
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              placeholder="Add your own commentary, notes, or thoughts on this item..."
              className="w-full h-24 p-3.5 text-xs bg-neutral-100/50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans"
            />
            <button
              onClick={handleSaveAnnotation}
              className="px-3.5 py-1.5 bg-neutral-900 text-white text-xs font-medium rounded-lg hover:bg-black transition-colors"
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

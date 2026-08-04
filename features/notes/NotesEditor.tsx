'use client';

import React, { useState } from 'react';
import { generateId } from '@/lib/utils';
import { AtlasItem } from '@/types/atlas';
import {
  FileCode2,
  Bold,
  Italic,
  List,
  Code,
  Quote,
  Sparkles,
  Save,
  CheckCircle2,
  Eye,
  Edit3,
  Link2,
} from 'lucide-react';

interface NotesEditorProps {
  existingNote?: AtlasItem | null;
  allItems: AtlasItem[];
  onSaveNote: (item: AtlasItem) => void;
}

export function NotesEditor({
  existingNote,
  allItems,
  onSaveNote,
}: NotesEditorProps) {
  const [title, setTitle] = useState(existingNote?.title || '');
  const [content, setContent] = useState(existingNote?.content || '');
  const [tagsInput, setTagsInput] = useState(existingNote?.tags?.join(', ') || '');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;

    const tagsArray = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    let summaryText = content.slice(0, 150) + '...';

    // Call AI analyze endpoint for automatic summary if content > 50 chars
    try {
      if (content.length > 50) {
        const res = await fetch('/api/ai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            content,
            type: 'note',
          }),
        });
        const data = await res.json();
        if (data.data?.summary) {
          summaryText = data.data.summary;
        }
      }
    } catch {
      // ignore
    }

    const noteItem: AtlasItem = {
      id: existingNote ? existingNote.id : generateId('note'),
      title: title || 'Untitled Note',
      type: 'note',
      content,
      summary: summaryText,
      keyTakeaways: [
        'Personal Note captured in GoAtlas',
        `Length: ${content.length} characters`,
      ],
      category: 'Education',
      tags: tagsArray.length > 0 ? tagsArray : ['note', 'knowledge'],
      keywords: [],
      relatedTopics: [],
      collectionIds: existingNote?.collectionIds || [],
      readingTimeMinutes: Math.ceil(content.split(/\s+/).length / 200),
      readingProgress: 100,
      isFavorite: existingNote?.isFavorite || false,
      isArchived: false,
      isRead: true,
      createdAt: existingNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      visitCount: (existingNote?.visitCount || 0) + 1,
      author: 'Self',
    };

    onSaveNote(noteItem);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const insertFormatting = (prefix: string, suffix: string = '') => {
    setContent((prev) => `${prev}${prefix}Text${suffix}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ECECEC]">
        <div>
          <div className="flex items-center gap-2">
            <FileCode2 className="w-5 h-5 text-indigo-600" />
            <h1 className="text-xl font-bold text-neutral-900">
              GoAtlas Markdown Notes
            </h1>
          </div>
          <p className="text-xs text-neutral-500 mt-0.5">
            Craft knowledge notes with live preview, backlinks, and AI synthesis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreview(!isPreview)}
            className="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {isPreview ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isPreview ? 'Edit Mode' : 'Preview Mode'}</span>
          </button>

          <button
            onClick={handleSave}
            disabled={!title.trim() && !content.trim()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            {isSaved ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                Saved!
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                Save Note
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="bg-white border border-[#ECECEC] rounded-2xl p-6 shadow-sm space-y-4">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title (e.g. System Architecture Principles)"
          className="w-full text-xl font-bold text-neutral-900 border-b border-neutral-200 pb-2 focus:outline-none focus:border-blue-500 font-sans"
        />

        {/* Tags Input */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500 font-medium">Tags:</span>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="architecture, react, design (comma separated)"
            className="flex-1 px-3 py-1 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Toolbar */}
        {!isPreview && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700">
            <button
              onClick={() => insertFormatting('**', '**')}
              className="p-1.5 hover:bg-white rounded text-xs font-bold"
              title="Bold"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('*', '*')}
              className="p-1.5 hover:bg-white rounded text-xs italic"
              title="Italic"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('\n# ')}
              className="p-1.5 hover:bg-white rounded text-xs font-bold"
              title="Heading 1"
            >
              H1
            </button>
            <button
              onClick={() => insertFormatting('\n## ')}
              className="p-1.5 hover:bg-white rounded text-xs font-bold"
              title="Heading 2"
            >
              H2
            </button>
            <button
              onClick={() => insertFormatting('\n- ')}
              className="p-1.5 hover:bg-white rounded text-xs"
              title="Bullet List"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('```\n', '\n```')}
              className="p-1.5 hover:bg-white rounded text-xs"
              title="Code Block"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('\n> ')}
              className="p-1.5 hover:bg-white rounded text-xs"
              title="Quote"
            >
              <Quote className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => insertFormatting('[[', ']]')}
              className="p-1.5 hover:bg-white rounded text-xs text-blue-600 font-semibold"
              title="Insert Backlink [[Item]]"
            >
              <Link2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Workspace Area */}
        {isPreview ? (
          <div className="min-h-[350px] p-4 bg-neutral-50/50 border border-neutral-200 rounded-xl whitespace-pre-wrap text-sm leading-relaxed font-sans text-neutral-800">
            {content || 'Nothing to preview...'}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={14}
            placeholder="Write markdown content here... Use [[Item Title]] to create backlinks to other saved knowledge resources."
            className="w-full p-4 text-sm bg-neutral-50/30 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed"
          />
        )}
      </div>
    </div>
  );
}

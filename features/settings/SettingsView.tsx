'use client';

import React, { useState } from 'react';
import { UserSettings } from '@/types/atlas';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  HardDrive,
  Shield,
  Palette,
  CheckCircle2,
  Smartphone,
} from 'lucide-react';

interface SettingsViewProps {
  settings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onExportJSON: () => void;
  onImportJSON: (jsonStr: string) => void;
  onResetSeedData: () => void;
}

export function SettingsView({
  settings,
  onUpdateSettings,
  onExportJSON,
  onImportJSON,
  onResetSeedData,
}: SettingsViewProps) {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportJSON(content);
        setImportStatus('Data successfully imported!');
        setTimeout(() => setImportStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#ECECEC]">
        <div className="flex items-center gap-2">
          <SettingsIcon className="w-5 h-5 text-neutral-800" />
          <h1 className="text-xl font-bold text-neutral-900">
            GoAtlas Settings & System
          </h1>
        </div>
        <p className="text-xs text-neutral-500 mt-0.5">
          Manage appearance, data backups, storage meters, and AI configuration
        </p>
      </div>

      <div className="space-y-6">
        {/* Appearance & Preferences */}
        <div className="bg-white border border-[#ECECEC] rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Palette className="w-4 h-4 text-blue-600" /> Visual Theme & Reading Style
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Reader Font Family
              </label>
              <select
                value={settings.readerFont}
                onChange={(e) => onUpdateSettings({ readerFont: e.target.value as any })}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none"
              >
                <option value="sans">Inter / Geist Sans</option>
                <option value="serif">Playfair / Georgia Serif</option>
                <option value="mono">Fira Code / Geist Mono</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-neutral-700 mb-1">
                Accent Theme Color
              </label>
              <select
                value={settings.accentColor}
                onChange={(e) => onUpdateSettings({ accentColor: e.target.value as any })}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none"
              >
                <option value="blue">Electric Blue (#2563EB)</option>
                <option value="indigo">Deep Indigo (#4F46E5)</option>
                <option value="emerald">Emerald Green (#10B981)</option>
                <option value="rose">Rose Pink (#E11D48)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gemini AI Status */}
        <div className="bg-white border border-[#ECECEC] rounded-2xl p-6 space-y-3 shadow-sm">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" /> Connected Gemini AI Engine
          </h3>
          <div className="flex items-center justify-between bg-blue-50/50 border border-blue-200 p-4 rounded-xl text-xs">
            <div className="space-y-0.5">
              <span className="font-bold text-blue-900 block">
                Gemini 3.6 Flash Active
              </span>
              <p className="text-neutral-600">
                Server-side auto-tagging, OCR, audio transcription, and Atlas Chat active.
              </p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-semibold flex items-center gap-1 shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" /> Ready
            </span>
          </div>
        </div>

        {/* Storage & Data Portability */}
        <div className="bg-white border border-[#ECECEC] rounded-2xl p-6 space-y-4 shadow-sm">
          <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-emerald-600" /> Data Portability & Backup
          </h3>

          <p className="text-xs text-neutral-600 leading-relaxed">
            Your saved items are stored securely on your device using IndexedDB / LocalStorage for instant offline availability.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExportJSON}
              className="px-4 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              Export Backup (JSON)
            </button>

            <label className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition-colors">
              <Upload className="w-3.5 h-3.5" />
              Import Backup
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                className="hidden"
              />
            </label>

            <button
              onClick={() => {
                if (confirm('Reset GoAtlas library to default sample knowledge base?')) {
                  onResetSeedData();
                }
              }}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Seed Knowledge
            </button>
          </div>

          {importStatus && (
            <p className="text-xs text-emerald-600 bg-emerald-50 p-2 rounded-lg font-medium">
              {importStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import {
  AtlasItem,
  AtlasCollection,
  UserSettings,
  AtlasNotification,
} from '@/types/atlas';
import { AtlasStorage } from '@/lib/storage/atlasStorage';
import {
  INITIAL_ITEMS,
  DEFAULT_COLLECTIONS,
  DEFAULT_SETTINGS,
  INITIAL_NOTIFICATIONS,
} from '@/lib/storage/seedData';
import { SidebarNav, NavTab } from '@/components/shared/SidebarNav';
import { HeaderNav } from '@/components/shared/HeaderNav';
import { UniversalInbox } from '@/features/inbox/UniversalInbox';
import { QuickCaptureModal } from '@/features/inbox/QuickCaptureModal';
import { SmartReader } from '@/features/reader/SmartReader';
import { AtlasChat } from '@/features/ai-chat/AtlasChat';
import { UniversalSearch } from '@/features/search/UniversalSearch';
import { CollectionsView } from '@/features/collections/CollectionsView';
import { CollectionDetail } from '@/features/collections/CollectionDetail';
import { NotesEditor } from '@/features/notes/NotesEditor';
import { VoiceRecorder } from '@/features/voice/VoiceRecorder';
import { ScreenshotManager } from '@/features/screenshots/ScreenshotManager';
import { DailyDigestView } from '@/features/digest/DailyDigestView';
import { SettingsView } from '@/features/settings/SettingsView';
import { NotificationsModal } from '@/components/shared/NotificationsModal';
import { PWAInstallPrompt } from '@/features/pwa/PWAInstallPrompt';

export default function GoAtlasApp() {
  const [activeTab, setActiveTab] = useState<NavTab>('inbox');
  const [items, setItems] = useState<AtlasItem[]>(INITIAL_ITEMS);
  const [collections, setCollections] = useState<AtlasCollection[]>(DEFAULT_COLLECTIONS);
  const [notifications, setNotifications] = useState<AtlasNotification[]>(INITIAL_NOTIFICATIONS);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

  const [isQuickCaptureOpen, setIsQuickCaptureOpen] = useState(false);
  const [activeReaderItem, setActiveReaderItem] = useState<AtlasItem | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<AtlasCollection | null>(null);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);

  // Sync client localStorage after hydration mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setItems(AtlasStorage.getItems());
      setCollections(AtlasStorage.getCollections());
      setNotifications(AtlasStorage.getNotifications());
      setSettings(AtlasStorage.getSettings());
    }, 0);
    return () => clearTimeout(timer);
  }, []);


  // Handlers
  const handleSaveItem = (newItem: AtlasItem) => {
    const saved = AtlasStorage.saveItem(newItem);
    setItems(AtlasStorage.getItems());

    // Add Notification
    AtlasStorage.addNotification({
      title: 'Item Saved to GoAtlas',
      message: `"${newItem.title}" was analyzed and tagged into ${newItem.category}.`,
      type: 'recommendation',
      targetItemId: newItem.id,
    });
    setNotifications(AtlasStorage.getNotifications());
  };

  const handleDeleteItem = (id: string) => {
    AtlasStorage.deleteItem(id);
    setItems(AtlasStorage.getItems());
  };

  const handleToggleFavorite = (id: string) => {
    AtlasStorage.toggleFavorite(id);
    setItems(AtlasStorage.getItems());
  };

  const handleToggleArchive = (id: string) => {
    AtlasStorage.toggleArchive(id);
    setItems(AtlasStorage.getItems());
  };

  const handleAddToCollection = (itemId: string, collectionId: string) => {
    const item = AtlasStorage.getItemById(itemId);
    if (!item) return;

    const exists = item.collectionIds.includes(collectionId);
    let updatedColIds = [...item.collectionIds];

    if (exists) {
      updatedColIds = updatedColIds.filter((c) => c !== collectionId);
    } else {
      updatedColIds.push(collectionId);
    }

    const updatedItem = { ...item, collectionIds: updatedColIds };
    AtlasStorage.saveItem(updatedItem);
    setItems(AtlasStorage.getItems());
  };

  const handleCreateCollection = (newCol: AtlasCollection) => {
    AtlasStorage.saveCollection(newCol);
    setCollections(AtlasStorage.getCollections());
  };

  const handleDeleteCollection = (colId: string) => {
    AtlasStorage.deleteCollection(colId);
    setCollections(AtlasStorage.getCollections());
    setItems(AtlasStorage.getItems());
    setSelectedCollection(null);
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = AtlasStorage.updateSettings(newSettings);
    setSettings(updated);
  };

  const handleExportJSON = () => {
    const jsonStr = AtlasStorage.exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `goatlas-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (jsonStr: string) => {
    const ok = AtlasStorage.importDataJSON(jsonStr);
    if (ok) {
      setItems(AtlasStorage.getItems());
      setCollections(AtlasStorage.getCollections());
      setSettings(AtlasStorage.getSettings());
    }
  };

  const handleResetSeedData = () => {
    AtlasStorage.resetToDefault();
    setItems(AtlasStorage.getItems());
    setCollections(AtlasStorage.getCollections());
    setNotifications(AtlasStorage.getNotifications());
    setSettings(AtlasStorage.getSettings());
  };

  const handleOpenReader = (item: AtlasItem) => {
    AtlasStorage.recordVisit(item.id);
    setItems(AtlasStorage.getItems());
    setActiveReaderItem(item);
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row font-sans text-[#111111] antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Desktop Navigation Sidebar */}
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'collections') setSelectedCollection(null);
        }}
        onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
        itemCount={items.length}
        unreadCount={unreadNotifCount}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header */}
        <HeaderNav
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            if (tab !== 'collections') setSelectedCollection(null);
          }}
          onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
          onOpenNotifications={() => setIsNotifModalOpen(true)}
          unreadNotifCount={unreadNotifCount}
          itemCount={items.length}
        />

        {/* View Switcher */}
        <main className="flex-1 pb-16">
          {activeTab === 'inbox' && (
            <UniversalInbox
              items={items}
              collections={collections}
              onOpenQuickCapture={() => setIsQuickCaptureOpen(true)}
              onOpenReader={handleOpenReader}
              onToggleFavorite={handleToggleFavorite}
              onToggleArchive={handleToggleArchive}
              onDeleteItem={handleDeleteItem}
              onAddToCollection={handleAddToCollection}
            />
          )}

          {activeTab === 'chat' && (
            <AtlasChat items={items} onOpenReader={handleOpenReader} />
          )}

          {activeTab === 'collections' && (
            <>
              {selectedCollection ? (
                <CollectionDetail
                  collection={selectedCollection}
                  items={items}
                  allCollections={collections}
                  onBack={() => setSelectedCollection(null)}
                  onOpenReader={handleOpenReader}
                  onToggleFavorite={handleToggleFavorite}
                  onToggleArchive={handleToggleArchive}
                  onDeleteItem={handleDeleteItem}
                  onAddToCollection={handleAddToCollection}
                  onDeleteCollection={handleDeleteCollection}
                />
              ) : (
                <CollectionsView
                  collections={collections}
                  items={items}
                  onSelectCollection={(col) => setSelectedCollection(col)}
                  onCreateCollection={handleCreateCollection}
                  onDeleteCollection={handleDeleteCollection}
                />
              )}
            </>
          )}

          {activeTab === 'search' && (
            <UniversalSearch items={items} onOpenReader={handleOpenReader} />
          )}

          {activeTab === 'digest' && (
            <DailyDigestView
              items={items}
              onOpenReader={handleOpenReader}
              onToggleFavorite={handleToggleFavorite}
              onToggleArchive={handleToggleArchive}
              onDeleteItem={handleDeleteItem}
              onAddToCollection={handleAddToCollection}
            />
          )}

          {activeTab === 'notes' && (
            <NotesEditor
              allItems={items}
              onSaveNote={(noteItem) => {
                handleSaveItem(noteItem);
                setActiveTab('inbox');
              }}
            />
          )}

          {activeTab === 'voice' && (
            <VoiceRecorder
              onSaveVoiceItem={(voiceItem) => {
                handleSaveItem(voiceItem);
                setActiveTab('inbox');
              }}
            />
          )}

          {activeTab === 'screenshots' && (
            <ScreenshotManager
              items={items}
              onOpenReader={handleOpenReader}
              onToggleFavorite={handleToggleFavorite}
              onToggleArchive={handleToggleArchive}
              onDeleteItem={handleDeleteItem}
              onAddToCollection={handleAddToCollection}
              onUploadScreenshot={() => setIsQuickCaptureOpen(true)}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onExportJSON={handleExportJSON}
              onImportJSON={handleImportJSON}
              onResetSeedData={handleResetSeedData}
            />
          )}
        </main>
      </div>

      {/* Global Modals & Prompts */}
      <QuickCaptureModal
        isOpen={isQuickCaptureOpen}
        onClose={() => setIsQuickCaptureOpen(false)}
        onSaveItem={handleSaveItem}
      />

      <SmartReader
        item={activeReaderItem}
        onClose={() => setActiveReaderItem(null)}
        onUpdateItem={(updated) => {
          AtlasStorage.saveItem(updated);
          setItems(AtlasStorage.getItems());
        }}
      />

      <NotificationsModal
        isOpen={isNotifModalOpen}
        notifications={notifications}
        onClose={() => setIsNotifModalOpen(false)}
        onMarkRead={(id) => {
          AtlasStorage.markNotificationRead(id);
          setNotifications(AtlasStorage.getNotifications());
        }}
        onOpenTargetItem={(itemId) => {
          const target = items.find((i) => i.id === itemId);
          if (target) handleOpenReader(target);
        }}
      />

      <PWAInstallPrompt />
    </div>
  );
}

import { AtlasItem, AtlasCollection, UserSettings, AtlasNotification, PrimaryCategory, ItemType } from '@/types/atlas';
import { INITIAL_ITEMS, DEFAULT_COLLECTIONS, DEFAULT_SETTINGS, INITIAL_NOTIFICATIONS } from './seedData';

const ITEMS_KEY = 'goatlas_items_v1';
const COLLECTIONS_KEY = 'goatlas_collections_v1';
const SETTINGS_KEY = 'goatlas_settings_v1';
const NOTIFICATIONS_KEY = 'goatlas_notifications_v1';

export class AtlasStorage {
  private static isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  // --- ITEMS CRUD ---
  public static getItems(): AtlasItem[] {
    if (!this.isBrowser()) return INITIAL_ITEMS;
    try {
      const stored = localStorage.getItem(ITEMS_KEY);
      if (!stored) {
        localStorage.setItem(ITEMS_KEY, JSON.stringify(INITIAL_ITEMS));
        return INITIAL_ITEMS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_ITEMS;
    }
  }

  public static getItemById(id: string): AtlasItem | null {
    const items = this.getItems();
    return items.find((item) => item.id === id) || null;
  }

  public static saveItem(item: AtlasItem): AtlasItem {
    const items = this.getItems();
    const index = items.findIndex((i) => i.id === item.id);
    let updatedItems: AtlasItem[];

    if (index >= 0) {
      updatedItems = [...items];
      updatedItems[index] = { ...item, updatedAt: new Date().toISOString() };
    } else {
      updatedItems = [item, ...items];
    }

    if (this.isBrowser()) {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(updatedItems));
    }
    return item;
  }

  public static deleteItem(id: string): boolean {
    const items = this.getItems();
    const filtered = items.filter((i) => i.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(filtered));
    }
    return true;
  }

  public static updateProgress(id: string, progress: number): void {
    const item = this.getItemById(id);
    if (item) {
      item.readingProgress = Math.min(100, Math.max(0, progress));
      item.isRead = progress >= 95;
      this.saveItem(item);
    }
  }

  public static recordVisit(id: string): void {
    const item = this.getItemById(id);
    if (item) {
      item.visitCount = (item.visitCount || 0) + 1;
      item.lastVisitedAt = new Date().toISOString();
      this.saveItem(item);
    }
  }

  public static toggleFavorite(id: string): boolean {
    const item = this.getItemById(id);
    if (item) {
      item.isFavorite = !item.isFavorite;
      this.saveItem(item);
      return item.isFavorite;
    }
    return false;
  }

  public static toggleArchive(id: string): boolean {
    const item = this.getItemById(id);
    if (item) {
      item.isArchived = !item.isArchived;
      this.saveItem(item);
      return item.isArchived;
    }
    return false;
  }

  // --- COLLECTIONS CRUD ---
  public static getCollections(): AtlasCollection[] {
    if (!this.isBrowser()) return DEFAULT_COLLECTIONS;
    try {
      const stored = localStorage.getItem(COLLECTIONS_KEY);
      if (!stored) {
        localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
        return DEFAULT_COLLECTIONS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_COLLECTIONS;
    }
  }

  public static saveCollection(collection: AtlasCollection): AtlasCollection {
    const collections = this.getCollections();
    const index = collections.findIndex((c) => c.id === collection.id);
    let updated: AtlasCollection[];

    if (index >= 0) {
      updated = [...collections];
      updated[index] = collection;
    } else {
      updated = [...collections, collection];
    }

    if (this.isBrowser()) {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(updated));
    }
    return collection;
  }

  public static deleteCollection(id: string): void {
    const collections = this.getCollections().filter((c) => c.id !== id);
    if (this.isBrowser()) {
      localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(collections));
    }

    // Remove collection ID from items
    const items = this.getItems().map((item) => ({
      ...item,
      collectionIds: item.collectionIds.filter((colId) => colId !== id),
    }));
    if (this.isBrowser()) {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(items));
    }
  }

  // --- SETTINGS CRUD ---
  public static getSettings(): UserSettings {
    if (!this.isBrowser()) return DEFAULT_SETTINGS;
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (!stored) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
        return DEFAULT_SETTINGS;
      }
      return JSON.parse(stored);
    } catch {
      return DEFAULT_SETTINGS;
    }
  }

  public static updateSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    if (this.isBrowser()) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    }
    return updated;
  }

  // --- NOTIFICATIONS CRUD ---
  public static getNotifications(): AtlasNotification[] {
    if (!this.isBrowser()) return INITIAL_NOTIFICATIONS;
    try {
      const stored = localStorage.getItem(NOTIFICATIONS_KEY);
      if (!stored) {
        localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
        return INITIAL_NOTIFICATIONS;
      }
      return JSON.parse(stored);
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  }

  public static markNotificationRead(id: string): void {
    const notifs = this.getNotifications().map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    if (this.isBrowser()) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifs));
    }
  }

  public static addNotification(notif: Omit<AtlasNotification, 'id' | 'createdAt' | 'read'>): void {
    const notifs = this.getNotifications();
    const newNotif: AtlasNotification = {
      ...notif,
      id: `notif-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    if (this.isBrowser()) {
      localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([newNotif, ...notifs]));
    }
  }

  // --- ADVANCED SEARCH & FILTERING ---
  public static searchItems(query: string, options?: {
    category?: PrimaryCategory | 'All';
    type?: ItemType | 'All';
    collectionId?: string;
    onlyFavorites?: boolean;
    onlyArchived?: boolean;
    tag?: string;
  }): AtlasItem[] {
    let items = this.getItems();

    if (options?.onlyArchived) {
      items = items.filter((i) => i.isArchived);
    } else {
      items = items.filter((i) => !i.isArchived);
    }

    if (options?.onlyFavorites) {
      items = items.filter((i) => i.isFavorite);
    }

    if (options?.category && options.category !== 'All') {
      items = items.filter((i) => i.category === options.category);
    }

    if (options?.type && options.type !== 'All') {
      items = items.filter((i) => i.type === options.type);
    }

    if (options?.collectionId) {
      items = items.filter((i) => i.collectionIds.includes(options.collectionId!));
    }

    if (options?.tag) {
      const lowerTag = options.tag.toLowerCase();
      items = items.filter((i) => i.tags.some((t) => t.toLowerCase() === lowerTag));
    }

    if (!query || !query.trim()) return items;

    const q = query.toLowerCase().trim();
    return items.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchContent = item.content.toLowerCase().includes(q);
      const matchDomain = item.domain?.toLowerCase().includes(q);
      const matchAuthor = item.author?.toLowerCase().includes(q);
      const matchCategory = item.category.toLowerCase().includes(q);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(q));
      const matchKeywords = item.keywords.some((k) => k.toLowerCase().includes(q));
      const matchTakeaways = item.keyTakeaways.some((k) => k.toLowerCase().includes(q));

      return (
        matchTitle ||
        matchSummary ||
        matchContent ||
        matchDomain ||
        matchAuthor ||
        matchCategory ||
        matchTags ||
        matchKeywords ||
        matchTakeaways
      );
    });
  }

  // --- RESET & EXPORT / IMPORT ---
  public static resetToDefault(): void {
    if (!this.isBrowser()) return;
    localStorage.setItem(ITEMS_KEY, JSON.stringify(INITIAL_ITEMS));
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(DEFAULT_COLLECTIONS));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
  }

  public static exportDataJSON(): string {
    const data = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      items: this.getItems(),
      collections: this.getCollections(),
      settings: this.getSettings(),
    };
    return JSON.stringify(data, null, 2);
  }

  public static importDataJSON(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (Array.isArray(data.items)) {
        localStorage.setItem(ITEMS_KEY, JSON.stringify(data.items));
      }
      if (Array.isArray(data.collections)) {
        localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(data.collections));
      }
      if (data.settings) {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(data.settings));
      }
      return true;
    } catch {
      return false;
    }
  }
}

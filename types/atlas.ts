export type ItemType = 
  | 'link' 
  | 'article' 
  | 'video' 
  | 'screenshot' 
  | 'pdf' 
  | 'note' 
  | 'voice' 
  | 'image' 
  | 'code';

export type PrimaryCategory = 
  | 'Programming'
  | 'Business'
  | 'Design'
  | 'Finance'
  | 'Travel'
  | 'Health'
  | 'Recipes'
  | 'Shopping'
  | 'Education'
  | 'Entertainment'
  | 'General';

export interface Highlight {
  id: string;
  text: string;
  note?: string;
  color: 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
  createdAt: string;
}

export interface AtlasItem {
  id: string;
  title: string;
  type: ItemType;
  url?: string;
  domain?: string;
  content: string; // Article text, note markdown, transcript, OCR text
  summary: string;
  keyTakeaways: string[];
  category: PrimaryCategory;
  tags: string[];
  keywords: string[];
  relatedTopics: string[];
  collectionIds: string[];
  mediaUrl?: string; // Data URL or external link for audio/screenshot/PDF preview
  fileSize?: string;
  readingTimeMinutes?: number;
  readingProgress?: number; // 0 to 100
  highlights?: Highlight[];
  annotations?: string;
  backlinks?: string[]; // Referenced AtlasItem IDs
  isFavorite: boolean;
  isArchived: boolean;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  lastVisitedAt?: string;
  visitCount: number;
  author?: string;
  thumbnail?: string;
}

export interface AtlasCollection {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: string;
  isAiSuggested?: boolean;
  createdAt: string;
}

export interface AtlasNotification {
  id: string;
  title: string;
  message: string;
  type: 'revisit' | 'recommendation' | 'collection' | 'sync';
  createdAt: string;
  read: boolean;
  targetItemId?: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  accentColor: 'blue' | 'indigo' | 'emerald' | 'violet' | 'amber' | 'rose';
  readerFont: 'sans' | 'serif' | 'mono';
  readerFontSize: 'small' | 'medium' | 'large';
  readerLineHeight: 'compact' | 'normal' | 'spacious';
  autoAiTagging: boolean;
  dailyDigestEnabled: boolean;
  offlineSync: boolean;
  storageUsedBytes: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citedItemIds?: string[];
}

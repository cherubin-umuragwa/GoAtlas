import { AtlasItem, AtlasCollection, UserSettings, AtlasNotification } from '@/types/atlas';

export const DEFAULT_COLLECTIONS: AtlasCollection[] = [
  {
    id: 'col-tech',
    name: 'Systems & Engineering',
    description: 'High-performance computing, distributed systems, and frontend frameworks',
    icon: 'Cpu',
    color: '#2563eb',
    isAiSuggested: false,
    createdAt: '2026-07-01T10:00:00Z',
  },
  {
    id: 'col-startups',
    name: 'Startups & Strategy',
    description: 'Pitch decks, product-market fit, unit economics, and founder playbooks',
    icon: 'Sparkles',
    color: '#7c3aed',
    isAiSuggested: false,
    createdAt: '2026-07-02T10:00:00Z',
  },
  {
    id: 'col-design',
    name: 'Design & Craft',
    description: 'Editorial layouts, micro-interactions, typography, and design tokens',
    icon: 'Palette',
    color: '#ec4899',
    isAiSuggested: false,
    createdAt: '2026-07-05T10:00:00Z',
  },
  {
    id: 'col-ai',
    name: 'AI & Cognitive Science',
    description: 'LLM reasoning patterns, vector search, and second brain methodologies',
    icon: 'Lightbulb',
    color: '#10b981',
    isAiSuggested: true,
    createdAt: '2026-07-10T10:00:00Z',
  },
  {
    id: 'col-lifestyle',
    name: 'Health & Culinary Arts',
    description: 'Circadian protocols, sourdough masterclasses, and longevity science',
    icon: 'Utensils',
    color: '#f59e0b',
    isAiSuggested: true,
    createdAt: '2026-07-12T10:00:00Z',
  },
];

export const INITIAL_ITEMS: AtlasItem[] = [
  {
    id: 'item-1',
    title: 'Next.js 15 App Router Architecture & Server Actions Guide',
    type: 'article',
    url: 'https://nextjs.org/blog/next-15-architecture',
    domain: 'nextjs.org',
    content: `The Next.js 15 App Router introduces React 19 Compiler support, Async Request APIs, and improved Server Action caching models. By shifting rendering logic to edge and server runtimes, client bundle sizes drop dramatically. Key architectural takeaways include separating server components for data fetching from small interactive client leaves, utilizing React Suspense boundaries for streaming, and relying on native fetch revalidation tags.`,
    summary: 'Comprehensive breakdown of Next.js 15 App Router architectural patterns, React 19 compiler optimization, and async request handling.',
    keyTakeaways: [
      'Shift heavy computation and data fetching to React Server Components',
      'Use granular Suspense boundaries to stream dynamic sections',
      'Leverage Server Actions with optimistic UI updates for instant feedback'
    ],
    category: 'Programming',
    tags: ['Next.js', 'React 19', 'Frontend', 'TypeScript', 'Performance'],
    keywords: ['App Router', 'Server Actions', 'Suspense', 'Compiler', 'Optimization'],
    relatedTopics: ['Web Engineering', 'React Architecture', 'Server Rendering'],
    collectionIds: ['col-tech'],
    readingTimeMinutes: 6,
    readingProgress: 45,
    highlights: [
      {
        id: 'hl-1',
        text: 'Separating server components for data fetching from small interactive client leaves drops bundle sizes by 60%.',
        note: 'Crucial for mobile load time benchmark',
        color: 'blue',
        createdAt: '2026-07-15T14:20:00Z'
      }
    ],
    isFavorite: true,
    isArchived: false,
    isRead: false,
    createdAt: '2026-07-15T12:00:00Z',
    updatedAt: '2026-07-15T14:20:00Z',
    lastVisitedAt: '2026-08-01T09:30:00Z',
    visitCount: 5,
    author: 'Vercel Engineering Team'
  },
  {
    id: 'item-2',
    title: 'How Y Combinator Evaluates Startup Pitch Decks in 2026',
    type: 'video',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    domain: 'youtube.com',
    content: `In this talk, YC Group Partners dissect 1,000+ pitch decks to reveal the exact metrics that trigger seed term sheets. The key focus: clarity over buzzwords. Slide 1 must state the problem in plain English. Slide 2 demonstrates organic traction (MoM growth > 20%). Slide 3 highlights team unfair advantages. Avoid complex 10-year financial forecasts; focus instead on unit economics and customer acquisition loops.`,
    summary: 'YC Partners analyze successful seed pitch decks, stressing concise problem statements, proof of MoM traction, and clear unit economics.',
    keyTakeaways: [
      'Slide 1 must explain what you build in simple, jargon-free English',
      'Demonstrate 20%+ MoM organic growth before seeking institutional capital',
      'Emphasize founder-market fit and unfair distribution advantages'
    ],
    category: 'Business',
    tags: ['Startups', 'Venture Capital', 'YC', 'Pitch Deck', 'Fundraising'],
    keywords: ['Y Combinator', 'Metrics', 'Traction', 'Valuation', 'Term Sheet'],
    relatedTopics: ['Fundraising', 'Product Market Fit', 'Founder Strategy'],
    collectionIds: ['col-startups'],
    readingTimeMinutes: 12,
    readingProgress: 100,
    isFavorite: true,
    isArchived: false,
    isRead: true,
    createdAt: '2026-07-18T16:00:00Z',
    updatedAt: '2026-07-18T16:00:00Z',
    lastVisitedAt: '2026-07-28T18:00:00Z',
    visitCount: 8,
    author: 'Y Combinator'
  },
  {
    id: 'item-3',
    title: 'Generative AI Systems Architecture & Latency Benchmark.pdf',
    type: 'pdf',
    url: 'https://arxiv.org/pdf/sample-ai-latency.pdf',
    domain: 'arxiv.org',
    content: `PDF Document Analysis:
Title: Sub-50ms Latency Strategies for Real-Time LLM Inference
Authors: Dr. Elena Rostova, Marcus Thorne (DeepMind)
Abstract: As generative AI applications shift to interactive voice and real-time co-pilots, token generation latency becomes the primary bottleneck. We benchmark KV-cache compression, speculative decoding with small draft models, and FP8 quantization across GPU clusters.
Findings: Speculative decoding reduces time-to-first-token (TTFT) by 3.2x without sacrificing response perplexity.`,
    summary: 'Research paper detailing sub-50ms inference optimization strategies for LLM systems via speculative decoding and FP8 quantization.',
    keyTakeaways: [
      'Speculative decoding improves TTFT by 320% using small draft models',
      'FP8 quantization saves GPU VRAM while maintaining output quality',
      'KV-cache compression is vital for long-context multi-turn conversations'
    ],
    category: 'Education',
    tags: ['AI', 'LLM', 'Latency', 'System Design', 'GPUs', 'Research'],
    keywords: ['Speculative Decoding', 'FP8', 'KV Cache', 'Benchmark', 'Inference'],
    relatedTopics: ['Machine Learning', 'Systems Research', 'AI Performance'],
    collectionIds: ['col-ai', 'col-tech'],
    readingTimeMinutes: 15,
    readingProgress: 20,
    isFavorite: false,
    isArchived: false,
    isRead: false,
    createdAt: '2026-07-20T09:15:00Z',
    updatedAt: '2026-07-20T09:15:00Z',
    lastVisitedAt: '2026-07-30T11:00:00Z',
    visitCount: 3,
    author: 'Dr. Elena Rostova & Marcus Thorne'
  },
  {
    id: 'item-4',
    title: 'Clean Minimal B2B Analytics Dashboard UI Reference',
    type: 'screenshot',
    domain: 'dribbble.com',
    content: `OCR Extracted Text from Screenshot:
[Analytics Workspace 2026]
Monthly Recurring Revenue: $142,850 (+18.4% vs last month)
Active Organizations: 2,410 | Net Churn: 0.8%
Conversion Funnel:
- Organic Visitors: 84,200
- Free Trial Signups: 3,120 (3.7%)
- Paid Conversions: 480 (15.3%)
Design Tokens:
Font: Inter Display 600 / Geist Mono
Background: #FAFAFA, Primary: #111111, Accent: #2563EB
Borders: 1px solid #ECECEC, Radius: 12px`,
    summary: 'UI Screenshot with OCR text extraction showing SaaS revenue analytics, conversion funnels, and precise design system tokens.',
    keyTakeaways: [
      'High-contrast layout with pure white surface cards on warm off-white background',
      'Typography pairing: Inter Display for numerical metrics + Geist Mono for values',
      'Key metrics highlighted with clean percentage pill badges'
    ],
    category: 'Design',
    tags: ['UI Design', 'Design System', 'Dashboard', 'Typography', 'SaaS', 'OCR'],
    keywords: ['Analytics', 'MRR', 'Conversion', 'Design Tokens', 'Metrics'],
    relatedTopics: ['Product Design', 'Visual Hierarchy', 'Frontend UX'],
    collectionIds: ['col-design'],
    readingTimeMinutes: 3,
    readingProgress: 100,
    isFavorite: true,
    isArchived: false,
    isRead: true,
    createdAt: '2026-07-22T11:45:00Z',
    updatedAt: '2026-07-22T11:45:00Z',
    visitCount: 6,
    author: 'Design Digest'
  },
  {
    id: 'item-5',
    title: 'Building a Second Brain for the AI Era - Philosophical Framework',
    type: 'note',
    content: `# Building a Second Brain in the AI Era

Traditional bookmarking failed because humans are bad at manual categorization under cognitive load. The future of personal knowledge management relies on **Automated Semantic Retrieval**.

## Core Pillars
1. **Zero-Friction Ingestion**: If saving takes more than 1 click, you won't do it.
2. **Contextual Synthesizing**: Every saved item must generate key takeaways and keywords automatically.
3. **Conversational Interrogation**: Ask your second brain questions in natural language instead of hunting through folder trees.

## Backlinks & Connections
- Linked to [[item-1]] for technical implementation of local caching
- Linked to [[item-3]] for AI inference speed consideration

> "Knowledge is not what you store; it is what you can recall and connect at the speed of thought."`,
    summary: 'A personal note exploring the transition from manual folder hierarchies to AI-assisted automatic indexing and natural language retrieval.',
    keyTakeaways: [
      'Eliminate friction during capture so items are actually saved',
      'Rely on automated AI tag/summary synthesis instead of nested folder structures',
      'Query knowledge conversationally via semantic vector embeddings'
    ],
    category: 'Education',
    tags: ['PKM', 'Notes', 'Productivity', 'Mindset', 'AI Philosophy'],
    keywords: ['Second Brain', 'Knowledge Graph', 'Backlinks', 'Semantic Search'],
    relatedTopics: ['Personal Growth', 'Information Architecture', 'Productivity Systems'],
    collectionIds: ['col-ai'],
    readingTimeMinutes: 4,
    readingProgress: 100,
    backlinks: ['item-1', 'item-3'],
    isFavorite: true,
    isArchived: false,
    isRead: true,
    createdAt: '2026-07-25T08:30:00Z',
    updatedAt: '2026-07-26T10:00:00Z',
    visitCount: 12,
    author: 'Self'
  },
  {
    id: 'item-6',
    title: 'Voice Recording: Key Insights on Distributed Database Consensus Rules',
    type: 'voice',
    content: `Audio Transcription (Recorded 3 mins ago):
"Hey, recording a quick thought on Raft vs Paxos. The fundamental insight is that Raft was designed specifically for understandability. It decomposes consensus into leader election, log replication, and safety guarantees. In a distributed key-value store, always ensure heartbeats occur at a frequency smaller than the election timeout—typically 150ms to 300ms. If network partitions occur, the majority quorum guarantees data consistency."`,
    summary: 'Voice memo transcribing technical notes on Raft consensus algorithm, leader heartbeats, log replication, and network partition safety.',
    keyTakeaways: [
      'Raft breaks down consensus into leader election, log replication, and safety rules',
      'Heartbeats must fire faster than election timeouts (150ms-300ms range)',
      'Majority quorums prevent split-brain issues during network partitions'
    ],
    category: 'Programming',
    tags: ['Databases', 'Raft', 'Distributed Systems', 'Voice Memo', 'Consensus'],
    keywords: ['Paxos', 'Raft', 'Leader Election', 'Quorum', 'Partition'],
    relatedTopics: ['Backend Infrastructure', 'System Architecture', 'Storage Engines'],
    collectionIds: ['col-tech'],
    readingTimeMinutes: 2,
    readingProgress: 100,
    isFavorite: false,
    isArchived: false,
    isRead: true,
    createdAt: '2026-07-28T14:10:00Z',
    updatedAt: '2026-07-28T14:10:00Z',
    visitCount: 2,
    author: 'Voice Recording'
  },
  {
    id: 'item-7',
    title: 'Authentic 72-Hour Fermented Neapolitan Pizza Dough Masterclass',
    type: 'article',
    url: 'https://www.pizzamaking.com/forum/index.php?topic=72hr',
    domain: 'pizzamaking.com',
    content: `Ingredients for 4 Dough Balls (65% Hydration):
- 600g Caputo Tipo 00 Flour (12.5% protein)
- 390g Cold Water (65%)
- 18g Fine Sea Salt (3%)
- 0.6g Instant Dry Yeast (0.1%)

Method:
1. Autolyse flour and 90% water for 30 minutes.
2. Dissolve yeast in remaining water and combine.
3. Add salt during last 2 minutes of kneading until dough reaches 23°C (73°F).
4. Bulk ferment 2 hours room temp, then 72 hours in refrigerator at 4°C.
5. Ball dough 4 hours prior to baking in a 450°C (850°F) wood-fired or pizza steel oven.`,
    summary: 'Master formula and step-by-step fermentation schedule for high-hydration authentic Neapolitan pizza dough.',
    keyTakeaways: [
      '65% hydration combined with autolyse yields extensible, bubbly crust',
      'Cold fermentation for 72 hours develops complex lactic acid flavors',
      'Precision temperature control ensures optimal gluten structure'
    ],
    category: 'Recipes',
    tags: ['Cooking', 'Pizza', 'Italian', 'Fermentation', 'Baking', 'Recipes'],
    keywords: ['Hydration', 'Tipo 00', 'Neapolitan', 'Autolyse', 'Yeast'],
    relatedTopics: ['Culinary Arts', 'Fermentation Science', 'Baking Protocols'],
    collectionIds: ['col-lifestyle'],
    readingTimeMinutes: 5,
    readingProgress: 80,
    isFavorite: true,
    isArchived: false,
    isRead: true,
    createdAt: '2026-07-29T18:00:00Z',
    updatedAt: '2026-07-29T18:00:00Z',
    visitCount: 7,
    author: 'Chef Marco'
  },
  {
    id: 'item-8',
    title: 'Modern Portfolio Theory & Multi-Asset Risk Mitigation in Volatile Markets',
    type: 'link',
    url: 'https://www.bloomberg.com/opinion/articles/portfolio-theory-2026',
    domain: 'bloomberg.com',
    content: `An analysis of modern portfolio allocation strategies combining traditional equities, inflation-hedged commodities, short-duration treasury yields, and systematic trend-following funds. Diversification across uncorrelated assets reduces portfolio drawdown during macroeconomic shifts while maintaining compound growth metrics.`,
    summary: 'Financial overview of multi-asset portfolio diversification and systematic trend-following to hedge market drawdown risks.',
    keyTakeaways: [
      'Uncorrelated asset classes buffer portfolios against sudden market volatility',
      'Short-duration yields provide liquidity during high interest rate regimes',
      'Systematic rebalancing locks in gains and enforces discipline'
    ],
    category: 'Finance',
    tags: ['Finance', 'Investing', 'Portfolio', 'Economics', 'Hedging'],
    keywords: ['Asset Allocation', 'Drawdown', 'Trend Following', 'Treasuries', 'Markets'],
    relatedTopics: ['Wealth Management', 'Financial Planning', 'Macroeconomics'],
    collectionIds: [],
    readingTimeMinutes: 7,
    readingProgress: 0,
    isFavorite: false,
    isArchived: false,
    isRead: false,
    createdAt: '2026-07-30T09:00:00Z',
    updatedAt: '2026-07-30T09:00:00Z',
    visitCount: 1,
    author: 'Bloomberg Wealth'
  }
];

export const INITIAL_NOTIFICATIONS: AtlasNotification[] = [
  {
    id: 'notif-1',
    title: 'Morning Rediscovery',
    message: 'You saved "Next.js 15 App Router Architecture" 2 weeks ago. Continue reading where you left off!',
    type: 'revisit',
    createdAt: '2026-08-02T07:00:00Z',
    read: false,
    targetItemId: 'item-1',
  },
  {
    id: 'notif-2',
    title: 'AI Collection Suggestion',
    message: 'Atlas created a new collection "Systems & Engineering" based on your 3 recent saved technical guides.',
    type: 'collection',
    createdAt: '2026-08-01T15:30:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    title: 'Offline Sync Ready',
    message: 'All 8 saved items, summaries, and transcripts are cached locally for offline reading.',
    type: 'sync',
    createdAt: '2026-07-31T12:00:00Z',
    read: true,
  },
];

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'light',
  accentColor: 'blue',
  readerFont: 'sans',
  readerFontSize: 'medium',
  readerLineHeight: 'normal',
  autoAiTagging: true,
  dailyDigestEnabled: true,
  offlineSync: true,
  storageUsedBytes: 428000,
};

# GoAtlas Personal Knowledge Engine — System Architecture & Documentation

## 1. System Overview

**GoAtlas** is a personal digital universe and knowledge engine designed to capture, organize, analyze, and synthesize personal information—including web articles, notes, code snippets, voice memos, and images—into an intelligent, accessible second brain.

Built with a **Feature-Based Modular Architecture** on **Next.js 15 (App Router)** and **TypeScript**, GoAtlas adheres to modern design principles: minimal editorial layout, high-contrast light typography, responsive spacing, instant feedback, and strict privacy by running all AI operations through server-side API routes.

---

## 2. Directory Structure & Modular Architecture

The codebase follows a clean feature-isolated layout under `/features`, preventing monolith accumulation in shared component directories:

```
├── app/                      # Next.js App Router (pages & server API routes)
│   ├── api/ai/               # Secure server-side proxy routes for Gemini & Scraper
│   │   ├── analyze/          # AI article metadata, tag & takeaway analysis
│   │   ├── chat/             # Personal library Q&A / RAG assistant
│   │   ├── ocr/              # Image text extraction (Gemini Vision)
│   │   ├── recommend/        # Weekly digest & pattern synthesis
│   │   ├── scrape/           # Full-text web scraping (Readability + JSDOM)
│   │   └── transcript/       # Voice recording audio transcription
│   ├── favicon.ico
│   ├── globals.css           # Tailwind CSS v4 setup
│   ├── layout.tsx            # Root HTML layout with viewport & PWA headers
│   ├── manifest.json         # Progressive Web App manifest definition
│   └── page.tsx              # Main application hub & state orchestrator
├── features/                 # Modular feature domains
│   ├── ai-chat/              # Personal Atlas Assistant chat component
│   ├── collections/          # Folder collections & hierarchy manager
│   ├── digest/               # AI weekly knowledge digest & insights view
│   ├── inbox/                # Universal Quick Capture modal & inbox feed
│   ├── notes/                # Markdown note editor component
│   ├── pwa/                  # PWA installation banner & prompt handlers
│   ├── reader/               # Distraction-free reader view with RSVP & TTS
│   ├── screenshots/          # OCR visual library & image text extractors
│   ├── search/               # Global search bar & category filters
│   ├── settings/             # System settings, data import/export
│   └── voice/                # Audio recording engine & transcript modal
├── lib/                      # Shared core utilities & engines
│   ├── gemini.ts             # Google Gen AI SDK client initializer
│   ├── scraper.ts            # Server-side HTML fetcher & Mozilla Readability parser
│   ├── storage/              # LocalStorage persistence engine with seed data
│   └── utils.ts              # Helper functions (cn merge, unique ID generator)
├── types/                    # Shared TypeScript interfaces & types
└── public/                   # Static assets & PWA icons
```

---

## 3. Feature Breakdown & Implementation Logic

### 3.1. Universal Quick Capture (`features/inbox/QuickCaptureModal.tsx`)
* **Logic**: Acts as the primary entry point for capturing content into GoAtlas. Supports four input modes:
  1. **URL**: Accepts website links. Sends requests to `/api/ai/analyze`, triggering server-side scraping and Gemini metadata generation.
  2. **Note**: Rich markdown note input with live auto-titling and category tag detection.
  3. **Code**: Code snippet capture supporting language selection, syntax labeling, and auto-generated summaries.
  4. **Upload / Screenshot**: Image and file drag-and-drop. Sends images to `/api/ai/ocr` for OCR text extraction via Gemini.
* **Tag & Metadata Detection**: Automatically assigns primary categories (*Programming, Business, Design, Finance, Travel, Health, Recipes, Shopping, Education, Entertainment, General*) and tags.

### 3.2. Full-Text Web Scraper (`lib/scraper.ts` & `/api/ai/scrape/route.ts`)
* **Logic**: When a URL is submitted, standard meta tags often fall short for long-form reading. The scraper system:
  1. Issues a server-side `fetch` with browser User-Agent headers and a 12-second abort signal timeout.
  2. Parses raw HTML into a Virtual DOM using `jsdom`.
  3. Executes `@mozilla/readability` to isolate the core article content from clutter, sidebars, navigation bars, and ads.
  4. Formats clean text paragraphs and extracts article title, author byline, site name, domain, and estimated reading time.
  5. Provides full-text body content directly to the **Smart Reader** and the **Gemini Analyzer**.

### 3.3. Smart Distraction-Free Reader (`features/reader/SmartReader.tsx`)
* **Logic**: Provides an editorial reading canvas for saved web links and notes.
* **Key Capabilities**:
  * **Typographical Controls**: Font size adjustment, font family toggle (Serif vs. Sans), and column width formatting.
  * **Text Highlighting Engine**: Allows users to select text ranges and save highlighted excerpts in custom colors (Yellow, Green, Blue, Purple).
  * **RSVP Speed Reader**: Rapid Serial Visual Presentation mode that displays text word-by-word at customizable WPM (Words Per Minute: 200–600 WPM) to boost reading comprehension speed.
  * **Text-to-Speech (TTS)**: Web Speech API synthesis integration allowing users to listen to full articles hands-free.

### 3.4. Atlas Intelligence RAG Assistant (`features/ai-chat/AtlasChat.tsx` & `/api/ai/chat/route.ts`)
* **Logic**: Provides conversational Q&A over the user’s personal knowledge base.
* **Integration**:
  1. Gathers all user items stored in the system.
  2. Compiles a compressed context payload containing item titles, categories, keywords, and excerpts.
  3. Sends user prompt + knowledge context to Gemini (`gemini-3.6-flash`).
  4. Receives grounded responses with cited item IDs, allowing direct inline links back to saved items.

### 3.5. Weekly AI Knowledge Digest (`features/digest/AtlasDigest.tsx` & `/api/ai/recommend/route.ts`)
* **Logic**: Analyzes saved items collected over time to generate actionable insights and recurring topics.
* **Output**: Identifies top learning themes, projects worth building, connections between disparate links, and suggests unread items to catch up on.

### 3.6. Voice Note Recorder (`features/voice/VoiceRecorder.tsx` & `/api/ai/transcript/route.ts`)
* **Logic**: Records audio using the browser's native `MediaRecorder` API.
* **AI Cleanup**: Passes base64-encoded audio or text raw transcripts to `/api/ai/transcript`, producing a clean title, formatted bullet points, key takeaways, and action items.

### 3.7. Offline Storage Engine (`lib/storage/atlasStorage.ts`)
* **Logic**: Implemented as a robust client-side storage module wrapping `localStorage` with initial seed data loading, JSON validation, and error fallback.
* **Hydration**: State is initialized lazily via initializer functions (`useState(() => AtlasStorage.getItems())`) to prevent re-render state cascading.

---

## 4. Integration Architecture & Data Flow

```
[ User Input / URL / Voice / Image ]
                 │
                 ▼
      [ Client Component UI ]
                 │
                 │ POST JSON Payload
                 ▼
   [ Next.js API Routes /api/ai/* ]
        │                    │
        │ Fetch & Scrape     │ Prompt + Content
        ▼                    ▼
[ Readability / JSDOM ]   [ Google Gen AI SDK ]
        │                    │ (gemini-3.6-flash)
        └──────────┬─────────┘
                   │ Structured JSON Response
                   ▼
       [ Client State & Storage ]
         (AtlasStorage / State)
                   │
                   ▼
     [ Reactive UI Component Update ]
```

---

## 5. Future Enhancement Roadmap

While the system is fully functional, the following architectural upgrades are recommended for enterprise scale:

1. **Persistent Cloud Database Integration**:
   - Replace `localStorage` with **Firebase Firestore** or **Cloud SQL (PostgreSQL)** via **Drizzle ORM** for cross-device sync and multi-user accounts.
2. **Vector Embeddings & Semantic Search**:
   - Integrate vector embeddings (e.g., Gemini `text-embedding-004`) stored in pgvector to enable semantic search across hundreds of scraped full-text article bodies.
3. **Browser Extension**:
   - Develop a Chrome/Firefox extension using standard Manifest V3 to allow 1-click URL clipping directly into GoAtlas.
4. **Authentication & Multi-Tenancy**:
   - Implement **Clerk** or **NextAuth.js** to isolate personal knowledge bases per user account securely.

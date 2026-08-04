# GoAtlas — Vercel Deployment & Environment Configuration Guide

This guide provides step-by-step instructions for deploying the **GoAtlas** repository to **Vercel** (or similar serverless Next.js hosts), configuring environment variables, and verifying post-deployment functionality.

---

## 1. Prerequisites

Before starting deployment, ensure you have:

1. A **GitHub**, **GitLab**, or **Bitbucket** account containing the GoAtlas codebase.
2. A **Vercel** account ([https://vercel.com](https://vercel.com)).
3. A **Google AI Studio API Key** for Gemini AI operations ([https://aistudio.google.com](https://aistudio.google.com)).
4. **Node.js 20+** installed locally if testing before deployment.

---

## 2. Environment Variables Specification

GoAtlas uses server-side environment variables to perform AI operations and set self-referential links securely. **None of these variables should be prefixed with `NEXT_PUBLIC_`**, as they contain server secrets or private configuration.

| Environment Variable | Required? | Description | Example / Format |
| :--- | :--- | :--- | :--- |
| `GEMINI_API_KEY` | **Yes** | Your Google Gemini API key used by the `@google/genai` SDK for content analysis, Q&A chat, transcription, and OCR. | `AIzaSyB...` |
| `APP_URL` | **Yes** | The canonical public web URL of your deployed application. Used for absolute API references and PWA metadata. | `https://go-atlas.vercel.app` |

---

## 3. How to Obtain Required Credentials

### 3.1. Obtaining `GEMINI_API_KEY`
1. Navigate to **Google AI Studio**: [https://aistudio.google.com](https://aistudio.google.com).
2. Sign in with your Google Account.
3. Click on **Get API Key** in the top-left sidebar or navigation header.
4. Click **Create API Key**.
5. Select or create a Google Cloud project to associate with your key.
6. Copy the generated API key string (e.g., `AIzaSy...`). Keep this key secret; do **not** commit it to public repositories.

### 3.2. Determining `APP_URL`
- For Vercel deployments, `APP_URL` will be your auto-assigned Vercel domain (e.g., `https://your-project-name.vercel.app`) or a custom domain connected to your Vercel project (e.g., `https://goatlas.app`).

---

## 4. Step-by-Step Vercel Deployment

### Step 1: Push Code to GitHub / Git Hosting
Ensure your code is committed and pushed to your git repository branch (e.g., `main`):
```bash
git add .
git commit -m "Prepare repository for Vercel deployment"
git push origin main
```

### Step 2: Import Repository into Vercel
1. Log into your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Connect your GitHub/GitLab account if not already linked.
4. Locate your **GoAtlas** repository and click **Import**.

### Step 3: Configure Project Settings in Vercel
In the import configuration screen:
- **Project Name**: Set your desired project name (e.g., `go-atlas`).
- **Framework Preset**: Select **Next.js** (Vercel automatically detects this).
- **Root Directory**: Leave as `./` (default).
- **Build and Output Settings**:
  - Build Command: `npm run build` (or `next build`)
  - Output Directory: Next.js default (`.next`)
  - Install Command: `npm install`

### Step 4: Add Environment Variables in Vercel
Expand the **Environment Variables** section in the Vercel project setup interface and add the following:

1. **Name**: `GEMINI_API_KEY`
   - **Value**: `your_actual_gemini_api_key_here`
   - **Environments**: Check Production, Preview, and Development.

2. **Name**: `APP_URL`
   - **Value**: `https://your-project-name.vercel.app`
   - **Environments**: Check Production, Preview, and Development.

Click **Add** for each variable.

### Step 5: Deploy
Click **Deploy**. Vercel will initiate the build process (`npm install` -> `npm run build`). Once complete (typically ~1-2 minutes), Vercel will display your live deployment URL!

---

## 5. Running Locally with `.env.local`

To run and test the repository on your local machine before or alongside deployment:

1. In the root directory of the project, create a file named `.env.local`:
   ```env
   GEMINI_API_KEY="AIzaSyYourActualKeyHere"
   APP_URL="http://localhost:3000"
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Runtime & Node.js Compatibility Notes

- **Serverless Runtime**: GoAtlas API routes (`app/api/ai/*`) rely on `@mozilla/readability` and `jsdom` for web scraping, as well as the Google Gen AI SDK. These libraries require standard **Node.js serverless execution** (Node.js 20+). Do **not** configure these routes to run on the Edge runtime (`export const runtime = 'edge'`), as `jsdom` requires full Node.js DOM emulate globals.
- **Serverless Timeout**: Article scraping and Gemini AI requests generally complete within 2–5 seconds. Standard Vercel Serverless Function execution limits (15 seconds on Hobby plan, 60 seconds on Pro plan) are sufficient.

---

## 7. Troubleshooting & Verification

### Common Issues & Solutions

1. **Error: `GEMINI_API_KEY environment variable is required`**
   - **Cause**: The `GEMINI_API_KEY` variable is missing or misspelled in your Vercel Environment Variables setup.
   - **Fix**: Go to Vercel Project Settings -> Environment Variables, verify `GEMINI_API_KEY`, and trigger a re-deployment.

2. **Build Error during `npm run build`**
   - **Cause**: TypeScript type mismatches or unhandled ESLint errors.
   - **Fix**: Run `npm run lint` and `npm run build` locally to verify green build status prior to pushing.

3. **Web Scraper returning fallback summary on certain URLs**
   - **Cause**: Certain websites utilize heavy anti-bot protections (e.g. Cloudflare Ray ID, Captcha).
   - **Behavior**: The scraper handles this gracefully by falling back to AI title/meta inferences without crashing.

---

## 8. Post-Deployment Checklist

After your Vercel deployment completes, test the following features on your live URL:

- [ ] **Quick Capture URL Scraping**: Save a link (e.g. an article URL) in the Quick Capture modal and verify full-text article body extraction and tag generation.
- [ ] **Smart Reader**: Open the saved article in the Smart Reader view to verify reader layout, RSVP speed reading, and text highlighting.
- [ ] **Atlas Intelligence Assistant**: Open the AI Chat sidebar and ask a question about your saved items (e.g., "What articles do I have saved about programming?").
- [ ] **Voice Recording**: Test saving a short voice memo to verify Gemini speech transcript processing.
- [ ] **PWA Installation**: Verify that the app prompt allows installation as a desktop/mobile application.

import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithFallback } from '@/lib/gemini';
import { scrapeUrl, ScrapedArticle } from '@/lib/scraper';
import { Type } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { url, title, content, type } = await req.json();

    if (!content && !url && !title) {
      return NextResponse.json(
        { error: 'Provide at least a URL, title, or content' },
        { status: 400 }
      );
    }

    let scrapedArticle: ScrapedArticle | null = null;
    let effectiveContent = content || '';

    if (url) {
      scrapedArticle = await scrapeUrl(url);
      if (scrapedArticle && scrapedArticle.content) {
        effectiveContent = scrapedArticle.content;
      }
    }

    const prompt = `Analyze this saved online item for GoAtlas personal knowledge system.
Target URL/Domain: ${url || 'None'}
Scraped Title: ${scrapedArticle?.title || title || 'None'}
User Input Title: ${title || 'None'}
Item Type: ${type || 'auto-detect'}
Extracted Article Text / Full-Text Body:
${effectiveContent ? effectiveContent.slice(0, 12000) : 'No raw text provided, infer from URL or title.'}

Provide a clean, high quality analysis adhering strictly to JSON format.
Primary Category must be ONE of: ["Programming", "Business", "Design", "Finance", "Travel", "Health", "Recipes", "Shopping", "Education", "Entertainment", "General"]
Item Type must be ONE of: ["link", "article", "video", "screenshot", "pdf", "note", "voice", "image", "code"]`;

    let parsed: any = {};

    try {
      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          systemInstruction:
            'You are an expert content analyzer for GoAtlas personal knowledge engine. Produce clean, objective summaries and high quality metadata.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: 'Refined concise title' },
              type: { type: Type.STRING, description: 'One of the valid item types' },
              domain: { type: Type.STRING, description: 'Source domain name like youtube.com, github.com, etc.' },
              summary: { type: Type.STRING, description: '1-2 sentence executive summary' },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '3 bullet points of key insights',
              },
              category: { type: Type.STRING, description: 'One of the valid primary categories' },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '4-6 relevant tags',
              },
              keywords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Key search terms',
              },
              relatedTopics: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Broader topic areas',
              },
              suggestedCollection: { type: Type.STRING, description: 'Short collection name suggestion' },
              readingTimeMinutes: { type: Type.NUMBER, description: 'Estimated reading/viewing time in minutes' },
            },
            required: ['title', 'type', 'summary', 'keyTakeaways', 'category', 'tags', 'keywords'],
          },
        },
      });

      const jsonText = response.text || '{}';
      parsed = JSON.parse(jsonText);
    } catch (aiError: any) {
      console.warn('AI Analysis fallback triggered:', aiError?.message || aiError);
      // Fallback metadata if Gemini API is temporarily busy
      const fallbackTitle = scrapedArticle?.title || title || (url ? new URL(url).hostname : 'Saved Item');
      parsed = {
        title: fallbackTitle,
        type: type || 'article',
        domain: url ? new URL(url).hostname : 'local',
        summary: scrapedArticle?.excerpt || effectiveContent.slice(0, 200) || 'Saved item captured in GoAtlas.',
        keyTakeaways: ['Saved in Universal Inbox', 'Full-text captured for offline reading'],
        category: 'General',
        tags: ['Saved', 'Article'],
        keywords: ['GoAtlas'],
        relatedTopics: ['Reading'],
        readingTimeMinutes: Math.max(1, Math.ceil(effectiveContent.split(' ').length / 200)),
      };
    }

    // Attach scraped full text body and author if available
    if (scrapedArticle?.content) {
      parsed.fullTextContent = scrapedArticle.content;
      parsed.author = scrapedArticle.byline || 'Web Author';
      if (!parsed.title || parsed.title.length < 3) {
        parsed.title = scrapedArticle.title;
      }
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/analyze:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze item' },
      { status: 500 }
    );
  }
}


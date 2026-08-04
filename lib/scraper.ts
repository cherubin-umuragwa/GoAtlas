import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';

export interface ScrapedArticle {
  title: string;
  content: string;
  textContent: string;
  excerpt: string;
  byline?: string;
  siteName?: string;
  domain: string;
  url: string;
  length: number;
}

export async function scrapeUrl(targetUrl: string): Promise<ScrapedArticle | null> {
  try {
    let formattedUrl = targetUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const urlObj = new URL(formattedUrl);

    // Fetch HTML with browser-like headers and timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const response = await fetch(formattedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        Accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`Scraper fetch status ${response.status} for ${formattedUrl}`);
      return null;
    }

    const html = await response.text();
    if (!html || html.length < 50) return null;

    const dom = new JSDOM(html, { url: formattedUrl });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent && article.textContent.trim().length > 80) {
      // Clean up whitespace excess lines while maintaining paragraphs
      const cleanedText = article.textContent
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join('\n\n');

      return {
        title: article.title || dom.window.document.title || urlObj.hostname,
        content: cleanedText,
        textContent: cleanedText,
        excerpt: article.excerpt || cleanedText.slice(0, 240) + '...',
        byline: article.byline || undefined,
        siteName: article.siteName || urlObj.hostname,
        domain: urlObj.hostname,
        url: formattedUrl,
        length: cleanedText.length,
      };
    }

    // Fallback: extract clean document body text
    const bodyText = (dom.window.document.body?.textContent || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 0)
      .join('\n\n');

    if (bodyText.length > 50) {
      return {
        title: dom.window.document.title || urlObj.hostname,
        content: bodyText.slice(0, 15000),
        textContent: bodyText.slice(0, 15000),
        excerpt: bodyText.slice(0, 240) + '...',
        domain: urlObj.hostname,
        url: formattedUrl,
        length: bodyText.length,
      };
    }

    return null;
  } catch (err: any) {
    console.error('Error in scrapeUrl:', err?.message || err);
    return null;
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { scrapeUrl } from '@/lib/scraper';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const article = await scrapeUrl(url);

    if (!article) {
      return NextResponse.json(
        { error: 'Could not extract full-text content from the provided URL' },
        { status: 422 }
      );
    }

    return NextResponse.json({ success: true, article });
  } catch (error: any) {
    console.error('Error in /api/ai/scrape:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to scrape URL' },
      { status: 500 }
    );
  }
}

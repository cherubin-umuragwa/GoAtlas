import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithFallback } from '@/lib/gemini';
import { Type } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { base64Data, mimeType } = await req.json();

    if (!base64Data) {
      return NextResponse.json({ error: 'base64Data is required' }, { status: 400 });
    }

    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');

    const imagePart = {
      inlineData: {
        mimeType: mimeType || 'image/png',
        data: cleanBase64,
      },
    };

    const textPart = {
      text: `Analyze this uploaded screenshot / image for GoAtlas OCR & Knowledge system.
1. Perform high accuracy OCR and extract all visible readable text.
2. Identify what kind of content this screenshot represents (e.g. Dashboard UI, Code snippet, Article text, Recipe, Invoice, Social media post, Architecture diagram, Product page).
3. Generate a refined title, concise summary, key takeaways, primary category, and tags.`,
    };

    const response = await generateContentWithFallback({
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: 'You are an advanced OCR and document intelligence engine for GoAtlas.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Descriptive title based on image content' },
            extractedText: { type: Type.STRING, description: 'All extracted OCR text from image' },
            contentType: { type: Type.STRING, description: 'E.g. Dashboard UI, Code, Article, Recipe, etc.' },
            summary: { type: Type.STRING, description: 'Summary of the screenshot content' },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Key insights extracted from image',
            },
            category: { type: Type.STRING, description: 'Primary Category (e.g. Programming, Design, Business)' },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Relevant tags',
            },
          },
          required: ['title', 'extractedText', 'summary', 'keyTakeaways', 'category', 'tags'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/ocr:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process screenshot OCR' },
      { status: 500 }
    );
  }
}


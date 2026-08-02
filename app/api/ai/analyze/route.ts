import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
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

    const ai = getGeminiClient();

    const prompt = `Analyze this saved online item for GoAtlas personal knowledge system.
Target URL/Domain: ${url || 'None'}
User Input Title: ${title || 'None'}
Item Type: ${type || 'auto-detect'}
Raw Content / Text:
${content ? content.slice(0, 8000) : 'No raw content provided, infer from URL or title.'}

Provide a clean, high quality analysis adhering strictly to JSON format.
Primary Category must be ONE of: ["Programming", "Business", "Design", "Finance", "Travel", "Health", "Recipes", "Shopping", "Education", "Entertainment", "General"]
Item Type must be ONE of: ["link", "article", "video", "screenshot", "pdf", "note", "voice", "image", "code"]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an expert content analyzer for GoAtlas personal knowledge engine. Produce clean, objective summaries and high quality metadata.',
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
    const parsed = JSON.parse(jsonText);

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/analyze:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze item with Gemini' },
      { status: 500 }
    );
  }
}

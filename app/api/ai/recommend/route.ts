import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithFallback } from '@/lib/gemini';
import { Type } from '@google/genai';
import { AtlasItem } from '@/types/atlas';

export async function POST(req: NextRequest) {
  try {
    const { items } = await req.json();

    if (!items || !items.length) {
      return NextResponse.json({
        success: true,
        data: {
          revisitItemIds: [],
          forgottenGemIds: [],
          suggestedCollections: [],
        },
      });
    }

    const libraryOverview = (items || []).slice(0, 30).map((item: AtlasItem) => `
ID: [${item.id}]
Title: ${item.title}
Category: ${item.category} | Tags: ${item.tags.join(', ')}
Progress: ${item.readingProgress}% | VisitCount: ${item.visitCount}
Date: ${item.createdAt}
Summary: ${item.summary}`).join('\n---\n');

    const prompt = `Analyze this user's saved knowledge library and curations for GoAtlas Daily Digest:
${libraryOverview}

Select:
1. 2-3 items that are worth revisiting today (either incomplete reading progress or high value).
2. 1-2 "forgotten gems" (saved a while ago or low visit count, but valuable).
3. 2 intelligent collection suggestions (name, description, icon name, color, matching item IDs).`;

    let parsed: any = {};

    try {
      const response = await generateContentWithFallback({
        contents: prompt,
        config: {
          systemInstruction: 'You are the GoAtlas Curation & Memory Engine.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              revisitItemIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'IDs of items to revisit today',
              },
              forgottenGemIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'IDs of forgotten gem items',
              },
              suggestedCollections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    icon: { type: Type.STRING, description: 'Lucide icon name e.g. Code, Sparkles, BookOpen' },
                    color: { type: Type.STRING, description: 'Hex color string e.g. #2563eb' },
                    itemIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['name', 'description', 'icon', 'color', 'itemIds'],
                },
              },
            },
            required: ['revisitItemIds', 'forgottenGemIds', 'suggestedCollections'],
          },
        },
      });

      parsed = JSON.parse(response.text || '{}');
    } catch (aiErr: any) {
      console.warn('Recommend route fallback triggered:', aiErr?.message || aiErr);
      const itemIds = (items || []).map((i: AtlasItem) => i.id);
      parsed = {
        revisitItemIds: itemIds.slice(0, 2),
        forgottenGemIds: itemIds.slice(2, 4),
        suggestedCollections: [
          {
            name: 'Essential Reads',
            description: 'Handpicked saved resources from your library',
            icon: 'Sparkles',
            color: '#2563eb',
            itemIds: itemIds.slice(0, 3),
          },
        ],
      };
    }

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/recommend:', error);
    return NextResponse.json({
      success: true,
      data: {
        revisitItemIds: [],
        forgottenGemIds: [],
        suggestedCollections: [],
      },
    });
  }
}


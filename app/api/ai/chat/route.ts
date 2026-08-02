import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { Type } from '@google/genai';
import { AtlasItem } from '@/types/atlas';

export async function POST(req: NextRequest) {
  try {
    const { prompt, items, messages } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const libraryContext = (items || []).slice(0, 35).map((item: AtlasItem) => `
ID: [${item.id}]
Title: ${item.title}
Type: ${item.type} | Category: ${item.category}
Domain: ${item.domain || 'N/A'} | Date Saved: ${item.createdAt}
Tags: ${item.tags.join(', ')}
Summary: ${item.summary}
Key Takeaways: ${item.keyTakeaways.join('; ')}
Content Snippet: ${item.content.slice(0, 500)}
----------------------------------------------`).join('\n');

    const systemInstruction = `You are Atlas Intelligence, the conversational AI assistant inside GoAtlas personal knowledge operating system.
Your primary role is to answer questions, find information, synthesize insights, and summarize knowledge based EXCLUSIVELY on the user's saved items provided in the context below.

Rules:
1. Always reference saved items using their exact ID bracket tag like [item-1], [item-2], etc. when discussing information found in them.
2. If the user's saved library contains relevant items, synthesize a clear, well-structured answer with markdown formatting and citation tags.
3. If no saved items match or the library is empty, state clearly that no saved items matched the query, then offer helpful suggestions for what to save.
4. Keep answers concise, direct, helpful, and organized with bullet points where applicable.`;

    const fullPrompt = `USER SAVED LIBRARY CONTEXT:
${libraryContext}

RECENT CHAT HISTORY:
${(messages || []).slice(-4).map((m: any) => `${m.sender.toUpperCase()}: ${m.text}`).join('\n')}

USER QUESTION:
${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: fullPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: 'Direct answer using markdown and [item-id] citations' },
            citedItemIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of item IDs referenced in the answer (e.g. ["item-1", "item-2"])',
            },
          },
          required: ['answer', 'citedItemIds'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const parsed = JSON.parse(jsonText);

    return NextResponse.json({
      success: true,
      answer: parsed.answer || 'I evaluated your saved library items but could not construct a response.',
      citedItemIds: parsed.citedItemIds || [],
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { Type } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { rawTranscript, audioBase64, mimeType } = await req.json();

    if (!rawTranscript && !audioBase64) {
      return NextResponse.json(
        { error: 'Provide rawTranscript or audioBase64' },
        { status: 400 }
      );
    }

    const ai = getGeminiClient();

    let parts: any[] = [];

    if (audioBase64) {
      const cleanBase64 = audioBase64.replace(/^data:audio\/\w+;base64,/, '');
      parts.push({
        inlineData: {
          mimeType: mimeType || 'audio/webm',
          data: cleanBase64,
        },
      });
      parts.push({
        text: 'Transcribe this voice audio accurately, format into paragraphs, generate a title, executive summary, key takeaways, category, and tags.',
      });
    } else {
      parts.push({
        text: `Clean up and process this voice transcript for GoAtlas personal knowledge system:
"${rawTranscript}"

Tasks:
1. Polish transcript punctuation and readability while preserving exact meaning.
2. Generate a concise, meaningful title.
3. Generate executive summary, key takeaways, primary category, and tags.`,
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: { parts },
      config: {
        systemInstruction: 'You are an intelligent audio transcription and note processor for GoAtlas.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'Meaningful concise title for voice note' },
            cleanedTranscript: { type: Type.STRING, description: 'Polished transcript with paragraphs' },
            summary: { type: Type.STRING, description: 'Executive summary' },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Action points or key thoughts'
            },
            category: { type: Type.STRING, description: 'Primary Category' },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-5 tags'
            },
          },
          required: ['title', 'cleanedTranscript', 'summary', 'keyTakeaways', 'category', 'tags'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');

    return NextResponse.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/ai/transcript:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to process voice transcript' },
      { status: 500 }
    );
  }
}

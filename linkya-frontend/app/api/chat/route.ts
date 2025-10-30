import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const MODEL = 'gpt-4o-mini';

export async function POST(req: Request) {
  try {
    const { systemPrompt, messages } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server OPENAI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const client = new OpenAI({ apiKey });

    const completion = await client.chat.completions.create({
      model: MODEL,
      messages: [
        ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
        ...(Array.isArray(messages) ? messages : []),
      ],
    });

    const reply = completion.choices?.[0]?.message?.content ?? '';
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Chat API error:', error?.message || error);
    return NextResponse.json({ error: 'Chat API failed' }, { status: 500 });
  }
}


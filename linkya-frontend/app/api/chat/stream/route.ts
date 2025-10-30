import { NextRequest } from 'next/server';
import OpenAI from 'openai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return new Response('Server OPENAI_API_KEY not configured', { status: 500 });
  }
  const { systemPrompt, messages } = await req.json();
  const client = new OpenAI({ apiKey });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (data: any) => controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      try {
        const completion = await client.chat.completions.create({
          model: 'gpt-4o-mini',
          stream: true,
          messages: [
            ...(systemPrompt ? [{ role: 'system' as const, content: systemPrompt }] : []),
            ...(Array.isArray(messages) ? messages : []),
          ],
        });
        for await (const part of completion) {
          const delta = part.choices?.[0]?.delta?.content;
          if (delta) send({ delta });
        }
        send({ done: true });
      } catch (e: any) {
        send({ error: e?.message || 'stream error' });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-sonnet-4-20250514'; // 使用最新的 Claude Sonnet 4

export async function POST(req: Request) {
  try {
    const { systemPrompt, messages } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Server ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    // 轉換 messages 格式從 OpenAI 格式到 Anthropic 格式
    const anthropicMessages = messages.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 4096,
      system: systemPrompt,
      messages: anthropicMessages,
    });

    // Claude 的回應格式不同，需要提取第一個 content block 的 text
    const reply = message.content[0]?.type === 'text' 
      ? message.content[0].text 
      : '抱歉，我無法回應你的問題。';
    
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('Claude API error:', error?.message || error);
    return NextResponse.json({ error: 'Claude API failed' }, { status: 500 });
  }
}


import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

// 優先使用 Claude，如果沒有配置則使用 OpenAI
const CLAUDE_MODEL = 'claude-sonnet-4-20250514';

export async function POST(req: Request) {
  try {
    const { systemPrompt, messages } = await req.json();

    // 優先檢查 Anthropic API Key
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    
    if (anthropicApiKey) {
      const anthropic = new Anthropic({ apiKey: anthropicApiKey });

      // 轉換 messages 格式從 OpenAI 格式到 Anthropic 格式
      const anthropicMessages = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content,
      }));

      const message = await anthropic.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 4096,
        system: systemPrompt,
        messages: anthropicMessages,
      });

      // Claude 的回應格式不同，需要提取第一個 content block 的 text
      const reply = message.content[0]?.type === 'text' 
        ? message.content[0].text 
        : '抱歉，我無法回應你的問題。';
      
      return NextResponse.json({ reply });
    }

    // 如果沒有 Anthropic API Key，回傳錯誤（需要配置）
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY not configured. Please set it in .env.local' },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Chat API error:', error?.message || error);
    return NextResponse.json({ error: 'Chat API failed' }, { status: 500 });
  }
}


'use client';

import { useEffect, useState } from 'react';
import { useChatkit } from '../../hooks/useChatkit';

export default function MemoryPage() {
  const { messages } = useChatkit();
  const [summary, setSummary] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const recent = messages.slice(-20).map((m) => `${m.userName || m.userId}: ${m.text}`).join('\n');
      const systemPrompt = '你是 LINKYA 的回憶與默契整理助手，請以條列式整理最近對話的重點、使用者偏好、待辦與下一步建議，語氣溫暖專業，使用繁體中文。';

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt,
          messages: [
            { role: 'user', content: `以下是最近的對話紀錄：\n${recent}` },
          ],
        }),
      });

      if (!res.ok) throw new Error('產生總結失敗');
      const data = await res.json();
      setSummary(data.reply || '');
    } catch (e: any) {
      setError(e.message || '產生總結失敗');
      setSummary('（本地回覆）已記錄對話。當前伺服器金鑰不可用，暫無法產生 AI 總結。');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!summary && messages.length > 0) {
      // 初次自動可選擇不觸發；保留手動
    }
  }, [messages, summary]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">默契總結</h1>
        <p className="text-white/70 mb-4">整理最近對話的重點、偏好與下一步建議。</p>

        <button
          onClick={generateSummary}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-4 py-2 disabled:opacity-60"
        >
          {loading ? '產生中…' : '產生最新總結'}
        </button>

        <div className="mt-6 bg-white/10 border border-white/20 rounded-xl p-4 text-white whitespace-pre-wrap">
          {summary || '尚未產生總結。點上方按鈕生成。'}
        </div>

        {error && <div className="mt-4 text-red-300 text-sm">{error}</div>}
      </div>
    </div>
  );
}


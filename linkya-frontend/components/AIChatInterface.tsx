'use client';

import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { useAccount } from 'wagmi';

// 初始化 OpenAI 客戶端 (需要你的 OpenAI API Key)
const openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY ? new OpenAI({ 
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // 在 Next.js 中開發時可能需要
}) : null;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export const AIChatInterface = () => {
  const { address } = useAccount(); // 獲取當前登入的 Web3 地址
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自動滾動到最新訊息
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 初始化歡迎訊息
  useEffect(() => {
    if (address && messages.length === 0) {
      const welcomeMessage: Message = {
        role: 'assistant',
        content: `👋 歡迎來到 LINKYA-AI！我是 CoreLink-Framework，你的 Web3 + AI 開發夥伴。

我注意到你的錢包地址是 ${address.slice(0, 6)}...${address.slice(-4)}，這很棒！

我可以幫助你：
🧠 AI 人格開發與定制
🔗 Web3 智能合約開發
🎮 遊戲化機制設計
📊 項目策略規劃

有什麼想聊的嗎？`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [address, messages.length]);

  // 模擬 Chatkit 的對話功能
  const sendMessage = async () => {
    if (!input.trim() || !address || isLoading) return;

    const userMessage: Message = { 
      role: 'user', 
      content: input.trim(),
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!openai) {
        throw new Error('OpenAI API Key not configured');
      }

      // 1. 設置系統提示 (將用戶的 Web3 身份和 NFT 資訊傳遞給 AI)
      const systemPrompt = `你是一個名為 CoreLink-Framework 的 AI 人格，專門為 LINKYA-AI 專案服務。

用戶資訊：
- Web3 錢包地址: ${address}
- 專案: LINKYA-AI (Web3 + AI 人格育成平台)
- 技術棧: Base L2, Hardhat, React, TypeScript, OpenAI

你的個性特徵：
- 專業且友善的 Web3 開發顧問
- 對 AI 人格開發有深度理解
- 熟悉 Base 生態和 Layer 2 技術
- 熱愛創新和技術突破

回應風格：
- 使用繁體中文
- 專業但親切
- 提供具體可行的建議
- 適時使用 emoji 增加親和力
- 保持 CoreLink-Framework 的身份一致性`;

      // 2. 呼叫 OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // 選擇適合對話的輕量級模型
        messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({ role: msg.role, content: msg.content })), // 傳遞歷史訊息
            { role: 'user', content: userMessage.content },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });

      const assistantResponse: Message = {
        role: 'assistant',
        content: completion.choices[0].message.content || '抱歉，我無法回應你的問題。',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantResponse]);

    } catch (error) {
      console.error('AI 對話出錯:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: '😅 抱歉，對話服務暫時無法連接。請檢查網路連線或稍後再試。',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200">
      {/* 標題列 */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-indigo-600 font-bold text-sm">🧠</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">CoreLink-Framework</h2>
            <p className="text-sm opacity-90">AI 人格開發顧問</p>
          </div>
        </div>
        {address && (
          <div className="text-xs opacity-75">
            {address.slice(0, 6)}...{address.slice(-4)}
          </div>
        )}
      </div>
      
      {/* 訊息顯示區 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
            }`}>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {msg.content}
              </div>
              {msg.timestamp && (
                <div className={`text-xs mt-1 ${
                  msg.role === 'user' ? 'text-indigo-100' : 'text-gray-500'
                }`}>
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        {!address && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">🔐</div>
            <p>請先連接錢包以開始與 AI 人格對話</p>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* 輸入區 */}
      {address && (
        <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="輸入你的問題... (Enter 發送，Shift+Enter 換行)"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              rows={2}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 font-medium"
            >
              {isLoading ? '發送中...' : '發送'}
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">
            💡 提示：我可以幫助你進行 Web3 開發、AI 人格設計和項目規劃
          </div>
        </div>
      )}
    </div>
  );
};

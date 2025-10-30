'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useChatkit } from '../../hooks/useChatkit';
import { useParticleAuth } from '../../hooks/useParticleAuth';

interface HealingMessage {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: Date;
  avatar?: string;
  personaType?: 'gentle' | 'energetic' | 'wise';
}

interface PersonaData {
  type: 'gentle' | 'energetic' | 'wise';
  name: string;
  title: string;
  icon: string;
  color: string;
  lightColor: string;
  avatarColor: string;
  personality: string;
}

const personas: PersonaData[] = [
  {
    type: 'gentle',
    name: '暖阳',
    title: '温暖倾听型伙伴',
    icon: 'mdi:flower',
    color: 'text-[#ff6b95]',
    lightColor: 'bg-[#ffd1dc]',
    avatarColor: 'from-[#ffd1dc] to-[#ffcedb]',
    personality: '擅长：情绪支持 · 细腻倾听 · 温暖回应'
  },
  {
    type: 'energetic',
    name: '小阳',
    title: '元气活力型伙伴',
    icon: 'mdi:weather-sunny',
    color: 'text-[#ffa600]',
    lightColor: 'bg-[#ffe600]',
    avatarColor: 'from-[#ffe600]/90 to-[#ffd700]',
    personality: '擅长：正能量鼓励 · 创意分享 · 活跃氛围'
  },
  {
    type: 'wise',
    name: '思哲',
    title: '睿智思考型伙伴',
    icon: 'mdi:feather',
    color: 'text-[#64c4a3]',
    lightColor: 'bg-[#b5ead7]',
    avatarColor: 'from-[#b5ead7] to-[#a0e0cb]',
    personality: '擅长：理性分析 · 深度思考 · 解决方案'
  }
];

export const HealingChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatkit();
  const { currentUser, activePersona } = useParticleAuth();
  
  const [selectedPersona, setSelectedPersona] = useState<PersonaData>(personas[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [currentEmotion, setCurrentEmotion] = useState('平和');
  const [emotionIntensity, setEmotionIntensity] = useState(3); // 1-4
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 自動滾動
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 側邊欄控制
  useEffect(() => {
    if (sidebarOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  const handleSendMessage = async () => {
    const text = messageInput.trim();
    if (!text || isLoading) return;
    
    setMessageInput('');
    await sendMessage(text);
  };

  const handlePersonaChange = (persona: PersonaData) => {
    setSelectedPersona(persona);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="font-sans bg-gradient-to-br from-[#fff0f5] to-[#e6f7ff] min-h-screen flex justify-center items-center p-4 md:p-8">
      {/* 主容器 */}
      <div className="w-full max-w-[1280px] max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
        {/* 裝飾背景 - 流動彩雲 */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-[100%] bg-[#ffd1dc]/20 blur-3xl top-[-60%] right-[-20%]"></div>
          <div className="absolute w-[400px] h-[400px] rounded-[100%] bg-[#b5ead7]/30 blur-3xl bottom-[-40%] left-[-10%]"></div>
        </div>
        
        {/* 隱藏側邊欄切換按鈕 */}
        <div className="absolute top-0 left-0 z-20 p-3 md:hidden">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] flex items-center justify-center shadow-sm"
          >
            <span className="iconify text-[#ff6b95]" data-icon="mdi:menu"></span>
          </button>
        </div>
        
        {/* 側邊欄 - 人格選擇區 */}
        <div 
          ref={sidebarRef}
          className={`fixed md:relative inset-0 md:inset-auto w-full md:w-[300px] bg-gradient-to-b from-[#fff9fb] to-[#f1fdff] p-5 border-r border-[#eee8f0] flex flex-col transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } z-30 md:z-10`}
        >
          {/* 關閉按鈕 */}
          <div className="absolute top-0 right-0 p-3 md:hidden">
            <button 
              onClick={() => setSidebarOpen(false)}
              className="w-8 h-8 rounded-full bg-[#ff6b950d] flex items-center justify-center"
            >
              <span className="iconify text-[#ff6b95]" data-icon="mdi:close"></span>
            </button>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-[#ff6b95] mt-3 mb-8 tracking-wide">
            LINKYA 伙伴
          </h1>
          
          {/* AI人格卡片 */}
          <div className="mb-6">
            <h3 className="text-[#ff98b7] text-sm mb-4 pb-2 border-b border-[#ffe6ee]">選擇你的AI伙伴</h3>
            <div className="space-y-5">
              {personas.map((persona) => (
                <div
                  key={persona.type}
                  onClick={() => handlePersonaChange(persona)}
                  className={`bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md cursor-pointer relative overflow-hidden ${
                    selectedPersona.type === persona.type 
                      ? 'border-[#ffcce0] shadow-md' 
                      : 'border-[#ffeef3]'
                  }`}
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-gradient-to-br from-current/20 to-transparent rounded-full"></div>
                  <div className="flex items-center relative">
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-r ${persona.avatarColor} rounded-full flex items-center justify-center`}>
                        <span className={`iconify text-3xl text-white ${selectedPersona.type === persona.type ? 'animate-pulse' : ''}`} data-icon={persona.icon}></span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className={`font-bold ${persona.color}`}>{persona.name}</h4>
                      <p className="text-xs text-[#c7a9b7] mt-1">{persona.title}</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#a18995] mt-3 pl-1">
                    <span className="iconify align-middle mr-1" data-icon="mdi:star-circle"></span>
                    {persona.personality}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 最近對話 */}
          <div className="mt-auto border-t border-[#eee8f0] pt-4">
            <h3 className="text-[#98d6e1] text-sm mb-3 pb-2 flex items-center">
              <span className="iconify mr-1" data-icon="mdi:history"></span>
              最近對話
            </h3>
            <div className="space-y-3">
              {/* 示例對話歷史 */}
              <div className="flex items-center p-2 hover:bg-[#f1fdff] rounded-lg transition cursor-pointer">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ffd1dc] to-[#ffbbc7] rounded-full flex items-center justify-center">
                  <span className="iconify text-white" data-icon="mdi:flower"></span>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="text-xs text-[#ff6b95] font-medium truncate">昨晚的對話</div>
                  <div className="text-xs text-[#c7a9b7] truncate">溫暖的陪伴...</div>
                </div>
                <div className="text-xs text-[#a18995] whitespace-nowrap">昨天</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 主聊天區 */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-[#f9f9fe] relative">
          {/* 頂部狀態欄 */}
          <div className="p-4 border-b border-[#eee8f0] z-10 flex items-center">
            <div className="relative">
              <div className={`w-14 h-14 animate-pulse bg-gradient-to-r ${selectedPersona.avatarColor} rounded-full flex items-center justify-center`}>
                <span className="iconify text-2xl text-white" data-icon={selectedPersona.icon}></span>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4 flex-1">
              <h2 className={`font-bold ${selectedPersona.color}`}>
                {selectedPersona.name}
                <span className="text-xs bg-pink-100 text-[#ff6b95] font-normal px-2 py-1 rounded-full ml-2">
                  {selectedPersona.title}
                </span>
              </h2>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-xs text-[#c7a9b7]">
                  {new Date().toLocaleDateString('zh-TW')} · 實時在線
                </span>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-[#ffecf2] text-[#c7a9b7] transition">
              <span className="iconify" data-icon="mdi:cog-outline"></span>
            </button>
          </div>
          
          {/* 情感反饋指示器 */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#fff0f5] to-[#f0ffff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="iconify text-xl mr-2 text-[#ff6b95]" data-icon="mdi:heart-multiple"></span>
                <span className="text-xs text-[#ff6b95]">當前情緒狀態：{currentEmotion}</span>
              </div>
              
              <div className="flex">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-4 h-4 rounded-full mr-1 shadow-[0_0_8px_currentColor] ${
                      level <= emotionIntensity
                        ? 'bg-gradient-to-r from-[#fee1e7] to-[#ff9fb9]'
                        : 'bg-[#e0e0e0]'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          
          {/* 聊天內容區域 */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 hide-scrollbar" style={{
            background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.6), rgba(230, 250, 250, 0.4))'
          }}>
            <div className="space-y-4 pb-16">
              {/* 歡迎消息 */}
              {messages.length === 0 && (
                <div className="text-center py-3">
                  <div className="inline-block bg-[#f0f0f0] text-[#888] text-xs rounded-full px-4 py-2">
                    {new Date().toLocaleDateString('zh-TW')} · 這是你與 {selectedPersona.name} 的第一次對話
                  </div>
                </div>
              )}
              
              {/* 消息列表 */}
              {messages.map((message, index) => {
                const isAI = message.userId === activePersona?.id;
                const time = message.timestamp ? formatTime(new Date(message.timestamp)) : '';
                
                return (
                  <div key={index} className={`flex w-full ${isAI ? '' : 'justify-end'}`}>
                    {isAI && (
                      <div className={`w-10 h-10 mr-3 flex-shrink-0 rounded-full ${selectedPersona.lightColor} flex items-center justify-center`}>
                        <span className="iconify text-white" data-icon={selectedPersona.icon}></span>
                      </div>
                    )}
                    
                    <div className={`max-w-[85%] md:max-w-[480px] ${isAI ? '' : 'flex flex-col items-end'}`}>
                      <div 
                        className={`inline-block p-[14px] border message-animate ${
                          isAI
                            ? 'bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] text-[#6a4d5a] rounded-r-2xl rounded-bl-2xl border-[#ffdae6]'
                            : 'bg-gradient-to-r from-[#d7f2ff] to-[#c5ebff] text-[#446d7d] rounded-l-2xl rounded-br-2xl border-[#cae6f5]'
                        }`}
                      >
                        {message.text}
                      </div>
                      <div className={`text-xs mt-2 ${isAI ? 'text-[#c7a9b7]' : 'text-[#98b8c6]'}`}>
                        {time}
                      </div>
                    </div>
                    
                    {!isAI && (
                      <div className="w-10 h-10 ml-3 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center">
                        <span className="iconify text-white" data-icon="mdi:account"></span>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* 載入中提示 */}
              {isLoading && (
                <div className="flex w-full">
                  <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-full bg-[#ffd1dc] flex items-center justify-center">
                    <span className="iconify text-white" data-icon={selectedPersona.icon}></span>
                  </div>
                  <div className="max-w-[85%] md:max-w-[480px]">
                    <div className="bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] text-[#6a4d5a] rounded-r-2xl rounded-bl-2xl p-[14px] border border-[#ffdae6] animate-pulse">
                      {selectedPersona.name} 正在思考...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 預測菜單 */}
          <div className="px-4 py-3 bg-white border-t border-[#eee8f0]">
            <div className="flex overflow-x-auto pb-1 hide-scrollbar space-x-2">
              <button className="px-4 py-2 bg-pink-50 rounded-full text-[#ff6b95] text-sm whitespace-nowrap">
                分享一下最近的見聞
              </button>
              <button className="px-4 py-2 bg-pink-50 rounded-full text-[#ff6b95] text-sm whitespace-nowrap">
                推薦放鬆的方法
              </button>
              <button className="px-4 py-2 bg-pink-50 rounded-full text-[#ff6b95] text-sm whitespace-nowrap">
                我想要傾訴
              </button>
            </div>
          </div>
          
          {/* 輸入功能區 */}
          <div className="p-3 border-t border-[#eee8f0]">
            <div className="flex items-center">
              <button className="w-10 h-10 flex items-center justify-center text-[#9e9e9e] hover:text-[#ff6b95] transition">
                <span className="iconify text-xl" data-icon="mdi:emoticon-outline"></span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center text-[#9e9e9e] hover:text-[#ff6b95] transition">
                <span className="iconify text-xl" data-icon="mdi:microphone"></span>
              </button>
              
              <div className="flex-1 mx-2 relative">
                <textarea
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder={`告訴 ${selectedPersona.name} 你的心情...`}
                  className="w-full min-h-[44px] max-h-[120px] p-3 rounded-xl border border-[#eee8f0] focus:border-[#ffd1dc] focus:outline-none resize-none"
                  style={{ caretColor: '#ff6b95' }}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !messageInput.trim()}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff6b95] to-[#ff88a3] flex items-center justify-center text-white shadow-sm hover:shadow-md transition disabled:opacity-50"
              >
                <span className="iconify" data-icon="mdi:send"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 樣式 */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes bubble {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .message-animate {
          animation: bubble 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
        }
      `}</style>
    </div>
  );
};

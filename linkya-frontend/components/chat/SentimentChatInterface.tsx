'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * 情感陪伴对话助手 - 完全按照原HTML设计
 * file:///C:/Users/waiti/LINKYA-AI/治愈AI聊天框UI_项目文件/情感陪伴对话助手.html
 */
export const SentimentChatInterface: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<'gentle' | 'energetic' | 'wise'>('gentle');
  const [inputValue, setInputValue] = useState('');

  // 动态加载Iconify
  useEffect(() => {
    if (!document.querySelector('script[src*="iconify"]')) {
      const script = document.createElement('script');
      script.src = 'https://code.iconify.design/3/3.1.1/iconify.min.js';
      document.head.appendChild(script);
    }
  }, []);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // 这里添加发送消息逻辑
      console.log('发送消息:', inputValue);
      setInputValue('');
    }
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes pulse-soft {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes bubble {
          0% { opacity: 0; transform: translateY(12px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .message-animate { animation: bubble 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards; }
        
        .avatar-3d {
          box-shadow: 0 3px 20px rgba(255, 200, 221, 0.5), inset 0 0 12px rgba(255, 255, 255, 0.8);
          transform: perspective(350px) rotateY(-6deg);
          transition: all 0.25s ease;
        }
        
        .character-hover:hover .avatar-3d {
          transform: perspective(350px) rotateY(0deg);
          box-shadow: 0 6px 25px rgba(255, 180, 200, 0.7), inset 0 0 15px rgba(255, 255, 255, 1);
        }
        
        .blob-bg { background: linear-gradient(135deg, rgba(255, 240, 245, 0.6), rgba(230, 250, 250, 0.4)); }
        .emotion-dot { box-shadow: 0 0 8px currentColor; }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
      `}</style>

      <div className="font-sans min-h-screen flex justify-center items-center p-2 sm:p-6" style={{
        fontFamily: "'Nunito', 'Helvetica Neue', sans-serif",
        background: 'linear-gradient(135deg, #fdf2f8 0%, #f0f9ff 100%)'
      }}>
        {/* 主容器 */}
        <div className="w-full max-w-[1500px] h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
          {/* 装饰背景 - 流动彩云 */}
          <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute w-[500px] h-[500px] rounded-[100%] bg-[#ffd1dc]/20 blur-3xl top-[-60%] right-[-20%]"></div>
            <div className="absolute w-[400px] h-[400px] rounded-[100%] bg-[#b5ead7]/30 blur-3xl bottom-[-40%] left-[-10%]"></div>
          </div>

          {/* 隐藏侧边栏切换按钮 */}
          <div className="absolute top-0 left-0 z-20 p-3 md:hidden">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] flex items-center justify-center shadow-sm"
            >
              <span className="iconify text-[#ff6b95]" data-icon="mdi:menu"></span>
            </button>
          </div>

          {/* 侧边栏 */}
          <div 
            className={`
              w-full md:w-[320px] bg-gradient-to-b from-[#fff9fb] to-[#f1fdff] p-5 md:p-6 border-r border-[#eee8f0] 
              flex flex-col overflow-y-auto hide-scrollbar transition-all duration-300 
              ${isSidebarOpen ? 'left-0' : '-left-full'} 
              absolute md:relative z-10 h-[calc(100dvh-4rem)] md:h-auto top-0
            `}
          >
            <div className="absolute top-0 right-0 p-3 md:hidden">
              <button 
                onClick={() => setIsSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ff6b950d] flex items-center justify-center"
              >
                <span className="iconify text-[#ff6b95]" data-icon="mdi:close"></span>
              </button>
            </div>

            <div className="text-center mb-8 mt-4">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ff6b95] to-[#ff88a3]">
                心灵伙伴
              </h1>
              <p className="text-sm text-[#9e9e9e] mt-2">2025年10月27日</p>
            </div>

            {/* AI人格卡片 */}
            <div className="mb-6">
              <h3 className="text-[#ff98b7] text-sm mb-4 pb-2 border-b border-[#ffe6ee]">选择你的AI伙伴</h3>
              <div className="space-y-5">
                {/* 温柔人格 */}
                <div 
                  onClick={() => {
                    setSelectedPersona('gentle');
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    character-hover bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 
                    hover:shadow-md cursor-pointer relative overflow-hidden
                    ${selectedPersona === 'gentle' 
                      ? 'border-[#ffeef3] hover:border-[#ffcce0]' 
                      : 'border-[#ffeef3] hover:border-[#ffcce0]'
                    }
                  `}
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ffd1dc]/20 rounded-full"></div>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-14 h-14 avatar-3d animate-pulse-soft bg-gradient-to-r from-[#ffd1dc] to-[#ffcedb] rounded-full flex items-center justify-center">
                        <span className="iconify text-3xl text-white" data-icon="mdi:flower"></span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#ff6b95]">暖阳</h4>
                      <p className="text-xs text-[#c7a9b7] mt-1">温暖倾听型伙伴</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#a18995] mt-3 pl-1">
                    <span className="iconify align-middle mr-1" data-icon="mdi:star-circle"></span>
                    擅长：情绪支持 · 细腻倾听 · 温暖回应
                  </div>
                </div>

                {/* 热情人格 */}
                <div 
                  onClick={() => {
                    setSelectedPersona('energetic');
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    character-hover bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 
                    hover:shadow-md cursor-pointer relative overflow-hidden
                    ${selectedPersona === 'energetic' 
                      ? 'border-[#fff8e0] hover:border-[#ffedb4]' 
                      : 'border-[#fff8e0] hover:border-[#ffedb4]'
                    }
                  `}
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ffd700]/10 rounded-full"></div>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-14 h-14 avatar-3d bg-gradient-to-r from-[#ffe600]/90 to-[#ffd700] rounded-full flex items-center justify-center">
                        <span className="iconify text-3xl text-white" data-icon="mdi:weather-sunny"></span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#ffa600]">小阳</h4>
                      <p className="text-xs text-[#d0b98d] mt-1">元气活力型伙伴</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#c0aa72] mt-3 pl-1">
                    <span className="iconify align-middle mr-1" data-icon="mdi:star-circle"></span>
                    擅长：正能量鼓励 · 创意分享 · 活跃氛围
                  </div>
                </div>

                {/* 理性人格 */}
                <div 
                  onClick={() => {
                    setSelectedPersona('wise');
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    character-hover bg-white p-5 rounded-xl shadow-sm border transition-all duration-300 
                    hover:shadow-md cursor-pointer relative overflow-hidden
                    ${selectedPersona === 'wise' 
                      ? 'border-[#e8f8f6] hover:border-[#b5ead7]' 
                      : 'border-[#e8f8f6] hover:border-[#b5ead7]'
                    }
                  `}
                >
                  <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#b5ead7]/30 rounded-full"></div>
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-14 h-14 avatar-3d bg-gradient-to-r from-[#b5ead7] to-[#a0e0cb] rounded-full flex items-center justify-center">
                        <span className="iconify text-3xl text-white" data-icon="mdi:feather"></span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-[#64c4a3]">思哲</h4>
                      <p className="text-xs text-[#a0c2b7] mt-1">睿智思考型伙伴</p>
                    </div>
                  </div>
                  <div className="text-xs text-[#80b5a5] mt-3 pl-1">
                    <span className="iconify align-middle mr-1" data-icon="mdi:star-circle"></span>
                    擅长：理性分析 · 深度思考 · 解决方案
                  </div>
                </div>
              </div>
            </div>

            {/* 最近对话 */}
            <div className="mt-auto border-t border-[#eee8f0] pt-4">
              <h3 className="text-[#98d6e1] text-sm mb-3 pb-2 flex items-center">
                <span className="iconify mr-1" data-icon="mdi:history"></span>
                最近对话
              </h3>
              <div className="space-y-3">
                <div className="flex items-center p-2 hover:bg-[#f1fdff] rounded-lg transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ffd1dc] to-[#ffbbc7] rounded-full flex items-center justify-center">
                    <span className="iconify text-white" data-icon="mdi:flower"></span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-xs text-[#ff6b95] font-medium">昨晚的星空</div>
                    <div className="text-xs text-[#c7a9b7] truncate">你之前说想看星星，今晚天气不错哦...</div>
                  </div>
                  <div className="text-xs text-[#a18995]">昨天</div>
                </div>
                <div className="flex items-center p-2 hover:bg-[#f1fdff] rounded-lg transition">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#ffb95f] to-[#ffa62e] rounded-full flex items-center justify-center">
                    <span className="iconify text-white" data-icon="mdi:weather-sunny"></span>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="text-xs text-[#ffa600] font-medium">晨间计划</div>
                    <div className="text-xs text-[#d0b98d] truncate">元气满满开始新的一天吧！</div>
                  </div>
                  <div className="text-xs text-[#c0aa72]">今天</div>
                </div>
              </div>
            </div>
          </div>

          {/* 遮罩层 */}
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/20 z-5 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* 主聊天区 - 严格按照原HTML */}
          <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-[#f9f9fe] relative">
            {/* 顶部状态栏 */}
            <div className="p-4 border-b border-[#eee8f0] z-10 flex items-center">
              <div className="relative">
                <div className="w-14 h-14 animate-pulse-soft bg-gradient-to-r from-[#ffd1dc] to-[#ffcedb] rounded-full flex items-center justify-center">
                  <span className="iconify text-2xl text-white" data-icon="mdi:flower"></span>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="ml-4 flex-1">
                <h2 className="font-bold text-[#ff6b95]">暖阳 <span className="text-xs bg-pink-100 text-[#ff6b95] font-normal px-2 py-1 rounded-full ml-2">温柔型</span></h2>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-xs text-[#c7a9b7]">2025年10月27日 · 实时在线</span>
                </div>
              </div>
              <button className="p-2 rounded-full hover:bg-[#ffecf2] text-[#c7a9b7] transition">
                <span className="iconify" data-icon="mdi:cog-outline"></span>
              </button>
            </div>

            {/* 情感反馈指示器 */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#fff0f5] to-[#f0ffff]">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="iconify text-xl mr-2 text-[#ff6b95]" data-icon="mdi:heart-multiple"></span>
                  <span className="text-xs text-[#ff6b95]">当前情绪状态：平和</span>
                </div>
                <div className="flex">
                  <div className="w-4 h-4 rounded-full emotion-dot bg-[#fee1e7] mr-1"></div>
                  <div className="w-4 h-4 rounded-full emotion-dot bg-[#ffc9d8] mr-1"></div>
                  <div className="w-4 h-4 rounded-full emotion-dot bg-[#ffb5c9] mr-1"></div>
                  <div className="w-4 h-4 rounded-full emotion-dot bg-[#ff9fb9]"></div>
                </div>
              </div>
            </div>

            {/* 聊天内容区域 */}
            <div className="flex-1 overflow-y-auto p-4 hide-scrollbar blob-bg">
              <div className="space-y-4 pb-16">
                {/* 系统欢迎消息 */}
                <div className="text-center py-3">
                  <div className="inline-block bg-[#f0f0f0] text-[#888] text-xs rounded-full px-4 py-2">
                    2025年10月27日 · 这是你与暖阳的第一次对话
                  </div>
                </div>

                {/* AI消息 */}
                <div className="flex w-full">
                  <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-full bg-[#ffd1dc] flex items-center justify-center">
                    <span className="iconify text-white" data-icon="mdi:flower"></span>
                  </div>
                  <div className="max-w-[85%] md:max-w-[480px]">
                    <div className="message-animate bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] text-[#6a4d5a] rounded-r-2xl rounded-bl-2xl p-[14px] border border-[#ffdae6]">
                      你好呀！我是你的情感伙伴暖阳，我注意到今天是2025年10月27日，新的一周开始了呢~❤️<br /><br />
                      看你的呼吸节奏很平缓，是一个调整状态的好时机，我们聊聊近况好吗？
                    </div>
                    <div className="text-xs text-[#c7a9b7] mt-2">上午 10:28</div>
                  </div>
                </div>

                {/* 用户消息 */}
                <div className="flex justify-end w-full">
                  <div className="max-w-[85%] md:max-w-[480px]">
                    <div className="message-animate bg-gradient-to-r from-[#d7f2ff] to-[#c5ebff] text-[#446d7d] rounded-l-2xl rounded-br-2xl p-[14px] border border-[#cae6f5]">
                      有些失眠，上周的工作压力一直延续到现在...
                    </div>
                    <div className="text-xs text-[#98b8c6] mt-2 flex justify-end">上午 10:30</div>
                  </div>
                  <div className="w-10 h-10 ml-3 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center">
                    <span className="iconify text-white" data-icon="mdi:account"></span>
                  </div>
                </div>

                {/* AI消息 - 带情感反馈 */}
                <div className="flex w-full mt-6">
                  <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-full bg-[#ffd1dc] flex items-center justify-center">
                    <span className="iconify text-white" data-icon="mdi:flower"></span>
                  </div>
                  <div className="max-w-[85%] md:max-w-[480px]">
                    <div className="message-animate bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] text-[#6a4d5a] rounded-r-2xl rounded-bl-2xl p-[14px] border border-[#ffdae6]">
                      🌸*轻轻拥抱*<br />
                      我能理解这种沉重的感觉，尤其是周末后还没恢复的状态。我整理了几种排解方式：
                      <div className="border border-[#ffdae6] rounded-xl overflow-hidden mt-3">
                        <div className="flex items-center bg-[#fff0f7] p-3">
                          <span className="iconify text-lg text-[#ff6b95] mr-2" data-icon="mdi:meditation"></span>
                          <div>
                            <div className="font-medium text-[#ff6b95]">情绪工具箱</div>
                            <div className="text-xs text-[#a18995]">即刻缓解压力的小方法</div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 p-3">
                          <div className="p-3 bg-white/50 rounded-lg border border-[#ffdae6]">
                            <span className="iconify block text-xl text-[#ff6b95] mb-1" data-icon="mdi:music-note"></span>
                            <div className="text-xs font-medium">音疗电台</div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg border border-[#ffdae6]">
                            <span className="iconify block text-xl text-[#ff6b95] mb-1" data-icon="mdi:atom"></span>
                            <div className="text-xs font-medium">呼吸练习</div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg border border-[#ffdae6]">
                            <span className="iconify block text-xl text-[#ff6b95] mb-1" data-icon="mdi:tea"></span>
                            <div className="text-xs font-medium">茶歇时光</div>
                          </div>
                          <div className="p-3 bg-white/50 rounded-lg border border-[#ffdae6]">
                            <span className="iconify block text-xl text-[#ff6b95] mb-1" data-icon="mdi:yoga"></span>
                            <div className="text-xs font-medium">微伸展</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-[#c7a9b7] mt-2 flex items-center">
                      <span className="iconify mr-1" data-icon="mdi:heart"></span>
                      情感指数 82% · 上午 10:32
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 输入功能区 */}
            <div className="p-3 border-t border-[#eee8f0] bg-white">
              <div className="flex items-center">
                <button className="w-10 h-10 flex items-center justify-center text-[#9e9e9e] hover:text-[#ff6b95] transition">
                  <span className="iconify text-xl" data-icon="mdi:emoticon-outline"></span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-[#9e9e9e] hover:text-[#ff6b95] transition">
                  <span className="iconify text-xl" data-icon="mdi:microphone"></span>
                </button>
                <div className="flex-1 mx-2 relative">
                  <textarea 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="告诉暖阳你的心情..."
                    className="w-full min-h-[44px] max-h-[120px] p-3 rounded-xl border border-[#eee8f0] focus:border-[#ffd1dc] focus:outline-none resize-none"
                    style={{ caretColor: '#ff6b95' }}
                    rows={1}
                  />
                </div>
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff6b95] to-[#ff88a3] flex items-center justify-center text-white shadow-sm hover:shadow-md transition disabled:opacity-50"
                >
                  <span className="iconify" data-icon="mdi:send"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


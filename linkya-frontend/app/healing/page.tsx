'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

import { useChatkit } from '../../hooks/useChatkit';
import { useParticleAuth } from '../../hooks/useParticleAuth';
import { DevLogin } from '../../components/auth/DevLogin';
  const [text, setText] = useState('');
  const { messages, sendMessage, isLoading, error, selectPersona, activePersona } = useChatkit();
  const { isLoggedIn } = useParticleAuth();
export default function HealingChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


      <header className="fixed top-4 right-4 z-50"><DevLogin /></header>
  return (
    <div className="font-sans bg-gradient-to-br from-[#fff0f5] to-[#e6f7ff] min-h-screen flex justify-center items-center p-4 md:p-8">
      <Script src="https://code.iconify.design/3/3.1.1/iconify.min.js" strategy="afterInteractive" />
      <div className="w-full max-w-[1280px] max-h-[90vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row relative z-10">
        {/* 裝飾背景 */}
        <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-[500px] h-[500px] rounded-[100%] bg-[#ffd1dc]/20 blur-3xl top-[-60%] right-[-20%]" />
          <div className="absolute w-[400px] h-[400px] rounded-[100%] bg-[#b5ead7]/30 blur-3xl bottom-[-40%] left-[-10%]" />
        </div>

        {/* 行動端側欄開關 */}
        <div className="absolute top-0 left-0 z-20 p-3 md:hidden">
          <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 rounded-full bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] flex items-center justify-center shadow-sm">
            <span className="iconify text-[#ff6b95]" data-icon="mdi:menu" />
          </button>
        </div>

        {/* 側邊欄 - 人格選擇 */}
        <div className={`w-full md:w-[300px] bg-gradient-to-b from-[#fff9fb] to-[#f1fdff] p-5 border-r border-[#eee8f0] flex flex-col transition-all duration-300 absolute md:relative ${sidebarOpen ? 'left-0' : '-left-full'} md:left-0 h-[calc(100dvh-4rem)] md:h-auto top-0`}>
          <div className="absolute top-0 right-0 p-3 md:hidden">
            <button onClick={() => setSidebarOpen(false)} className="w-8 h-8 rounded-full bg-[#ff6b950d] flex items-center justify-center">
              <span className="iconify text-[#ff6b95]" data-icon="mdi:close" />
            </button>
          </div>

          <h1 className="text-2xl font-bold text-center text-[#ff6b95] mt-3 mb-8 tracking-wide">心灵伙伴</h1>

          <div className="mb-6">
            <h3 className="text-[#ff98b7] text-sm mb-4 pb-2 border-b border-[#ffe6ee]">选择你的 AI 伙伴</h3>
            <div className="space-y-5">
              {/* 溫柔人格 */}
              <div className="character-hover bg-white p-5 rounded-xl shadow-sm border border-[#ffeef3] transition-all duration-300 hover:shadow-md hover:border-[#ffcce0] cursor-pointer relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ffd1dc]/20 rounded-full" />
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-14 h-14 avatar-3d animate-pulse-soft bg-gradient-to-r from-[#ffd1dc] to-[#ffcedb] rounded-full flex items-center justify-center">
                      <span className="iconify text-3xl text-white" data-icon="mdi:flower" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#ff6b95]">暖阳</h4>
                    <p className="text-xs text-[#c7a9b7] mt-1">温柔陪伴 · 细腻倾听</p>
                  </div>
                </div>
                <div className="text-xs text-[#a18995] mt-3 pl-1">
                  <span className="iconify align-middle mr-1" data-icon="mdi:star-circle" />
                  擅长：情绪支持 · 倾听 · 温暖陪伴
                </div>
              </div>

              {/* 熱情人格 */}
              <div className="character-hover bg-white p-5 rounded-xl shadow-sm border border-[#fff8e0] transition-all duration-300 hover:shadow-md hover:border-[#ffe3a3] cursor-pointer relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ffe3a3]/30 rounded-full" />
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-14 h-14 avatar-3d animate-pulse-soft bg-gradient-to-r from-[#ffd47a] to-[#ffb95f] rounded-full flex items-center justify-center">
                      <span className="iconify text-3xl text-white" data-icon="mdi:fire" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#ff9a00]">晨光</h4>
                    <p className="text-xs text-[#c0aa72] mt-1">积极鼓励 · 行动建议</p>
                  </div>
                </div>
                <div className="text-xs text-[#a18995] mt-3 pl-1">
                  <span className="iconify align-middle mr-1" data-icon="mdi:star-circle" />
                  擅长：激励 · 计划 · 反馈
                </div>
              </div>

              {/* 穩重人格 */}
              <div className="character-hover bg-white p-5 rounded-xl shadow-sm border border-[#dfe9e5] transition-all duration-300 hover:shadow-md hover:border-[#bfd2cb] cursor-pointer relative overflow-hidden">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#bfd2cb]/20 rounded-full" />
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-14 h-14 avatar-3d animate-pulse-soft bg-gradient-to-r from-[#89a89b] to-[#6f8f82] rounded-full flex items-center justify-center">
                      <span className="iconify text-3xl text-white" data-icon="mdi:leaf" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-[#6f8f82]">青岚</h4>
                    <p className="text-xs text-[#7d8e88] mt-1">理性笃定 · 结构化建议</p>
                  </div>
                </div>
                <div className="text-xs text-[#7d8e88] mt-3 pl-1">
                  <span className="iconify align-middle mr-1" data-icon="mdi:star-circle" />
                  擅长：分析 · 决策 · 复盘
                </div>
              </div>
            </div>
          </div>

          {/* 近期對話 */}
          <div className="mt-auto">
            <h3 className="text-[#9aa0a6] text-xs mb-3 pb-2 flex items-center">
              <span className="iconify mr-1" data-icon="mdi:history" />
              最近对话
            </h3>
            <div className="space-y-3">
              <div className="flex items-center p-2 hover:bg-[#f1fdff] rounded-lg transition">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ffd1dc] to-[#ffbbc7] rounded-full flex items-center justify-center">
                  <span className="iconify text-white" data-icon="mdi:flower" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-xs text-[#ff6b95] font-medium">暖阳</div>
                  <div className="text-xs text-[#c7a9b7] truncate">你刚刚提到的焦虑，我们可以慢慢拆解…</div>
                </div>
                <div className="text-xs text-[#a18995]">昨天</div>
              </div>
              <div className="flex items-center p-2 hover:bg-[#f1fdff] rounded-lg transition">
                <div className="w-10 h-10 bg-gradient-to-br from-[#ffb95f] to-[#ffa62e] rounded-full flex items-center justify-center">
                  <span className="iconify text-white" data-icon="mdi:weather-sunny" />
                </div>
                <div className="ml-3 flex-1">
                  <div className="text-xs text-[#ffa600] font-medium">晨光</div>
                  <div className="text-xs text-[#d0b98d] truncate">元气满满开始新的一天吧！</div>
                </div>
                <div className="text-xs text-[#c0aa72]">今天</div>
              </div>
            </div>
          </div>
        </div>

        {/* 主聊天區 */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-white to-[#f9f9fe] relative">
          {/* 頂部狀態欄 */}
          <div className="p-4 border-b border-[#eee8f0] z-10 flex items-center">
            <div className="relative">
              <div className="w-14 h-14 animate-pulse-soft bg-gradient-to-r from-[#ffd1dc] to-[#ffcedb] rounded-full flex items-center justify-center">
                <span className="iconify text-2xl text-white" data-icon="mdi:flower" />
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="ml-4 flex-1">
              <h2 className="font-bold text-[#ff6b95]">暖阳 <span className="text-xs bg-pink-100 text-[#ff6b95] font-normal px-2 py-1 rounded-full ml-2">温柔型</span></h2>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                <span className="text-xs text-[#c7a9b7]">实时在线</span>
              </div>
            </div>
            <button className="p-2 rounded-full hover:bg-[#ffecf2] text-[#c7a9b7] transition"><span className="iconify" data-icon="mdi:cog-outline" /></button>
          </div>

          {/* 情緒指示 */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#fff0f5] to-[#f0ffff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="iconify text-xl mr-2 text-[#ff6b95]" data-icon="mdi:heart-multiple" />
                <span className="text-xs text-[#ff6b95]">当前情绪状态平稳</span>
              </div>
              <div className="flex">
          {/* 訊息區 */
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            <div className="space-y-4 pb-24">
              {messages.map((m, idx) => {
                const isLLM = activePersona && m.userId === activePersona.id;
                return (
                  <div key={idx} className={isLLM ? "flex w-full" : "flex justify-end w-full"}>
                    {isLLM && (
                      <div className="w-10 h-10 mr-3 flex-shrink-0 rounded-full bg-[#ffd1dc] flex items-center justify-center">
                        <span className="iconify text-white" data-icon="mdi:flower" />
                      </div>
                    )}
                    <div className="max-w-[85%] md:max-w-[480px]">
                      <div className={isLLM ? "message-animate bg-gradient-to-r from-[#ffecf2] to-[#ffe6ee] text-[#6a4d5a] rounded-r-2xl rounded-bl-2xl p-[14px] border border-[#ffdae6]" : "message-animate bg-gradient-to-r from-[#d7f2ff] to-[#c5ebff] text-[#446d7d] rounded-l-2xl rounded-br-2xl p-[14px] border border-[#cae6f5]"}>
                        {m.text}
                      </div>
                    </div>
                    {!isLLM && (
                      <div className="w-10 h-10 ml-3 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center">
                        <span className="iconify text-white" data-icon="mdi:account" />
                      </div>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="text-center text-sm text-[#a18995]">正在思考中…</div>
              )}
              {error && (
                <div className="text-center text-sm text-red-600">{error}</div>
              )}
            </div>
          </div>

          {/* 底部輸入 */
                  <div className="text-xs text-[#98b8c6] mt-2 flex justify-end">上午 10:30</div>
                </div>
                <div className="w-10 h-10 ml-3 flex-shrink-0 rounded-full bg-gradient-to-r from-sky-400 to-blue-400 flex items-center justify-center">
                  <span className="iconify text-white" data-icon="mdi:account" />
                </div>
              </div>
            </div>
          </div>

          {/* 底部輸入 */}
                <input className="flex-1 py-3 outline-none text-sm placeholder:text-[#b8a9b2]" placeholder="輸入想說的話…" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter"){ sendMessage(text).then(()=>setText("")); } }} />
            <div className="flex items-center gap-3 mb-3">
              <button className="px-3 py-1.5 text-xs rounded-full bg-[#ffecf2] text-[#ff6b95] hover:bg-[#ffe1ea] transition">聊聊今天</button>
              <button className="px-3 py-1.5 text-xs rounded-full bg-[#e6fbf3] text-[#1aa176] hover:bg-[#d6f6eb] transition">需要建议</button>
              <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff6b95] to-[#ff88a3] text-white shadow hover:from-[#ff5a89] hover:to-[#ff769a] transition disabled:opacity-60" disabled={!isLoggedIn || !text} onClick={()=>{ sendMessage(text).then(()=>setText("")); }}>
                <span className="iconify text-xl" data-icon="mdi:send" />
              </button>
              <div className="flex-1 flex items-center bg-white border border-[#eee8f0] rounded-xl px-3">
                <input className="flex-1 py-3 outline-none text-sm placeholder:text-[#b8a9b2]" placeholder="输入想说的话…" />
                <button className="p-2 rounded-lg hover:bg-[#ffecf2] text-[#ff6b95] transition"><span className="iconify" data-icon="mdi:attachment" /></button>
                <button className="p-2 rounded-lg hover:bg-[#e8f1ff] text-[#3b82f6] transition"><span className="iconify" data-icon="mdi:microphone" /></button>
              </div>
              <button className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#ff6b95] to-[#ff88a3] text-white shadow hover:from-[#ff5a89] hover:to-[#ff769a] transition">
                <span className="iconify text-xl" data-icon="mdi:send" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for page-specific animations */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes pulse-soft { 0%, 100% { transform: scale(1); opacity: .9 } 50% { transform: scale(1.05); opacity: 1 } }
        @keyframes bubble { 0% { opacity: 0; transform: translateY(12px) } 100% { opacity: 1; transform: translateY(0) } }
        .message-animate { animation: bubble .3s cubic-bezier(.18,.89,.32,1.28) forwards }
        .avatar-3d { box-shadow: 0 3px 20px rgba(255,200,221,.5), inset 0 0 12px rgba(255,255,255,.8); transform: perspective(350px) rotateY(-6deg); transition: all .25s ease }
        .character-hover:hover .avatar-3d { transform: perspective(350px) rotateY(0deg); box-shadow: 0 6px 25px rgba(255,180,200,.7), inset 0 0 15px #fff }
        .emotion-dot { box-shadow: 0 0 8px currentColor }
        .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite }
      `}</style>
    </div>
  );
}

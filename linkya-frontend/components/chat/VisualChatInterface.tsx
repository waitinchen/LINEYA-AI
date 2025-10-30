'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useChatkit } from '../../hooks/useChatkit';
import { useParticleAuth } from '../../hooks/useParticleAuth';
import { PipiCharacter } from './PipiCharacter';
import { HeartWindow, HeartWindowEngineRef } from './HeartWindow';
import { ContextManagementPanel } from './ContextManagementPanel';


interface VisualChatInterfaceProps {
  className?: string;
}

export const VisualChatInterface: React.FC<VisualChatInterfaceProps> = ({ className = '' }) => {
  const { messages, sendMessage, isLoading, error } = useChatkit();
  const { currentUser, activePersona } = useParticleAuth();
  
  const [messageInput, setMessageInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [llmName, setLlmName] = useState('LINYA');
  const [showNameEditModal, setShowNameEditModal] = useState(false);
  const [showContextPanel, setShowContextPanel] = useState(false);
  const [contextLength, setContextLength] = useState(100);
  const [currentMood, setCurrentMood] = useState('normal');
  const [density, setDensity] = useState<'compact' | 'comfortable'>('comfortable');
  const [showPipi, setShowPipi] = useState(true);
  const [pipiScale, setPipiScale] = useState(0.7);
  
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const heartWindowRef = useRef<HeartWindowEngineRef>(null);

  // 處理皮皮表情變化
  const handlePipiExpressionChange = useCallback((expression: string) => {
    setCurrentMood(expression);
    if (heartWindowRef.current) {
      heartWindowRef.current.setMood(expression);
    }
  }, []);

  // 處理皮皮說話
  const handlePipiSpeech = useCallback((message: string) => {
    console.log(`🐻 皮皮說話: ${message}`);
  }, []);

  // 自動滾動到最新消息
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // 處理發送消息
  const handleSendMessage = useCallback(async () => {
    const message = messageInput.trim();
    if (!message || isProcessing) return;
    
    setIsProcessing(true);
    
    setMessageInput('');
    
    try {
      // 發送消息到LLM
      await sendMessage(message);
      
    } catch (error) {
      console.error('LLM請求失敗:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [messageInput, isProcessing, sendMessage]);

  // 添加消息到聊天框
  const addMessageToChat = (role: string, content: string) => {
    // 這裡會通過 useChatkit hook 來管理消息
    console.log(`添加消息: ${role} -> ${content}`);
  };


  // 處理鍵盤事件
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={`visual-chat-interface ${className}`}>
      {/* 加載覆蓋層（僅在載入時顯示） */}
      {isLoading && (
        <div className="loading-overlay" id="loadingOverlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">正在載入靈芽(LINYA)...</div>
        </div>
      )}
      
      <div className="main-container">
        <HeartWindow ref={heartWindowRef} mood={currentMood} />
      </div>
      
      {/* 工具列：密度/皮皮 */}
      <div className="toolbar">
        <button className="toolbar-btn" onClick={() => setDensity(density === 'comfortable' ? 'compact' : 'comfortable')}>
          {density === 'comfortable' ? '切換為緊湊' : '切換為寬鬆'}
        </button>
        <button className="toolbar-btn" onClick={() => setShowPipi(!showPipi)}>
          {showPipi ? '隱藏皮皮' : '顯示皮皮'}
        </button>
      </div>

      {/* 提示條（非對話訊息） */}
      {!currentUser && (
        <div className="banner-info">尚未登入。請使用右上角「Dev 登入」或前往登入頁。</div>
      )}

      <div className={`chat-messages ${density}`} ref={chatMessagesRef}>
        {messages.map((message, index) => {
          const isLLM = message.userId === activePersona?.id;
          const name = message.userName || (isLLM ? llmName : currentUser?.name || '你');
          const avatar = isLLM
            ? `https://api.dicebear.com/7.x/identicon/svg?seed=${llmName}`
            : `https://api.dicebear.com/7.x/identicon/svg?seed=${currentUser?.walletAddress || 'guest'}`;
          const time = message.timestamp ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
          return (
            <div key={index} className={`message-row ${isLLM ? 'left' : 'right'}`}>
              {isLLM && <img className="avatar" src={avatar} alt={name || 'AI'} />}
              <div className={`message ${isLLM ? 'llm' : 'user'}`}>
                <div className="meta">
                  <span className="name">{name}</span>
                  {time && <span className="time">{time}</span>}
                </div>
                <div className="text">{message.text}</div>
              </div>
              {!isLLM && <img className="avatar" src={avatar} alt={name || '你'} />}
            </div>
          );
        })}
        {isLoading && (
          <div className="message llm">
            語氣靈正在思考...
          </div>
        )}
        {error && (
          <div className="message llm">{error}</div>
        )}
      </div>
      
      {showPipi && (
        <div style={{ transform: `scale(${pipiScale})`, transformOrigin: 'bottom left' }}>
          <PipiCharacter 
            onExpressionChange={handlePipiExpressionChange}
            onSpeech={handlePipiSpeech}
          />
        </div>
      )}
      
      <div className="input-container">
        <input 
          type="text" 
          className="message-input" 
          placeholder="輸入訊息..." 
          maxLength={500}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-button" 
          onClick={handleSendMessage}
          disabled={isProcessing}
        >
          <div className="send-icon">✈</div>
        </button>
      </div>
      
      <div className="llm-info">
        <div 
          className="llm-avatar" 
          onClick={() => setShowNameEditModal(true)}
          onDoubleClick={() => setShowContextPanel(true)}
          title="單擊編輯名稱，雙擊管理上下文"
        >
          <div className="llm-sparkles">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="llm-sparkle"></div>
            ))}
          </div>
        </div>
        <div 
          className="llm-name" 
          onClick={() => setShowNameEditModal(true)}
        >
          {llmName}
        </div>
      </div>
      
      <div className="user-info">
        <img 
          className="user-avatar" 
          src={currentUser?.walletAddress ? `https://api.dicebear.com/7.x/identicon/svg?seed=${currentUser.walletAddress}` : '/default-avatar.png'} 
          alt="用戶頭像"
        />
        <div className="user-name">
          {currentUser?.walletAddress ? `${currentUser.walletAddress.slice(0, 6)}...${currentUser.walletAddress.slice(-4)}` : '用戶'}
        </div>
      </div>
      
      {/* 名稱編輯模態框 */}
      {showNameEditModal && (
        <div className="name-edit-modal show">
          <div className="name-edit-title">修改語氣靈名稱</div>
          <input 
            type="text" 
            className="name-edit-input" 
            placeholder="輸入新名稱（最多5個中文字）" 
            maxLength={5}
            value={llmName}
            onChange={(e) => setLlmName(e.target.value)}
          />
          <div className="name-edit-buttons">
            <button 
              className="name-edit-btn" 
              onClick={() => {
                setShowNameEditModal(false);
              }}
            >
              保存
            </button>
            <button 
              className="name-edit-btn cancel" 
              onClick={() => setShowNameEditModal(false)}
            >
              取消
            </button>
          </div>
        </div>
      )}
      
      <ContextManagementPanel
        isVisible={showContextPanel}
        onClose={() => setShowContextPanel(false)}
        messageCount={messages.length}
        contextLength={contextLength}
        onContextLengthChange={setContextLength}
        onCompressContext={() => console.log('壓縮上下文')}
        onClearContext={() => console.log('清空上下文')}
        onTogglePipiInterruption={() => console.log('切換皮皮插話')}
      />
      
      <style jsx>{`
        .visual-chat-interface {
          font-family: 'Microsoft JhengHei', 'PingFang TC', sans-serif;
          background: linear-gradient(135deg, #2D1B69 0%, #1A0B3D 100%);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          margin: 0;
          padding: 0;
          position: relative;
        }
        
        .main-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 40px 15px;
          padding-top: calc(env(safe-area-inset-top, 20px) + 40px);
          padding-bottom: calc(env(safe-area-inset-bottom, 20px) + 40px);
        }
        
        .heart-window-container {
          position: relative;
          width: min(500px, 80vw);
          height: min(500px, 80vw);
          margin-bottom: 20px;
        }
        
        .heart-window-canvas {
          width: 100%;
          height: 100%;
          opacity: 0.3;
          border-radius: 50%;
          overflow: hidden;
        }
        
        .heart-window-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: heartPulse 4.5s infinite ease-in-out;
        }
        
        /* 工具列與提示條 */
        .toolbar { position: fixed; top: calc(env(safe-area-inset-top, 20px) + 64px); right: 2%; display:flex; gap:8px; z-index:41; }
        .toolbar-btn { background: rgba(255,255,255,0.12); color:#fff; border:1px solid rgba(255,255,255,0.2); padding:6px 10px; border-radius:8px; font-size:12px; }
        .banner-info { position: fixed; top: calc(env(safe-area-inset-top, 20px) + 64px); left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.12); color:#fff; border:1px solid rgba(255,255,255,0.2); padding:8px 12px; border-radius:10px; z-index:40; }
        
        .input-container {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 20px) + 20px);
          left: 2%;
          right: 2%;
          width: 96%;
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 12px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          z-index: 1000;
          box-sizing: border-box;
        }
        
        .pipi-container {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 20px) + 100px);
          left: 2%;
          width: 120px;
          height: 60px;
          pointer-events: none;
          z-index: 1000;
        }
        
        .pipi-mini {
          position: absolute;
          font-size: 1.8em;
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          transition: all 0.3s ease;
          pointer-events: auto;
          animation: pipiHorizontalMove 12s ease-in-out infinite;
          display: flex !important;
          align-items: center;
          justify-content: center;
          bottom: 0;
          left: 0;
          z-index: 1001;
          width: 120px;
          height: 60px;
          visibility: visible !important;
          opacity: 1 !important;
          white-space: nowrap;
          overflow: hidden;
        }
        
        .pipi-face {
          position: relative;
          display: inline-block;
          white-space: nowrap;
          font-size: inherit;
          line-height: 1;
        }
        
        .pipi-eyes {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 8px;
          animation: pipiEyeBlink 3s ease-in-out infinite;
        }
        
        .pipi-eye {
          width: 6px;
          height: 6px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 50%;
        }
        
        .pipi-mini:hover {
          transform: scale(1.2);
        }
        
        .pipi-speech-bubble {
          position: absolute;
          bottom: 60px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.95);
          color: #333;
          padding: 8px 12px;
          border-radius: 15px;
          font-size: 14px;
          max-width: 300px;
          min-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1000;
          pointer-events: none;
        }
        
        .pipi-speech-bubble.show {
          opacity: 1;
          visibility: visible;
        }
        
        .pipi-speech-bubble::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-top: 8px solid rgba(255, 255, 255, 0.95);
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }
        
        .message-input {
          background: transparent;
          border: none;
          outline: none;
          color: white;
          font-size: 16px;
          width: 100%;
          padding: 8px 12px;
          font-size: 16px;
          -webkit-appearance: none;
          border-radius: 0;
        }
        
        .message-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .send-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          margin-left: auto;
          flex-shrink: 0;
          min-width: 40px;
        }
        
        .send-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        
        .send-button:active {
          transform: translateY(0);
        }
        
        .send-icon {
          color: white;
          font-size: 18px;
        }
        
        .chat-messages {
          position: fixed;
          top: calc(env(safe-area-inset-top, 20px) + 110px);
          left: 2%;
          right: 2%;
          width: 96%;
          bottom: calc(env(safe-area-inset-bottom, 20px) + 140px);
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          -webkit-overflow-scrolling: touch;
        }
        .chat-messages.compact { gap: 6px; }
        .chat-messages.compact .message { padding: 8px 12px; font-size: 14px; }
        .chat-messages.compact .meta { font-size: 11px; }

        .message-row { display: flex; gap: 8px; align-items: flex-end; }
        .message-row.right { justify-content: flex-end; }
        .message-row.left { justify-content: flex-start; }
        .avatar { width: 28px; height: 28px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.25); }
        
        .message {
          max-width: 85%;
          padding: 12px 16px;
          border-radius: 18px;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.3s ease;
          word-wrap: break-word;
          word-break: break-word;
        }
        .message .meta { display:flex; gap:8px; align-items:center; margin-bottom:4px; opacity:0.8; font-size:12px; }
        .message .text { white-space: pre-wrap; }
        
        .message.user {
          background: rgba(102, 126, 234, 0.2);
          border: 1px solid rgba(102, 126, 234, 0.3);
          align-self: flex-end;
          color: white;
        }
        
        .message.llm {
          background: rgba(102, 126, 234, 0.2);
          border: 1px solid rgba(102, 126, 234, 0.3);
          align-self: flex-start;
          color: white;
        }
        
        .user-info {
          position: fixed !important;
          top: calc(env(safe-area-inset-top, 20px) + 20px) !important;
          right: 4% !important;
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 6px 12px;
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 150px;
          z-index: 1000;
        }
        
        .user-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }
        
        .user-name {
          font-weight: 500;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        
        .llm-info {
          position: fixed;
          top: calc(env(safe-area-inset-top, 20px) + 20px);
          left: 2%;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          padding: 6px 12px;
          border-radius: 20px;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
        }
        
        .llm-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: radial-gradient(circle, #00bfff 0%, #0080ff 50%, #0040ff 100%);
          position: relative;
          overflow: hidden;
          animation: llmRotate 2s linear infinite;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .llm-avatar::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%);
          border-radius: 50%;
          animation: llmPulse 1.5s ease-in-out infinite alternate;
        }
        
        .llm-avatar::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20%;
          height: 20%;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          animation: llmCore 1s ease-in-out infinite alternate;
        }
        
        .llm-sparkles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          animation: llmSparklesRotate 3s linear infinite;
        }
        
        .llm-sparkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
        }
        
        .llm-sparkle:nth-child(1) { top: 20%; left: 50%; animation: llmSparkleRotate1 4s linear infinite; }
        .llm-sparkle:nth-child(2) { top: 35%; left: 75%; animation: llmSparkleRotate2 3.5s linear infinite; }
        .llm-sparkle:nth-child(3) { top: 65%; left: 75%; animation: llmSparkleRotate3 3.5s linear infinite; }
        .llm-sparkle:nth-child(4) { top: 80%; left: 50%; animation: llmSparkleRotate4 4s linear infinite; }
        .llm-sparkle:nth-child(5) { top: 65%; left: 25%; animation: llmSparkleRotate5 3.5s linear infinite; }
        .llm-sparkle:nth-child(6) { top: 35%; left: 25%; animation: llmSparkleRotate6 3.5s linear infinite; }
        .llm-sparkle:nth-child(7) { top: 50%; left: 10%; animation: llmSparkleRotate7 3s linear infinite; }
        .llm-sparkle:nth-child(8) { top: 50%; left: 90%; animation: llmSparkleRotate8 3s linear infinite; }
        .llm-sparkle:nth-child(9) { top: 50%; left: 50%; animation: llmSparkleRotate9 5s linear infinite; }
        
        .llm-name {
          font-weight: 500;
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .llm-name:hover {
          color: rgba(255, 255, 255, 1);
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
        }
        
        .name-edit-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
          display: none;
        }
        
        .name-edit-modal.show {
          display: block;
        }
        
        .name-edit-title {
          color: white;
          font-size: 18px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .name-edit-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          padding: 12px 15px;
          color: white;
          font-size: 16px;
          width: 200px;
          margin-bottom: 20px;
          outline: none;
        }
        
        .name-edit-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }
        
        .name-edit-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        
        .name-edit-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .name-edit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .name-edit-btn.cancel {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .context-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          padding: 30px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
          display: none;
          min-width: 400px;
        }
        
        .context-panel.show {
          display: block;
        }
        
        .context-title {
          color: white;
          font-size: 18px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .context-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .context-stat {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
        }
        
        .context-stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          margin-bottom: 5px;
        }
        
        .context-stat-value {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }
        
        .context-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .context-slider {
          flex: 1;
          margin: 0 10px;
        }
        
        .context-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
        }
        
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #2D1B69 0%, #1A0B3D 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          transition: opacity 0.5s ease;
        }
        
        .loading-spinner {
          width: 60px;
          height: 60px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .loading-text {
          color: white;
          font-size: 16px;
          text-align: center;
        }
        
        @keyframes heartPulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 0.2;
          }
        }
        
        @keyframes pipiHorizontalMove {
          0% { transform: translateX(0px); }
          20% { transform: translateX(calc(100% - 120px)); }
          40% { transform: translateX(0px); }
          60% { transform: translateX(calc(100% - 120px)); }
          80% { transform: translateX(0px); }
          100% { transform: translateX(calc(100% - 120px)); }
        }
        
        @keyframes pipiEyeBlink {
          0%, 90%, 100% {
            transform: translate(-50%, -50%) scaleY(1);
            opacity: 1;
          }
          92%, 98% {
            transform: translate(-50%, -50%) scaleY(0.1);
            opacity: 0.3;
          }
        }
        
        @keyframes llmRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes llmPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes llmCore {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }
        
        @keyframes llmSparklesRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes llmSparkleRotate1 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate2 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate3 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate4 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate5 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate6 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate7 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate8 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes llmSparkleRotate9 { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* 手機版媒體查詢 */
        @media screen and (max-width: 768px) {
          .main-container {
            padding: 2% 2%;
            margin: 0;
            width: 96%;
            max-width: none;
          }
          
          .heart-window-container {
            width: min(400px, 70vw);
            height: min(400px, 70vw);
            margin-bottom: 15px;
          }
          
          .input-container {
            padding: 10px 15px;
            gap: 8px;
            border-radius: 20px;
            width: calc(100% - 4%);
            margin: 0 2%;
            box-sizing: border-box;
          }
          
          .message-input {
            font-size: 16px;
            padding: 6px 10px;
          }
          
          .send-button {
            width: 36px;
            height: 36px;
            min-width: 36px;
          }
          
          .send-icon {
            font-size: 16px;
          }
          
          .chat-messages {
            padding: 10px;
            gap: 10px;
            left: 2%;
            right: 2%;
            width: 96%;
          }
          
          .message {
            padding: 10px 14px;
            border-radius: 16px;
            font-size: 14px;
          }
          
          .pipi-mini {
            font-size: 1.5em;
            width: 100px;
            height: 55px;
            white-space: nowrap;
          }
          
          .pipi-speech-bubble {
            font-size: 12px;
            padding: 6px 10px;
            max-width: 250px;
            min-width: 150px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .user-info, .llm-info {
            padding: 4px 8px;
            font-size: 11px;
          }
          
          .user-info {
            max-width: 120px;
            right: 6% !important;
            top: calc(env(safe-area-inset-top, 20px) + 15px) !important;
          }
          
          .llm-info {
            left: 2%;
          }
          
          .user-avatar, .llm-avatar {
            width: 20px;
            height: 20px;
          }
          
          .name-edit-modal {
            padding: 20px;
            margin: 0 20px;
          }
          
          .name-edit-input {
            width: 100%;
            max-width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

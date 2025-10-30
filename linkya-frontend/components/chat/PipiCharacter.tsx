'use client';

import React, { useState, useEffect, useRef } from 'react';

// 皮皮表情系統
const pipiExpressions = {
  normal: 'ʕ • ᴥ • ʔ',
  happy: 'ʕ◉ᴥ◉ʔ',
  surprised: 'ʕ◉ᴥ◉ʔ',
  confused: 'ʕᴥ• ʔ',
  shy: 'ʕ •ᴥʔ',
  sad: 'ʕ·ᴥ·ʔ',
  excited: 'ʕ◉ᴥ◉ʔ',
  love: 'ʕ￫ᴥ￩ʔ'
};

interface PipiCharacterProps {
  onSpeech?: (message: string) => void;
  onExpressionChange?: (expression: string) => void;
  className?: string;
}

export const PipiCharacter: React.FC<PipiCharacterProps> = ({ 
  onSpeech, 
  onExpressionChange,
  className = '' 
}) => {
  const [currentExpression, setCurrentExpression] = useState('normal');
  const [speechText, setSpeechText] = useState('');
  const [showSpeech, setShowSpeech] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 觸發皮皮反應
  const triggerReaction = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // 隨機選擇表情
    const expressions = Object.keys(pipiExpressions);
    const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
    
    setCurrentExpression(randomExpression);
    onExpressionChange?.(randomExpression);
    
    // 顯示隨機說話
    const pipiMessages = [
      '皮皮在觀察...',
      '好有趣～',
      '皮皮想說話...',
      '嗯...',
      '皮皮聽到了！',
      '好神奇～',
      '皮皮在思考...',
      '哇！',
      '皮皮覺得...',
      '嗯嗯～',
      '皮皮明白了！',
      '好棒！'
    ];
    
    const randomMessage = pipiMessages[Math.floor(Math.random() * pipiMessages.length)];
    setSpeechText(randomMessage);
    setShowSpeech(true);
    onSpeech?.(randomMessage);
    
    // 清除之前的定時器
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    
    // 9秒後隱藏氣泡
    speechTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
    }, 9000);
    
    // 動畫完成後重置狀態
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // 手動設置表情
  const setExpression = (expression: string) => {
    if (pipiExpressions[expression as keyof typeof pipiExpressions]) {
      setCurrentExpression(expression);
      onExpressionChange?.(expression);
    }
  };

  // 手動顯示說話
  const showSpeechBubble = (text: string) => {
    setSpeechText(text);
    setShowSpeech(true);
    onSpeech?.(text);
    
    // 清除之前的定時器
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    
    // 9秒後隱藏氣泡
    speechTimeoutRef.current = setTimeout(() => {
      setShowSpeech(false);
    }, 9000);
  };

  // 暴露方法給父組件
  useEffect(() => {
    // 將方法暴露到 window 對象，方便調用
    (window as any).pipiCharacter = {
      triggerReaction,
      setExpression,
      showSpeechBubble,
      currentExpression,
      isAnimating
    };
  }, [currentExpression, isAnimating]);

  // 清理定時器
  useEffect(() => {
    return () => {
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`pipi-character ${className}`}>
      <div className="pipi-container">
        <div 
          className={`pipi-mini ${isAnimating ? 'animating' : ''}`}
          onClick={triggerReaction}
          title="點擊讓皮皮插話"
        >
          <div className="pipi-face">
            {pipiExpressions[currentExpression as keyof typeof pipiExpressions]}
            <div className="pipi-eyes">
              <div className="pipi-eye"></div>
              <div className="pipi-eye"></div>
            </div>
          </div>
        </div>
        <div className={`pipi-speech-bubble ${showSpeech ? 'show' : ''}`}>
          {speechText}
        </div>
      </div>
      
      <style jsx>{`
        .pipi-character {
          position: relative;
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
        
        .pipi-mini.animating {
          animation: pipiJump 0.6s ease-in-out;
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
        
        @keyframes pipiJump {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px) scale(1.1); }
          100% { transform: translateY(0px); }
        }
        
        /* 手機版優化 */
        @media screen and (max-width: 768px) {
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
        }
      `}</style>
    </div>
  );
};









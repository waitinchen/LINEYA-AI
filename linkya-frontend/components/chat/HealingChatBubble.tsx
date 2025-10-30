'use client';

import React from 'react';

interface HealingChatBubbleProps {
  message: {
    text: string;
    timestamp?: Date;
    userId: string;
    userName: string;
    type?: string;
  };
  isUser: boolean;
  mood: 'happy' | 'calm' | 'concerned';
}

/**
 * 治愈系对话气泡组件
 * 根据情感化设计参考文档，使用圆润云朵气泡和温暖色调
 */
export const HealingChatBubble: React.FC<HealingChatBubbleProps> = ({ 
  message, 
  isUser,
  mood 
}) => {
  const getBubbleStyle = () => {
    if (isUser) {
      // 用户消息：使用蓝色系
      return 'bg-gradient-to-br from-blue-400 to-cyan-500 text-white rounded-l-[20px] rounded-tr-[20px] rounded-br-[4px]';
    } else {
      // AI消息：根据心情变化颜色
      const moodColors: Record<'happy' | 'calm' | 'concerned', string> = {
        happy: 'from-pink-300 to-rose-400',
        calm: 'from-pink-100 to-pink-200',
        concerned: 'from-purple-100 to-purple-200'
      };
      return `bg-gradient-to-br ${moodColors[mood]} text-gray-800 rounded-r-[20px] rounded-tl-[20px] rounded-bl-[4px] border border-white/50`;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} message-animate`}>
      <div className="max-w-[85%] md:max-w-[75%]">
        <div className={`${getBubbleStyle()} p-4 shadow-md`}>
          <div className="flex items-start space-x-2">
            {!isUser && (
              <span className="text-xl flex-shrink-0">
                {mood === 'happy' ? '😊' : mood === 'concerned' ? '🤗' : '😌'}
              </span>
            )}
            <div className="flex-1">
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.text}
              </div>
              {message.timestamp && (
                <div className={`text-xs mt-2 ${
                  isUser ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

<style jsx>{`
  @keyframes message-bubble {
    0% {
      opacity: 0;
      transform: translateY(10px) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  
  .message-animate {
    animation: message-bubble 0.35s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards;
  }
`}</style>





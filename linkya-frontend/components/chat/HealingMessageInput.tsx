'use client';

import React, { useState } from 'react';

interface HealingMessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  currentMood: 'happy' | 'calm' | 'concerned';
}

/**
 * 治愈系消息输入组件
 * 基于治愈AI设计参考的多模态输入系统
 */
export const HealingMessageInput: React.FC<HealingMessageInputProps> = ({
  onSendMessage,
  isLoading,
  currentMood
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = async () => {
    if (input.trim() && !isLoading) {
      await onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const moodPlaceholders: Record<'happy' | 'calm' | 'concerned', string> = {
    happy: '分享你的快乐吧～',
    calm: '和暖心小咪聊聊今天的事...',
    concerned: '有什么烦恼想要倾诉？'
  };

  return (
    <div className="p-4 border-t border-pink-100 bg-white/90 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-end space-x-2">
          {/* 表情按钮 */}
          <button 
            className="w-10 h-10 flex items-center justify-center text-pink-500 hover:bg-pink-50 rounded-full transition-colors"
            title="添加表情"
          >
            <span className="iconify text-xl" data-icon="mdi:emoticon"></span>
          </button>
          
          {/* 语音输入 */}
          <button 
            className="w-10 h-10 flex items-center justify-center text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
            title="语音输入"
          >
            <span className="iconify text-xl" data-icon="mdi:microphone"></span>
          </button>
          
          {/* 图片上传 */}
          <button 
            className="w-10 h-10 flex items-center justify-center text-green-500 hover:bg-green-50 rounded-full transition-colors"
            title="上传图片"
          >
            <span className="iconify text-xl" data-icon="mdi:image"></span>
          </button>
          
          {/* 输入框 */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={moodPlaceholders[currentMood]}
              className="w-full min-h-[48px] max-h-[120px] px-4 py-3 pr-12 rounded-xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none resize-none transition-colors"
              rows={1}
              disabled={isLoading}
              style={{ 
                caretColor: '#ec4899',
                scrollbarWidth: 'thin',
                scrollbarColor: '#fce7f3 #fff'
              }}
            />
            {input && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="absolute right-2 bottom-2 w-8 h-8 bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-lg hover:from-pink-500 hover:to-rose-600 disabled:opacity-50 transition-all flex items-center justify-center"
              >
                {isLoading ? (
                  <span className="iconify animate-spin" data-icon="mdi:loading"></span>
                ) : (
                  <span className="iconify" data-icon="mdi:send"></span>
                )}
              </button>
            )}
          </div>
        </div>
        
        {/* 提示文字 */}
        <div className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
          <span>💡 提示：Enter 发送，Shift+Enter 换行</span>
        </div>
      </div>
    </div>
  );
};






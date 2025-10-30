'use client';

import React from 'react';

interface EmotionVisualizationProps {
  data: {
    happy: number;
    neutral: number;
    concerned: number;
  };
}

/**
 * 情绪可视化组件
 * 基于治愈AI设计参考中的情绪可视化系统
 */
export const EmotionVisualization: React.FC<EmotionVisualizationProps> = ({ data }) => {
  const total = data.happy + data.neutral + data.concerned;
  
  return (
    <div className="flex items-center space-x-2">
      {/* 情绪占比可视化 */}
      <div className="flex space-x-1">
        <div 
          className="w-3 h-3 rounded-full bg-green-400 transition-all duration-300"
          style={{ opacity: data.happy / total }}
          title={`开心: ${Math.round(data.happy)}%`}
        />
        <div 
          className="w-3 h-3 rounded-full bg-gray-400 transition-all duration-300"
          style={{ opacity: data.neutral / total }}
          title={`平静: ${Math.round(data.neutral)}%`}
        />
        <div 
          className="w-3 h-3 rounded-full bg-orange-400 transition-all duration-300"
          style={{ opacity: data.concerned / total }}
          title={`关注: ${Math.round(data.concerned)}%`}
        />
      </div>
      
      <span className="text-xs text-gray-500">
        {Math.round((data.happy / total) * 100)}% 积极
      </span>
    </div>
  );
};






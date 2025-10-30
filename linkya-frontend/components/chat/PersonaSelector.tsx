'use client';

import React from 'react';
import { useChatkit } from '@/hooks/useChatkit';

interface PersonaSelectorProps {
  onSelectPersona: (personaId: string) => void;
}

/**
 * AI人格选择器
 * 基于治愈AI设计中的拟人化动物IP系统
 */
export const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelectPersona }) => {
  const { personas, activePersona } = useChatkit();

  const personasConfig = [
    {
      id: 'gentle',
      name: '暖心小咪',
      emoji: '🐱',
      color: 'from-pink-400 to-rose-400',
      personality: '温柔体贴型',
      description: '温暖的倾听伙伴'
    },
    {
      id: 'energetic',
      name: '元气小兔',
      emoji: '🐰',
      color: 'from-yellow-400 to-orange-400',
      personality: '活力满满型',
      description: '充满正能量'
    },
    {
      id: 'wise',
      name: '智慧小哲',
      emoji: '🦉',
      color: 'from-green-400 to-teal-400',
      personality: '理性思考型',
      description: '提供专业建议'
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-sm font-semibold text-pink-600 mb-4 flex items-center">
        <span className="iconify mr-2" data-icon="mdi:account-switch"></span>
        选择你的AI伙伴
      </h3>
      
      <div className="space-y-3">
        {personasConfig.map((persona) => (
          <button
            key={persona.id}
            onClick={() => onSelectPersona(persona.id)}
            className={`
              w-full p-4 rounded-xl transition-all duration-300
              bg-white border-2 hover:shadow-lg
              ${activePersona?.id === persona.id 
                ? 'border-pink-300 bg-pink-50' 
                : 'border-gray-100 hover:border-pink-200'
              }
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-14 h-14 rounded-full bg-gradient-to-br ${persona.color}
                flex items-center justify-center text-2xl flex-shrink-0
              `}>
                {persona.emoji}
              </div>
              <div className="ml-4 flex-1 text-left">
                <h4 className="font-bold text-gray-800">{persona.name}</h4>
                <p className="text-xs text-gray-500">{persona.personality}</p>
                <p className="text-xs text-gray-400 mt-1">{persona.description}</p>
              </div>
              {activePersona?.id === persona.id && (
                <span className="iconify text-pink-500" data-icon="mdi:check-circle"></span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};






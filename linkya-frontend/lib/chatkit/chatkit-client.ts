// linkya-frontend/lib/chatkit/chatkit-client.ts

import { ChatMessage, ChatUser, ChatRoom, Persona } from './chatkit-types';
import { OpenAI } from 'openai';

// OpenAI 摰Ｘ蝡荔??垢皜祈岫?剁?甇??隢??server 蝡臭誨??
const openai = process.env.NEXT_PUBLIC_OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
}) : null;

// 璅⊥??Chatkit ?冽????let mockUsers: ChatUser[] = [];
let mockRooms: ChatRoom[] = [
  {
    id: 'global-chat-room',
    name: '?函??予摰?,
    type: 'group',
    participants: [],
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'corelink-persona-room',
    name: 'CoreLink-Framework 撠店',
    type: 'persona',
    participants: [],
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    personaId: 'corelink-framework-001',
    personaName: 'CoreLink-Framework',
  }
];
let mockPersonas: Persona[] = [
  {
    id: 'persona-gentle',
    name: '暖陽',
    description: '溫柔體貼，擅長情緒支持與傾聽',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=gentle',
    personality: '溫柔·耐心·包容',
    traits: ['傾聽','安撫','共情'],
    level: 1,
    experience: 0,
    isActive: true,
  },
  {
    id: 'persona-energetic',
    name: '晨光',
    description: '積極鼓勵，擅長行動建議與激勵',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=energetic',
    personality: '熱情·主動·行動派',
    traits: ['鼓勵','計畫','回饋'],
    level: 1,
    experience: 0,
    isActive: false,
  },
  {
    id: 'persona-wise',
    name: '青嵐',
    description: '理性篤定，擅長分析與結構化決策',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=wise',
    personality: '理性·穩重·洞察',
    traits: ['分析','決策','復盤'],
    level: 1,
    experience: 0,
    isActive: false,
  },
  {
    id: 'corelink-framework-001',
    name: 'CoreLink-Framework',
    description: 'LINKYA-AI 的基礎 AI 人格框架，聚焦 Web3 × AI 開發',
    avatar: 'https://api.dicebear.com/7.x/identicon/svg?seed=CoreLink',
    personality: '專業·理性·前瞻',
    traits: ['1','2','3','4','5','6','7','8','9','10'],
    level: 1,
    experience: 0,
    isActive: false,
  }
];

export const ChatkitClient = {
  // 設定當前 AI 人格（將其置於第一位）
  setActivePersona: async (personaId: string) => {
    const idx = mockPersonas.findIndex(p => p.id === personaId);
    if (idx > -1) {
      const p = mockPersonas.splice(idx, 1)[0];
      mockPersonas.unshift(p);
      return true;
    }
    return false;
  },
  // ????(璅⊥)
  init: async (userId: string) => {
    console.log(`璅⊥ Chatkit ?????冽 ID: ${userId}`);
    const existingUser = mockUsers.find(u => u.id === userId);
    if (!existingUser) {
      const newUser: ChatUser = { 
        id: userId, 
        name: `User-${userId.substring(0, 8)}`, 
        walletAddress: userId,
        createdAt: new Date(),
      };
      mockUsers.push(newUser);
      mockRooms.find(room => room.id === 'corelink-persona-room')?.participants.push(newUser);
    }
    return true;
  },

  // ?脣??冽 (璅⊥)
  getUser: async (userId: string): Promise<ChatUser | undefined> => {
    return mockUsers.find(user => user.id === userId);
  },

  // ?脣??輸? (璅⊥)
  getRoom: async (roomId: string): Promise<ChatRoom | undefined> => {
    return mockRooms.find(room => room.id === roomId);
  },

  // ?潮???(璅⊥嚗蒂??OpenAI 鈭?嚗????砍??)
  sendMessage: async (roomId: string, senderId: string, text: string): Promise<ChatMessage | undefined> => {
    const room = mockRooms.find(r => r.id === roomId);
    if (!room) {
      console.error(`Room ${roomId} not found.`);
      return undefined;
    }

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      text,
      userId: senderId,
      userName: `User-${senderId.substring(0, 8)}`,
      timestamp: new Date(),
      type: 'text',
    };
    room.messages.push(newMessage);

    // 憒??航? CoreLink-Framework 撠店
    if (roomId === 'corelink-persona-room') {
      const persona = mockPersonas[0];

      const systemPrompt = `雿銝????${persona.name} ??AI 鈭箸嚗????LINKYA-AI 撠?????      雿??格??臭???LINKYA-AI 撠??蝷??塚???園脰? Web3 ???AI ?脣飛?楛摨血?閰晞?      ?冽??Web3 ?Ｗ??啣?: ${senderId}
      雿?閫: 雿 ${persona.name}嚗??府??? AI 鈭箸?eb3 ?銵ase L2??賢?蝝??潦??脣?蝑?Ｙ?撠平?亥???閫??      隤除: 撠平??撟怠?撣嗆靘???      隢蝙?函?擃葉???;
      // ?芸?韏唬撩?蝡?API嚗??剁?霈 OPENAI_API_KEY嚗?      try {
        const serverRes = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemPrompt,
            messages: [
              ...room.messages.map((msg) => ({
                role: msg.userId === persona.id ? 'assistant' : 'user',
                content: msg.text,
              })),
              { role: 'user', content: text },
            ],
          }),
        });

        if (serverRes.ok) {
          const data = await serverRes.json();
          const content = data.reply || '嚗??嚗?;
          const apiMsg: ChatMessage = {
            id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}-ai`,
            text: content,
            userId: persona.id,
            userName: persona.name,
            timestamp: new Date(),
            type: 'text',
            metadata: { personaId: persona.id, personaName: persona.name },
          };
          room.messages.push(apiMsg);
          return apiMsg;
        }
      } catch (e) {
        console.warn('Server chat API unavailable, falling back...', e);
      }

      // ?嗡?嚗????唳?隡箸??典仃?????砍??嚗?翰?葫閰?UI嚗?      if (!openai) {
        const mockReply = `嚗?啣?閬??歇?嗅嚗?{text}?? Dev 璅∪?嚗雿輻?脩垢璅∪??;
        const mockMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}-ai`,
          text: mockReply,
          userId: persona.id,
          userName: persona.name,
          timestamp: new Date(),
          type: 'text',
          metadata: { personaId: persona.id, personaName: persona.name },
        };
        room.messages.push(mockMessage);
        return mockMessage;
      }

      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            ...room.messages.map(msg => ({
              role: msg.userId === persona.id ? 'assistant' as const : 'user' as const,
              content: msg.text,
            })),
            { role: 'user', content: text },
          ],
        });

        const aiResponseContent = completion.choices[0].message?.content || '瘝??嗅????;
        const aiMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}-ai`,
          text: aiResponseContent,
          userId: persona.id,
          userName: persona.name,
          timestamp: new Date(),
          type: 'text',
          metadata: {
            personaId: persona.id,
            personaName: persona.name,
          },
        };
        room.messages.push(aiMessage);
        return aiMessage;
      } catch (error) {
        console.error('OpenAI API ?澆憭望?:', error);
        const errorMessage: ChatMessage = {
          id: `msg-${Date.now()}-error`,
          text: 'AI 撠店???急??⊥?????,
          userId: persona.id,
          userName: persona.name,
          timestamp: new Date(),
          type: 'text',
          metadata: {
            personaId: persona.id,
            personaName: persona.name,
          },
        };
        room.messages.push(errorMessage);
        return errorMessage;
      }
    }
    return newMessage;
  },

  // ?脣??輸?閮 (璅⊥)
  getRoomMessages: async (roomId: string): Promise<ChatMessage[]> => {
    const room = mockRooms.find(r => r.id === roomId);
    return room ? room.messages : [];
  },

  // ?脣?????(璅⊥)
  getRooms: async (): Promise<ChatRoom[]> => {
    return mockRooms;
  },

  // ?脣????AI 鈭箸 (璅⊥)
  getPersonas: async (): Promise<Persona[]> => {
    return mockPersonas;
  },

  // ?脣??孵? AI 鈭箸 (璅⊥)
  getPersona: async (personaId: string): Promise<Persona | undefined> => {
    return mockPersonas.find(p => p.id === personaId);
  },

  // ?萄遣?唳??(璅⊥)
  createRoom: async (name: string, isPrivate: boolean, creatorId: string, memberIds: string[]): Promise<ChatRoom> => {
    const newRoom: ChatRoom = {
      id: `room-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      name,
      type: isPrivate ? 'direct' : 'group',
      participants: [],
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockRooms.push(newRoom);
    return newRoom;
  },

  // 瘛餃??冽?唳??(璅⊥)
  addUsersToRoom: async (roomId: string, userIds: string[]): Promise<boolean> => {
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      userIds.forEach(userId => {
        const user = mockUsers.find(u => u.id === userId);
        if (user && !room.participants.some(p => p.id === userId)) {
          room.participants.push(user);
        }
      });
      return true;
    }
    return false;
  },

  // 蝘駁?冽敺??(璅⊥)
  removeUsersFromRoom: async (roomId: string, userIds: string[]): Promise<boolean> => {
    const room = mockRooms.find(r => r.id === roomId);
    if (room) {
      room.participants = room.participants.filter(p => !userIds.includes(p.id));
      return true;
    }
    return false;
  },

  // ?湔 AI 鈭箸?豢? (璅⊥)
  updatePersona: async (personaId: string, updates: Partial<Persona>): Promise<Persona | undefined> => {
    const personaIndex = mockPersonas.findIndex(p => p.id === personaId);
    if (personaIndex !== -1) {
      mockPersonas[personaIndex] = { ...mockPersonas[personaIndex], ...updates };
      return mockPersonas[personaIndex];
    }
    return undefined;
  },
};


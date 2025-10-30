// 對話 API
import { ChatRoom, ChatMessage, ChatUser, Persona, ChatSession } from '../chatkit/chatkit-types';

export class ChatAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '/api';
  }

  // 獲取用戶的聊天室列表
  async getUserRooms(userId: string): Promise<ChatRoom[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/rooms?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('獲取聊天室列表失敗');
      }

      const data = await response.json();
      return data.rooms;
    } catch (error) {
      console.error('獲取聊天室列表失敗:', error);
      throw error;
    }
  }

  // 創建新的聊天室
  async createRoom(roomData: {
    name: string;
    description?: string;
    type: 'direct' | 'group' | 'persona';
    participants: string[];
    personaId?: string;
    personaName?: string;
  }): Promise<ChatRoom> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (!response.ok) {
        throw new Error('創建聊天室失敗');
      }

      const data = await response.json();
      return data.room;
    } catch (error) {
      console.error('創建聊天室失敗:', error);
      throw error;
    }
  }

  // 獲取聊天室訊息
  async getRoomMessages(roomId: string, limit: number = 50, before?: string): Promise<ChatMessage[]> {
    try {
      let url = `${this.baseUrl}/chat/rooms/${roomId}/messages?limit=${limit}`;
      if (before) {
        url += `&before=${before}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('獲取訊息失敗');
      }

      const data = await response.json();
      return data.messages;
    } catch (error) {
      console.error('獲取訊息失敗:', error);
      throw error;
    }
  }

  // 發送訊息
  async sendMessage(messageData: {
    roomId: string;
    text: string;
    userId: string;
    metadata?: {
      personaId?: string;
      personaName?: string;
      walletAddress?: string;
      nftId?: string;
    };
  }): Promise<ChatMessage> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });

      if (!response.ok) {
        throw new Error('發送訊息失敗');
      }

      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('發送訊息失敗:', error);
      throw error;
    }
  }

  // 獲取用戶的 AI 人格列表
  async getUserPersonas(userId: string): Promise<Persona[]> {
    try {
      const response = await fetch(`${this.baseUrl}/personas?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('獲取 AI 人格列表失敗');
      }

      const data = await response.json();
      return data.personas;
    } catch (error) {
      console.error('獲取 AI 人格列表失敗:', error);
      throw error;
    }
  }

  // 創建新的 AI 人格
  async createPersona(personaData: {
    name: string;
    description: string;
    personality: string;
    traits: string[];
    userId: string;
    walletAddress: string;
  }): Promise<Persona> {
    try {
      const response = await fetch(`${this.baseUrl}/personas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaData),
      });

      if (!response.ok) {
        throw new Error('創建 AI 人格失敗');
      }

      const data = await response.json();
      return data.persona;
    } catch (error) {
      console.error('創建 AI 人格失敗:', error);
      throw error;
    }
  }

  // 更新 AI 人格
  async updatePersona(personaId: string, updates: Partial<Persona>): Promise<Persona> {
    try {
      const response = await fetch(`${this.baseUrl}/personas/${personaId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('更新 AI 人格失敗');
      }

      const data = await response.json();
      return data.persona;
    } catch (error) {
      console.error('更新 AI 人格失敗:', error);
      throw error;
    }
  }

  // 獲取對話會話
  async getChatSessions(userId: string): Promise<ChatSession[]> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/sessions?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('獲取對話會話失敗');
      }

      const data = await response.json();
      return data.sessions;
    } catch (error) {
      console.error('獲取對話會話失敗:', error);
      throw error;
    }
  }

  // 創建新的對話會話
  async createChatSession(sessionData: {
    userId: string;
    personaId: string;
    roomId: string;
  }): Promise<ChatSession> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error('創建對話會話失敗');
      }

      const data = await response.json();
      return data.session;
    } catch (error) {
      console.error('創建對話會話失敗:', error);
      throw error;
    }
  }

  // 結束對話會話
  async endChatSession(sessionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/chat/sessions/${sessionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('結束對話會話失敗');
      }
    } catch (error) {
      console.error('結束對話會話失敗:', error);
      throw error;
    }
  }

  // 獲取 Chatkit Token
  async getChatkitToken(userId: string, userInfo: any): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/chatkit/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userInfo,
        }),
      });

      if (!response.ok) {
        throw new Error('獲取 Chatkit Token 失敗');
      }

      const data = await response.json();
      return data.token;
    } catch (error) {
      console.error('獲取 Chatkit Token 失敗:', error);
      throw error;
    }
  }

  // 獲取用戶統計
  async getUserStats(userId: string): Promise<{
    totalMessages: number;
    totalSessions: number;
    totalPersonas: number;
    activePersonas: number;
    totalExperience: number;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/stats`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('獲取用戶統計失敗');
      }

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('獲取用戶統計失敗:', error);
      throw error;
    }
  }
}

// 單例模式
export const chatAPI = new ChatAPI();
export default chatAPI;








// Chatkit 類型定義
export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  walletAddress?: string;
  personaId?: string;
  createdAt: Date;
  lastSeen?: Date;
}

export interface ChatMessage {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: Date;
  type: 'text' | 'image' | 'file' | 'system';
  metadata?: {
    personaId?: string;
    personaName?: string;
    walletAddress?: string;
    nftId?: string;
  };
}

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  type: 'direct' | 'group' | 'persona';
  participants: ChatUser[];
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  personaId?: string;
  personaName?: string;
}

export interface Persona {
  id: string;
  name: string;
  description: string;
  avatar: string;
  personality: string;
  traits: string[];
  level: number;
  experience: number;
  nftId?: string;
  walletAddress?: string;
  isActive: boolean;
}

export interface ChatSession {
  id: string;
  userId: string;
  personaId: string;
  roomId: string;
  startTime: Date;
  endTime?: Date;
  messageCount: number;
  status: 'active' | 'ended' | 'paused';
}

export interface ChatkitConfig {
  instanceLocator: string;
  key: string;
  cluster: string;
  userId: string;
  tokenProvider: {
    url: string;
    headers?: Record<string, string>;
  };
}

export interface ParticleAuthUser {
  uuid: string;
  walletAddress: string;
  email?: string;
  phone?: string;
  socialLoginType?: 'google' | 'twitter' | 'discord';
  createdAt: Date;
  lastLogin: Date;
}

export interface ChatkitError {
  code: string;
  message: string;
  details?: any;
}

export interface ChatkitEvent {
  type: 'message' | 'user_joined' | 'user_left' | 'room_created' | 'room_updated';
  data: any;
  timestamp: Date;
}









// linkya-frontend/lib/auth/particle-auth.ts

import { ParticleNetwork } from '@particle-network/auth';
import { ParticleAuthUser } from '../chatkit/chatkit-types';

class ParticleAuthManager {
  private particleAuth: ParticleNetwork | null = null;
  private currentUser: ParticleAuthUser | null = null;

  constructor() {
    this.initializeParticleAuth();
  }

  private async initializeParticleAuth() {
    try {
      const projectId = process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID || '';
      const clientKey = process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY || '';
      const appId = process.env.NEXT_PUBLIC_PARTICLE_APP_ID || '';

      if (!projectId || !clientKey || !appId) {
        throw new Error('Particle Auth 配置不完整');
      }

      this.particleAuth = new ParticleNetwork({
        projectId,
        clientKey,
        appId,
      });
    } catch (error) {
      console.error('Particle Auth 初始化失敗:', error);
      throw new Error('無法初始化 Particle Auth');
    }
  }

  async login(): Promise<ParticleAuthUser> {
    if (!this.particleAuth) {
      throw new Error('Particle Auth 未初始化');
    }

    try {
      // 模擬登入，實際實現需要調用 Particle Auth API
      const mockUser: ParticleAuthUser = {
        uuid: 'mock-user-' + Date.now(),
        walletAddress: '0x' + Math.random().toString(16).substr(2, 40),
        email: 'user@example.com',
        socialLoginType: 'google',
        createdAt: new Date(),
        lastLogin: new Date(),
      };
      
      this.currentUser = mockUser;
      return this.currentUser;
    } catch (error) {
      console.error('Particle Auth 登入失敗:', error);
      throw new Error('登入失敗');
    }
  }

  async logout(): Promise<void> {
    if (!this.particleAuth) {
      throw new Error('Particle Auth 未初始化');
    }

    try {
      this.currentUser = null;
    } catch (error) {
      console.error('Particle Auth 登出失敗:', error);
      throw new Error('登出失敗');
    }
  }

  async getWalletAddress(): Promise<string | null> {
    return this.currentUser?.walletAddress || null;
  }

  async signMessage(message: string): Promise<string | null> {
    if (!this.particleAuth) {
      return null;
    }

    try {
      // 模擬簽名，實際實現需要調用 Particle Auth API
      return '0x' + Math.random().toString(16).substr(2, 64);
    } catch (error) {
      console.error('簽名訊息失敗:', error);
      return null;
    }
  }

  async sendTransaction(transaction: {
    to: string;
    value: string;
    data?: string;
  }): Promise<string | null> {
    if (!this.particleAuth) {
      return null;
    }

    try {
      // 模擬交易，實際實現需要調用 Particle Auth API
      return '0x' + Math.random().toString(16).substr(2, 64);
    } catch (error) {
      console.error('發送交易失敗:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): ParticleAuthUser | null {
    return this.currentUser;
  }

  private mapParticleUserToUser(particleUser: any): ParticleAuthUser {
    return {
      uuid: particleUser.uuid,
      walletAddress: particleUser.address,
      email: particleUser.email,
      phone: particleUser.phone,
      socialLoginType: particleUser.socialLoginType,
      createdAt: new Date(particleUser.createdAt),
      lastLogin: new Date(),
    };
  }

  async getUserNFTs(): Promise<any[]> {
    if (!this.particleAuth || !this.currentUser) {
      return [];
    }

    try {
      return [];
    } catch (error) {
      console.error('獲取用戶 NFT 失敗:', error);
      return [];
    }
  }

  async getUserPersonas(): Promise<any[]> {
    if (!this.currentUser) {
      return [];
    }

    try {
      return [];
    } catch (error) {
      console.error('獲取用戶 AI 人格失敗:', error);
      return [];
    }
  }
}

// 單例模式
export const particleAuthManager = new ParticleAuthManager();
export default particleAuthManager;
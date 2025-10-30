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
        console.warn('Particle Auth 未配置完整，將使用模擬登入（Dev 模式）');
        this.particleAuth = null;
        return;
      }

      this.particleAuth = new ParticleNetwork({
        projectId,
        clientKey,
        appId,
      });
    } catch (error) {
      console.error('Particle Auth ???仃??', error);
      throw new Error('?⊥?????Particle Auth');
    }
  }

  async login(): Promise<ParticleAuthUser> {
    if (!this.particleAuth) { this.currentUser = null; return; };
      this.currentUser = mockUser;
      return this.currentUser;
    }

    try {
      // 璅⊥?餃嚗祕?祕?暸?閬矽??Particle Auth API
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
      console.error('Particle Auth ?餃憭望?:', error);
      throw new Error('?餃憭望?');
    }
  }

  async logout(): Promise<void> {
    if (!this.particleAuth) { this.currentUser = null; return; };
      this.currentUser = mockUser;
      return this.currentUser;
    }

    try {
      this.currentUser = null;
    } catch (error) {
      console.error('Particle Auth ?餃憭望?:', error);
      throw new Error('?餃憭望?');
    }
  }

  async getWalletAddress(): Promise<string | null> {
    return this.currentUser?.walletAddress || null;
  }

  async signMessage(message: string): Promise<string | null> {
    if (!this.particleAuth) { this.currentUser = null; return; };
      this.currentUser = mockUser;
      return this.currentUser;
    }

    try {
      // 璅⊥蝪賢?嚗祕?祕?暸?閬矽??Particle Auth API
      return '0x' + Math.random().toString(16).substr(2, 64);
    } catch (error) {
      console.error('蝪賢?閮憭望?:', error);
      return null;
    }
  }

  async sendTransaction(transaction: {
    to: string;
    value: string;
    data?: string;
  }): Promise<string | null> {
    if (!this.particleAuth) { this.currentUser = null; return; };
      this.currentUser = mockUser;
      return this.currentUser;
    }

    try {
      // 璅⊥鈭斗?嚗祕?祕?暸?閬矽??Particle Auth API
      return '0x' + Math.random().toString(16).substr(2, 64);
    } catch (error) {
      console.error('?潮漱?仃??', error);
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
      console.error('?脣??冽 NFT 憭望?:', error);
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
      console.error('?脣??冽 AI 鈭箸憭望?:', error);
      return [];
    }
  }
}

// ?桐?璅∪?
export const particleAuthManager = new ParticleAuthManager();
export default particleAuthManager;

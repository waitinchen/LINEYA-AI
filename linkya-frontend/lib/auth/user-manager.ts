// linkya-frontend/lib/auth/user-manager.ts

import { ParticleAuthUser, Persona } from '../chatkit/chatkit-types';
import { particleAuthManager } from './particle-auth';
import { ChatkitClient } from '../chatkit/chatkit-client';

export interface CurrentUser {
  id: string;
  name: string;
  walletAddress: string;
  particleUser: any;
}

export class UserManager {
  private currentUser: CurrentUser | null = null;
  private userPersonas: Persona[] = [];

  async init() {
    const userInfo = await particleAuthManager.getCurrentUser();
    if (userInfo) {
      await this.setCurrentUser(userInfo);
    }
  }

  async login() {
    try {
      const userInfo = await particleAuthManager.login();
      if (userInfo) {
        await this.setCurrentUser(userInfo);
        return true;
      }
    } catch (error) {
      console.error('Particle Auth 登入失敗:', error);
    }
    return false;
  }

  // Dev 模式：Email/Password 登入（無錢包）
  async devLogin(email: string, _password: string) {
    try {
      // 生成一個可重現的假錢包地址（僅供本地測試用）
      const digest = Array.from(new TextEncoder().encode(email))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, 40);
      const fakeWallet = `0x${digest.padEnd(40, '0')}`;

      this.currentUser = {
        id: fakeWallet,
        name: email.split('@')[0] || 'DevUser',
        walletAddress: fakeWallet,
        particleUser: {
          email,
        },
      };

      // 初始化 Chatkit（模擬）
      await ChatkitClient.init(this.currentUser.id);

      // 為使用者附上一個預設人格
      const coreLinkPersona = await ChatkitClient.getPersona('corelink-framework-001');
      if (coreLinkPersona) {
        this.userPersonas = [coreLinkPersona];
      }
      return true;
    } catch (error) {
      console.error('Dev 登入失敗:', error);
      return false;
    }
  }

  async logout() {
    try {
      await particleAuthManager.logout();
      this.currentUser = null;
      this.userPersonas = [];
      return true;
    } catch (error) {
      console.error('Particle Auth 登出失敗:', error);
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  getCurrentUser(): CurrentUser | null {
    return this.currentUser;
  }

  getUserPersonas(): Persona[] {
    return this.userPersonas;
  }

  getActivePersona(): Persona | null {
    return this.userPersonas.find(persona => persona.id === 'corelink-framework-001') || null;
  }

  async setCurrentUser(userInfo: any) {
    const walletAddress = userInfo.wallets[0]?.publicAddress;
    if (!walletAddress) {
      console.error('無法獲取用戶錢包地址');
      return;
    }

    this.currentUser = {
      id: walletAddress,
      name: userInfo.name || `User-${walletAddress.slice(0, 6)}`,
      walletAddress: walletAddress,
      particleUser: userInfo,
    };

    // 初始化 Chatkit 客戶端 (模擬)
    await ChatkitClient.init(this.currentUser.id);

    // 從 Chatkit 獲取用戶的人格列表 (模擬)
    const coreLinkPersona = await ChatkitClient.getPersona('corelink-framework-001');
    if (coreLinkPersona) {
      this.userPersonas = [coreLinkPersona];
    }
  }

  setActivePersona(personaId: string) {
    const persona = this.userPersonas.find(p => p.id === personaId);
    if (persona) {
      return true;
    }
    return false;
  }

  addPersona(persona: Persona) {
    if (!this.userPersonas.some(p => p.id === persona.id)) {
      this.userPersonas.push(persona);
    }
  }

  updatePersona(personaId: string, updates: Partial<Persona>) {
    const index = this.userPersonas.findIndex(p => p.id === personaId);
    if (index !== -1) {
      this.userPersonas[index] = { ...this.userPersonas[index], ...updates };
      return true;
    }
    return false;
  }
}

// 單例模式
export const userManager = new UserManager();
export default userManager;

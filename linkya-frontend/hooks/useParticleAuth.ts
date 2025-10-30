// Particle Auth Hook
import { useState, useEffect, useCallback } from 'react';
import { CurrentUser } from '../lib/auth/user-manager';
import { Persona } from '../lib/chatkit/chatkit-types';
import { userManager } from '../lib/auth/user-manager';

export const useParticleAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userPersonas, setUserPersonas] = useState<Persona[]>([]);
  const [activePersona, setActivePersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const success = await userManager.login();
      if (success) {
        const user = userManager.getCurrentUser();
        setCurrentUser(user);
        setIsLoggedIn(true);

        // 載入用戶的 AI 人格
        const personas = userManager.getUserPersonas();
        setUserPersonas(personas);

        // 設置激活的人格
        const active = userManager.getActivePersona();
        setActivePersona(active);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '登入失敗');
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Dev 模式登入（Email/Password）
  const loginDev = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const success = await userManager.devLogin(email, password);
      if (success) {
        const user = userManager.getCurrentUser();
        setCurrentUser(user);
        setIsLoggedIn(true);

        const personas = userManager.getUserPersonas();
        setUserPersonas(personas);

        const active = userManager.getActivePersona();
        setActivePersona(active);
      } else {
        setError('Dev 登入失敗');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Dev 登入失敗');
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      await userManager.logout();
      setCurrentUser(null);
      setIsLoggedIn(false);
      setUserPersonas([]);
      setActivePersona(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '登出失敗');
    } finally {
      setLoading(false);
    }
  }, []);

  const createPersona = useCallback(async (personaData: {
    name: string;
    description: string;
    personality: string;
    traits: string[];
  }) => {
    try {
      setLoading(true);
      setError(null);

      // 創建新的人格對象
      const newPersona: Persona = {
        id: Date.now().toString(),
        name: personaData.name,
        description: personaData.description,
        avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${personaData.name}`,
        personality: personaData.personality,
        traits: personaData.traits,
        level: 1,
        experience: 0,
        isActive: false,
      };

      userManager.addPersona(newPersona);
      setUserPersonas(prev => [...prev, newPersona]);
      return newPersona;
    } catch (err) {
      setError(err instanceof Error ? err.message : '創建 AI 人格失敗');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePersona = useCallback(async (personaId: string, updates: Partial<Persona>) => {
    try {
      setLoading(true);
      setError(null);

      const success = userManager.updatePersona(personaId, updates);
      if (success) {
        // 更新本地狀態
        setUserPersonas(prev => 
          prev.map(persona => 
            persona.id === personaId ? { ...persona, ...updates } : persona
          )
        );

        // 如果更新的是激活人格，更新激活狀態
        if (activePersona?.id === personaId) {
          setActivePersona(prev => prev ? { ...prev, ...updates } : null);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新 AI 人格失敗');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [activePersona]);

  const deletePersona = useCallback(async (personaId: string) => {
    try {
      setLoading(true);
      setError(null);

      // 移除本地狀態中的人格
      setUserPersonas(prev => prev.filter(persona => persona.id !== personaId));

      // 如果刪除的是激活人格，清除激活狀態
      if (activePersona?.id === personaId) {
        setActivePersona(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '刪除 AI 人格失敗');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [activePersona]);

  const switchActivePersona = useCallback(async (personaId: string) => {
    try {
      setLoading(true);
      setError(null);

      userManager.setActivePersona(personaId);
      
      // 更新本地狀態
      const newActivePersona = userPersonas.find(persona => persona.id === personaId);
      setActivePersona(newActivePersona || null);
      
      setUserPersonas(prev => 
        prev.map(persona => ({
          ...persona,
          isActive: persona.id === personaId
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : '切換激活人格失敗');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userPersonas]);

  const signMessage = useCallback(async (message: string) => {
    try {
      // 暫時返回空字符串，實際實現需要調用 Particle Auth
      return '';
    } catch (err) {
      setError(err instanceof Error ? err.message : '簽名訊息失敗');
      throw err;
    }
  }, []);

  const sendTransaction = useCallback(async (transaction: {
    to: string;
    value: string;
    data?: string;
  }) => {
    try {
      // 暫時返回空字符串，實際實現需要調用 Particle Auth
      return '';
    } catch (err) {
      setError(err instanceof Error ? err.message : '發送交易失敗');
      throw err;
    }
  }, []);

  // 初始化用戶狀態
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const user = userManager.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);

          const personas = userManager.getUserPersonas();
          setUserPersonas(personas);

          const active = userManager.getActivePersona();
          setActivePersona(active);
        }
      } catch (err) {
        console.error('初始化用戶失敗:', err);
      }
    };

    initializeUser();
  }, []);

  return {
    isLoggedIn,
    currentUser,
    userPersonas,
    activePersona,
    loading,
    error,
    login,
    loginDev,
    logout,
    createPersona,
    updatePersona,
    deletePersona,
    switchActivePersona,
    signMessage,
    sendTransaction,
    walletAddress: currentUser?.walletAddress || null,
  };
};

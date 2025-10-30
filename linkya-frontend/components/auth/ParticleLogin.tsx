// Particle 登入組件
'use client';

import React, { useState } from 'react';
import { useParticleAuth } from '../../hooks/useParticleAuth';

export const ParticleLogin: React.FC = () => {
  const { login, logout, isLoggedIn, currentUser, loading, error } = useParticleAuth();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleLogin = async () => {
    try {
      setIsConnecting(true);
      await login();
    } catch (err) {
      console.error('登入失敗:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('登出失敗:', err);
    }
  };

  if (isLoggedIn && currentUser) {
    return (
      <div className="flex items-center space-x-4">
        {/* 用戶信息 */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {currentUser.walletAddress.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">
              {currentUser.walletAddress.slice(0, 6)}...{currentUser.walletAddress.slice(-4)}
            </p>
            <p className="text-xs text-gray-500">
              {currentUser.particleUser?.socialLoginType ? `通過 ${currentUser.particleUser.socialLoginType} 登入` : '錢包登入'}
            </p>
          </div>
        </div>

        {/* 登出按鈕 */}
        <button
          onClick={handleLogout}
          disabled={loading}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
        >
          {loading ? '登出中...' : '登出'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 錯誤提示 */}
      {error && (
        <div className="w-full max-w-md p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* 登入按鈕 */}
      <button
        onClick={handleLogin}
        disabled={loading || isConnecting}
        className="w-full max-w-md px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 flex items-center justify-center space-x-3"
      >
        {loading || isConnecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>連接中...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>連接 Particle 錢包</span>
          </>
        )}
      </button>

      {/* 登入說明 */}
      <div className="text-center text-sm text-gray-600 max-w-md">
        <p className="mb-2">
          使用 Particle Network 進行 Web3 登入
        </p>
        <div className="space-y-1 text-xs">
          <p>• 支援 MetaMask、Coinbase Wallet</p>
          <p>• 支援 Google、Twitter、Discord 社交登入</p>
          <p>• 基於 Base Sepolia 測試網</p>
        </div>
      </div>
    </div>
  );
};

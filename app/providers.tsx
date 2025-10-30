'use client';

import React from 'react';
import { ParticleProvider } from '@particle-network/connect';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 導入 Chain Info，讓 Particle 知道要連 Base Sepolia
import { chains } from '@particle-network/chains'; 

// 設置 React Query 客戶端 (用於數據快取)
const queryClient = new QueryClient();

// Particle 配置常數
const PARTICLE_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID || 'YOUR_PROJECT_ID', 
  clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY || 'YOUR_CLIENT_KEY',
  appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID || 'YOUR_APP_ID',
  chain: baseSepolia, // 預設使用 Base Sepolia
};

// 由於 ParticleProvider 已經整合了 WagmiProvider
// 我們直接使用 ParticleProvider 包裹應用即可
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ParticleProvider
        // Particle SDK 需要的配置
        projectId={PARTICLE_CONFIG.projectId}
        clientKey={PARTICLE_CONFIG.clientKey}
        appId={PARTICLE_CONFIG.appId}
        chains={chains} // 傳入所有支持的鏈，讓用戶可以切換
        theme={'dark'} // 使用深色主題
        // 設定要啟用的連線方式 (例如：Social Login, Email/Passwordless, Wallet Connect)
        walletConnectOptions={{
          projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'YOUR_WALLETCONNECT_PROJECT_ID', // 這裡也需要填入你自己的 WC ID
          showQrModal: true,
        }}
        // 啟用社交登入選項
        socialLoginOptions={{
          google: {
            name: 'Google',
            icon: 'https://www.google.com/favicon.ico',
          },
          twitter: {
            name: 'Twitter',
            icon: 'https://abs.twimg.com/favicons/twitter.ico',
          },
          discord: {
            name: 'Discord',
            icon: 'https://discord.com/assets/favicon.ico',
          },
        }}
        // 啟用無密碼登入
        passwordlessOptions={{
          email: true,
          phone: true,
        }}
      >
        {children}
      </ParticleProvider>
    </QueryClientProvider>
  );
}

// ⚠️ 注意：你需要在 .env.local 中填寫 PARTICLE 的金鑰！
// NEXT_PUBLIC_PARTICLE_PROJECT_ID=...
// NEXT_PUBLIC_PARTICLE_CLIENT_KEY=...
// NEXT_PUBLIC_PARTICLE_APP_ID=...
// NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=...








'use client';

import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';

// 本地 Hardhat 網絡配置
const hardhat = {
  id: 31337,
  name: 'Hardhat Network',
  network: 'hardhat',
  nativeCurrency: {
    decimals: 18,
    name: 'Hardhat Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545'],
    },
  },
  testnet: true,
} as const;

// 1. 設定 Wagmi 配置
const config = createConfig({
  // 連接到本地 Hardhat 網絡或 Base Sepolia 測試網
  chains: [hardhat, baseSepolia],
  // 使用 HTTP 傳輸
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'), // 本地 Hardhat 網絡
    [baseSepolia.id]: http(), 
  },
});

// 2. 設置 React Query 客戶端 (用於數據快取)
const queryClient = new QueryClient();

// 3. 將所有 Provider 整合到一起
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider 
          chain={hardhat}
          apiKey={process.env.NEXT_PUBLIC_COINBASE_API_KEY || ''} // 可選：用於 Coinbase 服務
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
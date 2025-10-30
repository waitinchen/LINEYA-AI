'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { ParticleConnectButton } from '@particle-network/connect';
import { useEffect, useState } from 'react';
import { PERSONA_NFT_ABI } from '../lib/contract-abi';
import { parseEther } from 'viem';
import { AIChatInterface } from '../components/AIChatInterface';

// 合約地址 (本地部署地址)
const PERSONA_NFT_ADDRESS_LOCAL = '0x5FbDB2315678afecb367f032d93F642f64180aa3' as `0x${string}`;

export default function Home() {
  const { address, isConnected } = useAccount();
  const [mintSuccess, setMintSuccess] = useState(false);
  const [mintHash, setMintHash] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'mint' | 'chat'>('mint');

  // 使用 wagmi 的 useWriteContract 鉤子來調用合約函數 (鑄造)
  const { writeContract, data: hash, isPending, isSuccess, error } = useWriteContract();

  // 讀取總供應量
  const { data: totalSupply } = useReadContract({
    address: PERSONA_NFT_ADDRESS_LOCAL,
    abi: PERSONA_NFT_ABI,
    functionName: 'totalSupply',
  });

  // 讀取用戶的 NFT 數量
  const { data: userBalance } = useReadContract({
    address: PERSONA_NFT_ADDRESS_LOCAL,
    abi: PERSONA_NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // 鑄造 CoreLink-Framework 人格的函數
  const mintCorePersona = () => {
    if (!address) {
      alert("請先連接錢包！");
      return;
    }
    
    // 呼叫鑄造函數 (參數需與合約一致)
    writeContract({
      address: PERSONA_NFT_ADDRESS_LOCAL,
      abi: PERSONA_NFT_ABI,
      functionName: 'mintPersona', 
      args: [
        'CoreLink-Framework', // name
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] // traits array
      ],
      value: parseEther('0.001'), // 鑄造費用
    });
  };

  useEffect(() => {
    if (isSuccess && hash) {
      setMintSuccess(true);
      setMintHash(hash);
      console.log(`🎉 鑄造成功! 交易哈希: ${hash}`);
      // 鑄造成功後自動切換到聊天頁面
      setActiveTab('chat');
    }
  }, [isSuccess, hash]);

  useEffect(() => {
    if (error) {
      console.error('鑄造失敗:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* 連接按鈕 */}
      <header className="fixed top-4 right-4 z-50">
        <ParticleConnectButton />
      </header>

      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8 max-w-6xl mx-auto w-full">
        {/* 標題 */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            LINKYA-AI
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-2">
            人格育成平台
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Web3 + AI 的未來，從這裡開始
          </p>
        </div>

        {/* 連接狀態 */}
        <div className="mb-8 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <p className="text-lg text-center">
            {isConnected ? (
              <span className="text-green-600">
                🟢 錢包已連接: {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            ) : (
              <span className="text-red-600">
                🔴 請連接錢包以開始育成 AI 人格
              </span>
            )}
          </p>
          
          {isConnected && (
            <div className="mt-4 text-sm text-gray-600 text-center space-y-1">
              <p>您的 NFT 數量: <span className="font-semibold">{userBalance?.toString() || '0'}</span></p>
              <p>總供應量: <span className="font-semibold">{totalSupply?.toString() || '0'}</span></p>
            </div>
          )}
        </div>

        {/* 主要功能區域 */}
        {isConnected && (
          <div className="w-full max-w-4xl">
            {/* 標籤切換 */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setActiveTab('mint')}
                  className={`px-6 py-2 rounded-md transition duration-150 ${
                    activeTab === 'mint'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🎭 鑄造 NFT
                </button>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-6 py-2 rounded-md transition duration-150 ${
                    activeTab === 'chat'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  🧠 AI 對話
                </button>
              </div>
            </div>

            {/* 內容區域 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              {activeTab === 'mint' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      🎭 鑄造創始 AI 人格 NFT
                    </h3>
                    <p className="text-gray-600 mb-6">
                      獲得代表 CoreLink-Persona-Engine 框架的創始 NFT
                    </p>
                    
                    <button
                      onClick={mintCorePersona}
                      disabled={isPending}
                      className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 transform hover:scale-105"
                    >
                      {isPending ? '⏳ 交易發送中...' : '🚀 鑄造 CoreLink-Framework NFT'}
                    </button>
                    
                    {mintSuccess && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-800 font-semibold">
                          ✅ 鑄造請求已發送!
                        </p>
                        <p className="text-sm text-green-600 mt-2">
                          交易哈希: {mintHash.slice(0, 10)}...{mintHash.slice(-8)}
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          🎉 現在可以與你的 AI 人格對話了！
                        </p>
                      </div>
                    )}

                    {error && (
                      <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800 font-semibold">
                          ❌ 鑄造失敗
                        </p>
                        <p className="text-sm text-red-600 mt-2">
                          {error.message}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 功能說明 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        🧠 AI 人格
                      </h4>
                      <p className="text-gray-600 text-sm">
                        每個 NFT 代表獨特的 AI 人格，具有可進化的特徵
                      </p>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        🔗 Web3 整合
                      </h4>
                      <p className="text-gray-600 text-sm">
                        基於 Base L2，低 Gas 費用，快速交易
                      </p>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">
                        🎮 遊戲化
                      </h4>
                      <p className="text-gray-600 text-sm">
                        通過互動和經驗值提升 AI 人格等級
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-[600px]">
                  <AIChatInterface />
                </div>
              )}
            </div>
          </div>
        )}

        {/* 未連接時的說明 */}
        {!isConnected && (
          <div className="mt-8 p-8 bg-white rounded-xl shadow-lg max-w-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              🌟 開始您的 AI 人格之旅
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              連接您的錢包，鑄造第一個 AI 人格 NFT，體驗 Web3 + AI 的無限可能
            </p>
            <div className="text-sm text-gray-500 text-center space-y-2">
              <p>• 支援 MetaMask、Coinbase Wallet、社交登入等</p>
              <p>• 基於 Base Sepolia 測試網</p>
              <p>• 安全、快速、低費用</p>
              <p>• 與 AI 人格進行深度對話</p>
            </div>
          </div>
        )}
      </main>

      {/* 頁腳 */}
      <footer className="mt-8 pb-4 text-center text-gray-500 text-sm">
        <p>LINKYA-AI © 2025 | Powered by Base L2 & CoreLink-Persona-Engine</p>
      </footer>
    </div>
  );
}









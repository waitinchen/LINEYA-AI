'use client';

import { DevLogin } from '../../components/auth/DevLogin';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useParticleAuth } from '../../hooks/useParticleAuth';

export default function LoginPage() {
  const { isLoggedIn, currentUser } = useParticleAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur rounded-2xl border border-white/20 p-6 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">LINKYA 登入</h1>
        <p className="text-sm text-white/70 text-center mb-6">使用 LINKYA 風格的簡約登入。可用 Dev 登入或連接錢包。</p>

        <div className="space-y-4">
          <DevLogin />
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <div className="flex-1 h-px bg-white/20" /> 或 <div className="flex-1 h-px bg-white/20" />
          </div>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>
        </div>

        {isLoggedIn && (
          <div className="mt-6 text-center text-green-300 text-sm">
            已登入：{currentUser?.name}（{currentUser?.walletAddress.slice(0,6)}…）
          </div>
        )}
      </div>
    </div>
  );
}


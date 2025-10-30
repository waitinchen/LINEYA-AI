'use client';

import Link from 'next/link';
import { DevLogin } from '../auth/DevLogin';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useParticleAuth } from '../../hooks/useParticleAuth';

export function AppHeader() {
  const { isLoggedIn, currentUser, logout } = useParticleAuth();

  const initials = currentUser?.name
    ? currentUser.name.slice(0, 2).toUpperCase()
    : currentUser?.walletAddress
    ? currentUser.walletAddress.slice(2, 4).toUpperCase()
    : 'GU';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between bg-gradient-to-r from-indigo-900/90 to-slate-900/90 backdrop-blur border-b border-white/10">
        <nav className="flex items-center gap-4 text-white/80 text-sm">
          <Link className="font-bold text-white" href="/">LINKYA</Link>
          <Link href="/chat">對話</Link>
          <Link href="/memory">記憶</Link>
          <Link href="/admin">後台</Link>
        </nav>
        <div className="flex items-center gap-3">
          <DevLogin />
          <ConnectWallet />
          {isLoggedIn && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center text-xs font-semibold">
                {initials}
              </div>
              <button
                className="text-white/70 text-xs hover:text-white border border-white/20 px-2 py-1 rounded"
                onClick={logout}
                title="快速登出"
              >
                登出
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="h-[56px]" />
    </header>
  );
}

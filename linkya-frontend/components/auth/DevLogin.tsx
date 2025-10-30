'use client';

import { useState } from 'react';
import { useParticleAuth } from '../../hooks/useParticleAuth';

export function DevLogin() {
  const { loginDev, loading, error, isLoggedIn, currentUser } = useParticleAuth();
  const [email, setEmail] = useState('demo@linkya.local');
  const [password, setPassword] = useState('demo12345');

  if (isLoggedIn) {
    return (
      <div className="p-3 bg-green-50 text-green-700 rounded-lg shadow-sm text-sm">
        已登入（Dev）：{currentUser?.name} · {currentUser?.walletAddress.slice(0,6)}…
      </div>
    );
  }

  return (
    <form
      className="flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-2 rounded-lg shadow"
      onSubmit={(e) => {
        e.preventDefault();
        loginDev(email, password);
      }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white text-sm px-3 py-1 rounded disabled:opacity-60"
      >
        {loading ? '登入中…' : 'Dev 登入'}
      </button>
      {error && <span className="text-red-600 text-xs ml-2">{error}</span>}
    </form>
  );
}


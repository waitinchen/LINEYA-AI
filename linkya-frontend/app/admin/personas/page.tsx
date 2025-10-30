'use client';
import { useEffect, useState } from 'react';
import { Persona } from '../../../lib/chatkit/chatkit-types';
import { ChatkitClient } from '../../../lib/chatkit/chatkit-client';

export default function AdminPersonas() {
  const [items, setItems] = useState<Persona[]>([]);
  useEffect(() => { ChatkitClient.getPersonas().then(setItems); }, []);
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI 人格管理</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <div key={p.id} className="p-4 rounded-lg border flex items-center gap-4">
            <img src={p.avatar} alt={p.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-500">{p.personality}</div>
            </div>
            <button className="px-3 py-1 text-sm rounded border" onClick={()=>ChatkitClient.setActivePersona(p.id)}>設為當前</button>
          </div>
        ))}
      </div>
    </main>
  );
}

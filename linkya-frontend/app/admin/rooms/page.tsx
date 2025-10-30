'use client';
import { useEffect, useState } from 'react';
import { ChatRoom } from '../../../lib/chatkit/chatkit-types';
import { ChatkitClient } from '../../../lib/chatkit/chatkit-client';

export default function AdminRooms() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  useEffect(() => { ChatkitClient.getRooms().then(setRooms); }, []);
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">聊天室管理</h1>
      <ul className="space-y-3">
        {rooms.map(r => (
          <li key={r.id} className="p-4 rounded-lg border">
            <div className="font-semibold">{r.name}</div>
            <div className="text-sm text-gray-500">{r.type}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

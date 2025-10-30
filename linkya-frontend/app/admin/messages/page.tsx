'use client';
import { useEffect, useState } from 'react';
import { ChatMessage } from '../../../lib/chatkit/chatkit-types';
import { ChatkitClient } from '../../../lib/chatkit/chatkit-client';

export default function AdminMessages() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  useEffect(() => { ChatkitClient.getRoomMessages('corelink-persona-room').then(setMessages); }, []);
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">訊息稽核</h1>
      <div className="space-y-3">
        {messages.map(m => (
          <div key={m.id} className="p-3 rounded border">
            <div className="text-sm text-gray-500">{new Date(m.timestamp).toLocaleString()}</div>
            <div className="font-medium">{m.userName}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

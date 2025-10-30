export default function AdminIndex() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">管理後台</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/admin/personas" className="p-4 rounded-lg border hover:shadow transition">
          <div className="text-lg font-semibold">AI 人格</div>
          <div className="text-sm text-gray-500">建立、啟用、編輯</div>
        </a>
        <a href="/admin/rooms" className="p-4 rounded-lg border hover:shadow transition">
          <div className="text-lg font-semibold">聊天室</div>
          <div className="text-sm text-gray-500">建立、封存、成員</div>
        </a>
        <a href="/admin/messages" className="p-4 rounded-lg border hover:shadow transition">
          <div className="text-lg font-semibold">訊息稽核</div>
          <div className="text-sm text-gray-500">檢視、過濾、刪除</div>
        </a>
      </div>
    </main>
  );
}

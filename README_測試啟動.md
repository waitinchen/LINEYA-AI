# 🚀 LINKYA-AI 快速啟動指南

## ⚠️ 重要提示

如果您遇到以下問題：
- Hardhat RPC 返回 JSON parse error
- localhost:3000 打不開
- 服務無法正常啟動

請按照以下步驟操作：

---

## 📋 正確的啟動步驟

### 方法 1: 使用啟動腳本（推薦）

在項目根目錄運行：
```powershell
.\start-local.ps1
```

### 方法 2: 手動啟動

#### 步驟 1: 啟動 Hardhat 節點

打開第一個終端，運行：
```powershell
cd C:\Users\waiti\LINKYA-AI
npx hardhat node
```

**等待輸出**:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

#### 步驟 2: 部署合約（新終端）

打開第二個終端，運行：
```powershell
cd C:\Users\waiti\LINKYA-AI
npx hardhat run scripts/deploy-local.ts --network hardhat
```

**等待輸出**:
```
✅ LINKYAPersonaNFT 合約部署成功!
📍 合約地址: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

#### 步驟 3: 啟動前端（第三個終端）

打開第三個終端，運行：
```powershell
cd C:\Users\waiti\LINKYA-AI\linkya-frontend
npm run dev
```

**等待輸出**:
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
```

---

## ✅ 驗證服務狀態

### 檢查 Hardhat 節點
```powershell
curl http://127.0.0.1:8545
```
應該返回 JSON-RPC 響應（不是 parse error）

### 檢查前端
打開瀏覽器訪問 `http://localhost:3000`
應該顯示 LINKYA-AI 主頁面

---

## 🐛 常見問題

### 問題 1: npm run dev 顯示 "Missing script"
**原因**: 在錯誤的目錄運行
**解決**: 確保在 `linkya-frontend` 目錄下運行

```powershell
cd C:\Users\waiti\LINKYA-AI\linkya-frontend
npm run dev
```

### 問題 2: Hardhat RPC 返回 parse error
**原因**: Hardhat 節點未正確啟動
**解決**: 
1. 關閉所有 node 進程
2. 重新啟動 Hardhat 節點
3. 等待完全啟動後再部署

### 問題 3: 端口 8545 被占用
**解決**: 
```powershell
# 查找占用端口的進程
netstat -ano | findstr :8545

# 終止進程（替換 <PID> 為實際進程ID）
taskkill /PID <PID> /F
```

### 問題 4: 端口 3000 被占用
**解決**:
```powershell
# 查找占用端口的進程
netstat -ano | findstr :3000

# 終止進程
taskkill /PID <PID> /F
```

---

## 📝 正確的終端佈局

```
終端 1: Hardhat 節點
  ↓ 運行中...
  http://127.0.0.1:8545

終端 2: 前端開發服務器
  ↓ 運行中...
  http://localhost:3000

終端 3: （可選）部署合約或其他命令
```

---

## 🎯 現在開始測試

### 訪問應用
```
http://localhost:3000
```

### 測試步驟
1. **Dev 登入**
   - 點擊右上角 "Dev 登入"
   - Email: `demo@linkya.local`
   - Password: `demo12345`

2. **鑄造 NFT**
   - 點擊 "🎭 鑄造 NFT" 標籤
   - 點擊 "🚀 鑄造 CoreLink-Framework NFT"

3. **AI 對話**
   - 點擊 "🧠 AI 對話" 標籤
   - 測試視覺對話界面

4. **後台管理**
   - 訪問 `http://localhost:3000/admin`

---

## 📞 需要幫助？

如果仍有問題，請提供：
1. 錯誤消息的完整內容
2. 哪些服務無法啟動
3. 終端的完整輸出

---

**現在按照上述步驟重新啟動服務！** 🚀









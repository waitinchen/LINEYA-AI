# LINKYA-AI 完整 Chatkit 前後台模塊清單

## 🎯 項目概述

LINKYA-AI 是一個基於 Web3 + AI 的人格育成平台，整合了 **Particle Auth** 用戶管理和 **Chatkit** 對話系統，提供完整的 AI 人格對話體驗。

## 📋 完整模塊架構

### **前端模塊 (Frontend)**

#### **1. 核心庫 (lib/)**
```
lib/
├── chatkit/
│   ├── chatkit-client.ts      # Chatkit 客戶端配置
│   ├── chatkit-types.ts      # 類型定義
│   └── chatkit-utils.ts      # 工具函數
├── auth/
│   ├── particle-auth.ts      # Particle Auth 配置
│   └── user-manager.ts       # 用戶管理
└── api/
    ├── chat-api.ts           # 對話 API
    └── user-api.ts           # 用戶 API
```

#### **2. 組件庫 (components/)**
```
components/
├── chat/
│   ├── ChatInterface.tsx     # 主對話介面
│   ├── MessageList.tsx       # 訊息列表
│   ├── MessageInput.tsx      # 訊息輸入
│   ├── ChatRoom.tsx          # 聊天室
│   └── ChatSidebar.tsx       # 對話側邊欄
├── auth/
│   ├── ParticleLogin.tsx     # Particle 登入
│   └── UserProfile.tsx       # 用戶資料
└── persona/
    ├── PersonaSelector.tsx   # AI 人格選擇器
    └── PersonaCard.tsx       # 人格卡片
```

#### **3. React Hooks (hooks/)**
```
hooks/
├── useChatkit.ts            # Chatkit Hook
├── useParticleAuth.ts       # Particle Auth Hook
└── useChat.ts               # 對話 Hook
```

#### **4. 頁面 (pages/)**
```
pages/
├── chat/
│   ├── index.tsx            # 對話主頁
│   └── [roomId].tsx         # 特定聊天室
└── profile/
    └── index.tsx            # 用戶資料頁
```

### **後端模塊 (Backend)**

#### **5. API 路由 (app/api/)**
```
app/api/
├── chatkit/
│   └── token/
│       └── route.ts         # Chatkit Token 生成
├── chat/
│   ├── rooms/
│   │   └── route.ts         # 聊天室管理
│   └── messages/
│       └── route.ts         # 訊息管理
├── personas/
│   └── route.ts             # AI 人格管理
└── users/
    └── route.ts             # 用戶管理
```

## 🔧 技術棧

### **前端技術**
- **框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **狀態管理**: React Hooks
- **Web3 整合**:
  - `@particle-network/auth`: Particle Auth 登入
  - `@particle-network/connect`: Particle 連接
  - `@coinbase/onchainkit`: Base 生態整合
  - `wagmi`: React Hooks for Ethereum
  - `viem`: TypeScript Interface for Ethereum

### **對話系統**
- **即時通訊**: Pusher Chatkit
  - `@pusher/chatkit-client`: 前端客戶端
  - `@pusher/chatkit-server`: 後端服務
- **AI 整合**: OpenAI GPT-4
- **用戶管理**: Particle Network

### **區塊鏈**
- **網路**: Base Sepolia (測試網)
- **智能合約**: LINKYAPersonaNFT (ERC-721)
- **錢包**: Particle Network 多錢包支援

## 🚀 功能特性

### **用戶管理**
- ✅ Particle Network 多種登入方式
- ✅ MetaMask、Coinbase Wallet 支援
- ✅ Google、Twitter、Discord 社交登入
- ✅ Web3 錢包地址管理
- ✅ 用戶資料和偏好設定

### **AI 人格系統**
- ✅ AI 人格創建和管理
- ✅ 人格特徵和個性設定
- ✅ 經驗值和等級系統
- ✅ NFT 整合 (ERC-721)
- ✅ 人格切換和激活

### **對話系統**
- ✅ 即時訊息傳輸
- ✅ 多聊天室支援
- ✅ 訊息歷史記錄
- ✅ 用戶狀態管理
- ✅ 錯誤處理和重連

### **Web3 整合**
- ✅ Base Sepolia 測試網
- ✅ NFT 鑄造和交易
- ✅ 智能合約互動
- ✅ 交易簽名和發送
- ✅ Gas 費用優化

## 📦 依賴包清單

### **核心依賴**
```json
{
  "dependencies": {
    "@particle-network/auth": "^1.x.x",
    "@particle-network/connect": "^1.x.x",
    "@pusher/chatkit-client": "^1.x.x",
    "@pusher/chatkit-server": "^1.x.x",
    "@coinbase/onchainkit": "^1.x.x",
    "wagmi": "^2.x.x",
    "viem": "^2.x.x",
    "openai": "^4.x.x",
    "react": "^19.x.x",
    "next": "^16.x.x"
  }
}
```

### **開發依賴**
```json
{
  "devDependencies": {
    "@types/react": "^19.x.x",
    "@types/node": "^20.x.x",
    "typescript": "^5.x.x",
    "tailwindcss": "^3.x.x",
    "eslint": "^8.x.x"
  }
}
```

## 🔐 環境變數配置

### **必需配置**
```env
# Particle Network
NEXT_PUBLIC_PARTICLE_PROJECT_ID="your_project_id"
NEXT_PUBLIC_PARTICLE_CLIENT_KEY="your_client_key"
NEXT_PUBLIC_PARTICLE_APP_ID="your_app_id"

# Chatkit (Pusher)
NEXT_PUBLIC_CHATKIT_INSTANCE_LOCATOR="your_instance_locator"
NEXT_PUBLIC_CHATKIT_KEY="your_chatkit_key"
NEXT_PUBLIC_CHATKIT_CLUSTER="us1"

# OpenAI
NEXT_PUBLIC_OPENAI_API_KEY="your_openai_key"

# 後端環境變數
CHATKIT_INSTANCE_LOCATOR="your_instance_locator"
CHATKIT_KEY="your_chatkit_key"
```

## 🎮 使用流程

### **1. 用戶登入**
1. 用戶訪問 LINKYA-AI 平台
2. 點擊「連接 Particle 錢包」
3. 選擇登入方式 (錢包/社交)
4. 完成 Web3 身份驗證

### **2. AI 人格管理**
1. 查看現有的 AI 人格
2. 創建新的 AI 人格
3. 設定人格特徵和個性
4. 激活選定的人格

### **3. 對話互動**
1. 選擇 AI 人格開始對話
2. 系統自動創建專屬聊天室
3. 即時訊息傳輸
4. 人格學習和進化

### **4. NFT 整合**
1. 鑄造 AI 人格 NFT
2. 在對話中顯示 NFT 資訊
3. 交易和轉移 NFT
4. 鏈上數據同步

## 🔄 數據流

### **前端數據流**
```
用戶操作 → React Hooks → API 調用 → 後端處理 → 數據庫更新 → 即時推送 → UI 更新
```

### **對話數據流**
```
用戶輸入 → MessageInput → ChatInterface → Chatkit Client → Pusher 服務 → 其他用戶
```

### **Web3 數據流**
```
用戶操作 → Particle Auth → 智能合約 → Base 網路 → 事件監聽 → UI 更新
```

## 🛠️ 開發指南

### **本地開發**
```bash
# 安裝依賴
npm install

# 配置環境變數
cp env.example .env.local

# 啟動開發服務器
npm run dev
```

### **部署配置**
```bash
# 構建生產版本
npm run build

# 啟動生產服務器
npm run start
```

## 📊 監控和分析

### **用戶行為追蹤**
- 登入方式和成功率
- AI 人格使用統計
- 對話頻率和時長
- NFT 鑄造和交易數據

### **系統性能監控**
- API 響應時間
- 即時通訊延遲
- 錯誤率和重連次數
- 用戶體驗指標

## 🔮 未來擴展

### **短期目標**
- [ ] 多語言支援
- [ ] 語音對話功能
- [ ] 圖片和文件分享
- [ ] 群組聊天室

### **長期目標**
- [ ] AI 人格市場
- [ ] 跨鏈 NFT 支援
- [ ] VR/AR 對話體驗
- [ ] 去中心化存儲

---

## 📞 技術支援

如有技術問題或需要協助，請聯繫開發團隊或查看相關文檔：

- **Particle Network**: https://docs.particle.network/
- **Pusher Chatkit**: https://pusher.com/chatkit
- **Base 生態**: https://docs.base.org/
- **OpenAI API**: https://platform.openai.com/docs

**LINKYA-AI 團隊** © 2025








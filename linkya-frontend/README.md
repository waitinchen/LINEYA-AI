# LINKYA-AI Frontend - Web3 + AI 整合平台

## 🚀 專案概述

LINKYA-AI 是一個創新的 Web3 + AI 人格育成平台，結合了區塊鏈技術和人工智慧，讓用戶可以鑄造、培養和與 AI 人格進行互動。

### ✨ 核心功能

- **🎭 NFT 鑄造**: 鑄造代表 AI 人格的 NFT
- **🧠 AI 對話**: 與 CoreLink-Framework AI 人格進行深度對話
- **🔗 Web3 整合**: 基於 Base L2 的低成本交易
- **💳 多錢包支援**: Coinbase Wallet、MetaMask 等
- **🎨 現代化 UI**: 響應式設計 + Tailwind CSS

### 🛠️ 技術棧

- **前端框架**: Next.js 16 (App Router)
- **語言**: TypeScript
- **樣式**: Tailwind CSS
- **Web3**: OnchainKit + Wagmi + Viem
- **AI**: OpenAI GPT-4o-mini
- **狀態管理**: React Query (TanStack Query)
- **錢包**: Coinbase Wallet SDK

### 📦 安裝與運行

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 建置生產版本
npm run build

# 啟動生產服務器
npm start
```

### 🔧 環境變數

創建 `.env.local` 文件：

```env
# OpenAI API Key (用於 AI 對話功能)
NEXT_PUBLIC_OPENAI_API_KEY="sk-your-openai-api-key-here"

# Coinbase API Key (可選)
NEXT_PUBLIC_COINBASE_API_KEY=""

# Base Sepolia RPC URL
NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

# 合約地址
NEXT_PUBLIC_PERSONA_NFT_ADDRESS="0x5FbDB2315678afecb367f032d93F642f64180aa3"

# 應用程式資訊
NEXT_PUBLIC_APP_NAME="LINKYA-AI"
NEXT_PUBLIC_APP_DESCRIPTION="Web3 + AI 人格育成平台"
```

### 🎯 主要功能

#### 1. NFT 鑄造
- 鑄造 CoreLink-Framework AI 人格 NFT
- 支援 10 種可自定義特徵
- 基於 Base Sepolia 測試網
- 低 Gas 費用 (約 0.001 ETH)

#### 2. AI 對話系統
- 與 CoreLink-Framework 進行深度對話
- 整合用戶 Web3 身份資訊
- 支援繁體中文回應
- 專業的 Web3 開發顧問功能

#### 3. Web3 整合
- 多錢包支援 (Coinbase Wallet, MetaMask)
- Base Sepolia 測試網連接
- 實時交易狀態追蹤
- 用戶 NFT 數量顯示

### 📁 專案結構

```
linkya-frontend/
├── app/
│   ├── layout.tsx          # 根布局 + Providers
│   ├── page.tsx            # 主頁面 + Web3 互動
│   ├── providers.tsx       # Web3 配置
│   └── globals.css         # 全域樣式
├── components/
│   └── AIChatInterface.tsx # AI 對話組件
├── lib/
│   └── contract-abi.ts    # 合約 ABI
├── public/                # 靜態資源
└── package.json          # 依賴配置
```

### 🔗 相關專案

- **智能合約**: `../LINKYA-AI/contracts/LINKYAPersonaNFT.sol`
- **部署腳本**: `../LINKYA-AI/scripts/deploy.ts`
- **測試套件**: `../LINKYA-AI/test/LINKYAPersonaNFT.test.ts`
- **本地證明**: `../LINKYA-AI/data/corelink_persona_mint_proof.json`

### 🌐 網路配置

- **測試網**: Base Sepolia (Chain ID: 84532)
- **RPC**: Alchemy Base Sepolia
- **合約**: LINKYAPersonaNFT (ERC-721)
- **本地地址**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

### 🚀 部署指南

1. **準備環境**:
   - 確保合約已部署到 Base Sepolia
   - 更新 `.env.local` 中的合約地址
   - 配置 OpenAI API Key

2. **建置專案**:
   ```bash
   npm run build
   ```

3. **部署平台**:
   - Vercel (推薦)
   - Netlify
   - AWS Amplify

### 📝 開發筆記

- 使用 OnchainKit 的 `ConnectWallet` 組件
- 透過 `useWriteContract` 調用合約函數
- 使用 `useReadContract` 讀取合約狀態
- 支援 BigInt 數值類型
- OpenAI 客戶端需要 API Key 配置

### 🎮 使用流程

1. **連接錢包**: 點擊右上角連接按鈕
2. **鑄造 NFT**: 在「鑄造 NFT」標籤中鑄造 AI 人格
3. **AI 對話**: 切換到「AI 對話」標籤開始互動
4. **查看狀態**: 實時顯示 NFT 數量和交易狀態

### 🔧 故障排除

#### 常見問題

1. **建置失敗**: 檢查 TypeScript 配置和依賴版本
2. **錢包連接失敗**: 確認網路配置和 RPC URL
3. **AI 對話無回應**: 檢查 OpenAI API Key 配置
4. **交易失敗**: 確認錢包餘額和 Gas 費用

#### 調試工具

- Next.js 開發工具
- Wagmi DevTools
- BaseScan 區塊瀏覽器

### 🌟 特色亮點

- **創新整合**: Web3 + AI 的完美結合
- **用戶友好**: 直觀的界面設計
- **技術先進**: 使用最新的 Web3 技術棧
- **可擴展性**: 模組化設計，易於擴展
- **生產就緒**: 完整的錯誤處理和優化

---

**LINKYA-AI © 2025 | Powered by Base L2 & CoreLink-Persona-Engine**

*讓 Web3 + AI 的未來從這裡開始！*
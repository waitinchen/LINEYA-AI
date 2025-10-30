# LINKYA-AI 本地開發指南

## 🚀 快速開始

### 當前狀態
✅ **智能合約已編譯並通過測試** (13/13)
✅ **合約已部署到本地 Hardhat 網絡**
✅ **前端配置已更新為本地地址**

### 📍 合約信息
- **合約地址**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **網絡**: Hardhat 本地網絡 (Chain ID: 31337)
- **RPC URL**: `http://127.0.0.1:8545`
- **合約名稱**: LINKYA Persona
- **合約符號**: LINKYA

---

## 🛠️ 啟動本地開發環境

### 步驟 1: 啟動 Hardhat 節點

在項目根目錄運行：

```bash
npx hardhat node
```

這會啟動一個本地區塊鏈節點，運行在 `http://127.0.0.1:8545`

**默認測試帳戶**（包含 10000 ETH）：
- 部署者: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- User1: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
- User2: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`

### 步驟 2: 部署合約（如未部署）

在新終端運行：

```bash
npx hardhat run scripts/deploy-local.ts --network hardhat
```

**預期輸出**:
```
✅ LINKYAPersonaNFT 合約部署成功!
📍 合約地址: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

### 步驟 3: 啟動前端

進入 `linkya-frontend` 目錄並運行：

```bash
cd linkya-frontend
npm run dev
```

前端將在 **http://localhost:3000** 啟動

---

## 🎮 使用指南

### 1. 連接錢包

有兩種方式：

#### 方式 A: Dev 登入（無需真實錢包）

點擊右上角的 **Dev 登入** 按鈕：
- 自動連接本地測試帳戶
- 無需 MetaMask 或任何錢包
- 可直接測試所有功能

#### 方式 B: 使用 MetaMask 連接本地網絡

1. 打開 MetaMask
2. 添加本地網絡：
   - 網絡名稱: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - 貨幣符號: `ETH`

3. 導入測試帳戶私鑰（從 Hardhat 配置中獲取）

### 2. 鑄造 NFT

1. 點擊 **🎭 鑄造 NFT** 標籤
2. 點擊 **🚀 鑄造 CoreLink-Framework NFT** 按鈕
3. 確認交易（本地網絡幾乎即時完成）
4. 查看成功消息

### 3. AI 對話

1. 點擊 **🧠 AI 對話** 標籤
2. 與皮皮角色進行互動
3. 使用視覺聊天界面

⚠️ **注意**: AI 對話功能需要配置 OpenAI API Key（見下方配置）

---

## 🔧 配置 OpenAI API Key

### 可選：啟用 AI 對話功能

創建 `linkya-frontend/.env.local` 文件：

```env
NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-api-key-here
```

**注意**: 如果沒有配置此變量，AI 對話功能可能無法正常工作。

---

## 📊 測試結果

### 智能合約測試

所有測試都通過了 ✅ (13/13):

- ✅ 合約名稱和符號
- ✅ 擁有者設置
- ✅ 鑄造人格 NFT
- ✅ 拒絕支付不足
- ✅ 拒絕空名稱
- ✅ 拒絕過多特徵
- ✅ 更新人格特徵
- ✅ 拒絕非擁有者更新
- ✅ 增加經驗值
- ✅ 經驗值升級
- ✅ 用戶人格追蹤
- ✅ 提取合約餘額
- ✅ 拒絕非擁有者提取

### Gas 估算

- **部署**: 1,961,744 gas
- **鑄造**: 327,676 gas（平均）
- **更新特徵**: 63,320 gas
- **增加經驗**: 51,421 gas（平均）
- **提取**: 30,533 gas

---

## 🎯 本地測試流程

### 測試鑄造功能

1. **啟動服務**:
   ```bash
   # 終端 1: Hardhat 節點
   npx hardhat node
   
   # 終端 2: 前端服務器
   cd linkya-frontend && npm run dev
   ```

2. **訪問應用**: http://localhost:3000

3. **連接錢包**: 使用 Dev 登入

4. **鑄造 NFT**:
   - 點擊 "🚀 鑄造 CoreLink-Framework NFT"
   - 交易幾乎即時完成（本地網絡）
   - 查看成功消息

5. **查看狀態**:
   - 總供應量應增加
   - 您的 NFT 數量應增加

### 測試 AI 對話功能

1. 切換到 **🧠 AI 對話** 標籤
2. 使用視覺聊天界面
3. 與皮皮角色互動
4. 查看心窗動畫

---

## 🐛 故障排除

### 問題 1: 無法連接網絡

**解決方案**:
- 確認 Hardhat 節點正在運行
- 檢查 `linkya-frontend/app/providers.tsx` 中的 RPC URL

### 問題 2: 交易失敗

**解決方案**:
- 檢查 Hardhat 節點是否運行
- 確保有足夠的 ETH 餘額（本地測試有 10000 ETH）

### 問題 3: 前端無法啟動

**解決方案**:
```bash
cd linkya-frontend
rm -rf .next node_modules
npm install
npm run dev
```

### 問題 4: 合約地址錯誤

**解決方案**:
- 確認使用本地地址: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- 檢查 `linkya-frontend/app/page.tsx` 中的地址配置

---

## 📝 開發注意事項

### 數據持久化

- 本地 Hardhat 節點在重啟後會重置
- 每次重啟需要重新部署合約
- 使用 `scripts/deploy-local.ts` 快速重新部署

### 測試帳戶

Hardhat 提供默認測試帳戶，私鑰可在 Hardhat 配置中找到：
```javascript
const accounts = [
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", // 10000 ETH
  "0x59c6995e998f97a5a0044966f0945389ac9e957295a3b5b5c9765b7b45774e9e", // 10000 ETH
  // ... 更多帳戶
]
```

### 部署腳本

使用以下命令來執行不同的操作：

```bash
# 編譯合約
npx hardhat compile

# 運行測試
npx hardhat test

# 部署到本地
npx hardhat run scripts/deploy-local.ts --network hardhat

# 部署到 Base Sepolia（需要配置 .env）
npx hardhat run scripts/deploy.ts --network baseSepolia

# 啟動 Hardhat 節點
npx hardhat node

# 啟動 Hardhat 控制台
npx hardhat console
```

---

## 🎉 下一步

現在您可以：

1. ✅ **本地測試**: 在本地環境中測試所有功能
2. ⏳ **部署到測試網**: 部署到 Base Sepolia 測試網
3. ⏳ **配置 AI**: 設置 OpenAI API Key
4. ⏳ **主網部署**: 準備部署到 Base Mainnet

---

**開發愉快！** 🚀









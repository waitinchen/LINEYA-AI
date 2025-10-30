# 🚀 LINKYA-AI 快速部署指南

## 立即執行 Base Sepolia 部署 (3 步驟)

### 📋 前置條件
1. **Base Sepolia 測試 ETH**: 至少 0.01 ETH
   - 獲取連結: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet

2. **環境變數**: `.env` 文件已配置
   - `BASE_SEPOLIA_RPC_URL`: Alchemy API 金鑰
   - `PRIVATE_KEY`: 部署者錢包私鑰
   - `BASESCAN_API_KEY`: BaseScan API 金鑰（可選）

### 🎯 步驟 1: 獲取測試 ETH

訪問上述水龍頭連結，輸入你的錢包地址以獲取測試 ETH。

### 🎯 步驟 2: 執行部署

在項目根目錄運行：

```bash
npx hardhat run scripts/deploy.ts --network baseSepolia
```

**預期輸出**:
```
🚀 開始部署 LINKYA-AI 合約到 Base Sepolia...
📝 部署者地址: 0x...
💰 帳戶餘額: 0.XX ETH
📦 部署 LINKYAPersonaNFT 合約...
✅ LINKYAPersonaNFT 合約部署成功!
📍 合約地址: 0x[DEPLOYED_ADDRESS_HERE]
🔗 BaseScan 連結: https://sepolia.basescan.org/address/0x[DEPLOYED_ADDRESS_HERE]
```

### 🎯 步驟 3: 更新前端配置

1. 複製部署的合約地址
2. 打開 `linkya-frontend/app/page.tsx`
3. 找到第 19 行，更新合約地址：
```typescript
const PERSONA_NFT_ADDRESS_LOCAL = '0x[YOUR_DEPLOYED_ADDRESS]' as `0x${string}`;
```

4. 重啟開發服務器（如果正在運行）

### ✅ 步驟 4: 測試鑄造功能

1. 啟動前端: `cd linkya-frontend && npm run dev`
2. 打開瀏覽器: http://localhost:3000
3. 連接錢包
4. 點擊 "鑄造 NFT" 標籤
5. 點擊 "🚀 鑄造 CoreLink-Framework NFT"
6. 確認交易
7. 查看交易哈希: https://sepolia.basescan.org/tx/[TRANSACTION_HASH]

---

## 🎉 部署成功確認

部署成功後，請告知我：

1. **合約地址**: Base Sepolia 上的 `LINKYAPersonaNFT` 合約地址
2. **交易哈希**: 部署交易的哈希
3. **鑄造測試**: 第一次 NFT 鑄造的測試結果（如有）

我將立即更新前端配置並完成最終驗證！

---

**立即執行**: 訪問水龍頭 → 部署 → 測試鑄造 → 報告結果










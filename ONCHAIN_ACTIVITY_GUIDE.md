# LINKYA-AI 鏈上活動操作指南

## 🎯 目標：最大化 Base 每週獎勵機會

### 📋 已完成的里程碑

✅ **合約部署成功**
- 合約地址: `0x2289c090A0a112F8e6B5A18B09aE327917E9A924`
- 網路: Base Sepolia Testnet
- 狀態: 部署完成，等待驗證

### 🚀 下一步操作

#### 1. 合約驗證 (Code Verification)

**目標**: 在 BaseScan 上驗證合約源碼，提高透明度

**方法 A: 自動驗證**
```bash
npm run verify:contract
```

**方法 B: 手動驗證**
1. 前往 [BaseScan](https://sepolia.basescan.org/address/0x2289c090A0a112F8e6B5A18B09aE327917E9A924)
2. 點擊 "Contract" 標籤
3. 點擊 "Verify and Publish"
4. 選擇 "Solidity (Single file)"
5. 輸入合約名稱: `LINKYAPersonaNFT`
6. 選擇編譯器版本: `v0.8.20`
7. 選擇授權: `MIT`
8. 貼上合約源碼並驗證

#### 2. 鑄造第一個 NFT (On-chain Data)

**目標**: 創建鏈上活動，鑄造代表 CoreLink-Persona-Engine 的 NFT

**執行命令**:
```bash
npm run mint:first-persona
```

**預期結果**:
- 鑄造 "CoreLink-Framework" 人格 NFT
- 包含 10 個特徵值
- 費用: 0.001 ETH
- 生成交易哈希和 NFT ID

#### 3. 鏈上活動記錄

**合約地址**: `0x2289c090A0a112F8e6B5A18B09aE327917E9A924`

**BaseScan 連結**:
- [合約頁面](https://sepolia.basescan.org/address/0x2289c090A0a112F8e6B5A18B09aE327917E9A924)
- [交易記錄](https://sepolia.basescan.org/tx/)

### 📊 預期的鏈上活動

1. **合約部署交易** ✅
2. **合約驗證** ⏳
3. **第一個 NFT 鑄造** ⏳
4. **後續人格鑄造** ⏳

### 🎯 Base Builder Rewards 策略

**核心優勢**:
- ✅ 使用 Base Sepolia 測試網
- ✅ 創新的 AI 人格養成概念
- ✅ 完整的智能合約系統
- ✅ 開源框架整合 (CoreLink-Persona-Engine)
- ✅ 模組化設計和可擴展性

**建議的後續活動**:
1. 鑄造多個不同人格的 NFT
2. 實現人格特徵更新功能
3. 添加經驗值系統使用
4. 創建前端界面展示

### 🔧 技術規格

**合約特性**:
- Solidity 0.8.20
- OpenZeppelin 安全庫
- ERC-721 標準
- 可升級特徵系統
- 經驗值成長機制
- 用戶人格管理

**網路配置**:
- Base Sepolia (測試網)
- Chain ID: 84532
- RPC: Alchemy
- Gas Price: 1 gwei

### 📈 成功指標

**短期目標**:
- [ ] 合約驗證完成
- [ ] 第一個 NFT 鑄造成功
- [ ] BaseScan 上顯示完整合約源碼

**中期目標**:
- [ ] 多個人格 NFT 鑄造
- [ ] 前端界面開發
- [ ] AI 人格系統整合

**長期目標**:
- [ ] 主網部署
- [ ] 社區建設
- [ ] Base 生態整合

---

**注意**: 請確保 `.env` 文件中的私鑰已正確配置，並且錢包中有足夠的 Base Sepolia ETH 用於 Gas 費用。








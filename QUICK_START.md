# 🚀 LINKYA-AI 快速啟動指南

## ✅ 本地開發環境已準備就緒！

所有組件已配置並就緒，現在您可以：

---

## 📦 當前狀態

### ✅ 已完成
- 智能合約編譯完成
- 測試全部通過 (13/13)
- 合約部署到本地網絡
- 前端配置更新為本地地址
- Hardhat 節點後台運行中
- 前端開發服務器啟動中

### ⏳ 待測試
- NFT 鑄造功能
- AI 對話功能

---

## 🎯 立即開始

### 訪問應用
打開瀏覽器訪問：
```
http://localhost:3000
```

### 快速操作流程

1. **連接錢包**
   - 點擊右上角 **Dev 登入** 按鈕
   - 自動連接本地測試帳戶（10000 ETH）

2. **鑄造 NFT**
   - 點擊 **🎭 鑄造 NFT** 標籤
   - 點擊 **🚀 鑄造 CoreLink-Framework NFT**
   - 確認交易（幾乎即時完成）

3. **AI 對話**
   - 點擊 **🧠 AI 對話** 標籤
   - 與皮皮角色互動

---

## 📍 重要地址

### 合約
- **地址**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
- **網絡**: Hardhat 本地 (Chain ID: 31337)
- **RPC**: `http://127.0.0.1:8545`

### 測試帳戶
```
部署者: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
```

---

## 🔧 開發工具

### 檢查 Hardhat 節點狀態
```bash
curl http://127.0.0.1:8545
```

### 重啟服務

如果服務停止，可以運行：

**PowerShell (Windows)**:
```powershell
.\scripts\start-local-dev.ps1
```

**Bash (Mac/Linux)**:
```bash
bash scripts/start-local-dev.sh
```

**或手動啟動**:

終端 1 - Hardhat 節點:
```bash
npx hardhat node
```

終端 2 - 前端服務器:
```bash
cd linkya-frontend
npm run dev
```

---

## 🐛 常見問題

### 問題：無法訪問 localhost:3000

**解決**:
1. 確認前端服務器正在運行
2. 檢查控制台是否有錯誤
3. 嘗試重啟：`cd linkya-frontend && npm run dev`

### 問題：錢包無法連接

**解決**:
1. 使用 **Dev 登入** 按鈕（不需要真實錢包）
2. 或配置 MetaMask 連接到本地網絡

### 問題：交易失敗

**解決**:
1. 確認 Hardhat 節點正在運行
2. 檢查合約地址是否正確
3. 查看 Hardhat 節點輸出了解錯誤

---

## 📚 更多文檔

- **本地開發指南**: `LOCAL_DEVELOPMENT_GUIDE.md`
- **部署狀態**: `DEPLOYMENT_STATUS.md`
- **技術架構**: `LINKYA-AI_Technical_Architecture.md`

---

## 🎉 開始測試！

請打開瀏覽器訪問 **http://localhost:3000** 開始測試！

**祝開發愉快！** 🚀








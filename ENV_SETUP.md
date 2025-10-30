# LINKYA-AI 環境變數配置說明

## 請手動創建 `.env` 文件

在專案根目錄 `C:\Users\waiti\LINKYA-AI\` 下創建一個名為 `.env` 的文件，並填入以下內容：

```env
# LINKYA-AI 環境變數配置
# 請替換為你的實際值

# Base Sepolia RPC URL (推薦使用 Alchemy 或 Infura)
# 註冊地址: https://www.alchemy.com/ 或 https://infura.io/
BASE_SEPOLIA_RPC_URL="https://base-sepolia.g.alchemy.com/v2/YOUR_API_KEY"

# 部署合約的錢包私鑰 (請確保這是用於測試的錢包)
# 警告: 請勿在生產環境中使用此私鑰，僅用於測試！
PRIVATE_KEY="YOUR_PRIVATE_KEY_HERE"

# BaseScan API Key (用於合約驗證)
# 註冊地址: https://sepolia.basescan.org/
BASESCAN_API_KEY="YOUR_BASESCAN_API_KEY"
```

## 如何獲取這些值

### 1. Base Sepolia RPC URL
- 前往 [Alchemy](https://www.alchemy.com/) 或 [Infura](https://infura.io/)
- 註冊帳號並創建新專案
- 選擇 Base Sepolia 測試網
- 複製 RPC URL

### 2. 私鑰 (Private Key)
- 使用 MetaMask 創建新錢包（僅用於測試）
- 在 MetaMask 中：設定 > 安全性與隱私 > 顯示私鑰
- 複製私鑰（確保錢包中有一些 Base Sepolia ETH）

### 3. BaseScan API Key
- 前往 [BaseScan](https://sepolia.basescan.org/)
- 註冊帳號
- 在 API Keys 頁面創建新的 API Key

## 重要安全提醒
- 請勿將 `.env` 文件提交到版本控制系統
- 僅在測試環境中使用這些私鑰
- 定期更換 API Keys








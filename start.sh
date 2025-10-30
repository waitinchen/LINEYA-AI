#!/bin/bash
set -e  # 遇到錯誤立即退出

# 設置 NVM 安裝
echo "設置 NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # 載入 NVM
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# 安裝 Node.js
echo "安裝 Node.js..."
nvm install 20
nvm use 20

# 驗證安裝
echo "驗證 Node.js 安裝..."
node --version
npm --version

# 設置環境變量
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "進入前端目錄..."
cd linkya-frontend || exit 1

# 安裝依賴
echo "安裝專案依賴..."
npm ci

# 建置專案
echo "建置專案..."
npm run build

# 啟動服務
echo "啟動服務..."
npm start -- -p $PORT
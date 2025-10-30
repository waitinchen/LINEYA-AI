#!/bin/bash
set -e  # 遇到錯誤立即退出

# 檢查是否有 root 權限
if [ "$(id -u)" != "0" ]; then
    echo "需要 root 權限來安裝 Node.js"
    exec sudo "$0" "$@"
fi

echo "開始安裝 Node.js..."

# 安裝必要工具
apt-get update
apt-get install -y curl build-essential

# 安裝 Node.js
echo "正在安裝 Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# 驗證安裝
echo "驗證 Node.js 安裝..."
node --version
npm --version

# 確保全局安裝必要的 npm 包
echo "安裝全局 npm 包..."
npm install -g npm@latest
npm install -g pm2

# 設置環境變量
export NODE_ENV=production
export PORT=${PORT:-3000}

echo "進入前端目錄..."
cd linkya-frontend || exit 1

# 清理和安裝依賴
echo "安裝專案依賴..."
if [ -d "node_modules" ]; then
    rm -rf node_modules
fi
npm ci

# 建置專案
echo "建置專案..."
npm run build

# 使用 PM2 啟動服務
echo "啟動服務..."
pm2 start npm --name "linkya-frontend" -- start -- -p $PORT

# 監控日誌
pm2 logs
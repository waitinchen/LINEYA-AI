#!/bin/bash
# LINKYA-AI 本地開發啟動腳本

echo "🚀 啟動 LINKYA-AI 本地開發環境..."
echo ""

# 步驟 1: 啟動 Hardhat 節點
echo "📦 步驟 1: 啟動 Hardhat 節點"
echo "啟動中... (後台運行)"
npx hardhat node &
HARDHAT_PID=$!

# 等待節點啟動
sleep 5

# 步驟 2: 部署合約
echo ""
echo "📦 步驟 2: 部署合約到本地網絡"
npx hardhat run scripts/deploy-local.ts --network hardhat

# 步驟 3: 啟動前端
echo ""
echo "📦 步驟 3: 啟動前端開發服務器"
echo "打開終端: http://localhost:3000"
cd linkya-frontend && npm run dev









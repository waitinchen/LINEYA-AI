#!/bin/bash

# 安裝依賴
npm install

# 如果在根目錄
if [ -f "package.json" ]; then
    # 建置專案
    npm run build
    
    # 啟動服務
    npm start
fi

# 如果在 linkya-frontend 目錄
if [ -d "linkya-frontend" ]; then
    cd linkya-frontend
    
    # 安裝依賴
    npm install
    
    # 建置專案
    npm run build
    
    # 啟動服務
    npm start
fi
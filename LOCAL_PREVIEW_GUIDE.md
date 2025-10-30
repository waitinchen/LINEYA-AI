# 📱 本地預覽指南 - 治癒系AI對話界面

## 🎯 快速開始

### 方法 1: 直接打開 HTML 文件（最簡單）

1. **打開文件資源管理器**
2. **導航到**:
   ```
   C:\Users\waiti\LINKYA-AI\linkya-frontend\public\healing-chat-preview.html
   ```
3. **雙擊文件**，會在瀏覽器中自動打開

---

### 方法 2: 使用前端服務器（推薦）

#### 步驟 1: 啟動前端服務器

在 PowerShell 中執行：

```powershell
# 進入前端目錄
cd linkya-frontend

# 啟動開發服務器（PowerShell 使用分號分隔命令）
npm run dev
```

**或者分開執行：**
```powershell
cd linkya-frontend
npm run dev
```

#### 步驟 2: 等待服務器啟動

看到以下訊息表示成功：
```
  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000
  - Ready in 2.3s
```

#### 步驟 3: 打開預覽頁面

在瀏覽器中訪問：
```
http://localhost:3000/healing-chat-preview.html
```

---

## 🔧 如果遇到問題

### 問題 1: 端口 3000 已被佔用

**解決方案：**
1. 查找佔用端口的進程：
   ```powershell
   netstat -ano | findstr :3000
   ```

2. 結束進程（替換 PID）：
   ```powershell
   taskkill /PID <PID號碼> /F
   ```

3. 或使用其他端口：
   ```powershell
   cd linkya-frontend
   $env:PORT=3001; npm run dev
   ```
   然後訪問 `http://localhost:3001/healing-chat-preview.html`

### 問題 2: npm 命令找不到

**解決方案：**
1. 確認 Node.js 已安裝：
   ```powershell
   node --version
   npm --version
   ```

2. 如果未安裝，下載安裝：
   - 訪問：https://nodejs.org/
   - 下載 LTS 版本並安裝

### 問題 3: 依賴未安裝

**解決方案：**
```powershell
cd linkya-frontend
npm install
```

---

## 📦 Claude Code CLI 工具使用指南

### 安裝狀態

您已經安裝了 `@anthropic-ai/claude-code@2.0.1`！

### 驗證安裝

```powershell
claude-code --version
```

### 基本使用

```powershell
# 查看幫助
claude-code --help

# 在當前項目中使用
claude-code

# 指定項目目錄
claude-code --project ./linkya-frontend
```

### 常見命令

```powershell
# 初始化項目
claude-code init

# 運行代碼分析
claude-code analyze

# 生成文檔
claude-code docs
```

---

## 🎨 預覽頁面功能

訪問 `healing-chat-preview.html` 後，您可以：

### ✨ 核心功能

1. **切換 AI 人格**
   - 點擊側邊欄的人格卡片
   - 三個角色：暖阳、小阳、思哲

2. **響應式測試**
   - 調整瀏覽器窗口大小
   - 手機端：側邊欄可切換
   - 桌面端：三欄式布局

3. **互動元素**
   - 消息氣泡動畫
   - 情緒反饋指示器
   - 預測菜單
   - 多模態輸入區

---

## 🚀 快速命令參考

### 啟動前端服務器

```powershell
# 單行命令（PowerShell）
cd linkya-frontend; npm run dev

# 或者分開執行
cd linkya-frontend
npm run dev
```

### 停止服務器

在運行服務器的終端按 `Ctrl + C`

### 檢查服務器狀態

```powershell
# 檢查端口是否被佔用
netstat -an | findstr :3000
```

### 查看日誌

服務器啟動後，終端會顯示：
- 編譯狀態
- 錯誤訊息
- 訪問日誌

---

## 📝 下一步

1. ✅ 打開預覽頁面
2. ✅ 測試響應式設計
3. ✅ 切換不同 AI 人格
4. ✅ 體驗治癒系 UI 效果

---

## 🆘 需要幫助？

如果遇到任何問題，請：
1. 檢查 Node.js 和 npm 版本
2. 確認依賴已安裝（`npm install`）
3. 檢查端口是否被佔用
4. 查看終端錯誤訊息

---

**最後更新**: 2025-01-XX  
**適用於**: Windows PowerShell / CMD



# 重啟 LINKYA-AI 本地服務

Write-Host "🧹 清理舊進程..." -ForegroundColor Yellow

# 停止占用端口 8545 的進程
$port8545 = Get-NetTCPConnection -LocalPort 8545 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if($port8545) {
    Write-Host "發現端口 8545 被佔用，正在停止進程: $port8545" -ForegroundColor Yellow
    foreach($pid in $port8545) {
        try { 
            Stop-Process -Id $pid -Force 
            Write-Host "已停止進程 $pid" -ForegroundColor Green
        } catch {}
    }
    Start-Sleep -Seconds 2
}

# 停止占用端口 3000 的進程
$port3000 = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if($port3000) {
    Write-Host "發現端口 3000 被佔用，正在停止進程: $port3000" -ForegroundColor Yellow
    foreach($pid in $port3000) {
        try { 
            Stop-Process -Id $pid -Force 
            Write-Host "已停止進程 $pid" -ForegroundColor Green
        } catch {}
    }
    Start-Sleep -Seconds 2
}

Write-Host ""
Write-Host "✅ 清理完成！現在請手動啟動服務：" -ForegroundColor Green
Write-Host ""
Write-Host "📋 步驟 1: 打開第一個終端，運行：" -ForegroundColor Cyan
Write-Host "   cd C:\Users\waiti\LINKYA-AI" -ForegroundColor White
Write-Host "   npx hardhat node" -ForegroundColor White
Write-Host ""
Write-Host "📋 步驟 2: 等待 Hardhat 啟動後（看到 Started HTTP...），按 Ctrl+C 關閉" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 步驟 3: 再次運行硬啟動，運行：" -ForegroundColor Cyan
Write-Host "   cd C:\Users\waiti\LINKYA-AI" -ForegroundColor White
Write-Host "   npx hardhat run scripts/deploy-local.ts --network hardhat" -ForegroundColor White
Write-Host ""
Write-Host "📋 步驟 4: 打開第三個終端，運行：" -ForegroundColor Cyan
Write-Host "   cd C:\Users\waiti\LINKYA-AI\linkya-frontend" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor White
Write-Host ""








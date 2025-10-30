param(
  [switch]$KillStale
)

# LINKYA-AI 本地開發啟動（開發者版本，PowerShell）

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

function Stop-PortOwners([int[]]$Ports){
  foreach($p in $Ports){
    try {
      $procs = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
      if($procs){ foreach($pid in $procs){ try { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue } catch {} } }
    } catch {}
  }
}

function Wait-Port([int]$Port, [int]$TimeoutSec=60){
  $sw = [Diagnostics.Stopwatch]::StartNew()
  while($sw.Elapsed.TotalSeconds -lt $TimeoutSec){
    try { if((Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -WarningAction SilentlyContinue).TcpTestSucceeded){ return $true } } catch {}
    Start-Sleep -Milliseconds 500
  }
  return $false
}

if($KillStale){ Stop-PortOwners @(8545,3000) }

Write-Host "[dev] 啟動 Hardhat 節點..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$PWD'; npx hardhat node" -WindowStyle Minimized | Out-Null

if(-not (Wait-Port -Port 8545 -TimeoutSec 60)){
  Write-Host "[dev] 端口 8545 未就緒，請檢查 Hardhat 日誌。" -ForegroundColor Red
  exit 1
}

Write-Host "[dev] 部署合約到 hardhat 網路..." -ForegroundColor Yellow
npx hardhat run scripts/deploy-local.ts --network hardhat

Write-Host "[dev] 啟動前端 (http://localhost:3000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$PWD\linkya-frontend'; npm run dev" -WindowStyle Minimized | Out-Null

Write-Host "[dev] 一切就緒。" -ForegroundColor Green








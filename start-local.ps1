param(
  [switch]$KillStale
)

# LINKYA-AI local dev startup (PowerShell)

$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot
Write-Host "Starting LINKYA-AI local environment..." -ForegroundColor Green
Write-Host ("Current directory: {0}" -f (Get-Location)) -ForegroundColor Cyan

function Stop-PortOwners([int[]]$Ports){
  foreach($p in $Ports){
    try {
      $procs = Get-NetTCPConnection -LocalPort $p -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
      if($procs){
        Write-Host ("Killing listeners on port {0}: {1}" -f $p, ($procs -join ",")) -ForegroundColor Yellow
        foreach($pid in $procs){
          try { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue } catch {}
        }
      }
    } catch {}
  }
}

function Wait-Port([int]$Port, [int]$TimeoutSec=60){
  $sw = [Diagnostics.Stopwatch]::StartNew()
  while($sw.Elapsed.TotalSeconds -lt $TimeoutSec){
    try {
      $res = Test-NetConnection -ComputerName 127.0.0.1 -Port $Port -WarningAction SilentlyContinue
      if($res.TcpTestSucceeded){ return $true }
    } catch {}
    Start-Sleep -Milliseconds 500
  }
  return $false
}

# Optional: free 8545/3000 first
if($KillStale){
  Stop-PortOwners @(8545,3000)
}

# Step 1: start Hardhat node
Write-Host "Step 1: start Hardhat node..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$PSScriptRoot'; npx hardhat node" -WindowStyle Minimized | Out-Null

Write-Host "Waiting for 127.0.0.1:8545 ..." -ForegroundColor DarkYellow
if(-not (Wait-Port -Port 8545 -TimeoutSec 60)){
  Write-Host "Port 8545 not ready; check Hardhat node log window." -ForegroundColor Red
  exit 1
}
Write-Host "Hardhat is ready." -ForegroundColor Green

# Step 2: deploy contracts
Write-Host "Step 2: deploy to hardhat network..." -ForegroundColor Yellow
try {
  npx hardhat run scripts/deploy-local.ts --network hardhat
} catch {
  Write-Host "Deployment failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}

# Step 3: start frontend
Write-Host "Step 3: start frontend (http://localhost:3000) ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit","-Command","cd '$PSScriptRoot\linkya-frontend'; npm run dev" -WindowStyle Minimized | Out-Null

Write-Host "Started Hardhat and frontend in new windows." -ForegroundColor Green
Write-Host "Verify: curl http://127.0.0.1:8545 ; open http://localhost:3000" -ForegroundColor Cyan







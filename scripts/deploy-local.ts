// LINKYA-AI 本地部署腳本
// 部署到本地 Hardhat 網絡

import { ethers } from "hardhat";

async function main() {
  console.log("🚀 開始部署 LINKYA-AI 合約到本地 Hardhat 網絡...");
  
  // 獲取部署者帳戶
  const [deployer] = await ethers.getSigners();
  console.log("📝 部署者地址:", deployer.address);
  
  // 檢查餘額
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 帳戶餘額:", ethers.formatEther(balance), "ETH");
  
  // 部署 LINKYAPersonaNFT 合約
  console.log("📦 部署 LINKYAPersonaNFT 合約...");
  const LINKYAPersonaNFT = await ethers.getContractFactory("LINKYAPersonaNFT");
  const linkyaPersonaNFT = await LINKYAPersonaNFT.deploy();
  
  await linkyaPersonaNFT.waitForDeployment();
  const contractAddress = await linkyaPersonaNFT.getAddress();
  
  console.log("✅ LINKYAPersonaNFT 合約部署成功!");
  console.log("📍 合約地址:", contractAddress);
  console.log("🔗 這是本地網絡地址，無法在區塊瀏覽器中查看");
  
  // 驗證合約功能
  console.log("\n🔍 驗證合約功能...");
  const name = await linkyaPersonaNFT.name();
  const symbol = await linkyaPersonaNFT.symbol();
  
  console.log("📋 合約資訊:");
  console.log("   - 合約名稱:", name);
  console.log("   - 合約符號:", symbol);
  console.log("   - 當前供應量: 0 (未鑄造任何NFT)");
  console.log("   - 鑄造價格: 0.001 ETH");
  console.log("   - 最大特徵數: 10");
  
  // 保存部署資訊
  const deploymentInfo = {
    network: "localhost",
    contractAddress: contractAddress,
    deployer: deployer.address,
    deploymentTime: new Date().toISOString(),
    name: name,
    symbol: symbol
  };
  
  console.log("\n💾 部署資訊:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  
  console.log("\n✅ 本地部署完成!");
  console.log("🎯 下一步：更新前端配置並啟動開發服務器");
}

// 執行部署
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 部署失敗:", error);
    process.exit(1);
  });


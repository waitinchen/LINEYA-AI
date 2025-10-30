// LINKYA-AI 第一個人格 NFT 鑄造腳本
// 鑄造代表 CoreLink-Persona-Engine 框架的 NFT

import { ethers } from "hardhat";

// ⚠️ 注意: 請替換為您成功部署到 Base Sepolia 的真實合約地址
// 本地部署地址: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Base Sepolia 部署地址: 需要部署後替換
const PERSONA_NFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

async function main() {
  console.log("🎭 開始鑄造 LINKYA-AI 第一個人格 NFT...");
  
  // 獲取部署者帳戶
  const [deployer] = await ethers.getSigners();
  console.log("📝 鑄造者地址:", deployer.address);
  
  // 檢查餘額
  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("💰 帳戶餘額:", ethers.formatEther(balance), "ETH");
  
  if (balance < ethers.parseEther("0.001")) {
    console.log("⚠️  警告: 餘額不足 0.001 ETH，無法鑄造");
    console.log("💡 請獲取測試網 ETH");
    process.exit(1);
  }
  
  // 獲取合約實例
  const LINKYAPersonaNFT = await ethers.getContractFactory("LINKYAPersonaNFT");
  const linkyaPersonaNFT = LINKYAPersonaNFT.attach(PERSONA_NFT_ADDRESS);
  
  console.log("📦 連接到合約:", PERSONA_NFT_ADDRESS);
  
  // 定義第一個人格的數據 (代表 CoreLink-Persona-Engine)
  const firstPersonaData = {
    name: "CoreLink-Framework",
    traits: [
      1,  // 多人格支援
      2,  // 模組化設計
      3,  // YAML 配置
      4,  // 15人格系統
      5,  // 記憶管理
      6,  // 交互策略
      7,  // 個性化定制
      8,  // 高級功能
      9,  // 開源框架
      10  // LINKYA 整合
    ]
  };
  
  console.log("🎨 人格數據:");
  console.log("   名稱:", firstPersonaData.name);
  console.log("   特徵數量:", firstPersonaData.traits.length);
  console.log("   特徵值:", firstPersonaData.traits.join(", "));
  
  // 計算鑄造費用
  const mintPrice = ethers.parseEther("0.001");
  console.log("💸 鑄造費用:", ethers.formatEther(mintPrice), "ETH");
  
  // 執行鑄造
  console.log("🚀 開始鑄造交易...");
  const tx = await linkyaPersonaNFT.mintPersona(
    firstPersonaData.name,
    firstPersonaData.traits,
    { value: mintPrice }
  );
  
  console.log("📋 交易哈希:", tx.hash);
  console.log("⏳ 等待交易確認...");
  
  // 等待交易確認
  const receipt = await tx.wait();
  console.log("✅ 交易確認! 區塊號:", receipt?.blockNumber);
  
  console.log("🎉 第一個 LINKYA-AI 人格 NFT 鑄造成功!");
  console.log("---------------------------------------");
  console.log("✅ 交易已確認!");
  console.log("📋 交易哈希:", tx.hash);
  console.log("🔢 區塊號:", receipt?.blockNumber);
  console.log("👤 擁有者:", deployer.address);
  console.log("🎨 人格名稱:", firstPersonaData.name);
  console.log("🔢 特徵數量:", firstPersonaData.traits.length);
  console.log("💸 鑄造費用:", ethers.formatEther(mintPrice), "ETH");
  console.log("---------------------------------------");
  
  // 保存鑄造資訊
  const mintInfo = {
    network: "hardhat",
    contractAddress: PERSONA_NFT_ADDRESS,
    personaName: firstPersonaData.name,
    traits: firstPersonaData.traits,
    minter: deployer.address,
    transactionHash: tx.hash,
    blockNumber: receipt?.blockNumber,
    mintTime: new Date().toISOString()
  };
  
  console.log("💾 鑄造資訊:");
  console.log(JSON.stringify(mintInfo, null, 2));
}

// 執行鑄造
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 鑄造失敗:", error);
    process.exit(1);
  });

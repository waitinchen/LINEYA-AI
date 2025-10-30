// LINKYA-AI 合約驗證腳本
// 在 BaseScan 上驗證合約源碼

import { run } from "hardhat";

async function main() {
  console.log("🔍 開始驗證 LINKYA-AI 合約...");
  
  // 合約地址 (從部署結果獲取)
  const contractAddress = "0x2289c090A0a112F8e6B5A18B09aE327917E9A924";
  
  console.log("📍 合約地址:", contractAddress);
  console.log("🌐 網路: Base Sepolia");
  
  try {
    // 執行合約驗證
    console.log("🚀 開始驗證過程...");
    
    await run("verify:verify", {
      address: contractAddress,
      network: "baseSepolia",
      // 由於我們的合約沒有構造函數參數，所以不需要 constructorArguments
    });
    
    console.log("✅ 合約驗證成功!");
    console.log("🔗 BaseScan 連結: https://sepolia.basescan.org/address/" + contractAddress);
    
  } catch (error: any) {
    if (error.message.includes("Already Verified")) {
      console.log("ℹ️  合約已經驗證過了");
      console.log("🔗 BaseScan 連結: https://sepolia.basescan.org/address/" + contractAddress);
    } else {
      console.error("❌ 驗證失敗:", error.message);
      
      // 提供手動驗證的指導
      console.log("\n📋 手動驗證步驟:");
      console.log("1. 前往 https://sepolia.basescan.org/address/" + contractAddress);
      console.log("2. 點擊 'Contract' 標籤");
      console.log("3. 點擊 'Verify and Publish'");
      console.log("4. 選擇 'Solidity (Single file)'");
      console.log("5. 輸入合約名稱: LINKYAPersonaNFT");
      console.log("6. 選擇編譯器版本: v0.8.20");
      console.log("7. 選擇授權: MIT");
      console.log("8. 貼上合約源碼並驗證");
    }
  }
}

// 執行驗證
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ 驗證過程失敗:", error);
    process.exit(1);
  });








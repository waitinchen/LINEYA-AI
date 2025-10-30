// LINKYA-AI Hardhat 配置
// 支援 Base Sepolia 測試網部署

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// 引入 dotenv
import * as dotenv from "dotenv";

// 載入 .env 檔案中的環境變數
dotenv.config();

// 從環境變數中取得 RPC URL 和 私鑰
const BASE_SEPOLIA_RPC_URL = process.env.BASE_SEPOLIA_RPC_URL || "";
const BASE_MAINNET_RPC_URL = process.env.BASE_MAINNET_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";

const config: HardhatUserConfig = {
  // 設定 Solidity 版本
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  
  // 設定網路
  networks: {
    // 預設的 Hardhat 測試網路
    hardhat: {
      // 可以在這裡放一些 Fork 配置等
      chainId: 31337,
    },
    // Base Sepolia 測試網配置
    baseSepolia: {
      url: BASE_SEPOLIA_RPC_URL,
      // 私鑰以陣列形式傳入
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
      // Base Sepolia 鏈 ID
      chainId: 84532, 
      gasPrice: 1000000000, // 1 gwei
    },
    // Base Mainnet 主網配置
    baseMainnet: {
      url: BASE_MAINNET_RPC_URL,
      // 私鑰以陣列形式傳入
      accounts: PRIVATE_KEY !== "" ? [PRIVATE_KEY] : [],
      // Base Mainnet 鏈 ID
      chainId: 8453, 
      gasPrice: 1000000000, // 1 gwei
    },
  },
  
  // Etherscan 合約驗證配置 (選配，但對 Base 很重要)
  etherscan: {
    // BaseScan 的 API Key 可以在 BaseScan 網站註冊取得
    // 部署時需要
    apiKey: {
      baseSepolia: process.env.BASESCAN_API_KEY || "",
      baseMainnet: process.env.BASESCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: "https://sepolia.basescan.org",
        },
      },
      {
        network: "baseMainnet",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org",
        },
      },
    ],
  },
  
  // 路徑配置
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};

export default config;

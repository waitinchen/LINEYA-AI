// LINKYA-AI 合約測試文件
// 測試 LINKYAPersonaNFT 合約功能

import { expect } from "chai";
import { ethers } from "hardhat";
import { LINKYAPersonaNFT } from "../typechain-types";

describe("LINKYAPersonaNFT", function () {
  let linkyaPersonaNFT: LINKYAPersonaNFT;
  let owner: any;
  let user1: any;
  let user2: any;

  beforeEach(async function () {
    // 獲取測試帳戶
    [owner, user1, user2] = await ethers.getSigners();
    
    // 部署合約
    const LINKYAPersonaNFT = await ethers.getContractFactory("LINKYAPersonaNFT");
    linkyaPersonaNFT = await LINKYAPersonaNFT.deploy();
    await linkyaPersonaNFT.waitForDeployment();
  });

  describe("部署", function () {
    it("應該正確設置合約名稱和符號", async function () {
      expect(await linkyaPersonaNFT.name()).to.equal("LINKYA Persona");
      expect(await linkyaPersonaNFT.symbol()).to.equal("LINKYA");
    });

    it("應該正確設置擁有者", async function () {
      expect(await linkyaPersonaNFT.owner()).to.equal(owner.address);
    });
  });

  describe("鑄造人格 NFT", function () {
    it("應該能夠鑄造新的人格 NFT", async function () {
      const name = "Luna";
      const traits = [1, 2, 3, 4, 5];
      const mintPrice = ethers.parseEther("0.001");

      await expect(
        linkyaPersonaNFT.connect(user1).mintPersona(name, traits, {
          value: mintPrice
        })
      )
        .to.emit(linkyaPersonaNFT, "PersonaMinted")
        .withArgs(0, user1.address, name, traits);

      // 檢查 NFT 所有權
      expect(await linkyaPersonaNFT.ownerOf(0)).to.equal(user1.address);
      
      // 檢查人格數據
      const personaData = await linkyaPersonaNFT.getPersonaData(0);
      expect(personaData.name).to.equal(name);
      expect(personaData.level).to.equal(1);
      expect(personaData.experience).to.equal(0);
    });

    it("應該拒絕支付不足的鑄造", async function () {
      const name = "Luna";
      const traits = [1, 2, 3];
      const insufficientPrice = ethers.parseEther("0.0005");

      await expect(
        linkyaPersonaNFT.connect(user1).mintPersona(name, traits, {
          value: insufficientPrice
        })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("應該拒絕空名稱", async function () {
      const traits = [1, 2, 3];
      const mintPrice = ethers.parseEther("0.001");

      await expect(
        linkyaPersonaNFT.connect(user1).mintPersona("", traits, {
          value: mintPrice
        })
      ).to.be.revertedWith("Name cannot be empty");
    });

    it("應該拒絕過多特徵", async function () {
      const name = "Luna";
      const tooManyTraits = Array(11).fill(1); // 11 個特徵，超過最大限制
      const mintPrice = ethers.parseEther("0.001");

      await expect(
        linkyaPersonaNFT.connect(user1).mintPersona(name, tooManyTraits, {
          value: mintPrice
        })
      ).to.be.revertedWith("Too many traits");
    });
  });

  describe("更新人格特徵", function () {
    beforeEach(async function () {
      // 先鑄造一個人格 NFT
      const name = "Luna";
      const traits = [1, 2, 3, 4, 5];
      const mintPrice = ethers.parseEther("0.001");

      await linkyaPersonaNFT.connect(user1).mintPersona(name, traits, {
        value: mintPrice
      });
    });

    it("應該能夠更新人格特徵", async function () {
      const newTraits = [6, 7, 8, 9, 10];

      await expect(
        linkyaPersonaNFT.connect(user1).updatePersonaTraits(0, newTraits)
      )
        .to.emit(linkyaPersonaNFT, "PersonaUpdated")
        .withArgs(0, newTraits);
    });

    it("應該拒絕非擁有者更新特徵", async function () {
      const newTraits = [6, 7, 8, 9, 10];

      await expect(
        linkyaPersonaNFT.connect(user2).updatePersonaTraits(0, newTraits)
      ).to.be.revertedWith("Not owner");
    });
  });

  describe("經驗值系統", function () {
    beforeEach(async function () {
      // 先鑄造一個人格 NFT
      const name = "Luna";
      const traits = [1, 2, 3, 4, 5];
      const mintPrice = ethers.parseEther("0.001");

      await linkyaPersonaNFT.connect(user1).mintPersona(name, traits, {
        value: mintPrice
      });
    });

    it("應該能夠增加經驗值", async function () {
      const experienceToAdd = 500;

      await linkyaPersonaNFT.addExperience(0, experienceToAdd);

      const personaData = await linkyaPersonaNFT.getPersonaData(0);
      expect(personaData.experience).to.equal(experienceToAdd);
    });

    it("應該在經驗值足夠時升級", async function () {
      const experienceToAdd = 1000; // 足夠升級到等級 2

      await expect(
        linkyaPersonaNFT.addExperience(0, experienceToAdd)
      )
        .to.emit(linkyaPersonaNFT, "PersonaLevelUp")
        .withArgs(0, 2);

      const personaData = await linkyaPersonaNFT.getPersonaData(0);
      expect(personaData.level).to.equal(2);
    });
  });

  describe("用戶人格管理", function () {
    it("應該正確追蹤用戶擁有的人格", async function () {
      const name1 = "Luna";
      const name2 = "Nexus";
      const traits = [1, 2, 3, 4, 5];
      const mintPrice = ethers.parseEther("0.001");

      // 鑄造兩個人格 NFT
      await linkyaPersonaNFT.connect(user1).mintPersona(name1, traits, {
        value: mintPrice
      });
      await linkyaPersonaNFT.connect(user1).mintPersona(name2, traits, {
        value: mintPrice
      });

      // 檢查用戶擁有的人格列表
      const userPersonas = await linkyaPersonaNFT.getUserPersonas(user1.address);
      expect(userPersonas.length).to.equal(2);
      expect(userPersonas[0]).to.equal(0);
      expect(userPersonas[1]).to.equal(1);
    });
  });

  describe("提取功能", function () {
    it("應該能夠提取合約餘額", async function () {
      // 先鑄造一個人格 NFT 以產生合約餘額
      const name = "Luna";
      const traits = [1, 2, 3, 4, 5];
      const mintPrice = ethers.parseEther("0.001");

      await linkyaPersonaNFT.connect(user1).mintPersona(name, traits, {
        value: mintPrice
      });

      const contractBalance = await ethers.provider.getBalance(await linkyaPersonaNFT.getAddress());
      expect(contractBalance).to.equal(mintPrice);

      // 提取餘額
      await linkyaPersonaNFT.withdraw();

      const newBalance = await ethers.provider.getBalance(await linkyaPersonaNFT.getAddress());
      expect(newBalance).to.equal(0);
    });

    it("應該拒絕非擁有者提取", async function () {
      await expect(
        linkyaPersonaNFT.connect(user1).withdraw()
      ).to.be.revertedWithCustomError(linkyaPersonaNFT, "OwnableUnauthorizedAccount");
    });
  });
});

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title LINKYAPersonaNFT
 * @dev LINKYA-AI 人格養成遊戲的 NFT 合約
 * @author C謀 (LINKYA開發助手)
 */
contract LINKYAPersonaNFT is ERC721, Ownable, ReentrancyGuard {
    
    // 事件定義
    event PersonaMinted(uint256 indexed tokenId, address indexed owner, string name, uint256[] traits);
    event PersonaUpdated(uint256 indexed tokenId, uint256[] newTraits);
    event PersonaLevelUp(uint256 indexed tokenId, uint256 newLevel);
    
    // 人格數據結構
    struct PersonaData {
        string name;           // 人格名稱
        uint256 personalityHash; // 人格特徵哈希
        uint256 experience;    // 經驗值
        uint256 level;         // 等級
        uint256 createdAt;     // 創建時間
        mapping(string => uint256) traits; // 人格特徵
    }
    
    // 狀態變數
    uint256 private _tokenIdCounter;
    mapping(uint256 => PersonaData) public personas;
    mapping(address => uint256[]) public userPersonas; // 用戶擁有的人格列表
    
    // 常數
    uint256 public constant MAX_TRAITS = 10;
    uint256 public constant MINT_PRICE = 0.001 ether;
    
    constructor() ERC721("LINKYA Persona", "LINKYA") Ownable(msg.sender) {
        // 合約部署者為擁有者
    }
    
    /**
     * @dev 鑄造新的人格 NFT
     * @param name 人格名稱
     * @param initialTraits 初始人格特徵
     */
    function mintPersona(
        string memory name,
        uint256[] memory initialTraits
    ) external payable nonReentrant {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(initialTraits.length <= MAX_TRAITS, "Too many traits");
        require(bytes(name).length > 0, "Name cannot be empty");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(msg.sender, tokenId);
        
        // 設置人格數據
        PersonaData storage persona = personas[tokenId];
        persona.name = name;
        persona.personalityHash = uint256(keccak256(abi.encodePacked(initialTraits)));
        persona.experience = 0;
        persona.level = 1;
        persona.createdAt = block.timestamp;
        
        // 設置人格特徵
        for (uint256 i = 0; i < initialTraits.length; i++) {
            persona.traits[string(abi.encodePacked("trait_", i))] = initialTraits[i];
        }
        
        // 記錄用戶擁有的人格
        userPersonas[msg.sender].push(tokenId);
        
        emit PersonaMinted(tokenId, msg.sender, name, initialTraits);
    }
    
    /**
     * @dev 更新人格特徵
     * @param tokenId 人格 NFT ID
     * @param newTraits 新的人格特徵
     */
    function updatePersonaTraits(
        uint256 tokenId,
        uint256[] memory newTraits
    ) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(newTraits.length <= MAX_TRAITS, "Too many traits");
        
        PersonaData storage persona = personas[tokenId];
        persona.personalityHash = uint256(keccak256(abi.encodePacked(newTraits)));
        
        // 更新特徵
        for (uint256 i = 0; i < newTraits.length; i++) {
            persona.traits[string(abi.encodePacked("trait_", i))] = newTraits[i];
        }
        
        emit PersonaUpdated(tokenId, newTraits);
    }
    
    /**
     * @dev 增加人格經驗值
     * @param tokenId 人格 NFT ID
     * @param experience 增加的經驗值
     */
    function addExperience(uint256 tokenId, uint256 experience) external onlyOwner {
        PersonaData storage persona = personas[tokenId];
        persona.experience += experience;
        
        // 檢查是否升級
        uint256 newLevel = persona.experience / 1000 + 1;
        if (newLevel > persona.level) {
            persona.level = newLevel;
            emit PersonaLevelUp(tokenId, newLevel);
        }
    }
    
    /**
     * @dev 獲取人格數據
     * @param tokenId 人格 NFT ID
     * @return name 人格名稱
     * @return experience 經驗值
     * @return level 等級
     * @return createdAt 創建時間
     */
    function getPersonaData(uint256 tokenId) external view returns (
        string memory name,
        uint256 experience,
        uint256 level,
        uint256 createdAt
    ) {
        PersonaData storage persona = personas[tokenId];
        return (persona.name, persona.experience, persona.level, persona.createdAt);
    }
    
    /**
     * @dev 獲取用戶擁有的人格列表
     * @param user 用戶地址
     * @return 人格 ID 列表
     */
    function getUserPersonas(address user) external view returns (uint256[] memory) {
        return userPersonas[user];
    }
    
    /**
     * @dev 提取合約餘額
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }
    
    /**
     * @dev 重寫 _update 以更新用戶人格列表
     */
    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        
        // 調用父類的 _update
        address previousOwner = super._update(to, tokenId, auth);
        
        if (from != address(0) && to != address(0)) {
            // 從原擁有者列表中移除
            uint256[] storage fromPersonas = userPersonas[from];
            for (uint256 i = 0; i < fromPersonas.length; i++) {
                if (fromPersonas[i] == tokenId) {
                    fromPersonas[i] = fromPersonas[fromPersonas.length - 1];
                    fromPersonas.pop();
                    break;
                }
            }
            
            // 添加到新擁有者列表
            userPersonas[to].push(tokenId);
        }
        
        return previousOwner;
    }
}

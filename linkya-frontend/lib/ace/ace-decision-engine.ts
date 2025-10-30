// ACE (Autonomy, Capability, Execution) 決策引擎
// LINKYA-AI 核心決策系統

import { Persona } from '../chatkit/chatkit-types';
import { ethers } from 'ethers';

/**
 * ACE 決策引擎
 * 
 * A (Autonomy) - 自主性：AI 人格的核心目標和身份
 * C (Capability) - 能力：AI 可用的工具和函式
 * E (Execution) - 執行：實際調用外部系統
 */

// AI 可用工具的類型定義
export interface AITool {
  name: string;
  description: string;
  parameters: {
    [key: string]: {
      type: string;
      description: string;
      required: boolean;
    };
  };
}

// ACE 決策結果
export interface ACEDecision {
  decision: 'chat' | 'execute_tool' | 'hybrid';
  reasoning: string;
  toolName?: string;
  toolParameters?: any;
  executionRequired: boolean;
  n8nWebhookUrl?: string;
}

// AI 工具清單 (C - Capability)
const AI_TOOLS: AITool[] = [
  {
    name: 'mintNFT',
    description: '鑄造一個新的 AI 人格 NFT',
    parameters: {
      personaName: {
        type: 'string',
        description: 'AI 人格的名稱',
        required: true,
      },
      traits: {
        type: 'array',
        description: 'AI 人格的特徵數組（最多 10 個特徵）',
        required: true,
      },
    },
  },
  {
    name: 'getPersonaNFTData',
    description: '獲取指定 NFT 的人格數據',
    parameters: {
      nftId: {
        type: 'number',
        description: 'NFT Token ID',
        required: true,
      },
    },
  },
  {
    name: 'updatePersonaTraits',
    description: '更新 AI 人格的特徵',
    parameters: {
      nftId: {
        type: 'number',
        description: 'NFT Token ID',
        required: true,
      },
      newTraits: {
        type: 'array',
        description: '新的特徵數組',
        required: true,
      },
    },
  },
  {
    name: 'addExperience',
    description: '為 AI 人格添加經驗值',
    parameters: {
      nftId: {
        type: 'number',
        description: 'NFT Token ID',
        required: true,
      },
      amount: {
        type: 'number',
        description: '要添加的經驗值',
        required: true,
      },
    },
  },
  {
    name: 'levelUp',
    description: '提升 AI 人格的等級',
    parameters: {
      nftId: {
        type: 'number',
        description: 'NFT Token ID',
        required: true,
      },
    },
  },
  {
    name: 'getUserPersonas',
    description: '獲取用戶擁有的所有 AI 人格 NFT',
    parameters: {
      walletAddress: {
        type: 'string',
        description: '用戶的錢包地址',
        required: true,
      },
    },
  },
  {
    name: 'triggerN8NWorkflow',
    description: '觸發 n8n 自動化工作流',
    parameters: {
      workflowName: {
        type: 'string',
        description: '工作流名稱',
        required: true,
      },
      data: {
        type: 'object',
        description: '要傳遞給工作流的數據',
        required: true,
      },
    },
  },
];

/**
 * ACE 決策引擎
 */
export class ACEDecisionEngine {
  private persona: Persona;
  private userMessage: string;
  private conversationHistory: any[];

  constructor(persona: Persona, userMessage: string, conversationHistory: any[]) {
    this.persona = persona;
    this.userMessage = userMessage;
    this.conversationHistory = conversationHistory;
  }

  /**
   * 生成 System Prompt (A - Autonomy)
   */
  private generateAutonomyPrompt(): string {
    return `你是一個名為 ${this.persona.name} 的 AI 人格，專門為 LINKYA-AI 專案服務。

你的核心目標和身份：
- 角色：${this.persona.name}
- 性格：${this.persona.personality}
- 特徵：${this.persona.traits.join(', ')}
- 等級：${this.persona.level}
- 經驗值：${this.persona.experience}

你的行為準則：
1. 你應該提供關於 Web3 技術、AI 人格開發、智能合約、Base L2 等方面的專業知識
2. 你可以主動使用可用的工具來執行 Web3 交易或查詢區塊鏈數據
3. 當用戶明確請求鑄造 NFT、更新人格數據、或執行其他鏈上操作時，你應該提供相應的工具調用
4. 保持專業、有幫助、略帶未來感的語氣
5. 使用繁體中文回應

可用的工具：
${AI_TOOLS.map(tool => `
- ${tool.name}: ${tool.description}
  參數: ${JSON.stringify(tool.parameters, null, 2)}
`).join('\n')}

請根據用戶的請求，決定是純聊天還是需要調用工具執行鏈上操作。
如果要執行工具，請提供清晰的 toolName 和 toolParameters。`;
  }

  /**
   * 分析用戶意圖並做出 ACE 決策
   */
  async makeDecision(): Promise<ACEDecision> {
    const systemPrompt = this.generateAutonomyPrompt();
    const userMessage = this.userMessage.toLowerCase();

    // 分析用戶意圖關鍵字
    const intentKeywords = {
      mint: ['鑄造', 'mint', 'nft', '人格', '創建', '生成'],
      update: ['更新', 'update', '修改', '改變'],
      experience: ['經驗', 'exp', '升級', 'level'],
      query: ['查詢', '查詢', '獲取', 'get', '問'],
      n8n: ['自動', '自動化', '工作流', 'workflow', '通知'],
    };

    // 判斷用戶意圖
    let decisionType: 'chat' | 'execute_tool' | 'hybrid' = 'chat';
    let toolName: string | undefined;
    let toolParameters: any = {};

    // 檢查是否要鑄造 NFT
    if (intentKeywords.mint.some(keyword => userMessage.includes(keyword))) {
      decisionType = 'execute_tool';
      toolName = 'mintNFT';
      
      // 提取人格名稱
      const nameMatch = userMessage.match(/(?:人格名稱|名稱|名字)[:：]?\s*(\w+)/i);
      const personaName = nameMatch ? nameMatch[1] : 'UnknownPersona';
      
      // 提取特徵
      const traitsMatch = userMessage.match(/特徵[:：]?\s*\[?([\d,\s]+)\]?/i);
      const traits = traitsMatch 
        ? traitsMatch[1].split(',').map(t => parseInt(t.trim())).filter(t => !isNaN(t))
        : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      
      toolParameters = {
        personaName,
        traits,
      };
    }

    // 檢查是否要查詢 NFT 數據
    else if (intentKeywords.query.some(keyword => userMessage.includes(keyword))) {
      decisionType = 'execute_tool';
      
      if (userMessage.includes('nft') || userMessage.includes('人格數據')) {
        toolName = 'getPersonaNFTData';
        const nftIdMatch = userMessage.match(/nft\s*(?:id|編號)?[:：]?\s*(\d+)/i);
        toolParameters = {
          nftId: nftIdMatch ? parseInt(nftIdMatch[1]) : 1,
        };
      } else if (userMessage.includes('我的人格') || userMessage.includes('user personas')) {
        toolName = 'getUserPersonas';
        // walletAddress 需要從用戶上下文獲取
      }
    }

    // 檢查是否要觸發 n8n 工作流
    else if (intentKeywords.n8n.some(keyword => userMessage.includes(keyword))) {
      decisionType = 'execute_tool';
      toolName = 'triggerN8NWorkflow';
      toolParameters = {
        workflowName: 'user_notification',
        data: {
          message: this.userMessage,
          timestamp: new Date().toISOString(),
        },
      };
    }

    // 生成推理說明
    let reasoning = '';
    if (decisionType === 'chat') {
      reasoning = '用戶正在進行一般性對話，不需要執行 Web3 交易或工具調用。';
    } else if (decisionType === 'execute_tool') {
      reasoning = `用戶的意圖是執行工具：${toolName}，參數：${JSON.stringify(toolParameters)}`;
    }

    return {
      decision: decisionType,
      reasoning,
      toolName,
      toolParameters,
      executionRequired: decisionType !== 'chat',
      n8nWebhookUrl: toolName === 'triggerN8NWorkflow' ? process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL : undefined,
    };
  }

  /**
   * 執行工具調用 (E - Execution)
   */
  async executeTool(decision: ACEDecision, walletAddress: string, provider?: any): Promise<any> {
    if (!decision.executionRequired || !decision.toolName) {
      throw new Error('不需要執行工具');
    }

    const { toolName, toolParameters } = decision;

    // Web3 合約調用
    if (['mintNFT', 'updatePersonaTraits', 'addExperience', 'levelUp'].includes(toolName)) {
      return await this.executeWeb3Tool(toolName, toolParameters, walletAddress, provider);
    }

    // n8n 工作流調用
    if (toolName === 'triggerN8NWorkflow') {
      return await this.executeN8NWorkflow(toolParameters);
    }

    // 查詢操作（可能需要合約讀取）
    if (['getPersonaNFTData', 'getUserPersonas'].includes(toolName)) {
      return await this.executeReadTool(toolName, toolParameters, walletAddress, provider);
    }

    throw new Error(`未知的工具：${toolName}`);
  }

  /**
   * 執行 Web3 工具調用
   */
  private async executeWeb3Tool(toolName: string, parameters: any, walletAddress: string, provider?: any): Promise<any> {
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PERSONA_NFT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const CONTRACT_ABI = require('../../contract-abi').PERSONA_NFT_ABI;

    if (!provider) {
      throw new Error('Provider 未初始化');
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider) as any;

    switch (toolName) {
      case 'mintNFT':
        const { personaName, traits } = parameters;
        const mintPrice = ethers.parseEther('0.001');
        const signer = provider.getSigner();
        const contractWithSigner = contract.connect(signer);
        
        const mintTx = await contractWithSigner.mintPersona(personaName, traits, { value: mintPrice });
        await mintTx.wait();
        
        return {
          success: true,
          transactionHash: mintTx.hash,
          message: `成功鑄造 NFT: ${personaName}`,
        };

      case 'updatePersonaTraits':
        const { nftId, newTraits } = parameters;
        const updateTx = await contract.updatePersonaTraits(nftId, newTraits);
        await updateTx.wait();
        
        return {
          success: true,
          transactionHash: updateTx.hash,
          message: `成功更新 NFT #${nftId} 的特徵`,
        };

      case 'addExperience':
        const { nftId: expNftId, amount } = parameters;
        const addExpTx = await contract.addExperience(expNftId, amount);
        await addExpTx.wait();
        
        return {
          success: true,
          transactionHash: addExpTx.hash,
          message: `成功為 NFT #${expNftId} 添加 ${amount} 點經驗值`,
        };

      case 'levelUp':
        const { nftId: levelNftId } = parameters;
        const levelTx = await contract.levelUp(levelNftId);
        await levelTx.wait();
        
        return {
          success: true,
          transactionHash: levelTx.hash,
          message: `成功提升 NFT #${levelNftId} 的等級`,
        };

      default:
        throw new Error(`不支援的 Web3 工具：${toolName}`);
    }
  }

  /**
   * 執行 n8n 工作流
   */
  private async executeN8NWorkflow(parameters: any): Promise<any> {
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'https://your-n8n-instance.com/webhook';
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters.data),
      });

      if (!response.ok) {
        throw new Error('n8n 工作流執行失敗');
      }

      return {
        success: true,
        message: `成功觸發 n8n 工作流：${parameters.workflowName}`,
      };
    } catch (error) {
      throw new Error(`n8n 工作流執行失敗：${error}`);
    }
  }

  /**
   * 執行只讀工具（查詢）
   */
  private async executeReadTool(toolName: string, parameters: any, walletAddress: string, provider?: any): Promise<any> {
    const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_PERSONA_NFT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';
    const CONTRACT_ABI = require('../../contract-abi').PERSONA_NFT_ABI;

    if (!provider) {
      throw new Error('Provider 未初始化');
    }

    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider) as any;

    switch (toolName) {
      case 'getPersonaNFTData':
        const { nftId } = parameters;
        const personaData = await contract.getPersonaData(nftId);
        
        return {
          success: true,
          data: {
            nftId,
            name: personaData.name,
            traits: personaData.traits,
            experience: personaData.experience.toString(),
            level: personaData.level.toString(),
          },
        };

      case 'getUserPersonas':
        const personaIds = await contract.getUserPersonas(walletAddress);
        
        return {
          success: true,
          data: {
            walletAddress,
            personaIds: personaIds.map((id: any) => id.toString()),
          },
        };

      default:
        throw new Error(`不支援的讀取工具：${toolName}`);
    }
  }
}

// 導出 AI 工具清單
export { AI_TOOLS };
export const aceDecisionEngine = new ACEDecisionEngine(
  {} as Persona,
  '',
  []
);


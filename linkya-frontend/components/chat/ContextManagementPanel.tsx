'use client';

import React, { useState, useEffect } from 'react';

interface ContextManagementPanelProps {
  isVisible: boolean;
  onClose: () => void;
  messageCount: number;
  contextLength: number;
  onContextLengthChange: (length: number) => void;
  onCompressContext: () => void;
  onClearContext: () => void;
  onTogglePipiInterruption: () => void;
  className?: string;
}

export const ContextManagementPanel: React.FC<ContextManagementPanelProps> = ({
  isVisible,
  onClose,
  messageCount,
  contextLength,
  onContextLengthChange,
  onCompressContext,
  onClearContext,
  onTogglePipiInterruption,
  className = ''
}) => {
  const [estimatedTokens, setEstimatedTokens] = useState(0);
  const [usagePercentage, setUsagePercentage] = useState(0);
  const [remainingMessages, setRemainingMessages] = useState(0);

  // 計算統計數據
  useEffect(() => {
    const tokens = Math.floor(messageCount * 50); // 估算每個消息50個token
    const usage = Math.floor((messageCount / contextLength) * 100);
    const remaining = Math.max(0, contextLength - messageCount);
    
    setEstimatedTokens(tokens);
    setUsagePercentage(usage);
    setRemainingMessages(remaining);
  }, [messageCount, contextLength]);

  if (!isVisible) return null;

  return (
    <div className={`context-panel ${className}`}>
      <div className="context-panel-content">
        <div className="context-title">📊 上下文管理 (50-100條：長期陪伴)</div>
        
        <div className="context-stats">
          <div className="context-stat">
            <div className="context-stat-label">對話條數</div>
            <div className="context-stat-value">{messageCount}</div>
          </div>
          <div className="context-stat">
            <div className="context-stat-label">估算Tokens</div>
            <div className="context-stat-value">{estimatedTokens.toLocaleString()}</div>
          </div>
          <div className="context-stat">
            <div className="context-stat-label">使用率</div>
            <div className="context-stat-value">{usagePercentage}%</div>
          </div>
          <div className="context-stat">
            <div className="context-stat-label">剩餘空間</div>
            <div className="context-stat-value">{remainingMessages}</div>
          </div>
        </div>
        
        <div className="context-controls">
          <span className="context-control-label">上下文長度:</span>
          <input 
            type="range" 
            className="context-slider" 
            min="50" 
            max="100" 
            value={contextLength}
            onChange={(e) => onContextLengthChange(parseInt(e.target.value))}
          />
          <span className="context-control-value">{contextLength}</span>
        </div>
        
        <div className="context-buttons">
          <button 
            className="context-btn" 
            onClick={onCompressContext}
            title="壓縮上下文以節省空間"
          >
            🗜️ 壓縮
          </button>
          <button 
            className="context-btn" 
            onClick={onClearContext}
            title="清空所有對話歷史"
          >
            🗑️ 清空
          </button>
          <button 
            className="context-btn" 
            onClick={onTogglePipiInterruption}
            title="切換皮皮插話功能"
          >
            🐻 皮皮插話
          </button>
          <button 
            className="context-btn cancel" 
            onClick={onClose}
            title="關閉面板"
          >
            關閉
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .context-panel {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 1000;
          min-width: 400px;
          max-width: 90vw;
          animation: contextPanelFadeIn 0.3s ease-out;
        }
        
        .context-panel-content {
          padding: 30px;
        }
        
        .context-title {
          color: white;
          font-size: 18px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }
        
        .context-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .context-stat {
          background: rgba(255, 255, 255, 0.1);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .context-stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          margin-bottom: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .context-stat-value {
          color: white;
          font-size: 18px;
          font-weight: bold;
        }
        
        .context-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        
        .context-control-label {
          color: white;
          font-size: 14px;
          font-weight: 500;
          min-width: 80px;
        }
        
        .context-slider {
          flex: 1;
          height: 6px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.2);
          outline: none;
          -webkit-appearance: none;
          appearance: none;
        }
        
        .context-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .context-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .context-control-value {
          color: white;
          font-size: 14px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }
        
        .context-buttons {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .context-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 8px;
          padding: 10px 16px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 500;
          min-width: 80px;
        }
        
        .context-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        
        .context-btn:active {
          transform: translateY(0);
        }
        
        .context-btn.cancel {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .context-btn.cancel:hover {
          background: rgba(255, 255, 255, 0.2);
          box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
        }
        
        @keyframes contextPanelFadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        /* 手機版優化 */
        @media screen and (max-width: 768px) {
          .context-panel {
            min-width: 90vw;
            max-width: 95vw;
          }
          
          .context-panel-content {
            padding: 20px;
          }
          
          .context-title {
            font-size: 16px;
            margin-bottom: 15px;
          }
          
          .context-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
          }
          
          .context-stat {
            padding: 12px;
          }
          
          .context-stat-label {
            font-size: 11px;
          }
          
          .context-stat-value {
            font-size: 16px;
          }
          
          .context-controls {
            flex-direction: column;
            gap: 8px;
            padding: 12px;
          }
          
          .context-control-label {
            min-width: auto;
            text-align: center;
          }
          
          .context-buttons {
            gap: 8px;
          }
          
          .context-btn {
            padding: 8px 12px;
            font-size: 13px;
            min-width: 70px;
          }
        }
        
        /* 小屏幕手機 */
        @media screen and (max-width: 480px) {
          .context-stats {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          
          .context-buttons {
            flex-direction: column;
            gap: 6px;
          }
          
          .context-btn {
            width: 100%;
            min-width: auto;
          }
        }
      `}</style>
    </div>
  );
};









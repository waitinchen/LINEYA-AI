'use client';

import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface HeartWindowEngineRef {
  setMood: (mood: string) => void;
  start: () => void;
  stop: () => void;
}

interface HeartWindowProps {
  className?: string;
  mood?: string;
}

export const HeartWindow = forwardRef<HeartWindowEngineRef, HeartWindowProps>(
  ({ className = '', mood = 'normal' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<HeartWindowEngine | null>(null);

    useImperativeHandle(ref, () => ({
      setMood: (newMood: string) => {
        if (engineRef.current) {
          engineRef.current.setMood(newMood);
        }
      },
      start: () => {
        if (engineRef.current) {
          engineRef.current.start();
        }
      },
      stop: () => {
        if (engineRef.current) {
          engineRef.current.stop();
        }
      }
    }));

    useEffect(() => {
      if (canvasRef.current) {
        engineRef.current = new HeartWindowEngine(canvasRef.current);
        engineRef.current.setMood(mood);
      }
      
      return () => {
        if (engineRef.current) {
          engineRef.current.stop();
        }
      };
    }, []);

    useEffect(() => {
      if (engineRef.current) {
        engineRef.current.setMood(mood);
      }
    }, [mood]);

    return (
      <div className={`heart-window-container ${className}`}>
        <canvas 
          ref={canvasRef}
          className="heart-window-canvas" 
          width={500} 
          height={500}
        />
        <div className="heart-window-overlay"></div>
        
        <style jsx>{`
          .heart-window-container {
            position: relative;
            width: min(500px, 80vw);
            height: min(500px, 80vw);
            margin-bottom: 20px;
          }
          
          .heart-window-canvas {
            width: 100%;
            height: 100%;
            opacity: 0.3;
            border-radius: 50%;
            overflow: hidden;
          }
          
          .heart-window-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%);
            border-radius: 50%;
            animation: heartPulse 4.5s infinite ease-in-out;
          }
          
          @keyframes heartPulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.1;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.05);
              opacity: 0.2;
            }
          }
          
          /* 手機版優化 */
          @media screen and (max-width: 768px) {
            .heart-window-container {
              width: min(400px, 70vw);
              height: min(400px, 70vw);
              margin-bottom: 15px;
            }
          }
        `}</style>
      </div>
    );
  }
);

HeartWindow.displayName = 'HeartWindow';

// 七弦呼吸律動系統
class HeartWindowEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private strings: number = 7;
  private stringColors: Record<string, string[]> = {
    normal: [
      'rgba(255, 182, 193, 0.2)', // 粉紅 - 愛意
      'rgba(255, 228, 225, 0.2)', // 米色 - 溫柔
      'rgba(240, 230, 140, 0.2)', // 卡其 - 平靜
      'rgba(152, 251, 152, 0.2)', // 淺綠 - 生機
      'rgba(135, 206, 235, 0.2)', // 天藍 - 清新
      'rgba(221, 160, 221, 0.2)', // 梅紅 - 神秘
      'rgba(255, 160, 122, 0.2)'  // 鮭魚 - 溫暖
    ],
    happy: [
      'rgba(255, 215, 0, 0.4)',   // 金黃 - 快樂
      'rgba(255, 182, 193, 0.4)', // 粉紅 - 愛意
      'rgba(255, 228, 225, 0.4)', // 米色 - 溫柔
      'rgba(152, 251, 152, 0.4)', // 淺綠 - 生機
      'rgba(135, 206, 235, 0.4)', // 天藍 - 清新
      'rgba(255, 160, 122, 0.4)', // 鮭魚 - 溫暖
      'rgba(255, 192, 203, 0.4)'  // 淺粉 - 甜蜜
    ],
    excited: [
      'rgba(255, 69, 0, 0.5)',    // 橙紅 - 興奮
      'rgba(255, 215, 0, 0.5)',   // 金黃 - 快樂
      'rgba(255, 20, 147, 0.5)',  // 深粉 - 激動
      'rgba(0, 255, 127, 0.5)',   // 春綠 - 活力
      'rgba(0, 191, 255, 0.5)',   // 深天藍 - 清新
      'rgba(255, 0, 255, 0.5)',   // 洋紅 - 熱情
      'rgba(255, 140, 0, 0.5)'    // 深橙 - 活力
    ],
    sad: [
      'rgba(105, 105, 105, 0.3)', // 暗灰 - 憂鬱
      'rgba(176, 196, 222, 0.3)', // 淺鋼藍 - 平靜
      'rgba(221, 160, 221, 0.3)', // 梅紅 - 神秘
      'rgba(135, 206, 235, 0.3)', // 天藍 - 清新
      'rgba(255, 182, 193, 0.3)', // 粉紅 - 愛意
      'rgba(240, 230, 140, 0.3)', // 卡其 - 平靜
      'rgba(255, 160, 122, 0.3)'  // 鮭魚 - 溫暖
    ]
  };
  
  private currentPhase: number = 0;
  private isRunning: boolean = false;
  private animationId: number | null = null;
  private currentMood: string = 'normal';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    this.start();
  }

  start() {
    this.isRunning = true;
    this.animate();
  }

  stop() {
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  animate() {
    if (!this.isRunning) return;
    
    this.updatePhase();
    this.render();
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  updatePhase() {
    const now = Date.now();
    const cycleTime = 4500; // 4.5秒一個週期
    this.currentPhase = (now % cycleTime) / cycleTime;
  }

  setMood(mood: string) {
    this.currentMood = mood;
  }

  render() {
    this.clearCanvas();
    
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const baseRadius = 80;
    
    // 根據心境調整呼吸頻率
    let breathSpeed = 1;
    let breathIntensity = 1;
    
    switch(this.currentMood) {
      case 'happy':
        breathSpeed = 1.2;
        breathIntensity = 1.3;
        break;
      case 'excited':
        breathSpeed = 1.5;
        breathIntensity = 1.5;
        break;
      case 'sad':
        breathSpeed = 0.7;
        breathIntensity = 0.8;
        break;
      default:
        breathSpeed = 1;
        breathIntensity = 1;
    }
    
    // 繪製七弦
    for (let i = 0; i < this.strings; i++) {
      const angle = (i / this.strings) * Math.PI * 2;
      const radius = baseRadius + Math.sin(this.currentPhase * Math.PI * 2 * breathSpeed + angle) * 20 * breathIntensity;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // 弦的呼吸效果
      const breath = (Math.sin(this.currentPhase * Math.PI * 2 * breathSpeed) + 1) / 2;
      const alpha = 0.1 + breath * 0.2 * breathIntensity;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, 3 + breath * 2 * breathIntensity, 0, Math.PI * 2);
      this.ctx.fillStyle = this.stringColors[this.currentMood][i].replace(/0\.[0-9]+/, alpha.toFixed(2));
      this.ctx.fill();
      
      // 弦的連接線
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = this.stringColors[this.currentMood][i].replace(/0\.[0-9]+/, (alpha * 0.5).toFixed(2));
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
    
    // 中心呼吸圈
    const breath = (Math.sin(this.currentPhase * Math.PI * 2 * breathSpeed) + 1) / 2;
    const radius = 20 + breath * 10 * breathIntensity;
    const alpha = 0.05 + breath * 0.1 * breathIntensity;
    
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 182, 193, ${alpha})`;
    this.ctx.fill();
    
    // 衛星氣泡效果
    this.renderSatelliteBubbles(centerX, centerY, breathSpeed, breathIntensity);
  }

  renderSatelliteBubbles(centerX: number, centerY: number, breathSpeed: number, breathIntensity: number) {
    const bubbleCount = 12;
    const orbitRadius = 120;
    const bubbleSize = 2;
    
    for (let i = 0; i < bubbleCount; i++) {
      const angle = (i / bubbleCount) * Math.PI * 2 + this.currentPhase * Math.PI * 2 * breathSpeed * 0.5;
      const radius = orbitRadius + Math.sin(this.currentPhase * Math.PI * 2 * breathSpeed + angle) * 15 * breathIntensity;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // 氣泡的呼吸效果
      const bubbleBreath = (Math.sin(this.currentPhase * Math.PI * 2 * breathSpeed + angle * 2) + 1) / 2;
      const bubbleAlpha = 0.1 + bubbleBreath * 0.3 * breathIntensity;
      const bubbleRadius = bubbleSize + bubbleBreath * 2 * breathIntensity;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, bubbleRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${bubbleAlpha})`;
      this.ctx.fill();
      
      // 氣泡的連接線到中心
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = `rgba(255, 255, 255, ${bubbleAlpha * 0.3})`;
      this.ctx.lineWidth = 0.5;
      this.ctx.stroke();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}








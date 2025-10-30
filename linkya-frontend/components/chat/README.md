# 治愈系AI聊天组件系统

## 概述

本目录包含了100%采用[情感陪伴对话助手.html](治愈AI聊天框UI_项目文件/情感陪伴对话助手.html)设计，并融合[ChatKit](https://github.com/sovaai/chatKit)功能的治愈系聊天界面组件。

## 设计理念

基于《治愈AI对话框设计参考_v6.md》的设计理念：

- **情感治愈导向**：情绪修复与心理支持
- **自然亲和设计**：森系治愈风格
- **多模态陪伴**：文字、语音、视觉多维度交互
- **渐进式疗愈**：情绪识别→根源探究→内在对话

## 组件架构

### 核心组件

```
HealingChatInterface.tsx    # 主界面组件
├── HealingChatBubble.tsx   # 治愈系对话气泡
├── PersonaSelector.tsx      # AI人格选择器
├── EmotionVisualization.tsx # 情绪可视化
└── HealingMessageInput.tsx # 多模态输入
```

## 设计系统

### 色彩方案

- **主色调**：
  - 森林绿 #5F8575
  - 雾霾蓝 #91A8D0
  - 珊瑚粉 #F8C3CD
  
- **辅助色**：
  - 米白 #FAF3E0
  - 浅灰 #E5E5E5

### 角色系统

#### 1. 暖心小咪 🐱
- **性格**：温柔体贴型
- **色彩**：粉色系 (from-pink-400 to-rose-400)
- **定位**：温暖的倾听伙伴

#### 2. 元气小兔 🐰
- **性格**：活力满满型
- **色彩**：橙黄系 (from-yellow-400 to-orange-400)
- **定位**：充满正能量

#### 3. 智慧小哲 🦉
- **性格**：理性思考型
- **色彩**：绿色系 (from-green-400 to-teal-400)
- **定位**：提供专业建议

## 功能特性

### ✅ 已实现

1. **治愈系UI设计**
   - 圆润气泡对话系统
   - 渐变色彩方案
   - 浮动动画效果
   - 情绪可视化反馈

2. **ChatKit集成**
   - 实时消息收发
   - 房间管理
   - AI人格切换
   - 消息历史记录

3. **情感反馈系统**
   - 实时情绪分析
   - 情绪可视化图表
   - 动态界面调色
   - 情感状态追踪

4. **多模态输入**
   - 文字输入（智能补全）
   - 表情选择
   - 语音输入支持
   - 图片上传

### 🚧 计划中

- SVG疗愈卡片生成
- 3D角色动画
- 自然元素特效（花瓣、树叶）
- 进度追踪系统
- 成就徽章
- 时空对话功能

## 使用方法

### 基础使用

```tsx
import { HealingChatInterface } from '@/components/chat/HealingChatInterface';

export default function ChatPage() {
  return <HealingChatInterface />;
}
```

### 自定义配置

```tsx
// 可以传入自定义配置
<HealingChatInterface 
  defaultMood="calm"
  showEmotionViz={true}
  enableMultiPersona={true}
/>
```

## 技术栈

- **React**：组件框架
- **TypeScript**：类型安全
- **Tailwind CSS**：样式系统
- **ChatKit**：聊天功能集成
- **Framer Motion**：动画效果（计划中）

## 文件结构

```
components/chat/
├── HealingChatInterface.tsx    # 主界面
├── HealingChatBubble.tsx       # 对话气泡
├── PersonaSelector.tsx         # 人格选择器
├── EmotionVisualization.tsx    # 情绪可视化
├── HealingMessageInput.tsx    # 输入组件
├── VisualChatInterface.tsx    # 原视觉界面
├── PipiCharacter.tsx          # 角色组件
├── HeartWindow.tsx            # 心情窗口
└── README.md                  # 本文件
```

## 参考资源

- [治愈AI设计参考](治愈AI聊天框UI_项目文件/治愈AI对话框设计参考_v6.md)
- [陪伴型AI设计说明](治愈AI聊天框UI_项目文件/陪伴型AI对话框设计说明_v6.md)
- [ChatKit开源项目](https://github.com/sovaai/chatKit)
- [LINKYA-AI项目](https://github.com/your-org/linkya-ai)

## 贡献指南

欢迎提交PR来改进治愈系聊天体验！

### 设计原则

1. **温暖共情**：界面应该传递关怀与理解
2. **专业可信**：保持疗愈过程的专业性
3. **个性适配**：基于情绪的动态调整
4. **隐私安全**：确保对话内容的安全性

## 许可证

Apache-2.0 License

# MoodTrack

一个现代化的心情追踪和社交分享应用，帮助用户记录、分析和分享情绪状态，基于React和TypeScript构建的全栈应用。

## ✨ 功能特点

### 🎯 核心功能
- **心情记录**：5级心情量表记录，支持详细备注和影响因素标记
- **AI智能分析**：基于心情数据生成个性化情绪分析报告
- **历史趋势**：可视化心情变化趋势和历史数据分析
- **匿名社交**：基于心情相似度的匿名用户匹配系统

### 🔐 认证系统
- **Google OAuth**：安全的Google账户登录
- **路由保护**：基于认证状态的页面访问控制
- **会话管理**：自动登录状态保持和会话持久化

### 🌐 社交功能
- **心情匹配**：智能匹配相似心情状态的用户
- **社区互动**：5种互动类型（共鸣、支持、帮助、感谢、鼓励）
- **社交洞察**：个人社交数据分析和见解

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 环境变量配置
复制环境变量模板并配置：
```bash
cp .env.example .env
```

在 `.env` 文件中设置必要的环境变量：
```env
VITE_API_BASE_URL=https://moodtrack-romv.onrender.com/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
```

### 开发命令
```bash
# 启动开发服务器 (端口 3000)
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix
```

## 🏗️ 技术架构

### 技术栈
- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **路由管理**：React Router DOM v6
- **样式框架**：Tailwind CSS v4
- **图标组件**：Lucide React
- **认证服务**：Google Identity Services
- **HTTP客户端**：Axios（封装apiRequest工具）
- **后端服务**：Express.js + Supabase (独立部署在 Render.com)

### 项目结构
```
src/
├── components/           # 可复用UI组件
│   ├── AnonymousAvatar.tsx      # 匿名头像组件
│   ├── GoogleLoginButton.tsx    # Google登录按钮
│   ├── InteractionButtons.tsx   # 社交互动按钮
│   ├── Layout.tsx              # 页面布局组件
│   ├── LoginCallback.tsx       # 登录回调处理
│   ├── MoodBadge.tsx           # 心情标识组件
│   ├── NotificationToast.tsx   # 通知提示组件
│   ├── ProtectedRoute.tsx      # 路由保护组件
│   └── SimilarityBadge.tsx     # 相似度标识组件
├── contexts/            # React Context
│   └── AuthContext.tsx         # 认证状态管理
├── hooks/               # 自定义Hooks
├── pages/               # 页面组件
│   ├── HomePage.tsx            # 首页
│   ├── TrackMoodPage.tsx       # 心情记录页
│   ├── HistoryPage.tsx         # 历史记录页
│   ├── SocialPage.tsx          # 社交中心页
│   ├── MoodMatchPage.tsx       # 心情匹配页
│   ├── CommunityPage.tsx       # 社区页面
│   ├── SocialInsightsPage.tsx  # 社交洞察页
│   └── Login.tsx               # 登录页面
├── types/               # TypeScript类型定义
│   ├── index.ts                # 基础类型定义
│   └── social.ts               # 社交功能类型
├── utils/               # 工具函数
│   ├── api.ts                  # API请求工具（authAPI, moodAPI, communityAPI）
│   └── socialUtils.ts          # 社交功能工具
└── App.tsx              # 应用路由配置
```

### 核心页面
1. **首页** (`/home`) - 心情概览和AI分析功能
2. **心情记录** (`/track`) - 记录当前心情状态
3. **历史记录** (`/history`) - 查看心情历史趋势
4. **社交中心** (`/social`) - 匿名社交功能入口
5. **心情匹配** (`/social/match`) - 寻找相似心情用户
6. **社区互动** (`/social/community`) - 查看社区动态
7. **社交洞察** (`/social/insights`) - 个人社交数据分析

## 🔧 API集成

### 后端架构
项目采用前后端分离架构，后端服务独立部署在 Render.com：
- **后端地址**：https://moodtrack-romv.onrender.com
- **API代理**：通过Vite开发代理和Vercel重写规则转发请求
- **认证方式**：Bearer Token认证，自动从localStorage获取

### API请求工具
使用封装的`apiRequest`工具（基于Axios）处理所有API调用：
- 自动添加认证头部（Bearer Token）
- 请求/响应拦截器统一处理
- 统一错误处理
- 环境适配（开发/生产）
- TypeScript类型安全
- 10秒请求超时

### 主要API接口

#### 认证 API (authAPI)
```typescript
// Google OAuth 登录验证
POST /api/auth/verify-google-credential
Body: { credential: string }

// 用户注册
POST /api/auth/register
Body: { name: string, email: string, password: string }

// 用户登录
POST /api/auth/login
Body: { email: string, password: string }

// 验证回调 Token
POST /api/auth/verify-token
Body: { token: string }

// 刷新 Token
POST /api/auth/refresh
Body: { refreshToken: string }

// 登出
POST /api/auth/logout
```

#### 心情记录 API (moodAPI)
```typescript
// 创建心情记录
POST /api/moods
Body: {
  mood_type: 'very_bad' | 'bad' | 'neutral' | 'good' | 'excellent',
  note?: string,
  triggers?: string[],
  is_public?: boolean,
  is_anonymous?: boolean
}

// 获取心情记录列表
GET /api/moods

// 获取心情记录详情
GET /api/moods/:id

// 删除心情记录
DELETE /api/moods/:id
```

#### 社区 API (communityAPI)
```typescript
// 获取在线用户
GET /api/community/online-users

// 获取社区心情列表
GET /api/community/moods

// 获取社区心情详情
GET /api/community/moods/:id

// 点赞社区心情
POST /api/community/moods/:id/like

// 取消点赞
POST /api/community/moods/:id/unlike

// 回复社区心情
POST /api/community/moods/:id/reply
Body: { content: string }
```

## 🚀 部署配置

### Vercel部署
项目已配置完整的Vercel部署支持：

**vercel.json配置**：
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://moodtrack-romv.onrender.com/api/$1"
    },
    {
      "source": "/oauth2/(.*)",
      "destination": "https://moodtrack-romv.onrender.com/oauth2/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 环境变量
在Vercel项目设置中添加：
- `VITE_API_BASE_URL`：后端API基础URL
- `VITE_GOOGLE_CLIENT_ID`：Google OAuth客户端ID

### 部署步骤
1. 将GitHub仓库连接到Vercel
2. 设置环境变量
3. 自动部署完成

## 🔐 安全特性

- **环境变量保护**：敏感信息通过环境变量管理
- **匿名社交系统**：隐私保护的匿名身份系统
- **OAuth认证**：Google安全认证系统
- **路由保护**：未认证用户自动重定向到登录页
- **HTTPS通信**：所有API通信使用HTTPS加密

## 🎨 设计特色

### 响应式设计
- **移动优先**：响应式布局设计
- **深色模式**：支持系统主题切换
- **无障碍访问**：完整的可访问性支持
- **流畅动画**：平滑的交互动画效果

### 匿名社交系统
- **随机身份**：自动生成匿名头像和用户名
- **智能匹配**：基于心情相似度的用户匹配
- **隐私保护**：地理位置模拟和内容隐私处理
- **社交互动**：5种类型的情感互动支持

## 🔄 状态管理

- **本地状态**：React Hooks (useState, useEffect)
- **全局状态**：React Context (认证状态)
- **数据持久化**：localStorage + 后端API
- **实时更新**：基于API的数据同步

## 🛠️ 开发配置

### TypeScript配置
- **路径别名**：`@/*` → `./src/*`
- **严格模式**：启用TypeScript严格模式
- **目标平台**：ES2020 + React JSX

### 样式系统
- **Tailwind CSS**：自定义组件类
- **响应式设计**：移动优先设计原则
- **可访问性**：完整的ARIA支持
- **社交样式**：社交功能特定的样式模式

### 代码质量
- **ESLint**：TypeScript规则集
- **自动格式化**：ESLint自动修复
- **类型安全**：严格的TypeScript类型检查

## 📊 项目进度

### 当前状态：90% 完成

#### ✅ 已完成功能
- **核心功能** (95%)：心情追踪、历史记录
- **认证系统** (100%)：Google OAuth、JWT Token、路由保护
- **API集成** (95%)：
  - 认证 API：登录、注册、Google OAuth、Token 验证
  - 心情 API：创建、列表、详情、删除
  - 社区 API：在线用户、心情列表、点赞、回复
- **社交功能** (85%)：匿名系统、心情匹配
- **UI/UX** (90%)：响应式设计、组件系统

#### 🟡 进行中功能
- **社区互动** (70%)：社区动态、实时互动
- **数据分析** (60%)：高级统计、趋势图表
- **AI分析** (50%)：基于心情数据的智能分析
- **性能优化** (40%)：代码分割、懒加载

#### ❌ 待开发功能
- **测试覆盖** (0%)：单元测试、集成测试
- **推送通知** (0%)：心情提醒、社交通知
- **数据导出** (0%)：心情数据导出功能

## 🤝 贡献指南

欢迎通过Issue和Pull Request来改进这个项目。

### 开发流程
1. Fork项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

## 📄 许可证

[MIT License](LICENSE)

## 📞 联系我们

如有问题或建议，请通过GitHub Issues联系我们。

---

**MoodTrack** - 让每一天的心情都有意义 ❤️
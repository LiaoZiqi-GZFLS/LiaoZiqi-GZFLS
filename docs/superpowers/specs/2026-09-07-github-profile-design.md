# GitHub 个人主页设计文档

## 项目概述

### 目标
创建一个个性化的 GitHub 个人主页，模仿 sustlzq.cn 的设计风格，包含个人简介、技能标签、项目展示、GitHub 贡献图表、博客集成和联系方式。

### 核心需求
- 响应式设计，移动端优先
- 亮色/暗色主题切换（自动跟随系统偏好）
- GitHub API 集成获取实时数据
- 博客文章集成
- 现代化技术栈（React + Next.js）

---

## 1. 技术架构

### 技术栈
- **前端框架**: Next.js 14 (App Router) + React 18
- **样式系统**: Tailwind CSS + CSS Modules
- **状态管理**: React Context + useReducer
- **数据获取**: GitHub REST API v3 + GraphQL + SWR
- **部署平台**: GitHub Pages (静态导出)
- **构建工具**: Next.js 内置构建系统

### 项目结构
```
github-profile/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页
│   └── globals.css        # 全局样式
├── components/            # React组件
│   ├── Hero.tsx           # 个人简介区
│   ├── Skills.tsx         # 技能标签
│   ├── Projects.tsx       # 项目展示
│   ├── Contributions.tsx  # GitHub贡献图表
│   ├── Blog.tsx           # 博客集成
│   ├── Contact.tsx        # 联系方式
│   ├── ThemeToggle.tsx    # 主题切换按钮
│   └── Navigation.tsx     # 导航栏
├── hooks/                 # 自定义 Hooks
│   └── useTheme.ts        # 主题切换 Hook
├── lib/                   # 工具函数
│   ├── github.ts          # GitHub API 封装
│   └── blog.ts            # 博客数据获取
├── config/                # 配置文件
│   └── profile.ts         # 个人资料配置
├── public/                # 静态资源
└── tailwind.config.js     # Tailwind 配置
```

---

## 2. 页面布局

### 单页滚动式设计

```
┌─────────────────────────────────────────────────┐
│  导航栏 (固定) - 主题切换按钮 + 锚点链接          │
├─────────────────────────────────────────────────┤
│  Hero 区域                                       │
│  ├── 头像 + 姓名 + 职位标题                       │
│  ├── 一句话简介                                   │
│  └── 社交链接 (GitHub, 博客, 邮箱)                │
├─────────────────────────────────────────────────┤
│  技能标签区域                                     │
│  └── 分类标签云 (前端, 后端, DevOps, 工具等)       │
├─────────────────────────────────────────────────┤
│  精选项目区域                                     │
│  ├── 项目卡片网格 (2-3列)                        │
│  │   ├── 项目名称 + 描述                         │
│  │   ├── 技术栈标签                              │
│  │   ├── Star/Fork 数量                          │
│  │   └── 链接按钮 (Demo, GitHub)                 │
│  └── "查看更多项目" 按钮                          │
├─────────────────────────────────────────────────┤
│  GitHub 贡献图表                                  │
│  ├── 贡献热力图 (类似GitHub官方)                  │
│  └── 年度贡献统计                                 │
├─────────────────────────────────────────────────┤
│  博客文章区域                                     │
│  ├── 最新文章卡片列表 (3-4篇)                    │
│  │   ├── 标题 + 摘要                             │
│  │   ├── 发布日期 + 阅读时间                      │
│  │   └── 标签                                    │
│  └── "访问博客" 按钮                              │
├─────────────────────────────────────────────────┤
│  联系方式区域                                     │
│  ├── 邮箱 + 社交媒体链接                          │
│  └── 简单的联系表单 (可选)                        │
├─────────────────────────────────────────────────┤
│  页脚 - 版权信息 + 技术栈声明                     │
└─────────────────────────────────────────────────┘
```

### 组件职责

| 组件 | 数据来源 | 核心功能 |
|------|----------|----------|
| **Hero** | 静态配置文件 | 个人头像、简介、社交链接 |
| **Skills** | 静态配置文件 | 技能分类展示，支持筛选 |
| **Projects** | GitHub API | 获取 pinned repos 或指定仓库列表 |
| **Contributions** | GitHub API | 贡献热力图 + 统计数据 |
| **Blog** | 博客 RSS/API | 从 sustlzq.cn 获取最新文章 |
| **Contact** | 静态配置文件 | 联系方式和社交链接 |

---

## 3. 设计系统

### 颜色方案

#### 亮色模式
```css
--bg-primary: #ffffff        /* 主背景 */
--bg-secondary: #f8f9fa     /* 卡片背景 */
--text-primary: #1a1a2e     /* 主文字 */
--text-secondary: #6c757d   /* 次要文字 */
--accent: #2563eb           /* 强调色 (蓝色) */
--accent-hover: #1d4ed8     /* 强调色悬停 */
--border: #e5e7eb           /* 边框 */
```

#### 暗色模式
```css
--bg-primary: #0f172a       /* 主背景 */
--bg-secondary: #1e293b     /* 卡片背景 */
--text-primary: #f1f5f9     /* 主文字 */
--text-secondary: #94a3b8   /* 次要文字 */
--accent: #60a5fa           /* 强调色 (亮蓝) */
--accent-hover: #3b82f6     /* 强调色悬停 */
--border: #334155           /* 边框 */
```

### 字体系统

```css
/* 主要字体 */
font-family: 'Inter', 'Noto Sans SC', system-ui, sans-serif;

/* 代码字体 */
font-family: 'JetBrains Mono', 'Fira Code', monospace;

/* 字号层级 */
--text-xs: 0.75rem     /* 12px - 标签 */
--text-sm: 0.875rem    /* 14px - 次要文字 */
--text-base: 1rem      /* 16px - 正文 */
--text-lg: 1.125rem    /* 18px - 小标题 */
--text-xl: 1.25rem     /* 20px - 标题 */
--text-2xl: 1.5rem     /* 24px - 区域标题 */
--text-4xl: 2.25rem    /* 36px - Hero 姓名 */
```

### 动画和过渡效果

| 元素 | 动画类型 | 时长 | 缓动函数 |
|------|----------|------|----------|
| 卡片悬停 | 轻微上移 + 阴影增强 | 200ms | ease-out |
| 按钮点击 | 缩放 0.95 | 150ms | ease-in-out |
| 页面滚动 | 渐入效果 | 400ms | ease-out |
| 主题切换 | 平滑颜色过渡 | 300ms | ease |
| 标签悬停 | 背景色变化 | 200ms | ease |

---

## 4. 数据集成

### GitHub API 集成

#### 项目数据获取
- 使用 GraphQL API 获取 pinned repos
- 使用 REST API 获取仓库详细信息
- 支持配置指定仓库列表

#### 贡献图表数据
- 使用 GitHub GraphQL API 获取贡献日历
- 渲染类似 GitHub 官方的热力图
- 显示年度贡献统计

#### 数据缓存策略
- 使用 SWR 进行客户端数据缓存
- 1 小时自动刷新
- 禁用焦点刷新以避免频繁请求

### 博客集成

#### 主要方案：RSS 订阅
- 从 sustlzq.cn 获取 RSS feed
- 使用 rss-parser 解析
- 显示最新 4 篇文章

#### 备选方案：静态配置
- 如果 RSS 不可用，使用静态配置
- 手动维护文章列表

### 环境变量配置
```env
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_TOKEN=ghp_xxxxxxxxxxxx  # 用于 GraphQL API
NEXT_PUBLIC_BLOG_URL=https://www.sustlzq.cn
```

---

## 5. 主题切换系统

### 实现方案
- CSS 变量 + localStorage 持久化
- 自动跟随系统主题偏好（prefers-color-scheme）
- 手动切换覆盖系统偏好

### 切换逻辑
1. 首次加载：检查 localStorage，如无则跟随系统
2. 用户切换：保存到 localStorage，覆盖系统偏好
3. 系统变化：仅在无手动设置时跟随

---

## 6. 响应式设计

### 断点策略（移动优先）
```css
/* 默认: 手机 (< 640px) */
/* sm: 640px+ (大手机/小平板) */
/* md: 768px+ (平板) */
/* lg: 1024px+ (小桌面) */
/* xl: 1280px+ (桌面) */
/* 2xl: 1536px+ (大桌面) */
```

### 各组件响应式布局

| 组件 | 移动端 | 平板 | 桌面 |
|------|--------|------|------|
| **Hero** | 垂直堆叠，居中 | 水平布局，左对齐 | 同平板，更大间距 |
| **Skills** | 单列标签 | 2-3列网格 | 自动换行标签云 |
| **Projects** | 单列卡片 | 2列网格 | 2-3列网格 |
| **Contributions** | 水平滚动 | 完整显示 | 完整显示 |
| **Blog** | 单列列表 | 2列卡片 | 2-3列卡片 |
| **Contact** | 垂直堆叠 | 水平布局 | 同平板 |

---

## 7. 性能优化

### 图片优化
- 使用 Next.js Image 组件
- 自动 WebP 转换
- 懒加载和占位符

### 代码分割
- 动态导入非关键组件
- 按路由自动分割

### 构建优化
- 静态站点生成 (SSG)
- 自动代码压缩
- CSS 优化和压缩

---

## 8. 部署方案

### GitHub Pages 部署
1. 配置 Next.js 静态导出
2. 设置 GitHub Actions 自动部署
3. 配置自定义域名（可选）

### 部署流程
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

---

## 9. 开发计划

### 阶段一：基础搭建
- [ ] 初始化 Next.js 项目
- [ ] 配置 Tailwind CSS
- [ ] 实现基础布局和主题系统

### 阶段二：核心组件
- [ ] 实现 Hero 组件
- [ ] 实现 Skills 组件
- [ ] 实现 Projects 组件（GitHub API 集成）

### 阶段三：高级功能
- [ ] 实现 Contributions 图表
- [ ] 实现 Blog 集成
- [ ] 实现 Contact 组件

### 阶段四：优化和部署
- [ ] 性能优化
- [ ] 响应式测试
- [ ] GitHub Pages 部署

---

## 10. 配置文件示例

### 个人资料配置
```typescript
// config/profile.ts
export const profile = {
  name: 'Liao Ziqi',
  title: 'Full Stack Developer',
  bio: '热爱技术，专注于 Web 开发和 DevOps',
  avatar: '/images/avatar.jpg',
  social: {
    github: 'https://github.com/your-username',
    blog: 'https://www.sustlzq.cn',
    email: 'your-email@example.com',
  },
  skills: {
    frontend: ['React', 'Vue', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Python', 'Django', 'Express'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
    tools: ['Git', 'VS Code', 'Postman', 'Linux'],
  },
};
```

---

## 附录：技术决策记录

### 为什么选择 Next.js？
1. 静态站点生成，适合 GitHub Pages
2. 优秀的开发体验
3. 内置图片优化
4. 良好的 SEO 支持

### 为什么选择 Tailwind CSS？
1. 快速开发
2. 响应式设计友好
3. 暗色模式支持
4. 生产环境自动优化

### 为什么使用 GraphQL？
1. 精确获取所需数据
2. 减少 API 调用次数
3. 获取 pinned repos 的唯一方式

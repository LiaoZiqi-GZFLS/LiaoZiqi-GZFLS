# GitHub 个人主页实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个个性化的 GitHub 个人主页，模仿 sustlzq.cn 的设计风格，包含个人简介、技能标签、项目展示、GitHub 贡献图表、博客集成和联系方式。

**Architecture:** 使用 Next.js 14 (App Router) 构建静态站点，采用 Tailwind CSS 进行样式设计，集成 GitHub API 获取实时数据，支持亮色/暗色主题切换，并部署到 GitHub Pages。

**Tech Stack:** Next.js 14, React 18, Tailwind CSS, GitHub GraphQL API, SWR, GitHub Pages

---

## 文件结构

### 核心文件映射

| 文件路径 | 职责 | 类型 |
|----------|------|------|
| `package.json` | 项目依赖和脚本 | 创建 |
| `next.config.js` | Next.js 配置，静态导出 | 创建 |
| `tailwind.config.js` | Tailwind CSS 配置 | 创建 |
| `postcss.config.js` | PostCSS 配置 | 创建 |
| `tsconfig.json` | TypeScript 配置 | 创建 |
| `.env.local` | 环境变量 | 创建 |
| `app/layout.tsx` | 根布局，包含主题和字体 | 创建 |
| `app/page.tsx` | 主页面，组合所有组件 | 创建 |
| `app/globals.css` | 全局样式和 CSS 变量 | 创建 |
| `components/Hero.tsx` | 个人简介组件 | 创建 |
| `components/Skills.tsx` | 技能标签组件 | 创建 |
| `components/Projects.tsx` | 项目展示组件 | 创建 |
| `components/Contributions.tsx` | GitHub 贡献图表组件 | 创建 |
| `components/Blog.tsx` | 博客集成组件 | 创建 |
| `components/Contact.tsx` | 联系方式组件 | 创建 |
| `components/ThemeToggle.tsx` | 主题切换按钮 | 创建 |
| `components/Navigation.tsx` | 导航栏组件 | 创建 |
| `hooks/useTheme.ts` | 主题切换 Hook | 创建 |
| `lib/github.ts` | GitHub API 封装 | 创建 |
| `lib/blog.ts` | 博客数据获取 | 创建 |
| `config/profile.ts` | 个人资料配置 | 创建 |
| `public/images/avatar.jpg` | 个人头像 | 创建 |
| `.github/workflows/deploy.yml` | GitHub Actions 部署配置 | 创建 |

---

## 任务分解

### Task 1: 项目初始化和基础配置

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `.env.local`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "github-profile",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "swr": "^2.2.0",
    "rss-parser": "^3.13.0",
    "lucide-react": "^0.294.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0"
  }
}
```

- [ ] **Step 2: 创建 next.config.js**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
```

- [ ] **Step 3: 创建 tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#2563eb',
          dark: '#60a5fa',
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        secondary: {
          light: '#f8f9fa',
          dark: '#1e293b',
        },
        text: {
          primary: {
            light: '#1a1a2e',
            dark: '#f1f5f9',
          },
          secondary: {
            light: '#6c757d',
            dark: '#94a3b8',
          },
        },
        border: {
          light: '#e5e7eb',
          dark: '#334155',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: 创建 postcss.config.js**

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 5: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: 创建 .env.local**

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
GITHUB_TOKEN=your-github-token
NEXT_PUBLIC_BLOG_URL=https://www.sustlzq.cn
```

- [ ] **Step 7: 安装依赖并验证配置**

Run: `npm install`
Expected: 成功安装所有依赖

Run: `npm run build`
Expected: 构建成功，无错误

- [ ] **Step 8: 提交初始配置**

```bash
git add .
git commit -m "feat: initialize Next.js project with Tailwind CSS"
```

---

### Task 2: 创建基础布局和主题系统

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.tsx`
- Create: `hooks/useTheme.ts`
- Create: `components/ThemeToggle.tsx`

- [ ] **Step 1: 创建 globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #1a1a2e;
  --text-secondary: #6c757d;
  --accent: #2563eb;
  --accent-hover: #1d4ed8;
  --border: #e5e7eb;
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --accent: #60a5fa;
  --accent-hover: #3b82f6;
  --border: #334155;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 300ms ease, color 300ms ease;
}

@layer base {
  * {
    @apply border-border-light dark:border-border-dark;
  }
  body {
    @apply bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark;
  }
}
```

- [ ] **Step 2: 创建 useTheme.ts Hook**

```typescript
'use client';

import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  if (!mounted) {
    return { theme: 'light' as Theme, toggleTheme };
  }

  return { theme, toggleTheme };
}
```

- [ ] **Step 3: 创建 ThemeToggle 组件**

```tsx
'use client';

import { useTheme } from '@/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`切换到${theme === 'light' ? '暗色' : '亮色'}模式`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
}
```

- [ ] **Step 4: 创建根布局 layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GitHub Profile | Liao Ziqi',
  description: '个性化 GitHub 个人主页',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 5: 验证主题切换功能**

Run: `npm run dev`
Expected: 页面加载正常，主题切换按钮可见

手动测试：点击主题切换按钮，页面应在亮色和暗色模式之间切换

- [ ] **Step 6: 提交布局和主题系统**

```bash
git add app/globals.css app/layout.tsx hooks/useTheme.ts components/ThemeToggle.tsx
git commit -m "feat: add base layout and theme switching system"
```

---

### Task 3: 创建个人资料配置和 Hero 组件

**Files:**
- Create: `config/profile.ts`
- Create: `public/images/avatar.jpg` (placeholder)
- Create: `components/Hero.tsx`

- [ ] **Step 1: 创建个人资料配置**

```typescript
// config/profile.ts
export const profile = {
  name: 'Liao Ziqi',
  title: 'Full Stack Developer',
  bio: '热爱技术，专注于 Web 开发和 DevOps。喜欢探索新技术，分享实践经验。',
  avatar: '/images/avatar.jpg',
  social: {
    github: 'https://github.com/your-username',
    blog: 'https://www.sustlzq.cn',
    email: 'your-email@example.com',
  },
  skills: {
    frontend: ['React', 'Vue', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    backend: ['Node.js', 'Python', 'Django', 'Express', 'PostgreSQL'],
    devops: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Linux'],
    tools: ['Git', 'VS Code', 'Postman', 'Figma'],
  },
};
```

- [ ] **Step 2: 创建头像占位图片**

在 `public/images/` 目录下放置一个头像图片（可以是占位图片或真实头像）

- [ ] **Step 3: 创建 Hero 组件**

```tsx
// components/Hero.tsx
import { profile } from '@/config/profile';
import Image from 'next/image';
import { Github, BookOpen, Mail } from 'lucide-react';

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="mb-8">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={150}
            height={150}
            className="rounded-full mx-auto border-4 border-white dark:border-gray-800 shadow-lg"
            priority
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {profile.name}
        </h1>
        
        <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
          {profile.title}
        </h2>
        
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8">
          {profile.bio}
        </p>
        
        <div className="flex justify-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            <Github className="w-5 h-5" />
            GitHub
          </a>
          
          <a
            href={profile.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <BookOpen className="w-5 h-5" />
            博客
          </a>
          
          <a
            href={`mailto:${profile.social.email}`}
            className="flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <Mail className="w-5 h-5" />
            联系我
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 更新主页使用 Hero 组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

- [ ] **Step 5: 验证 Hero 组件**

Run: `npm run dev`
Expected: 页面显示个人头像、姓名、职位、简介和社交链接按钮

- [ ] **Step 6: 提交 Hero 组件**

```bash
git add config/profile.ts public/images/ components/Hero.tsx app/page.tsx
git commit -m "feat: add profile config and Hero component"
```

---

### Task 4: 创建 Skills 组件

**Files:**
- Create: `components/Skills.tsx`

- [ ] **Step 1: 创建 Skills 组件**

```tsx
// components/Skills.tsx
import { profile } from '@/config/profile';

const skillCategories = [
  { name: '前端', skills: profile.skills.frontend },
  { name: '后端', skills: profile.skills.backend },
  { name: 'DevOps', skills: profile.skills.devops },
  { name: '工具', skills: profile.skills.tools },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">技能标签</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.name} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 更新主页使用 Skills 组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
    </main>
  );
}
```

- [ ] **Step 3: 验证 Skills 组件**

Run: `npm run dev`
Expected: 页面显示技能标签，分为四个类别，标签有悬停效果

- [ ] **Step 4: 提交 Skills 组件**

```bash
git add components/Skills.tsx app/page.tsx
git commit -m "feat: add Skills component with categorized tags"
```

---

### Task 5: 创建 GitHub API 封装和 Projects 组件

**Files:**
- Create: `lib/github.ts`
- Create: `components/Projects.tsx`

- [ ] **Step 1: 创建 GitHub API 封装**

```typescript
// lib/github.ts
import useSWR from 'swr';

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useGitHubRepos(username: string) {
  const { data, error, isLoading } = useSWR<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000, // 1 hour
    }
  );

  return {
    repos: data || [],
    isLoading,
    isError: error,
  };
}

export function useGitHubContributions(username: string) {
  const { data, error, isLoading } = useSWR(
    `/api/github/contributions?username=${username}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000,
    }
  );

  return {
    contributions: data,
    isLoading,
    isError: error,
  };
}
```

- [ ] **Step 2: 创建 Projects 组件**

```tsx
// components/Projects.tsx
'use client';

import { useGitHubRepos } from '@/lib/github';
import { profile } from '@/config/profile';
import { Star, GitFork, ExternalLink } from 'lucide-react';

export function Projects() {
  const { repos, isLoading, isError } = useGitHubRepos(
    profile.social.github.split('/').pop() || ''
  );

  if (isLoading) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">精选项目</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="projects" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">精选项目</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            无法加载项目数据，请稍后再试。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">精选项目</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {repo.name}
                </h3>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {repo.description || '暂无描述'}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {repo.topics?.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                  >
                    {topic}
                  </span>
                ))}
                {repo.language && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <GitFork className="w-4 h-4" />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            查看更多项目
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 更新主页使用 Projects 组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
    </main>
  );
}
```

- [ ] **Step 4: 验证 Projects 组件**

Run: `npm run dev`
Expected: 页面显示 GitHub 项目卡片，包含项目名称、描述、标签和统计数据

- [ ] **Step 5: 提交 Projects 组件**

```bash
git add lib/github.ts components/Projects.tsx app/page.tsx
git commit -m "feat: add GitHub API integration and Projects component"
```

---

### Task 6: 创建贡献图表组件

**Files:**
- Create: `components/Contributions.tsx`

- [ ] **Step 1: 创建贡献图表组件**

```tsx
// components/Contributions.tsx
'use client';

import { useGitHubContributions } from '@/lib/github';
import { profile } from '@/config/profile';

export function Contributions() {
  const username = profile.social.github.split('/').pop() || '';
  const { contributions, isLoading, isError } = useGitHubContributions(username);

  if (isLoading) {
    return (
      <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (isError || !contributions) {
    return (
      <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <p className="text-center text-gray-600 dark:text-gray-400">
              无法加载贡献数据，请稍后再试。
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contributions" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">GitHub 贡献</h2>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">
              {contributions.totalContributions} 次贡献（过去一年）
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <div className="inline-grid grid-cols-53 gap-1">
              {contributions.weeks.map((week: any, weekIndex: number) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.contributionDays.map((day: any, dayIndex: number) => (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm"
                      style={{
                        backgroundColor: day.color || '#ebedf0',
                      }}
                      title={`${day.date}: ${day.contributionCount} 次贡献`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-end gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>少</span>
            <div className="flex gap-1">
              {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span>多</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 更新主页使用 Contributions 组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contributions />
    </main>
  );
}
```

- [ ] **Step 3: 验证贡献图表组件**

Run: `npm run dev`
Expected: 页面显示 GitHub 贡献热力图，包含年度贡献统计

- [ ] **Step 4: 提交贡献图表组件**

```bash
git add components/Contributions.tsx app/page.tsx
git commit -m "feat: add GitHub contributions chart component"
```

---

### Task 7: 创建博客集成组件

**Files:**
- Create: `lib/blog.ts`
- Create: `components/Blog.tsx`

- [ ] **Step 1: 创建博客数据获取**

```typescript
// lib/blog.ts
import useSWR from 'swr';

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBlogPosts(blogUrl: string, count = 4) {
  const { data, error, isLoading } = useSWR<BlogPost[]>(
    `/api/blog/posts?url=${encodeURIComponent(blogUrl)}&count=${count}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 3600000,
    }
  );

  return {
    posts: data || [],
    isLoading,
    isError: error,
  };
}
```

- [ ] **Step 2: 创建博客 API 路由**

```typescript
// app/api/blog/posts/route.ts
import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const blogUrl = searchParams.get('url');
  const count = parseInt(searchParams.get('count') || '4');

  if (!blogUrl) {
    return NextResponse.json({ error: 'Blog URL is required' }, { status: 400 });
  }

  try {
    const parser = new Parser();
    const feed = await parser.parseURL(`${blogUrl}/rss.xml`);
    
    const posts = feed.items.slice(0, count).map(item => ({
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      description: item.contentSnippet?.slice(0, 150) + '...' || '',
      categories: item.categories || [],
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}
```

- [ ] **Step 3: 创建博客组件**

```tsx
// components/Blog.tsx
'use client';

import { useBlogPosts } from '@/lib/blog';
import { profile } from '@/config/profile';
import { Calendar, Clock, Tag } from 'lucide-react';

export function Blog() {
  const { posts, isLoading, isError } = useBlogPosts(profile.social.blog);

  if (isLoading) {
    return (
      <section id="blog" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || posts.length === 0) {
    return (
      <section id="blog" className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            无法加载博客文章，请稍后再试。
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">最新文章</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <a
              key={index}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                {post.description}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.pubDate).toLocaleDateString('zh-CN')}</span>
                </div>
                
                {post.categories.length > 0 && (
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{post.categories.slice(0, 2).join(', ')}</span>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href={profile.social.blog}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            访问博客
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: 更新主页使用 Blog 组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';
import { Blog } from '@/components/Blog';

export default function Home() {
  return (
    <main>
      <Hero />
      <Skills />
      <Projects />
      <Contributions />
      <Blog />
    </main>
  );
}
```

- [ ] **Step 5: 验证博客组件**

Run: `npm run dev`
Expected: 页面显示最新博客文章卡片，包含标题、摘要、发布日期和标签

- [ ] **Step 6: 提交博客组件**

```bash
git add lib/blog.ts app/api/blog/posts/route.ts components/Blog.tsx app/page.tsx
git commit -m "feat: add blog integration component with RSS feed"
```

---

### Task 8: 创建联系方式组件和导航栏

**Files:**
- Create: `components/Contact.tsx`
- Create: `components/Navigation.tsx`

- [ ] **Step 1: 创建联系方式组件**

```tsx
// components/Contact.tsx
import { profile } from '@/config/profile';
import { Github, BookOpen, Mail, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">联系方式</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">联系信息</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <a
                  href={`mailto:${profile.social.email}`}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {profile.social.email}
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  GitHub
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <a
                  href={profile.social.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  博客
                </a>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">发送消息</h3>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="您的邮箱"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                />
              </div>
              <div>
                <textarea
                  placeholder="您的消息"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                发送消息
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 创建导航栏组件**

```tsx
// components/Navigation.tsx
'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { profile } from '@/config/profile';

const navItems = [
  { href: '#skills', label: '技能' },
  { href: '#projects', label: '项目' },
  { href: '#contributions', label: '贡献' },
  { href: '#blog', label: '博客' },
  { href: '#contact', label: '联系' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.slice(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">
            {profile.name}
          </a>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 3: 更新主页使用所有组件**

```tsx
// app/page.tsx
import { Hero } from '@/components/Hero';
import { Skills } from '@/components/Skills';
import { Projects } from '@/components/Projects';
import { Contributions } from '@/components/Contributions';
import { Blog } from '@/components/Blog';
import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Contributions />
        <Blog />
        <Contact />
      </main>
      <footer className="py-8 text-center text-gray-600 dark:text-gray-400">
        <p>© 2026 {profile.name}. 使用 Next.js 和 Tailwind CSS 构建</p>
      </footer>
    </>
  );
}
```

- [ ] **Step 4: 验证导航栏和联系方式**

Run: `npm run dev`
Expected: 页面顶部显示固定导航栏，底部显示联系方式区域

- [ ] **Step 5: 提交导航栏和联系方式**

```bash
git add components/Contact.tsx components/Navigation.tsx app/page.tsx
git commit -m "feat: add Navigation and Contact components"
```

---

### Task 9: 创建 GitHub Actions 部署配置

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 创建部署配置**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: 'npm'
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build with Next.js
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: 提交部署配置**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Pages deployment workflow"
```

---

### Task 10: 最终测试和优化

- [ ] **Step 1: 运行完整构建测试**

Run: `npm run build`
Expected: 构建成功，无错误

- [ ] **Step 2: 本地预览构建结果**

Run: `npx serve out`
Expected: 本地服务器启动，可以预览静态站点

- [ ] **Step 3: 测试响应式设计**

在浏览器中测试不同屏幕尺寸（手机、平板、桌面）的显示效果

- [ ] **Step 4: 测试主题切换**

测试亮色/暗色主题切换功能，确保主题持久化

- [ ] **Step 5: 测试所有组件功能**

验证所有组件正常工作：
- Hero 区域显示个人资料
- Skills 区域显示技能标签
- Projects 区域显示 GitHub 项目
- Contributions 区域显示贡献图表
- Blog 区域显示最新文章
- Contact 区域显示联系方式

- [ ] **Step 6: 提交最终代码**

```bash
git add .
git commit -m "feat: complete GitHub profile implementation"
```

---

## 执行建议

### 推荐执行方式
**Subagent-Driven (推荐)** - 为每个任务分发新的子代理，任务间进行审查，快速迭代

### 替代执行方式
**Inline Execution** - 在当前会话中执行任务，批量执行并设置检查点进行审查

**选择哪种方式？**

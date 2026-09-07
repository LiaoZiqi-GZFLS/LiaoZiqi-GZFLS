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
  // Return static data for static export
  const staticPosts: BlogPost[] = [
    {
      title: '如何使用 Next.js 构建静态网站',
      link: 'https://www.sustlzq.cn/posts/nextjs-static-site',
      pubDate: '2026-09-01T00:00:00Z',
      description: '本文介绍如何使用 Next.js 的静态导出功能构建高性能网站，包括配置、优化和部署流程...',
      categories: ['Next.js', '前端开发'],
    },
    {
      title: 'Tailwind CSS 最佳实践',
      link: 'https://www.sustlzq.cn/posts/tailwind-css-best-practices',
      pubDate: '2026-08-15T00:00:00Z',
      description: '分享 Tailwind CSS 的使用技巧和最佳实践，帮助您编写更简洁、可维护的样式代码...',
      categories: ['CSS', 'Tailwind'],
    },
    {
      title: 'GitHub Actions 自动化部署指南',
      link: 'https://www.sustlzq.cn/posts/github-actions-deployment',
      pubDate: '2026-08-01T00:00:00Z',
      description: '详细介绍如何使用 GitHub Actions 实现自动化测试、构建和部署，提高开发效率...',
      categories: ['DevOps', 'CI/CD'],
    },
    {
      title: 'TypeScript 类型系统深入解析',
      link: 'https://www.sustlzq.cn/posts/typescript-type-system',
      pubDate: '2026-07-15T00:00:00Z',
      description: '深入探讨 TypeScript 的类型系统，包括高级类型、类型守卫和类型推断等核心概念...',
      categories: ['TypeScript', '编程语言'],
    },
  ];

  return {
    posts: staticPosts.slice(0, count),
    isLoading: false,
    isError: null,
  };
}

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useBlogPosts(blogUrl: string, count = 4) {
  // Static post data mirrored from https://www.sustlzq.cn (updated 2026-09-19)
  const staticPosts: BlogPost[] = [
    {
      title: 'Uptime Kuma 自托管监控体系搭建指南：HTTP、TCP 与 Push 监控',
      link: 'https://www.sustlzq.cn/blog/uptime-kuma-monitoring/',
      pubDate: '2026-09-07T00:00:00Z',
      description: '用 Uptime Kuma 搭建 HTTP、TCP 与 Push 监控，覆盖完整链路并统一告警。',
      categories: ['Docker', '监控'],
    },
    {
      title: '自托管服务备份体系设计：每日自动备份与恢复演练',
      link: 'https://www.sustlzq.cn/blog/backup-and-restore/',
      pubDate: '2026-09-07T00:00:00Z',
      description: '讲清每日自动备份脚本设计、备份范围取舍与恢复演练中常见的三类问题。',
      categories: ['Docker', '备份'],
    },
    {
      title: '自托管服务器的五层纵深防御：从 SSH 加固到统一认证门户',
      link: 'https://www.sustlzq.cn/blog/security-hardening/',
      pubDate: '2026-09-07T00:00:00Z',
      description: '用 SSH 密钥、fail2ban、端口收敛、Authelia 统一认证与路由隔离，构建五层纵深防御。',
      categories: ['安全', '认证'],
    },
    {
      title: '用三个 Bash 脚本收敛日常运维：状态总览、健康检查与依赖顺序重建',
      link: 'https://www.sustlzq.cn/blog/ops-scripts-toolchain/',
      pubDate: '2026-09-07T00:00:00Z',
      description: '用服务注册表驱动的三个 Bash 脚本统一状态查看、健康检查与依赖顺序重建，并给出常见 Bash 陷阱。',
      categories: ['Bash', '运维'],
    },
    {
      title: '从裸机部署到全容器化：服务器现代化改造的完整路线',
      link: 'https://www.sustlzq.cn/blog/bare-metal-to-containerized/',
      pubDate: '2026-09-05T00:00:00Z',
      description: '把 systemd 散落、apt 混装的 Ubuntu 主机，重构成全容器化 + 统一编排 + 自动 HTTPS + 可恢复的完整路线与常见坑。',
      categories: ['架构', 'Docker'],
    },
    {
      title: '自托管避坑清单：15 个常见问题的现象、根因与解法',
      link: 'https://www.sustlzq.cn/blog/self-hosting-pitfalls/',
      pubDate: '2026-09-05T00:00:00Z',
      description: '汇总自托管常见 15 类问题，按现象、根因、解法与可复用经验组织，覆盖配置、容器网络、镜像与反代。',
      categories: ['踩坑', '运维'],
    },
    {
      title: 'Django 站点暗色模式改造：零回归策略、CSS 变量架构与验证方法',
      link: 'https://www.sustlzq.cn/blog/django-dark-mode/',
      pubDate: '2026-09-05T00:00:00Z',
      description: '讲给既有 Django 站点加明亮/黑暗/跟随系统三态主题的零回归策略、CSS 变量架构与浏览器对比度验证方法。',
      categories: ['Django', '暗色模式'],
    },
  ];

  return {
    posts: staticPosts.slice(0, count),
    isLoading: false,
    isError: null,
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages 将站点托管在仓库名子路径下，需配置 basePath 使静态资源引用带上前缀
  basePath: '/LiaoZiqi-GZFLS',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  basePath: isProd ? '/h5game-platform' : '',
  assetPrefix: isProd ? '/h5game-platform' : '',
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 添加公共资源路径配置
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/h5game-platform' : '',
    NEXT_PUBLIC_SITE_URL: isProd ? 'https://meng85135-lang.github.io' : 'http://localhost:3000'
  }
};

export default nextConfig;
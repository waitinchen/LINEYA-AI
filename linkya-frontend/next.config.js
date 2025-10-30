/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@particle-network/auth'],
  turbopack: {
    // 空的 turbopack 配置
  },
};

module.exports = nextConfig;

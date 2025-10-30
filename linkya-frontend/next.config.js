/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@particle-network/auth'],
  images: {
    domains: ['linkya.tonetown.ai']
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: '/api/:path*',
          destination: 'https://linkya.tonetown.ai/api/:path*'
        }
      ]
    }
  },
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://linkya.tonetown.ai'
  }
};

module.exports = nextConfig;

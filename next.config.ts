/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['framerusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.BACKEND_URL
          ? `${process.env.BACKEND_URL}/api/:path*`
          : 'http://127.0.0.1:3002/api/:path*'
      }
    ]
  }
}

module.exports = nextConfig
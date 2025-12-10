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
}

module.exports = nextConfig
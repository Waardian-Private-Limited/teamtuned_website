import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // This folder has its own lockfile; keep Next from picking a parent directory as the root.
  outputFileTracingRoot: path.resolve(__dirname),
  turbopack: { root: path.resolve(__dirname) },
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // HTTPS only for a year. No includeSubDomains/preload: those bind every subdomain and are hard to undo.
          { key: 'Strict-Transport-Security', value: 'max-age=31536000' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
      { source: '/screens/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      // Logos keep their names when they change, so cache for a day rather than forever.
      { source: '/brand/(.*)', headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }] },
    ];
  },
  // The host redirect (teamtuned.com -> www.teamtuned.com) is Vercel's domain setting; never add one here, or the two loop.
  async redirects() {
    return [
      // Pages of the previous site that printed QR codes, emails and old links still point at.
      { source: '/download', destination: '/#download', permanent: false },
      { source: '/book-demo', destination: '/#demo', permanent: false },
      { source: '/demo', destination: '/#demo', permanent: false },
      { source: '/faq', destination: '/#faq', permanent: false },
    ];
  },
};

export default nextConfig;

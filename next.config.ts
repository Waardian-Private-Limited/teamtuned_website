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
  // One host: www is sent to the apex, which every canonical, the sitemap and NEXT_PUBLIC_SITE_URL use.
  // (Only takes effect if www traffic reaches this app; otherwise set the same 301 at the DNS/CDN.)
  async redirects() {
    return [{ source: '/:path*', has: [{ type: 'host', value: 'www.teamtuned.com' }], destination: 'https://teamtuned.com/:path*', permanent: true }];
  },
};

export default nextConfig;

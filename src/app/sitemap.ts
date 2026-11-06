import type { MetadataRoute } from 'next';
import { pages } from '@/lib/pages';
import { SITE_URL } from '@/lib/site';

// Real content dates from lib/pages.ts. changefreq and priority are left out: Google ignores both.
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({ url: `${SITE_URL}${p.path === '/' ? '' : p.path}`, lastModified: p.updated }));
}

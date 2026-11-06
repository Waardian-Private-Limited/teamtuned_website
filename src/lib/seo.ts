import type { Metadata } from 'next';
import { SITE_URL, site } from './site';

/** What every indexable page states about itself: used for metadata, JSON-LD and the sitemap. */
export type PageInfo = {
  path: string;
  /** Full <title>, 60 characters or fewer. */
  title: string;
  /** Meta description, 155 characters or fewer. */
  description: string;
  /** Date the page's text last really changed (YYYY-MM-DD). */
  updated: string;
};

/**
 * Per-page metadata: canonical, Open Graph and Twitter all point at this page's own URL. The root layout sets only
 * what is shared, so a page (or the 404) never inherits the homepage's canonical or og:url.
 * `title` is the full <title> (no template), so each page controls its own wording and length.
 */
export function pageMeta({ title, description, path, ogTitle }: { title: string; description: string; path: string; ogTitle?: string }): Metadata {
  const url = `${SITE_URL}${path === '/' ? '' : path}`;
  // Inner pages use their own card from app/og/[slug]; the homepage card comes from app/opengraph-image.tsx.
  const images = path === '/' ? undefined : [{ url: `/og${path}`, width: 1200, height: 630, alt: ogTitle || title, type: 'image/png' }];
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    // No `images` key at all on the homepage: even an undefined value would hide the file-based card.
    openGraph: { type: 'website', url, siteName: site.name, locale: 'en_US', title: ogTitle || title, description, ...(images && { images }) },
    twitter: { card: 'summary_large_image', title: ogTitle || title, description, ...(images && { images }) },
  };
}

/**
 * JSON-LD for an inner page: the page itself (linked to the site and to what it is about) and its breadcrumb.
 * `about` and `isPartOf` point at the entities that components/SiteJsonLd.tsx prints on every page.
 */
export function pageGraph(
  page: PageInfo,
  {
    crumb,
    type = 'WebPage',
    about = 'software',
    image,
    trail = [],
    extra,
  }: {
    crumb: string;
    type?: string;
    about?: 'software' | 'org';
    image?: string;
    /** Breadcrumb levels between Home and this page. */
    trail?: Array<{ name: string; path: string }>;
    /** Extra properties for the page node (e.g. Article headline and dates). */
    extra?: Record<string, unknown>;
  },
) {
  const url = `${SITE_URL}${page.path}`;
  const crumbs = [{ name: site.name, item: `${SITE_URL}/` }, ...trail.map((t) => ({ name: t.name, item: `${SITE_URL}${t.path}` })), { name: crumb, item: url }];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: 'en',
        dateModified: page.updated,
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#${about}` },
        ...(image && { primaryImageOfPage: `${SITE_URL}${image}` }),
        ...extra,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
      },
    ],
  };
}

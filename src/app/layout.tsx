import type { Metadata, Viewport } from 'next';
import { Exo } from 'next/font/google';
import { SiteJsonLd } from '@/components/JsonLd';
import { Providers } from '@/components/motion';
import { SITE_URL, site } from '@/lib/site';
import './globals.css';

// One variable Exo file (Latin subset, WOFF2), downloaded at build time and served from this site: about 1/5 of the
// five static TTFs it replaces, so the font no longer competes with the hero image on slow phones. The TTFs in
// public/fonts stay for the Open Graph image renderer, which cannot read WOFF2.
const exo = Exo({ subsets: ['latin'], variable: '--font-exo', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: site.title, template: '%s · TeamTuned' },
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  // Canonical, robots and og:url are set per page (lib/seo.ts pageMeta), so the 404 and sub-pages never inherit the homepage's.
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  appLinks: { android: { package: 'com.waardian.teamtuned', url: site.playStore }, ios: { app_store_id: '6756356409', url: site.appStore } },
  other: { 'apple-itunes-app': 'app-id=6756356409' },
  category: 'business',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={exo.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <SiteJsonLd />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

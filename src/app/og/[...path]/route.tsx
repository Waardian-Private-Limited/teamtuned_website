import { ogCard } from '@/lib/og';
import { ogCards } from '@/lib/pages';

// One social card per inner page, rendered at build time and served at /og/<page path>. lib/seo.ts pageMeta()
// points og:image and twitter:image here, because a page's own openGraph metadata replaces the homepage card.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(ogCards).map((key) => ({ path: key.split('/') }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const card = ogCards[(await params).path.join('/')];
  if (!card) return new Response('Not found', { status: 404 });
  return ogCard({ eyebrow: card.eyebrow, title: card.title, sub: 'TeamTuned · The proof-of-work HRMS' });
}

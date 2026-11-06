import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FeatureLanding } from '@/components/FeatureLanding';
import { featureBySlug, features } from '@/lib/features';
import { pageMeta } from '@/lib/seo';

// Only the pages in lib/features.ts exist; any other top-level path is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return features.map((f) => ({ feature: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ feature: string }> }): Promise<Metadata> {
  const page = featureBySlug((await params).feature);
  return page ? pageMeta({ title: page.title, description: page.description, path: `/${page.slug}` }) : {};
}

export default async function FeatureRoute({ params }: { params: Promise<{ feature: string }> }) {
  const page = featureBySlug((await params).feature);
  if (!page) notFound();
  return <FeatureLanding page={page} />;
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { FaqList, HeroFacts, PageShell, ProseSections } from '@/components/PageShell';
import { Container } from '@/components/ui';
import { featureBySlug } from '@/lib/features';
import { guideBySlug, guides } from '@/lib/guides';
import { pageMeta } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

const info = (slug: string) => {
  const g = guideBySlug(slug);
  return g && { g, page: { path: `/guides/${g.slug}`, title: g.title, description: g.description, updated: g.updated } };
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const x = info((await params).slug);
  return x ? pageMeta(x.page) : {};
}

export default async function GuideRoute({ params }: { params: Promise<{ slug: string }> }) {
  const x = info((await params).slug);
  if (!x) notFound();
  const { g, page } = x;
  return (
    <PageShell
      page={page}
      crumb={g.h1}
      pill={g.eyebrow}
      trail={[{ name: 'Guides', path: '/guides' }]}
      h1={g.h1}
      lede={g.lede}
      ldType="Article"
      ldExtra={{
        headline: g.h1,
        datePublished: g.published,
        author: { '@id': `${SITE_URL}/#org` },
        publisher: { '@id': `${SITE_URL}/#org` },
        mainEntityOfPage: `${SITE_URL}${page.path}`,
      }}
      demoSource={`guide_${g.slug.replace(/-/g, '_')}`}
      secondary={{ href: '/guides', label: 'All guides' }}
      aside={<HeroFacts title="In this guide" items={g.sections.map((s) => s.h2)} />}
    >
      <ProseSections sections={g.sections} />
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqList faqs={g.faqs} />
            <h2 className="mt-16 text-xl font-bold tracking-tight text-ink">See how TeamTuned does it</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {g.related.map((slug) => {
                const r = featureBySlug(slug);
                return r ? (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 font-bold text-ink hover:border-ink/30">
                      {r.eyebrow}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

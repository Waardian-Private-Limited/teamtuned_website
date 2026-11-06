import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featureBySlug, type FeaturePage } from '@/lib/features';
import { FaqList, PageShell, ProseSections } from './PageShell';
import { Container } from './ui';

/** One landing page per search intent, on the shared inner-page shell. CTAs open the shared demo popup. */
export function FeatureLanding({ page }: { page: FeaturePage }) {
  return (
    <PageShell
      page={{ path: `/${page.slug}`, title: page.title, description: page.description, updated: page.updated }}
      crumb={page.eyebrow}
      h1={page.h1}
      lede={page.lede}
      image={page.screen.src}
      demoSource={`feature_${page.slug.replace(/-/g, '_')}`}
      secondary={{ href: '/pricing', label: 'See pricing' }}
      aside={
        // Fades in just after the text, so the headline and lede paint first and count as LCP.
        <div className="rise mx-auto w-[62%] max-w-[300px] lg:w-full" style={{ '--d': '0.1s' } as React.CSSProperties}>
          <Image
            src={page.screen.src}
            alt={page.screen.alt}
            width={page.screen.w}
            height={page.screen.h}
            priority
            fetchPriority="high"
            sizes="(min-width: 1024px) 300px, 62vw"
            className="h-auto w-full rotate-[3deg] drop-shadow-[0_50px_80px_rgba(0,0,0,0.6)]"
          />
        </div>
      }
    >
      <ProseSections sections={page.sections} />

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">{page.steps.h2}</h2>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {page.steps.items.map(([t, d], i) => (
              <li key={t} className="rounded-3xl border border-line bg-white p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqList faqs={page.faqs} />

            <h2 className="mt-16 text-xl font-bold tracking-tight text-ink">More from TeamTuned</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {page.related.map((slug) => {
                const r = featureBySlug(slug);
                return r ? (
                  <li key={slug}>
                    <Link href={`/${slug}`} className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-line p-5 font-bold text-ink hover:border-ink/30 hover:bg-mist">
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

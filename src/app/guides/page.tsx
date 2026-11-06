import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell } from '@/components/PageShell';
import { Container } from '@/components/ui';
import { guides } from '@/lib/guides';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';

const page = staticPages.guides;
export const metadata: Metadata = pageMeta(page);

export default function GuidesPage() {
  return (
    <PageShell
      page={page}
      crumb={page.crumb}
      h1={page.h1}
      lede="Practical, vendor-neutral guides for teams choosing HR software: what to check in leave management, attendance and payroll, and shift rosters, how per-employee pricing works, and how to move attendance off spreadsheets and chat groups."
      ldType="CollectionPage"
      demoSource="guides_hero"
      secondary={{ href: '/#features', label: 'See the product' }}
    >
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ul className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="group flex h-full flex-col rounded-3xl border border-line p-7 hover:border-ink/30 hover:bg-mist">
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-muted">{g.eyebrow}</span>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.02em] text-ink">{g.h1}</h2>
                  <p className="mt-3 leading-relaxed text-muted">{g.description}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-ink">
                    Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </PageShell>
  );
}

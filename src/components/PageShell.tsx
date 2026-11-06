import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { pageGraph, type PageInfo } from '@/lib/seo';
import { Demo } from './Demo';
import { LdScript } from './JsonLd';
import { Footer } from './Footer';
import { Header } from './Header';
import { Container, LiveDot, cx } from './ui';

/**
 * Shell for every inner marketing page: JSON-LD, header, a dark hero with breadcrumb, H1 and a quotable lede,
 * the page's own sections, the demo form and the footer. Server-rendered with no entrance animation, so every
 * word is in the HTML for crawlers and answer engines.
 */
export function PageShell({
  page,
  crumb,
  h1,
  lede,
  ldType,
  about,
  image,
  trail = [],
  pill,
  ldExtra,
  aside,
  secondary,
  demoSource,
  children,
}: {
  page: PageInfo;
  /** Short page name for the breadcrumb and the hero pill. */
  crumb: string;
  h1: string;
  /** First paragraph: a plain statement an answer engine can quote on its own. */
  lede: string;
  ldType?: string;
  about?: 'software' | 'org';
  /** Image path for JSON-LD primaryImageOfPage. */
  image?: string;
  /** Breadcrumb levels between Home and this page. */
  trail?: Array<{ name: string; path: string }>;
  ldExtra?: Record<string, unknown>;
  /** Hero pill text; defaults to the crumb. */
  pill?: string;
  /** Right-hand hero content (a product screen). */
  aside?: React.ReactNode;
  secondary?: { href: string; label: string };
  demoSource: string;
  children: React.ReactNode;
}) {
  const ld = pageGraph(page, { crumb, type: ldType, about, image, trail, extra: ldExtra });
  return (
    <>
      <LdScript data={ld} />
      <Header />
      <main id="main">
        <section className="relative overflow-hidden bg-ink pb-16 pt-32 text-white sm:pb-24 sm:pt-40">
          <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
          <Container className="relative">
            <nav aria-label="Breadcrumb" className="text-sm text-white/50">
              <Link href="/" className="-my-3 inline-block py-3 pr-1 hover:text-white">
                Home
              </Link>
              {trail.map((t) => (
                <span key={t.path}>
                  <span className="mx-2" aria-hidden>
                    /
                  </span>
                  <Link href={t.path} className="-my-3 inline-block py-3 hover:text-white">
                    {t.name}
                  </Link>
                </span>
              ))}
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-white/80">{crumb}</span>
            </nav>
            <div className={cx('mt-8', !!aside && 'grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]')}>
              <div className={cx(!aside && 'max-w-3xl')}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/80">
                  <LiveDot /> {pill ?? crumb}
                </span>
                <h1 className="mt-6 text-balance text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl">{h1}</h1>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65">{lede}</p>
                <p className="mt-4 text-sm text-white/45">
                  Updated <time dateTime={page.updated}>{formatDate(page.updated)}</time>
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/#demo"
                    data-demo-source={demoSource}
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-ink transition-colors hover:bg-white/90"
                  >
                    Book a demo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                  {secondary && (
                    <Link
                      href={secondary.href}
                      className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-6 text-[15px] font-semibold text-white hover:bg-white/[0.06]"
                    >
                      {secondary.label}
                    </Link>
                  )}
                </div>
              </div>
              {aside}
            </div>
          </Container>
        </section>

        {children}

        <Demo />
      </main>
      <Footer />
    </>
  );
}

const formatDate = (iso: string) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Hero side card for pages without a product screen: a short list of the page's key facts. */
export function HeroFacts({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <aside className="rounded-[2rem] border border-white/12 bg-white/[0.04] p-7 backdrop-blur sm:p-8">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">{title}</p>
      <ul className="mt-5 space-y-4">
        {items.map((t) => (
          <li key={t} className="flex items-start gap-3 text-[15px] font-semibold leading-snug text-white/85">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-ink">
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
            </span>
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** A readable white band with an H2, body and optional check list. Used by most inner pages. */
export function ProseSections({ sections }: { sections: ReadonlyArray<{ h2: string; body: string; points?: readonly string[] }> }) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-3xl space-y-14">
          {sections.map((s) => (
            <div key={s.h2}>
              <h2 className="text-balance text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">{s.h2}</h2>
              <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">{s.body}</p>
              {s.points && <CheckList items={s.points} className="mt-5" />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function CheckList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cx('space-y-3', className)}>
      {items.map((p) => (
        <li key={p} className="flex items-start gap-3 text-[17px] leading-relaxed text-ink">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          {p}
        </li>
      ))}
    </ul>
  );
}

/** Questions written straight into the HTML (no accordion), so every answer is crawlable. */
export function FaqList({ faqs, title = 'Questions, answered.' }: { faqs: ReadonlyArray<{ q: string; a: string }>; title?: string }) {
  return (
    <>
      <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">{title}</h2>
      <dl className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map((f) => (
          <div key={f.q} className="py-6">
            <dt className="text-lg font-bold tracking-tight text-ink">{f.q}</dt>
            <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}

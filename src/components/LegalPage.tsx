import type { StaticPage } from '@/lib/pages';
import { pageGraph } from '@/lib/seo';
import { Footer } from './Footer';
import { Header } from './Header';
import { LdScript } from './JsonLd';
import { Container } from './ui';

/** Shell for policy pages: dark title band, readable single column, site header and footer. */
export function LegalPage({ page, updated, children }: { page: StaticPage; updated: string; children: React.ReactNode }) {
  const title = page.h1;
  return (
    <>
      <LdScript data={pageGraph(page, { crumb: page.crumb, about: 'org' })} />
      <Header />
      <main id="main">
        <section className="relative overflow-hidden bg-ink pb-16 pt-36 text-white sm:pb-20 sm:pt-44">
          <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
          <Container className="relative">
            <h1 className="text-4xl font-extrabold tracking-[-0.04em] sm:text-6xl">{title}</h1>
            <p className="mt-4 text-white/55">Last updated: {updated}</p>
          </Container>
        </section>
        <Container className="py-16 sm:py-20">
          <article
            className="mx-auto max-w-3xl text-[16px] leading-relaxed text-muted
              [&_a]:font-semibold [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4
              [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink first:[&_h2]:mt-0
              [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-ink
              [&_li]:pl-1 [&_p]:mb-4 [&_strong]:text-ink
              [&_section>div]:my-5 [&_section>div]:rounded-2xl [&_section>div]:border [&_section>div]:border-line [&_section>div]:bg-mist [&_section>div]:p-6
              [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6"
          >
            {children}
          </article>
        </Container>
      </main>
      <Footer />
    </>
  );
}

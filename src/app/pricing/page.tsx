import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CheckList, FaqList, PageShell, HeroFacts } from '@/components/PageShell';
import { Container } from '@/components/ui';
import { modules } from '@/lib/content';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';

// No prices are published yet: quotes follow the demo. Don't add numbers or Offer schema until there is a real price list.
const page = staticPages.pricing;
export const metadata: Metadata = pageMeta(page);

const basis = [
  ['Per active employee', 'You pay for the people who use TeamTuned. Employees who are inactive or have left don’t use a licence.'],
  ['Only the modules you use', 'Switch on the modules you need today and add more as you grow. Every module shares the same people, sites and policies.'],
  ['Demo, then a free trial', 'We show you TeamTuned set up for your team, then you try it with your own people before you decide.'],
] as const;

const faqs = [
  {
    q: 'How much does TeamTuned cost?',
    a: 'The price depends on how many active employees you have and which modules you use. Book a demo, and we will send you a quote for your setup.',
  },
  {
    q: 'Do inactive or exited employees count towards our licences?',
    a: 'No. Only active employees, and employees who have been invited but have not joined yet, use a licence. Marking someone inactive frees their licence straight away.',
  },
  {
    q: 'What happens when we use all our licences?',
    a: 'Everyone already on TeamTuned keeps working as normal. You can’t add another active employee until a licence is free or you add more licences.',
  },
  {
    q: 'Can we add modules later?',
    a: 'Yes. Modules are switched on for your account, so you can start with what you need now and add others when you are ready.',
  },
  {
    q: 'Is there a free trial?',
    a: 'Yes. After the demo, you can try TeamTuned with your own team before you decide.',
  },
  {
    q: 'Do the mobile apps cost extra?',
    a: 'No. The same account works on the web and in the TeamTuned app for Android and iOS.',
  },
];

export default function PricingPage() {
  return (
    <PageShell
      page={page}
      crumb={page.crumb}
      h1={page.h1}
      lede="TeamTuned is priced by the number of active employees and the modules you switch on. Book a demo, and we will send a quote for your setup and start your free trial."
      demoSource="pricing_hero"
      aside={<HeroFacts title="How pricing works" items={['One licence per active employee', 'Inactive and exited staff free their licence', 'Switch modules on as you need them', 'Live demo, then a free trial with your team']} />}
      secondary={{ href: '/#modules', label: 'See all modules' }}
    >
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">How pricing works</h2>
          <ol className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
            {basis.map(([t, d], i) => (
              <li key={t} className="rounded-3xl border border-line bg-white p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">{i + 1}</span>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">{t}</h3>
                <p className="mt-2 leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>

          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">What uses a licence</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              Your account has a number of employee licences. TeamTuned counts them for you and shows how many are used and how many are free.
            </p>
            <CheckList
              className="mt-5"
              items={[
                'Active employees use a licence.',
                'Invited employees who haven’t joined yet use a licence, so their place is kept.',
                'Inactive, exited and deleted employees don’t use one.',
                'If you use expense wallets, they have their own licence count.',
              ]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">Choose from {modules.length} modules</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">Start with what your team needs today and add the rest when you are ready.</p>
          </div>
          <ul className="mx-auto mt-12 grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((m) => (
              <li key={m.title} className="relative bg-white p-6">
                <h3 className="flex items-center gap-1.5 font-bold tracking-tight text-ink">
                  {'href' in m ? (
                    <Link href={m.href} className="after:absolute after:inset-0 hover:underline">
                      {m.title}
                    </Link>
                  ) : (
                    m.title
                  )}
                  {'href' in m && <ArrowUpRight className="h-4 w-4 text-muted" aria-hidden />}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{m.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqList faqs={faqs} title="Pricing questions" />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

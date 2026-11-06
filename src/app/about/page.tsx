import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageShell, ProseSections, HeroFacts } from '@/components/PageShell';
import { Container } from '@/components/ui';
import { features } from '@/lib/features';
import { modules } from '@/lib/content';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

// No founding year, headcount, address or customer names until the business confirms them.
const page = staticPages.about;
export const metadata: Metadata = pageMeta(page);

const sections = [
  {
    h2: 'Why we built TeamTuned',
    body:
      'Most HR software assumes everyone sits at a desk. Real teams don’t: they work in offices, on sites and on the road. For them, attendance means registers and selfies on chat groups, field work happens out of sight, and payroll starts with days of cross-checking spreadsheets. We built TeamTuned for those teams.',
  },
  {
    h2: 'Proof, not trust',
    body:
      'TeamTuned is the proof-of-work HRMS. Instead of asking managers to trust what they are told, every step of the working day comes with evidence, and each step feeds the next:',
    points: [
      'Check-in is verified with face recognition, liveness, the location and the registered phone.',
      'Tasks and site reports come back with photos, checklists, location and time.',
      'Field visits are recorded on a live map and a day timeline.',
      'Verified hours become payable days, leave and payroll.',
    ],
  },
  {
    h2: 'What we believe',
    body: 'A few principles shape every feature we ship:',
    points: [
      'One set of data: attendance, leave, approvals and payroll read the same records, so nothing is re-typed.',
      'Phone first: employees do everything from the app, in their own language.',
      'Rules, not workarounds: policies are set once and the system applies them, per company and per site.',
      'Privacy by design: sensitive data is encrypted, tracking runs only under policies you set, and every decision is recorded.',
    ],
  },
];

const facts = [
  ['Product', site.name],
  ['Made by', site.legalName],
  ['Platforms', 'Web, Android and iOS'],
  ['App languages', 'Six, including English'],
  ['Modules', `${modules.length}, from attendance to performance`],
  ['Contact', site.email],
] as const;

export default function AboutPage() {
  return (
    <PageShell
      page={page}
      crumb={page.crumb}
      h1={page.h1}
      lede={`TeamTuned is the proof-of-work HRMS, made by ${site.legalName}. It verifies attendance with face recognition, geofencing and a registered phone, and runs shifts, leave, field tracking, tasks, approvals and payroll on the same verified data, on web, Android and iOS.`}
      ldType="AboutPage"
      about="org"
      demoSource="about_hero"
      aside={<HeroFacts title="TeamTuned at a glance" items={['Made by Waardian Private Limited', 'Web, Android and iOS', 'Employee app in six languages', '18 modules on one set of data']} />}
      secondary={{ href: '/contact', label: 'Contact us' }}
    >
      <ProseSections sections={sections} />

      <section className="bg-white pb-20 sm:pb-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-balance text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">Everything in one system</h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
              TeamTuned has {modules.length} modules. Each account switches on the ones it needs, and every module shares the same people, sites,
              companies and policies.
            </p>
            <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              {modules.map((mod) => (
                <div key={mod.title}>
                  <dt className="font-bold text-ink">{mod.title}</dt>
                  <dd className="mt-1 leading-relaxed text-muted">{mod.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">TeamTuned at a glance</h2>
              <dl className="mt-8 divide-y divide-line border-y border-line">
                {facts.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 py-4">
                    <dt className="text-muted">{k}</dt>
                    <dd className="text-right font-semibold text-ink">
                      {k === 'Contact' ? (
                        <a href={`mailto:${v}`} className="underline underline-offset-4">
                          {v}
                        </a>
                      ) : (
                        v
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold tracking-[-0.03em] text-ink sm:text-4xl">Explore the product</h2>
              <ul className="mt-8 grid gap-3">
                {features.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/${f.slug}`} className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 font-bold text-ink hover:border-ink/30">
                      {f.eyebrow}
                      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, LogIn, Mail, Smartphone } from 'lucide-react';
import { PageShell, HeroFacts } from '@/components/PageShell';
import { Container, StoreBadges } from '@/components/ui';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';
import { APP_URL, site } from '@/lib/site';

// TODO(business): add a postal address and a phone number here (and in the Organization schema) once confirmed.
const page = staticPages.contact;
export const metadata: Metadata = pageMeta(page);

const card = 'flex h-full flex-col rounded-3xl border border-line bg-white p-7';
const icon = 'flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-white';
const action = 'group mt-auto inline-flex items-center gap-2 pt-6 font-bold text-ink underline-offset-4 hover:underline';

export default function ContactPage() {
  return (
    <PageShell
      page={page}
      crumb={page.crumb}
      h1={page.h1}
      lede={`Book a demo to see TeamTuned set up for your team, or email us at ${site.email}. Already a customer? Log in to your account or write to us from your work email.`}
      ldType="ContactPage"
      about="org"
      demoSource="contact_hero"
      aside={<HeroFacts title="Ways to reach us" items={['Book a demo for your team', 'Email business@teamtuned.com', 'Customers log in on the web app', 'Employees use the Android and iOS app']} />}
    >
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <li className={card}>
              <span className={icon}>
                <CalendarCheck className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-bold tracking-tight text-ink">Book a demo</h2>
              <p className="mt-2 leading-relaxed text-muted">See TeamTuned with your own sites, shifts and policies, then start a free trial.</p>
              <Link href="/#demo" data-demo-source="contact_card" className={action}>
                Book a demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
            <li className={card}>
              <span className={icon}>
                <Mail className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-bold tracking-tight text-ink">Email us</h2>
              <p className="mt-2 leading-relaxed text-muted">Questions about the product, pricing, security or your account.</p>
              <a href={`mailto:${site.email}`} className={action}>
                {site.email}
              </a>
            </li>
            <li className={card}>
              <span className={icon}>
                <LogIn className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-bold tracking-tight text-ink">Log in</h2>
              <p className="mt-2 leading-relaxed text-muted">Managers, HR and admins use TeamTuned on the web.</p>
              <a href={`${APP_URL}/login`} className={action}>
                Go to the web app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            </li>
            <li className={card}>
              <span className={icon}>
                <Smartphone className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-xl font-bold tracking-tight text-ink">Get the app</h2>
              <p className="mt-2 leading-relaxed text-muted">Employees check in, apply for leave and see payslips on their phone.</p>
              <StoreBadges className="mt-auto pt-6" />
            </li>
          </ul>
        </Container>
      </section>
    </PageShell>
  );
}

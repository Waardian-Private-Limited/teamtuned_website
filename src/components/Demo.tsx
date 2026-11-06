'use client';

import { CheckCircle2 } from 'lucide-react';
import { site } from '@/lib/site';
import { DemoForm } from './DemoForm';
import { Container, LiveDot } from './ui';

/** Last section: the same demo form as the popup, for visitors who read the whole page. */
export function Demo() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32 screen-fit">
      <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.1),transparent)]" aria-hidden />
      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/80">
              <LiveDot /> Live demo, then a free trial
            </span>
            <h2 id="demo-title" className="mt-6 text-balance text-[2.4rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl">
              See TeamTuned on your own team.
            </h2>
            <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-white/60">
              Tell us how your team works. We will show you the exact setup for your sites, shifts and payroll, and help you go live.
            </p>
            <ul className="mt-9 space-y-4 lg:mt-7 lg:space-y-3">
              {['Set up with your policies, not a generic template', 'Employee import and onboarding help', 'Your team checking in within days'].map((t) => (
                <li key={t} className="flex items-center gap-3 text-base font-semibold text-white/85">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-white" aria-hidden /> {t}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-sm text-white/50">
              Prefer email?{' '}
              <a href={`mailto:${site.email}`} className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                {site.email}
              </a>
            </p>
          </div>

          <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.03] p-6 backdrop-blur sm:p-8">
            <DemoForm source="final_section" idPrefix="sec" />
          </div>
        </div>
      </Container>
    </section>
  );
}

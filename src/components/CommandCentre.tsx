'use client';

import Image from 'next/image';
import { AnimatePresence, m, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, ClipboardList, Banknote, LayoutDashboard, Route } from 'lucide-react';
import { Tilt } from './scroll';
import { Container, SectionHead, cx } from './ui';

const tabs = [
  { key: 'dashboard', label: 'Command centre', icon: LayoutDashboard, alt: 'Tablet dashboard with today’s shift, team check-ins and live field team map' },
  { key: 'tracking', label: 'Field team', icon: Route, alt: 'Tablet field team view with live route, people on field and site geofences' },
  { key: 'leave', label: 'Leave & approvals', icon: CalendarCheck, alt: 'Tablet leave balances, upcoming holidays and approvals inbox' },
  { key: 'payroll', label: 'Pay & attendance', icon: Banknote, alt: 'Tablet payslip next to the monthly attendance calendar' },
  { key: 'work', label: 'Work & meetings', icon: ClipboardList, alt: 'Tablet tasks, daily progress report and minutes of meeting' },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;
const AUTO_MS = 5000;

/** Dark band with tabs over the tablet screens. Auto-advances while visible until someone picks a tab. */
export function CommandCentre() {
  const [i, setI] = useState(0);
  const [manual, setManual] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (manual || !visible) return;
    const t = setTimeout(() => setI((v) => (v + 1) % tabs.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [i, manual, visible]);

  const tab = tabs[i];

  return (
    <section ref={ref} aria-labelledby="cc-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32 screen-fit">
      <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <div>
            <SectionHead
              dark
              align="split"
              id="cc-title"
              eyebrow="For managers & HR"
              title="Your whole company, on one screen."
              sub="Who is in, who is late, who is on the road and what needs your approval. Updated live, on web and tablet."
            />

            <div
              role="tablist"
              aria-label="Product screens"
              className="mx-auto mt-10 flex max-w-full gap-2 overflow-x-auto pb-2 [scrollbar-width:none] sm:justify-center lg:mt-10 lg:flex-col lg:items-start lg:overflow-visible lg:pb-0"
            >
              {tabs.map((t, idx) => (
                <button
                  key={t.key}
                  role="tab"
                  id={`cc-tab-${t.key}`}
                  aria-selected={idx === i}
                  aria-controls="cc-panel"
                  onClick={() => {
                    setI(idx);
                    setManual(true);
                  }}
                  className={cx(
                    'relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 lg:px-5 lg:py-3 lg:text-base',
                    idx === i ? 'bg-white text-ink' : 'border border-white/12 text-white/70 hover:bg-white/[0.06] hover:text-white'
                  )}
                >
                  <t.icon className="h-4 w-4" aria-hidden />
                  {t.label}
                  {idx === i && !manual && visible && (
                    <m.span
                      key={`bar-${i}`}
                      className="absolute bottom-0 left-0 h-[2px] bg-ink/40"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      aria-hidden
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Width-driven below lg; from lg its height follows the screen so the band never scrolls. */}
          <div
            id="cc-panel"
            role="tabpanel"
            aria-labelledby={`cc-tab-${tab.key}`}
            className="relative mx-auto mt-12 aspect-[1617/2133] w-[88%] max-w-[560px] lg:mt-0 lg:h-[min(820px,calc(100svh-160px))] lg:w-auto lg:max-w-none"
          >
            <div className="absolute left-1/2 top-1/2 h-[120%] w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.12),transparent)]" aria-hidden />
            <Tilt className="relative h-full w-full" max={6}>
            <div className="relative h-full w-full">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={tab.key}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.02, y: -20 }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Image
                    src={`/screens/tablet-${tab.key}.webp`}
                    alt={tab.alt}
                    width={1617}
                    height={2133}
                    sizes="(min-width: 1024px) 620px, (min-width: 640px) 560px, 88vw"
                    className="h-full w-full object-contain drop-shadow-[0_60px_90px_rgba(0,0,0,0.7)]"
                  />
                </m.div>
              </AnimatePresence>
            </div>
            </Tilt>
          </div>
        </div>
      </Container>
    </section>
  );
}

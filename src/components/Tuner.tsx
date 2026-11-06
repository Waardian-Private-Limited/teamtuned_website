'use client';

import Image from 'next/image';
import { m as M, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { Reveal } from './motion';
import { Container, SectionHead } from './ui';

type Msg = { from: 'user' | 'tuner'; text: string; card?: { title: string; rows: string[] } };

const script: Msg[] = [
  { from: 'user', text: 'Who is late at North Tower today?' },
  {
    from: 'tuner',
    text: '3 people checked in late at North Tower:',
    card: { title: 'Late · North Tower', rows: ['Paula Santos · 10:02 AM', 'Amara Jones · 09:51 AM', 'Kofi Danso · 09:47 AM'] },
  },
  { from: 'user', text: 'Approve Paula’s annual leave for 18–19 Nov.' },
  { from: 'tuner', text: 'Done. Paula’s annual leave for Wed 18 – Thu 19 Nov is approved and she has been notified.' },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function Typing() {
  return (
    <span className="flex gap-1 px-1 py-1" aria-label="Tuner is typing">
      {[0, 1, 2].map((d) => (
        <M.span key={d} className="h-1.5 w-1.5 rounded-full bg-muted" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
      ))}
    </span>
  );
}

/** Tuner, the in-app AI assistant: a scripted chat that plays once when the card scrolls in. */
export function Tuner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView || shown >= script.length) return;
    const next = script[shown];
    if (next.from === 'tuner') {
      setTyping(true);
      const t = setTimeout(() => {
        setTyping(false);
        setShown((v) => v + 1);
      }, 1300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShown((v) => v + 1), shown === 0 ? 300 : 900);
    return () => clearTimeout(t);
  }, [inView, shown]);

  return (
    <section aria-labelledby="tuner-title" className="relative overflow-hidden bg-white py-24 sm:py-32 screen-fit">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHead
              align="left"
              id="tuner-title"
              eyebrow="Tuner AI"
              title="Ask your HR system. It answers, and acts."
              sub="Tuner is the assistant built into TeamTuned. Ask about attendance, leave or payroll in plain words, and let it approve, assign or draft for you, always within your permissions."
            />
            <Reveal delay={0.1}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Answers from live data', 'Takes actions you allow', 'Drafts reviews and letters', 'Respects every role and scope'].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-2xl border border-line bg-mist px-4 py-3 text-sm font-semibold text-ink">
                    <Sparkles className="h-4 w-4 shrink-0" aria-hidden /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div ref={ref} className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(closest-side,#f4f4f5,transparent)]" aria-hidden />
              <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)]">
                <div className="flex items-center gap-3 border-b border-line px-5 py-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
                    <Image src="/brand/mark-white.png" alt="" width={20} height={20} className="h-5 w-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-sm font-bold text-ink">Tuner</p>
                    <p className="text-xs text-muted">AI assistant · TeamTuned</p>
                  </div>
                </div>
                <div className="flex min-h-[380px] flex-col gap-3 bg-mist/60 p-4 sm:p-5" aria-live="polite">
                  {script.slice(0, shown).map((m, i) => (
                    <M.div
                      key={i}
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className={m.from === 'user' ? 'ml-auto max-w-[82%]' : 'mr-auto max-w-[88%]'}
                    >
                      <div
                        className={
                          m.from === 'user'
                            ? 'rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-sm font-medium text-white'
                            : 'rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-sm text-ink'
                        }
                      >
                        {m.from === 'tuner' && i === script.length - 1 && <Check className="mr-1.5 inline h-4 w-4 text-live" aria-hidden />}
                        {m.text}
                        {m.card && (
                          <div className="mt-2.5 rounded-xl bg-mist p-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted">{m.card.title}</p>
                            <ul className="mt-1.5 space-y-1">
                              {m.card.rows.map((r) => (
                                <li key={r} className="flex items-center gap-2 text-[13px] font-semibold">
                                  <span className="h-1.5 w-1.5 rounded-full bg-warn" aria-hidden /> {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </M.div>
                  ))}
                  {typing && (
                    <div className="mr-auto rounded-2xl rounded-bl-md border border-line bg-white px-3 py-2">
                      <Typing />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 border-t border-line px-4 py-3">
                  <span className="flex-1 rounded-full bg-mist px-4 py-2.5 text-sm text-subtle">Ask Tuner anything…</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
                    <Sparkles className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

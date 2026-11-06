'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { faqs } from '@/lib/content';
import { Container, SectionHead, cx } from './ui';

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white py-24 sm:py-32 screen-fit">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead align="left" id="faq-title" eyebrow="FAQ" title="Questions, answered." sub="Anything else? Book a demo and ask us directly." />
          <ul className="divide-y divide-line border-y border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 lg:py-5 lg:[@media(max-height:820px)]:py-4 text-left text-lg font-bold tracking-tight text-ink sm:text-xl"
                    >
                      {f.q}
                      <span
                        className={cx(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300',
                          isOpen ? 'rotate-45 border-ink bg-ink text-white' : 'border-line text-ink'
                        )}
                      >
                        <Plus className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  </h3>
                  {/* Every answer is in the page HTML (crawlers and answer engines read it); closed ones collapse with CSS. */}
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                    className={cx('grid transition-[grid-template-rows,opacity] duration-400 ease-out', isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-2xl pb-6 leading-relaxed text-muted">{f.a}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

import { Check, X } from 'lucide-react';
import { compare } from '@/lib/content';
import { Stagger, StaggerItem } from './motion';
import { Container, SectionHead, Logo } from './ui';

export function Compare() {
  return (
    <section aria-labelledby="compare-title" className="bg-mist py-24 sm:py-32 screen-fit">
      <Container>
        <SectionHead id="compare-title" eyebrow="Before & after" title="What changes on day one." />

        <div className="mx-auto mt-14 max-w-5xl lg:mt-10 overflow-hidden rounded-3xl border border-line bg-white">
          <div className="hidden grid-cols-[180px_1fr_1fr] border-b border-line text-sm font-bold md:grid">
            <div className="px-5 py-4" />
            <div className="px-5 py-4 text-muted">Without TeamTuned</div>
            <div className="flex items-center bg-ink px-5 py-4 text-white">
              With <Logo dark className="ml-2 !h-5" />
            </div>
          </div>
          <Stagger as="ul">
            {compare.map(([area, before, after]) => (
              <StaggerItem key={area} as="li" className="grid border-b border-line last:border-b-0 md:grid-cols-[180px_1fr_1fr]">
                <div className="px-5 pb-1 pt-5 text-base font-bold text-ink md:px-5 md:py-4 lg:[@media(max-height:820px)]:py-3">{area}</div>
                <div className="flex items-start gap-3 px-5 py-2 text-muted md:px-5 md:py-4 lg:[@media(max-height:820px)]:py-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-alert" aria-hidden />
                  <span>
                    <span className="sr-only">Without TeamTuned: </span>
                    {before}
                  </span>
                </div>
                <div className="flex items-start gap-3 px-5 pb-5 pt-2 font-semibold text-ink md:bg-ink/[0.03] md:px-5 md:py-4 lg:[@media(max-height:820px)]:py-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-live" aria-hidden />
                  <span>
                    <span className="sr-only">With TeamTuned: </span>
                    {after}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

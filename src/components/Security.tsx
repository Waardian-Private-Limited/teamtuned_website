import { security } from '@/lib/content';
import { Icon } from './Icon';
import { Stagger, StaggerItem } from './motion';
import { Container, SectionHead } from './ui';

export function Security() {
  return (
    <section id="security" aria-labelledby="security-title" className="relative overflow-hidden bg-ink py-24 text-white sm:py-32 screen-fit">
      <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
      <Container className="relative">
        <SectionHead
          dark
          id="security-title"
          eyebrow="Security & privacy"
          title="Your people’s data, locked down."
          sub="Faces, bank details and locations are sensitive. TeamTuned treats them that way, by design."
        />
        <Stagger className="mt-14 lg:mt-10 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {security.map((s) => (
            <StaggerItem key={s.title} className="group bg-ink p-7 transition-colors duration-500 hover:bg-ink-2 sm:p-8 lg:p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white transition-transform duration-500 group-hover:scale-110">
                <Icon name={s.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-white/60">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

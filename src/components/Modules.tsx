import Link from 'next/link';
import { modules } from '@/lib/content';
import { Icon } from './Icon';
import { CountUp, Stagger, StaggerItem } from './motion';
import { SpotlightGrid } from './scroll';
import { Container, SectionHead } from './ui';

export function Modules() {
  return (
    <section id="modules" aria-labelledby="modules-title" className="screen-fit relative overflow-hidden bg-mist py-24 sm:py-32">
      <Container>
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <SectionHead
            align="split"
            id="modules-title"
            eyebrow="Everything in one place"
            title="Every HR job. One login."
            sub="Turn on the modules you need today and add the rest as you grow. They all share the same people, sites and policies."
          />

          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-line rounded-3xl border border-line bg-white lg:mx-0 lg:mt-0 lg:w-[380px] lg:shrink-0">
            {[
              { to: modules.length, suffix: '+', label: 'Modules' },
              { to: 6, suffix: '', label: 'Languages' },
              { to: 3, suffix: '', label: 'Platforms' },
            ].map((s) => (
              <div key={s.label} className="px-3 py-5 text-center">
                <CountUp to={s.to} suffix={s.suffix} className="block text-3xl font-extrabold tracking-tight text-ink sm:text-4xl" />
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <SpotlightGrid>
        <Stagger className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 lg:mt-12 lg:grid-cols-6" as="ul">
          {modules.map((m) => (
            <StaggerItem
              key={m.title}
              as="li"
              className="spot group relative overflow-hidden rounded-2xl border border-line bg-white p-4 transition-all duration-500 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(220px_circle_at_var(--mx)_var(--my),rgba(10,10,10,0.07),transparent_70%)] before:opacity-0 before:transition-opacity hover:-translate-y-1 hover:border-ink hover:shadow-[0_24px_50px_-28px_rgba(0,0,0,0.35)] hover:before:opacity-100"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist text-ink transition-colors duration-500 group-hover:bg-ink group-hover:text-white">
                <Icon name={m.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-[15px] font-bold leading-snug tracking-tight text-ink">
                {'href' in m ? (
                  // The whole card is the link target (stretched ::after), so it stays one tab stop.
                  <Link href={m.href} className="after:absolute after:inset-0">
                    {m.title}
                  </Link>
                ) : (
                  m.title
                )}
              </h3>
              <p className="mt-1 text-[13px] leading-snug text-muted lg:[@media(max-height:880px)]:hidden">{m.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
        </SpotlightGrid>
      </Container>
    </section>
  );
}

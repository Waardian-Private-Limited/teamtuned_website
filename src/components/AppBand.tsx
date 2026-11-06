import Image from 'next/image';
import { languages } from '@/lib/content';
import { Reveal, Stagger, StaggerItem } from './motion';
import { Tilt } from './scroll';
import { Container, SectionHead, StoreBadges } from './ui';

/** App download band: languages plus three phones fanned out. */
export function AppBand() {
  const phones = [
    { src: '/screens/phone-dashboard.webp', alt: 'Employee home screen with today’s shift and quick actions', cls: 'z-10 w-[42%] -rotate-0' },
    { src: '/screens/phone-team.webp', alt: 'Team today screen with live member status', cls: 'absolute left-0 top-[10%] w-[34%] -rotate-[8deg] opacity-95' },
    { src: '/screens/phone-payslip.webp', alt: 'Payslip screen with net pay and deductions', cls: 'absolute right-0 top-[10%] w-[34%] rotate-[8deg] opacity-95' },
  ];
  return (
    <section aria-labelledby="apps-title" className="relative overflow-hidden bg-white py-24 sm:py-32 screen-fit">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHead
              align="left"
              id="apps-title"
              eyebrow="Android · iOS · Web"
              title="An app your team will actually use."
              sub="Big buttons, clear screens and their own language. Works on budget Android phones as well as it does on an iPhone."
            />
            <Stagger className="mt-8 flex flex-wrap gap-2" as="ul">
              {languages.map((l) => (
                <StaggerItem key={l} as="li" className="rounded-full border border-line bg-mist px-4 py-2 text-base font-bold text-ink">
                  {l}
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <StoreBadges className="mt-9" />
            </Reveal>
          </div>

          <Reveal y={60}>
            <Tilt max={8}>
            <div className="relative mx-auto flex max-w-xl justify-center lg:max-w-[min(36rem,calc((100svh-160px)*0.9))]">
              <div className="absolute inset-x-0 bottom-0 top-[30%] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.1),transparent)]" aria-hidden />
              {phones.map((p) => (
                <div key={p.src} className={`${p.cls} transition-transform duration-700 hover:-translate-y-2`}>
                  <Image src={p.src} alt={p.alt} width={838} height={1756} sizes="(min-width: 1024px) 260px, 42vw" className="h-auto w-full drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)]" />
                </div>
              ))}
            </div>
            </Tilt>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

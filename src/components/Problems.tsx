import { Reveal, Stagger, StaggerItem, StrikeLine, WordsUp } from './motion';
import { Container } from './ui';

const chaos = [
  'Attendance on paper',
  'Selfies on WhatsApp',
  'Buddy punching',
  '“Where are you?” calls',
  'Leave balances in Excel',
  'Payroll week panic',
  'Lost expense bills',
  'Late daily reports',
];

/** Short manifesto: the chaos, struck through, then one line on what replaces it. */
export function Problems() {
  return (
    <section aria-labelledby="problems-title" className="relative bg-white py-24 sm:py-32 screen-fit">
      <Container>
        <div className="mx-auto max-w-4xl text-center">
          <h2 id="problems-title" className="text-balance text-[2rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl">
            <WordsUp text="No more chasing your team." />
          </h2>
          <Stagger className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5" as="ul">
            {chaos.map((c, i) => (
              <StaggerItem key={c} as="li" className="group relative rounded-full border border-line bg-mist px-4 py-2 text-sm font-semibold text-muted sm:text-base">
                <span className="relative">
                  {c}
                  <StrikeLine delay={0.5 + i * 0.08} />
                </span>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">
              Every check-in, request and payment goes through <b className="font-bold text-ink">one system</b>, so HR stops reconciling and
              managers stop calling. Your people get an app they actually like opening.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

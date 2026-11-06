import { Monitor, Smartphone, Users } from 'lucide-react';
import { Stagger, StaggerItem } from './motion';
import { Container, SectionHead } from './ui';

const layers = [
  {
    n: '01',
    icon: Smartphone,
    title: 'Employee app',
    body: 'Check in with a selfie, apply for leave, claim expenses, see payslips and complete tasks. Android and iOS, six languages.',
  },
  {
    n: '02',
    icon: Users,
    title: 'Manager view',
    body: 'Team today, live map, approvals inbox, rosters and reviews. Everything a team lead needs, on the phone they already carry.',
  },
  {
    n: '03',
    icon: Monitor,
    title: 'HR & admin web',
    body: 'Policies, payroll, compliance, reports and audit for every company and site. Exports land in one download centre.',
  },
];

export function Layers() {
  return (
    <section aria-labelledby="layers-title" className="bg-mist py-24 sm:py-32 screen-fit">
      <Container>
        <SectionHead
          id="layers-title"
          eyebrow="One platform"
          title="Three views. One source of truth."
          sub="The same data, shaped for the person using it. A check-in on site shows up on the manager’s phone and in HR’s payroll a second later."
        />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3 lg:mt-12">
          {layers.map((l) => (
            <StaggerItem
              key={l.n}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7 transition-shadow duration-500 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)] sm:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink text-white transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <l.icon className="h-6 w-6" aria-hidden />
                </span>
                <span className="text-5xl font-extrabold tracking-tighter text-line transition-colors duration-500 group-hover:text-ink/15">{l.n}</span>
              </div>
              <h3 className="mt-8 text-2xl font-bold tracking-tight text-ink">{l.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{l.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

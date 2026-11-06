import Link from 'next/link';
import { APP_URL, site } from '@/lib/site';
import { Container, Logo, StoreBadges } from './ui';

const cols = [
  {
    title: 'Product',
    links: [
      ['/#features', 'Features'],
      ['/#modules', 'All modules'],
      ['/pricing', 'Pricing'],
      ['/security', 'Security'],
      ['/#demo', 'Book a demo'],
    ],
  },
  {
    title: 'Platform',
    links: [
      ['/face-recognition-attendance', 'Face recognition attendance'],
      ['/geofence-attendance', 'Geofence attendance'],
      ['/field-force-tracking', 'Field force tracking'],
      ['/attendance-payroll', 'Attendance & payroll'],
      ['/leave-management', 'Leave management'],
      ['/shift-roster', 'Shift & roster'],
      ['/task-management', 'Task management'],
    ],
  },
  {
    title: 'Company',
    links: [
      ['/about', 'About'],
      ['/guides', 'Guides'],
      ['/contact', 'Contact'],
      ['/#faq', 'FAQ'],
      ['/privacy', 'Privacy policy'],
      ['/terms', 'Terms of service'],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <Container className="border-t border-white/10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm leading-relaxed text-white/55">
              Attendance, field tracking, leave, payroll and approvals for teams in the office, on site and on the road.
            </p>
            <StoreBadges dark className="mt-7" />
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">{c.title}</p>
                <ul className="mt-4 space-y-3">
                  {c.links.map(([href, label]) => (
                    <li key={label}>
                      <Link href={href} className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/40">Account</p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a href={`${APP_URL}/login`} className="text-[15px] font-medium text-white/70 transition-colors hover:text-white">
                    Log in
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Container>

      <Container className="flex flex-col items-center justify-between gap-2 border-t border-white/10 py-6 text-sm text-white/45 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.legalName}. All rights reserved.
        </p>
        <p>Built for teams that don’t sit at one desk.</p>
      </Container>

      {/* Oversized wordmark, cropped by the page edge. */}
      <div className="pointer-events-none select-none overflow-hidden" aria-hidden>
        <p className="-mb-[4vw] whitespace-nowrap text-center text-[18.5vw] font-extrabold leading-none tracking-[-0.06em] text-white/[0.04]">TeamTuned</p>
      </div>

    </footer>
  );
}

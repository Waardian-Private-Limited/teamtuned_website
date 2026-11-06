import { features } from './features';
import { guides } from './guides';
import { site } from './site';
import type { PageInfo } from './seo';

/** A standalone page: its metadata plus the short name and headline used by the hero and the social card. */
export type StaticPage = PageInfo & { crumb: string; h1: string };

// Title, description and content date of each standalone page. Routes read their metadata from here and the
// sitemap lists them, so update `updated` when a page's text really changes (not on every deploy).
export const staticPages = {
  pricing: {
    path: '/pricing',
    title: 'TeamTuned Pricing: Per Active Employee | HRMS Plans',
    description:
      'TeamTuned is priced by active employees and the modules you switch on. Inactive staff free their licence. Book a demo for a quote and a free trial.',
    updated: '2026-11-02',
    crumb: 'Pricing',
    h1: 'Pricing that follows your headcount.',
  },
  security: {
    path: '/security',
    title: 'Security & Privacy at TeamTuned | Encrypted HR Data',
    description:
      'How TeamTuned protects HR data: encrypted bank and ID details, logged access, private face data deleted on exit, role permissions and audit trails.',
    updated: '2026-11-02',
    crumb: 'Security',
    h1: 'Your people’s data, locked down.',
  },
  about: {
    path: '/about',
    title: 'About TeamTuned: The Proof-of-Work HRMS',
    description:
      'TeamTuned is the proof-of-work HRMS by Waardian Private Limited, built for teams in the office, on site and on the road. Here is what we build and why.',
    updated: '2026-11-02',
    crumb: 'About',
    h1: 'Built for teams that don’t sit at one desk.',
  },
  contact: {
    path: '/contact',
    title: 'Contact TeamTuned: Book a Demo or Email Us',
    description:
      'Book a TeamTuned demo, email business@teamtuned.com or log in to your account. Talk to us about attendance, field teams, leave and payroll.',
    updated: '2026-11-02',
    crumb: 'Contact',
    h1: 'Talk to the TeamTuned team.',
  },
  privacy: {
    path: '/privacy',
    title: 'Privacy Policy · TeamTuned',
    description:
      'How TeamTuned collects, uses and protects personal data, including the camera and location permissions the app uses for attendance.',
    updated: '2024-12-10',
    crumb: 'Privacy policy',
    h1: 'Privacy Policy',
  },
  guides: {
    path: '/guides',
    title: 'HR Software Guides: Leave, Payroll, Rosters | TeamTuned',
    description:
      'Practical guides for choosing HR software: leave management, attendance and payroll, shift rosters, per-employee pricing and moving off spreadsheets.',
    updated: '2026-11-02',
    crumb: 'Guides',
    h1: 'Guides for choosing HR software.',
  },
  terms: {
    path: '/terms',
    title: 'Terms of Service · TeamTuned',
    description: `The terms that govern use of the TeamTuned HRMS, its web app and its Android and iOS apps, provided by ${site.legalName}.`,
    updated: '2024-12-09',
    crumb: 'Terms of service',
    h1: 'Terms of Service',
  },
} satisfies Record<string, StaticPage>;

/** Every indexable page with the date its content last changed. The sitemap reads this. */
export const pages: Array<{ path: string; updated: string }> = [
  { path: '/', updated: '2026-11-02' },
  ...features.map((f) => ({ path: `/${f.slug}`, updated: f.updated })),
  ...Object.values(staticPages),
  ...guides.map((g) => ({ path: `/guides/${g.slug}`, updated: g.updated })),
];

/**
 * Text for each page's social card (app/og/[...path]), keyed by the page path without its leading slash.
 * The homepage keeps its own card (app/opengraph-image.tsx).
 */
export const ogCards: Record<string, { eyebrow: string; title: string }> = {
  ...Object.fromEntries(features.map((f) => [f.slug, { eyebrow: f.eyebrow, title: f.h1 }])),
  ...Object.fromEntries(Object.values(staticPages).map((p) => [p.path.slice(1), { eyebrow: p.crumb, title: p.h1 }])),
  ...Object.fromEntries(guides.map((g) => [`guides/${g.slug}`, { eyebrow: g.eyebrow, title: g.h1 }])),
};

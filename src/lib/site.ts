// One place for brand facts, links and SEO copy. Env values are public by design.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.teamtuned.com').replace(/\/$/, '');
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || 'https://app.teamtuned.com').replace(/\/$/, '');
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://api.teamtuned.com/v2/api/v1').replace(/\/$/, '');

export const site = {
  name: 'TeamTuned',
  legalName: 'Waardian Private Limited',
  // <title> for the homepage: 56 characters, so Google shows it whole. Feature pages carry the other searched terms.
  title: 'TeamTuned: HRMS with Face Attendance, Tracking & Payroll',
  shortTitle: 'They say they’re on site. TeamTuned proves it.',
  // 144 characters (Google cuts at about 155).
  description:
    'The proof-of-work HRMS: face check-in, geofenced attendance, live field tracking, photo-proof tasks, leave and payroll. On web, Android and iOS.',
  email: 'business@teamtuned.com',
  playStore: 'https://play.google.com/store/apps/details?id=com.waardian.teamtuned',
  appStore: 'https://apps.apple.com/us/app/teamtuned/id6756356409',
  keywords: [
    'HRMS software',
    'attendance app',
    'face recognition attendance',
    'geofence attendance',
    'field force tracking',
    'live employee tracking',
    'payroll software',
    'leave management',
    'shift roster software',
    'workforce management software',
    'employee time tracking',
    'labour management',
    'expense reimbursement app',
    'TeamTuned',
  ],
};

export const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/#modules', label: 'Modules' },
  { href: '/#playground', label: 'Try it' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/security', label: 'Security' },
  { href: '/#faq', label: 'FAQ' },
];

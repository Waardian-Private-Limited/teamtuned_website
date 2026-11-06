import type { Metadata } from 'next';
import { FaqList, PageShell, ProseSections, HeroFacts } from '@/components/PageShell';
import { Container } from '@/components/ui';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';
import { site } from '@/lib/site';

// Every statement here describes how the product works today. No certifications, hosting regions or uptime
// figures until they are real and documented.
const page = staticPages.security;
export const metadata: Metadata = pageMeta(page);

const sections = [
  {
    h2: 'Attendance that is hard to fake',
    body:
      'Every check-in matches the employee’s face with a liveness check that rejects photos, screens and replays. The punch must come from the employee’s registered phone, and the location rule is checked again on our server, not only in the app.',
  },
  {
    h2: 'Sensitive numbers are encrypted',
    body:
      'Bank account and identity numbers are encrypted in the database with AES-256-GCM and shown masked everywhere. Only people with the right permission can reveal a full number, and every reveal is logged with who did it and when.',
  },
  {
    h2: 'Documents in a private vault',
    body:
      'Identity and other documents uploaded during onboarding are kept in private storage, never on a public link. Each time someone opens one, TeamTuned creates a link that expires after a few minutes.',
  },
  {
    h2: 'Face data used for one thing',
    body:
      'Each employee registers their face once, from three angles. Face data is kept in private storage and used only to verify attendance. When an employee is marked as exited or deleted, their face registration is removed.',
  },
  {
    h2: 'Location only when it should be',
    body:
      'For most employees, location is checked only at the moment they check in or out. Live tracking runs only for employees you assign to a tracking policy, and only under the rules in that policy. Employees without a policy are never tracked.',
  },
  {
    h2: 'Access by role',
    body: 'Permissions are set per action and grouped into roles, so people see and change only what their job needs:',
    points: [
      'Roles can be limited to a company, a site or a team.',
      'Employees see their own records, payslips and requests.',
      'Approvers see the requests routed to them by your approval flows.',
      'Employees can be limited to signing in on one registered phone.',
    ],
  },
  {
    h2: 'A record of every decision',
    body:
      'Every approval records who decided and when. Finalising or reopening a pay run goes through approval, salary revisions are kept as a history, and edits to meeting minutes are versioned, so changes can be traced.',
  },
  {
    h2: 'Consent and only the data you need',
    body:
      'Employees accept a versioned privacy notice in the app, and each acceptance is recorded. The standard onboarding form does not ask for religion, caste or health details.',
  },
  {
    h2: 'Encrypted in transit',
    body: 'The website, the web app and the mobile apps talk to TeamTuned over HTTPS, so data is encrypted on its way between the device and our servers.',
  },
];

const faqs = [
  {
    q: 'Is employee face data used for anything other than attendance?',
    a: 'No. Face data is used only to verify attendance, and it is removed when the employee is marked as exited or deleted.',
  },
  {
    q: 'Can employees be tracked all the time?',
    a: 'No. Live tracking runs only for employees in a tracking policy, under the rules you set in that policy. Everyone else shares their location only when they check in or out.',
  },
  {
    q: 'Who can see an employee’s bank details?',
    a: 'Everyone sees them masked. Only people with the permission to view them can reveal the full numbers, and each reveal is logged.',
  },
  {
    q: 'How do we report a security concern?',
    a: `Email ${site.email}. Please include the steps to reproduce what you found, and we will get back to you.`,
  },
];

export default function SecurityPage() {
  return (
    <PageShell
      page={page}
      crumb={page.crumb}
      h1={page.h1}
      lede="TeamTuned holds faces, locations, bank details and payslips, so security is part of how every feature works. Sensitive numbers are encrypted and masked, documents and face data sit in private storage, tracking runs only under policies you set, and every decision is on record."
      demoSource="security_hero"
      aside={<HeroFacts title="Built in" items={['Bank and ID numbers encrypted with AES-256-GCM', 'Every reveal of a full number is logged', 'Face data private and deleted on exit', 'Tracking only under policies you set', 'Every approval on record']} />}
      secondary={{ href: '/privacy', label: 'Privacy policy' }}
    >
      <ProseSections sections={sections} />
      <section className="bg-mist py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FaqList faqs={faqs} title="Security questions" />
          </div>
        </Container>
      </section>
    </PageShell>
  );
}

import { faqs } from '@/lib/content';
import { pages } from '@/lib/pages';
import { SITE_URL, site } from '@/lib/site';

export function LdScript({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

/**
 * The company, the website and the product, printed on every page (root layout), so each page's own
 * WebPage node can point at them by @id and the references resolve on that page.
 */
export function SiteJsonLd() {
  return (
    <LdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#org`,
            name: site.name,
            legalName: site.legalName,
            url: SITE_URL,
            logo: `${SITE_URL}/android-chrome-512x512.png`,
            email: site.email,
            contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: site.email, url: `${SITE_URL}/contact`, availableLanguage: ['en'] },
            // TODO(business): add address (PostalAddress), foundingDate, founder, a sales phone and LinkedIn/G2/Capterra to sameAs once confirmed.
            sameAs: [site.playStore, site.appStore],
          },
          { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: site.name, publisher: { '@id': `${SITE_URL}/#org` }, inLanguage: 'en' },
          {
            '@type': 'SoftwareApplication',
            '@id': `${SITE_URL}/#software`,
            name: site.name,
            applicationCategory: 'BusinessApplication',
            applicationSubCategory: 'Human resources management',
            operatingSystem: 'Android, iOS, Web',
            description: site.description,
            url: SITE_URL,
            image: `${SITE_URL}/screens/og-phone.png`,
            screenshot: [`${SITE_URL}/screens/phone-checkin.webp`, `${SITE_URL}/screens/tablet-dashboard.webp`],
            author: { '@id': `${SITE_URL}/#org` },
            publisher: { '@id': `${SITE_URL}/#org` },
            installUrl: [site.playStore, site.appStore],
            downloadUrl: [site.playStore, site.appStore],
            featureList: [
              'Face recognition attendance with liveness check',
              'Geofence attendance',
              'Live field force tracking',
              'Shift rosters',
              'Leave management',
              'Payroll with deduction and tax rules',
              'Task management with photo proof',
              'Approvals',
              'Expense claims',
              'Recruitment',
              'Onboarding',
              'Performance management',
            ],
            inLanguage: ['en', 'hi', 'mr', 'gu', 'kn', 'te'],
            // offers / aggregateRating: add only with a published price or real reviews.
          },
        ],
      }}
    />
  );
}

/** Homepage only: the page itself and its FAQ. */
export function JsonLd() {
  const updated = pages.find((p) => p.path === '/')?.updated;
  return (
    <LdScript
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: SITE_URL,
            name: site.title,
            description: site.description,
            inLanguage: 'en',
            dateModified: updated,
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#software` },
            primaryImageOfPage: `${SITE_URL}/screens/phone-checkin.webp`,
          },
          {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
          },
        ],
      }}
    />
  );
}

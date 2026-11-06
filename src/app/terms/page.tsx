import type { Metadata } from 'next';
import { LegalPage } from '@/components/LegalPage';
import { staticPages } from '@/lib/pages';
import { pageMeta } from '@/lib/seo';

// Text carried over unchanged from the previous website. Have legal review it before relying on it.
export const metadata: Metadata = pageMeta(staticPages.terms);

export default function TermsPage() {
  return (
    <LegalPage page={staticPages.terms} updated="December 9, 2024">
                        <section>
                  <h2>1. Acceptance of Terms</h2>
                  <p>
                      By accessing and using TeamTuned ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use the Service.
                  </p>
              </section>

              <section>
                  <h2>2. Use License</h2>
                  <p>
                      Permission is granted to temporarily access and use TeamTuned for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul>
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose without authorization</li>
                      <li>Attempt to decompile or reverse engineer any software contained in TeamTuned</li>
                      <li>Remove any copyright or other proprietary notations from the materials</li>
                      <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                  </ul>
              </section>

              <section>
                  <h2>3. User Accounts</h2>
                  <p>
                      When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                  </p>
                  <p>
                      You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                  </p>
              </section>

              <section>
                  <h2>4. Service Availability</h2>
                  <p>
                      We strive to provide uninterrupted access to TeamTuned. However, we do not guarantee that the Service will be available at all times or that it will be error-free. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                  </p>
              </section>

              <section>
                  <h2>5. Payment Terms</h2>
                  <p>
                      Certain features of the Service may require payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Service. You agree to promptly update your account and payment information as necessary.
                  </p>
                  <p>
                      Subscription fees are billed in advance on a recurring basis (monthly or annually). Refunds are provided at our discretion and in accordance with our refund policy.
                  </p>
              </section>

              <section>
                  <h2>6. Intellectual Property</h2>
                  <p>
                      The Service and its original content, features, and functionality are and will remain the exclusive property of Waardian Private Limited and its licensors. The Service is protected by copyright, trademark, and other laws.
                  </p>
              </section>

              <section>
                  <h2>7. Limitation of Liability</h2>
                  <p>
                      In no event shall TeamTuned or Waardian Private Limited be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                  </p>
              </section>

              <section>
                  <h2>8. Termination</h2>
                  <p>
                      We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                  </p>
              </section>

              <section>
                  <h2>9. Governing Law</h2>
                  <p>
                      These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                  </p>
              </section>

              <section>
                  <h2>10. Changes to Terms</h2>
                  <p>
                      We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                  </p>
              </section>

              <section>
                  <h2>11. Contact Us</h2>
                  <p>
                      If you have any questions about these Terms, please contact us at:
                  </p>
                  <p>
                      Email: <a href="mailto:business@teamtuned.com">business@teamtuned.com</a>
                  </p>
              </section>
    </LegalPage>
  );
}

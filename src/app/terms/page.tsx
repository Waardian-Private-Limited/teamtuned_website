import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
            <Navbar />

            <main className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Terms & Conditions
                        </h1>
                        <p className="text-gray-600">Last updated: December 9, 2024</p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 prose prose-blue max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                By accessing and using TeamTuned ("the Service"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Permission is granted to temporarily access and use TeamTuned for personal or commercial purposes. This is the grant of a license, not a transfer of title, and under this license you may not:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>Modify or copy the materials</li>
                                <li>Use the materials for any commercial purpose without authorization</li>
                                <li>Attempt to decompile or reverse engineer any software contained in TeamTuned</li>
                                <li>Remove any copyright or other proprietary notations from the materials</li>
                                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Service Availability</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We strive to provide uninterrupted access to TeamTuned. However, we do not guarantee that the Service will be available at all times or that it will be error-free. We reserve the right to modify, suspend, or discontinue the Service at any time without notice.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Payment Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Certain features of the Service may require payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Service. You agree to promptly update your account and payment information as necessary.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Subscription fees are billed in advance on a recurring basis (monthly or annually). Refunds are provided at our discretion and in accordance with our refund policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                The Service and its original content, features, and functionality are and will remain the exclusive property of Waardian Private Limited and its licensors. The Service is protected by copyright, trademark, and other laws.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                In no event shall TeamTuned or Waardian Private Limited be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Termination</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p className="text-gray-700">
                                Email: <a href="mailto:business@teamtuned.com" className="text-blue-600 hover:underline">business@teamtuned.com</a>
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
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
                            Privacy Policy
                        </h1>
                        <p className="text-gray-600">Last updated: December 10, 2024</p>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 prose prose-blue max-w-none">
                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Waardian Private Limited ("we", "our", or "us") operates TeamTuned. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Data</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>Email address</li>
                                <li>First name and last name</li>
                                <li>Phone number</li>
                                <li>Company name and details</li>
                                <li>Employee information (for workforce management)</li>
                                <li>Location data (for attendance tracking)</li>
                                <li>Biometric data (if face recognition is enabled)</li>
                            </ul>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3">Usage Data</h3>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may also collect information on how the Service is accessed and used. This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. App Permissions</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our mobile application requires certain permissions to provide essential workforce management features. We are committed to transparency about why we need these permissions and how we use them.
                            </p>

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 border border-blue-100">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📷</span>
                                    Camera Access (android.permission.CAMERA)
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    <strong>Purpose:</strong> Face Recognition for Attendance Verification
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We use camera access to enable biometric face recognition for attendance marking. This feature helps prevent buddy punching and ensures accurate attendance records by verifying employee identity at check-in and check-out.
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-3">
                                    <li><strong>When it's used:</strong> Only when you mark attendance using face recognition</li>
                                    <li><strong>Data processing:</strong> Face data is processed securely and encrypted</li>
                                    <li><strong>Storage:</strong> Biometric templates are stored with enterprise-grade encryption</li>
                                    <li><strong>Control:</strong> This feature is optional and can be disabled by your organization</li>
                                    <li><strong>No sharing:</strong> Face recognition data is never shared with third parties</li>
                                </ul>
                                <p className="text-sm text-gray-600 italic">
                                    Note: Face recognition is used solely for attendance verification and is not used for surveillance or monitoring purposes.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 mb-6 border border-green-100">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">📍</span>
                                    Location Access (android.permission.ACCESS_FINE_LOCATION, android.permission.ACCESS_COARSE_LOCATION)
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    <strong>Purpose:</strong> Site Verification and Geofencing for Attendance
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    We use location services to verify that employees are at designated work sites when marking attendance. This ensures attendance accuracy and helps maintain workplace safety protocols.
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-3">
                                    <li><strong>When it's used:</strong> During attendance check-in/check-out and site-based operations</li>
                                    <li><strong>Geofencing:</strong> Verifies you are within authorized work site boundaries</li>
                                    <li><strong>Safety:</strong> Helps ensure employee safety by tracking site presence</li>
                                    <li><strong>Accuracy:</strong> Uses GPS for precise location verification</li>
                                    <li><strong>Privacy:</strong> Location is only tracked during work hours and attendance events</li>
                                    <li><strong>Transparency:</strong> You'll always know when location is being accessed</li>
                                </ul>
                                <p className="text-sm text-gray-600 italic">
                                    Note: Location tracking is limited to attendance verification and site management. We do not track your location outside of work-related activities.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-100">
                                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <span className="text-2xl">🔒</span>
                                    Your Permission Controls
                                </h3>
                                <p className="text-gray-700 leading-relaxed mb-3">
                                    You have full control over these permissions:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>You can grant or deny permissions when prompted by the app</li>
                                    <li>You can revoke permissions at any time through your device settings</li>
                                    <li>The app will request permissions only when needed for specific features</li>
                                    <li>Alternative attendance methods may be available if you decline certain permissions</li>
                                </ul>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. How We Use Your Information</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                TeamTuned uses the collected data for various purposes:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>To provide and maintain our Service</li>
                                <li>To notify you about changes to our Service</li>
                                <li>To allow you to participate in interactive features when you choose to do so</li>
                                <li>To provide customer support</li>
                                <li>To gather analysis or valuable information so that we can improve our Service</li>
                                <li>To monitor the usage of our Service</li>
                                <li>To detect, prevent and address technical issues</li>
                                <li>To process attendance, payroll, and other workforce management functions</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                The security of your data is important to us. We use industry-standard security measures including:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>256-bit SSL encryption for data transmission</li>
                                <li>Encrypted data storage</li>
                                <li>Regular security audits and updates</li>
                                <li>Role-based access controls</li>
                                <li>Secure authentication mechanisms</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Sharing and Disclosure</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li>With your consent or at your direction</li>
                                <li>With service providers who assist us in operating our Service</li>
                                <li>To comply with legal obligations</li>
                                <li>To protect and defend our rights or property</li>
                                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Data Rights</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You have certain rights regarding your personal data:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                <li><strong>Access:</strong> You can request access to your personal data</li>
                                <li><strong>Correction:</strong> You can request correction of inaccurate data</li>
                                <li><strong>Deletion:</strong> You can request deletion of your personal data</li>
                                <li><strong>Portability:</strong> You can request a copy of your data in a portable format</li>
                                <li><strong>Objection:</strong> You can object to processing of your personal data</li>
                            </ul>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                To exercise these rights, please contact us at business@teamtuned.com
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cookies and Tracking</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                Our Service is not intended for use by children under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If you become aware that a child has provided us with personal data, please contact us.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have any questions about this Privacy Policy, please contact us:
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

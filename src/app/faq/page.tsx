"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, ChevronDown } from "lucide-react";

const faqs = [
    {
        category: "General",
        questions: [
            {
                q: "What is TeamTuned?",
                a: "TeamTuned is a comprehensive workforce management platform that helps businesses streamline attendance tracking, payroll processing, task management, inventory control, and more—all in one unified solution."
            },
            {
                q: "Who can use TeamTuned?",
                a: "TeamTuned is designed for businesses of all sizes, from small teams to large enterprises. It's particularly useful for organizations with field staff, multiple locations, or complex workforce management needs."
            },
            {
                q: "Is TeamTuned available on mobile?",
                a: "Yes! TeamTuned offers native mobile apps for both iOS and Android, allowing employees to clock in/out, submit requests, and stay connected on the go."
            }
        ]
    },
    {
        category: "Features",
        questions: [
            {
                q: "What attendance tracking methods does TeamTuned support?",
                a: "TeamTuned supports multiple attendance tracking methods including GPS-based check-in, QR code scanning, face recognition, and manual entry. You can choose the method that best fits your business needs."
            },
            {
                q: "Can I manage multiple sites or locations?",
                a: "Absolutely! TeamTuned is built for multi-location businesses. You can manage unlimited sites, set geofences, assign employees to specific locations, and track attendance across all your sites from a single dashboard."
            },
            {
                q: "Does TeamTuned integrate with payroll systems?",
                a: "Yes, TeamTuned has built-in payroll processing capabilities and can also integrate with popular third-party payroll systems. Export attendance data, leave records, and salary information seamlessly."
            },
            {
                q: "What kind of reports can I generate?",
                a: "TeamTuned offers comprehensive reporting including attendance summaries, leave reports, overtime analysis, site performance metrics, expense reports, and custom reports tailored to your needs."
            }
        ]
    },
    {
        category: "Pricing",
        questions: [
            {
                q: "How much does TeamTuned cost?",
                a: "TeamTuned offers flexible pricing plans based on your organization size and requirements. Contact our sales team for a customized quote that fits your budget."
            },
            {
                q: "Is there a free trial?",
                a: "Yes! We offer a 14-day free trial with full access to all features. No credit card required to get started."
            },
            {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription at any time. We offer monthly and annual billing options with no long-term commitments required."
            }
        ]
    },
    {
        category: "Security",
        questions: [
            {
                q: "Is my data secure?",
                a: "Absolutely. TeamTuned uses bank-level encryption (256-bit SSL) to protect your data. We follow industry best practices for data security and are compliant with major data protection regulations."
            },
            {
                q: "Where is my data stored?",
                a: "Your data is stored on secure cloud servers with automatic backups. We use enterprise-grade infrastructure with 99.9% uptime guarantee."
            },
            {
                q: "Who has access to my company data?",
                a: "Only authorized users within your organization have access to your data. TeamTuned has role-based access controls, allowing you to define permissions for different user types."
            }
        ]
    },
    {
        category: "Support",
        questions: [
            {
                q: "What kind of support do you offer?",
                a: "We offer email support, live chat, and phone support during business hours. Premium plans include dedicated account managers and priority support."
            },
            {
                q: "Do you provide training?",
                a: "Yes! We provide comprehensive onboarding, video tutorials, documentation, and live training sessions to help your team get up to speed quickly."
            },
            {
                q: "How do I get started?",
                a: "Simply book a demo or sign up for a free trial. Our team will guide you through the setup process and help you configure TeamTuned for your specific needs."
            }
        ]
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>(null);

    const toggleFAQ = (index: string) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Questions</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about TeamTuned. Can't find what you're looking for? Contact our support team.
                        </p>
                    </div>

                    {/* FAQ Categories */}
                    <div className="space-y-8">
                        {faqs.map((category, catIndex) => (
                            <div key={catIndex}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h2>
                                <div className="space-y-3">
                                    {category.questions.map((faq, qIndex) => {
                                        const faqId = `${catIndex}-${qIndex}`;
                                        const isOpen = openIndex === faqId;

                                        return (
                                            <div
                                                key={qIndex}
                                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
                                            >
                                                <button
                                                    onClick={() => toggleFAQ(faqId)}
                                                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                                                    <ChevronDown
                                                        className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                            }`}
                                                    />
                                                </button>
                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"
                                                        }`}
                                                >
                                                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                                                        {faq.a}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 sm:p-12 text-white">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-4">Still have questions?</h3>
                        <p className="text-lg mb-6 text-white/90">
                            Our team is here to help. Get in touch with us today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/contact"
                                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/demo"
                                className="px-8 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all"
                            >
                                Book a Demo
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}

"use client";

import Link from "next/link";
import { Youtube, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 text-gray-600 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-7">
                        <div className="flex flex-col sm:flex-row items-start gap-6">
                            <img
                                src="/LogoBlackText.png"
                                alt="TeamTuned"
                                className="h-20 sm:h-24 w-auto flex-shrink-0"
                            />

                            <div className="space-y-5 flex-1">
                                <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                                    TeamTuned simplifies workforce operations—attendance, payroll,
                                    payments, and staff management in one unified platform.
                                </p>

                                <div className="space-y-3 text-sm sm:text-base">
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                            <Mail className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <a
                                            href="mailto:business@waardian.com"
                                            className="text-gray-700 hover:text-gray-900 transition-colors"
                                        >
                                            business@waardian.com
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 group">
                                        <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                            <MapPin className="w-4 h-4 text-gray-600" />
                                        </div>
                                        <span className="text-gray-700">Pune, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:col-span-5">
                        <div className="lg:ml-auto lg:max-w-xs">
                            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">
                                Quick Links
                            </h4>
                            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4">
                                <li>
                                    <Link
                                        href="/privacy"
                                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 group-hover:bg-gray-900 transition-colors"></span>
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/terms"
                                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 group-hover:bg-gray-900 transition-colors"></span>
                                        Terms and Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 group-hover:bg-gray-900 transition-colors"></span>
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/faq"
                                        className="text-sm sm:text-base text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-3 group-hover:bg-gray-900 transition-colors"></span>
                                        FAQs
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 sm:gap-4 pt-8 sm:pt-10 border-t border-gray-200">

                    {/* Copyright */}
                    <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                        <p className="font-medium">© {year} TeamTuned. All rights reserved.</p>
                        <p className="mt-1.5">
                            Powered by{" "}
                            <a
                                href="https://waardian.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium underline decoration-gray-400 hover:decoration-blue-600"
                            >
                                Waardian
                            </a>
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-3 sm:gap-4">
                        {[
                            { Icon: Youtube, href: "https://www.youtube.com/@teamtunedhq", color: "youtube", label: "YouTube" },
                            { Icon: Instagram, href: "https://www.instagram.com/teamtuned?igsh=MW1nYnY0eGd2eDVsMw==", color: "instagram", label: "Instagram" }
                        ].map((social, i) => (
                            <a
                                key={i}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className={`w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-all duration-300 shadow-md hover:shadow-xl ${social.color === 'youtube'
                                    ? 'bg-red-600 hover:bg-red-700 hover:scale-110 hover:-translate-y-1'
                                    : 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:scale-110 hover:-translate-y-1'
                                    }`}
                            >
                                <social.Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Marquee Section */}
            <div className="relative overflow-hidden border-t border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50">
                <div className="relative py-6 sm:py-8 lg:py-10 overflow-hidden">
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...Array(20)].map((_, i) => (
                            <span
                                key={i}
                                className="mx-6 sm:mx-8 md:mx-12 lg:mx-16 text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-clip-text text-transparent"
                            >
                                TeamTuned .
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

"use client";

import Link from "next/link";
import { Youtube, Instagram, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Footer() {
    const year = new Date().getFullYear();
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (pathRef.current) {
                const scrollY = window.scrollY;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = Math.min(scrollY / maxScroll, 1);

                // Create wave effect based on scroll
                const bendAmount = 100 - (scrollProgress * 40); // Bends from 100 to 60
                const newPath = `M 50 100 Q 350 ${bendAmount} 700 100 T 1350 100`;

                pathRef.current.setAttribute('d', newPath);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const quickLinks = [
        { href: "/privacy", label: "Privacy" },
        { href: "/terms", label: "Terms" },
        { href: "/contact", label: "Contact" },
        { href: "/faq", label: "FAQs" }
    ];

    const socialLinks = [
        {
            Icon: Youtube,
            href: "https://www.youtube.com/@teamtunedhq",
            label: "YouTube",
            gradient: "from-red-500 to-red-600"
        },
        {
            Icon: Instagram,
            href: "https://www.instagram.com/teamtuned?igsh=MW1nYnY0eGd2eDVsMw==",
            label: "Instagram",
            gradient: "from-purple-500 via-pink-500 to-orange-500"
        }
    ];

    return (
        <footer className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/60">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* Top Section - Brand & Links */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-7">
                        <div className="space-y-5">
                            {/* Logo */}
                            <img
                                src="/LogoBlackText.png"
                                alt="TeamTuned"
                                className="h-14 w-auto"
                            />

                            {/* Tagline */}
                            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
                                Simplifying workforce operations—attendance, payroll, payments,
                                and staff management in one unified platform.
                            </p>

                            {/* Contact Info */}
                            <div className="flex flex-col sm:flex-row gap-4 text-sm">
                                <a
                                    href="mailto:business@teamtuned.com"
                                    className="group flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-slate-200 transition-all group-hover:scale-105">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">business@teamtuned.com</span>
                                </a>

                                <div className="flex items-center gap-2 text-slate-600">
                                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <span className="font-medium">Pune, India</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:col-span-5">
                        <div className="lg:ml-auto lg:max-w-xs">
                            <h4 className="text-sm font-semibold text-slate-900 mb-4 tracking-wide uppercase">
                                Quick Links
                            </h4>
                            <ul className="grid grid-cols-2 gap-3">
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors"
                                        >
                                            <span className="relative">
                                                {link.label}
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                                            </span>
                                            <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Copyright & Social */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-200/60">

                    {/* Copyright */}
                    <div className="text-xs text-slate-500 text-center sm:text-left">
                        <p>
                            © {year} TeamTuned. All rights reserved. Powered by{" "}
                            <a
                                href="https://waardian.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                Waardian
                            </a>
                        </p>
                    </div>

                    {/* Social Media */}
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 hover:bg-white border-2 border-slate-900 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group"
                            >
                                <social.Icon className="w-5 h-5 text-white group-hover:text-slate-900 transition-colors duration-300" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Large Static Text with Bend Effect - Osmo Style */}

        </footer>
    );
}

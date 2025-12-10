import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Company Info */}
                    <div className="space-y-4">
                        <img
                            src="/TeamTunedWhite.png"
                            alt="TeamTuned"
                            className="h-12 w-auto object-contain"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Complete workforce management solution for modern businesses. Streamline attendance, payroll, tasks, and more.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                                className="hover:text-blue-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="/demo" className="text-gray-300 hover:text-white transition-colors">
                                    Book Demo
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                                    Terms & Conditions
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2">
                                <Mail className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" />
                                <a href="mailto:business@waardian.com" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    business@waardian.com
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <Phone className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" />
                                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors text-sm">
                                    +91 123 456 7890
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-blue-400" />
                                <span className="text-gray-300 text-sm">
                                    India
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>
                            © {currentYear} TeamTuned. All rights reserved.
                        </p>
                        <p className="flex items-center gap-2">
                            A <span className="font-semibold text-white">Waardian</span> Product
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

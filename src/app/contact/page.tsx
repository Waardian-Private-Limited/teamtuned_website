"use client";

import { useState } from "react";
import Navbar from "@/components/Header";
import Footer from "@/components/Footer";
import { Loader2, Twitter, Linkedin, Github, Globe } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    organization: formData.organization,
                    phone: formData.phone,
                    subject: "Contact Form Submission",
                    message: formData.message,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({
                    name: "",
                    email: "",
                    organization: "",
                    phone: "",
                    message: "",
                });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.message || "Something went wrong. Please try again.");
            }
        } catch {
            setError("Failed to submit. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-200">
            <Navbar />

            <main className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
                <div className="max-w-xl mx-auto w-full space-y-10">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-serif">Contact Us</h1>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            Please feel free to contact us and we will get back to you as soon as we can.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            <div className="group">
                                <label htmlFor="name" className="block text-xs font-medium text-gray-500 mb-1 transition-colors group-focus-within:text-black">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-gray-300 py-1.5 text-gray-900 focus:border-black focus:outline-none transition-colors rounded-none text-sm"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="email" className="block text-xs font-medium text-gray-500 mb-1 transition-colors group-focus-within:text-black">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-transparent border-b border-gray-300 py-1.5 text-gray-900 focus:border-black focus:outline-none transition-colors rounded-none text-sm"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="organization" className="block text-xs font-medium text-gray-500 mb-1 transition-colors group-focus-within:text-black">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-gray-300 py-1.5 text-gray-900 focus:border-black focus:outline-none transition-colors rounded-none text-sm"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="phone" className="block text-xs font-medium text-gray-500 mb-1 transition-colors group-focus-within:text-black">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent border-b border-gray-300 py-1.5 text-gray-900 focus:border-black focus:outline-none transition-colors rounded-none text-sm"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="message" className="block text-xs font-medium text-gray-500 mb-1 transition-colors group-focus-within:text-black">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={3}
                                    className="w-full bg-transparent border-b border-gray-300 py-1.5 text-gray-900 focus:border-black focus:outline-none transition-colors resize-none rounded-none text-sm"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-600 text-xs text-center">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="text-green-600 text-xs text-center">
                                Message sent successfully!
                            </div>
                        )}

                        <div className="space-y-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 text-white py-3 px-6 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-wider font-medium"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <Loader2 className="w-3 h-3 animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    "Send"
                                )}
                            </button>

                            <p className="text-center">
                                <a href="mailto:business@waardian.com" className="text-gray-500 hover:text-black transition-colors text-sm">
                                    business@waardian.com
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}

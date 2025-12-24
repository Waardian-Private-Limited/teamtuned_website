"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    /* ---------------------------- ROTATING HEADER LOGIC ---------------------------- */

    const phrases = ["Team", "Tuned", "TeamTuned"];
    const [index, setIndex] = useState(0);
    const [letters, setLetters] = useState<string[]>(phrases[0].split(""));

    const controls = useAnimation();

    // Parent variant for staggering
    const parentVariant: Variants = {
        hidden: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 },
        },
        visible: {
            transition: { staggerChildren: 0.05, staggerDirection: 1 },
        },
    };

    // Letter animation (smooth wipe)
    const letterVariant: Variants = {
        initial: {
            opacity: 0,
            clipPath: "inset(0 100% 0 0)", // hidden from right side
            y: 8,
        },
        show: (i: number) => ({
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            transition: {
                duration: 0.35,
                ease: [0.3, 0.65, 0.3, 1],
            },
        }),
        hide: (i: number) => ({
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
            y: 8,
            transition: {
                duration: 0.28,
                ease: [0.3, 0.6, 0.3, 1],
            },
        }),
    };

    useEffect(() => {
        let active = true;

        async function cycle() {
            await controls.start("visible");              // reveal text
            await new Promise((r) => setTimeout(r, 900)); // pause
            await controls.start("hidden");               // hide text
            await new Promise((r) => setTimeout(r, 200));

            // update phrase
            if (!active) return;
            const next = (index + 1) % phrases.length;
            setIndex(next);
            setLetters(phrases[next].split(""));

            // wait for DOM update
            await new Promise((r) => setTimeout(r, 80));

            controls.start("visible");
        }

        cycle();

        return () => {
            active = false;
        };
    }, [index]);

    /* ---------------------------- FOOTER UI ---------------------------- */

    return (
        <footer className="w-full bg-white text-black pt-20 pb-14">

            {/* LEFT-ALIGNED BIG HEADING */}
            <div className="max-w-7xl mx-auto px-6 mb-14">
                <div className="flex flex-col">
                    <motion.h1
                        className="text-[60px] sm:text-[90px] md:text-[120px] font-extrabold leading-none text-left flex"
                    >
                        <motion.span
                            initial="hidden"
                            animate={controls}
                            variants={parentVariant}
                            className="flex"
                        >
                            {letters.map((ch, i) => (
                                <motion.span
                                    key={i}
                                    custom={i}
                                    variants={letterVariant}
                                    initial="initial"
                                    animate="show"
                                    exit="hide"
                                    className="inline-block"
                                >
                                    {ch}
                                </motion.span>
                            ))}
                        </motion.span>

                        {/* Cursor */}
                        <span className="ml-1 w-1 bg-black rounded-sm animate-[blink_1s_steps(2,end)_infinite]" />
                    </motion.h1>
                </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="max-w-7xl mx-auto px-6 mb-12">
                <div className="flex gap-4">
                    {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                        <div
                            key={i}
                            className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
                        >
                            <Icon className="w-5 h-5" />
                        </div>
                    ))}
                </div>
            </div>

            {/* LINK GRID */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-12 mb-14 text-sm">
                <div>
                    <h3 className="font-semibold mb-3">Product</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>Security</li>
                        <li>Support</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Company</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>Introducing TeamTuned</li>
                        <li>About</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Resources</h3>
                    <ul className="space-y-2 text-gray-600">
                        <li>News</li>
                        <li>Docs</li>
                        <li>Media Kit</li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-semibold mb-3">Language</h3>
                    <div className="text-gray-600">English ▼</div>
                </div>
            </div>

            {/* DOWNLOAD BUTTON */}
            <div className="flex justify-center mb-12">
                <button className="px-10 py-4 rounded-full bg-[#00C853] hover:bg-[#00b94d] transition shadow-[0_0_0_2px_black] flex items-center gap-3 text-lg font-medium">
                    <div className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-yellow-300"></span>
                        <span className="w-3 h-3 rounded-full bg-blue-300"></span>
                        <span className="w-3 h-3 rounded-full bg-purple-300"></span>
                    </div>
                    Download TeamTuned
                </button>
            </div>

            {/* TERMS ROW */}
            <div className="flex justify-center gap-6 text-xs text-gray-500">
                <div>Terms of use</div>
                <div>Privacy policy</div>
                <div>Cookie Preferences</div>
            </div>

            {/* COPYRIGHT */}
            <p className="text-center text-xs text-gray-400 mt-6">
                © {currentYear} TeamTuned — A Waardian Product
            </p>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1 }
          50% { opacity: 0 }
        }
      `}</style>
        </footer>
    );
}

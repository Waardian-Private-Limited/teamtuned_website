"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Download } from "lucide-react";
import {
    detectDevice,
    handleAppStoreDownload,
    handlePlayStoreDownload,
    getSmartRedirectUrl,
} from "@/utils/device-utils";

export default function DownloadsSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const smartUrl = getSmartRedirectUrl();

    const [mounted, setMounted] = useState(false);
    const [deviceType, setDeviceType] =
        useState<"ios" | "android" | "web">("web");

    useEffect(() => {
        setMounted(true);
        setDeviceType(detectDevice());
    }, []);

    const { scrollYProgress } = useScroll({
        target: mounted ? sectionRef : undefined,
        offset: ["start start", "end start"],
    });

    if (!mounted) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    const buttonVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
            },
        },
    };

    const qrVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section
            ref={sectionRef}
            className="relative bg-black text-white py-20"
            style={{ fontFamily: "'Poppins', sans-serif" }}
        >
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    className="flex flex-col items-center justify-center space-y-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >

                    {/* TEXT CONTENT */}
                    <div className="space-y-8 text-center">
                        <motion.h2
                            className="text-4xl sm:text-5xl xl:text-6xl font-semibold leading-tight"
                            variants={headingVariants}
                        >
                            Download Now
                        </motion.h2>

                        <motion.p
                            className="text-zinc-400 max-w-lg mx-auto"
                            variants={textVariants}
                        >
                            Attendance, payroll, cards, and payments unified into one moden,
                            secure workforce platform.
                        </motion.p>

                        <motion.div
                            className="flex gap-4 justify-center"
                            variants={textVariants}
                        >
                            <motion.button
                                onClick={handlePlayStoreDownload}
                                className="px-6 py-3 bg-white text-black rounded-xl text-sm hover:opacity-90 transition"
                                variants={buttonVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Google Play
                            </motion.button>
                            <motion.button
                                onClick={handleAppStoreDownload}
                                className="px-6 py-3 bg-white text-black rounded-xl text-sm hover:opacity-90 transition"
                                variants={buttonVariants}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                App Store
                            </motion.button>
                        </motion.div>

                        <motion.div
                            className="flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-xl max-w-md mx-auto"
                            variants={qrVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="bg-white p-2 rounded-lg">
                                <QRCodeSVG value={smartUrl} size={90} />
                            </div>
                            <div className="text-left">
                                <p className="font-medium flex items-center gap-2">
                                    <Download className="w-4 h-4" />
                                    Scan to download
                                </p>
                                <p className="text-xs text-zinc-400">
                                    Auto-detects your device
                                </p>
                            </div>
                        </motion.div>

                        {process.env.NODE_ENV === "development" && (
                            <p className="text-xs text-zinc-500">
                                Device: <span className="text-white">{deviceType}</span>
                            </p>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

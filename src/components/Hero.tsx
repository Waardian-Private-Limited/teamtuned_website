"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import heroAnimation from "../../public/video/automation.json";

/* ================= LOTTIE ================= */

function LottieAnimation() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => setLoaded(true), []);

  return (
    <div
      className={cn(
        // Size
        "w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] lg:w-[620px] lg:h-[620px]",
        // Mobile margin top, pull text closer on larger screens
        "mt-20 sm:mt-12 md:mt-8",
        "-mb-4 sm:-mb-6 md:-mb-50",
        "transition-all duration-1000",
        loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
    >
      <Lottie animationData={heroAnimation} loop autoplay />
    </div>
  );
}

/* ================= TEXT ================= */

function ElegantText() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={cn(
        "text-center transition-all duration-1000",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
    >
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
          Automate Your Workforce
        </span>{" "}
        &{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700">
          Workplace
        </span>
      </h2>

      <p className="mt-4 sm:mt-5 text-gray-600 text-base sm:text-lg md:text-xl">
        The smartest way to transform your business operations
      </p>
    </div>
  );
}

/* ================= CTA ================= */

function CTASection() {
  return (
    <button className="mt-8 sm:mt-10 px-12 py-4 rounded-lg bg-black text-white hover:scale-105 transition" onClick={() => window.location.href = "/contact"}>
      Book a Demo →
    </button>
  );
}

/* ================= PARTICLES ================= */

function Particles() {
  const particlesRef = useRef<
    {
      width: number;
      height: number;
      left: number;
      top: number;
      delay: number;
      duration: number;
    }[] | null
  >(null);

  if (typeof window === "undefined") return null;

  if (!particlesRef.current) {
    particlesRef.current = Array.from({ length: 12 }).map(() => ({
      width: Math.random() * 2 + 1,
      height: Math.random() * 2 + 1,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 20 + 10,
    }));
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particlesRef.current.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gray-400/20 animate-float"
          style={{
            width: p.width,
            height: p.height,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ================= HERO ================= */

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* 🔥 KEY CHANGE: no justify-center */}
      <div className="relative z-10 flex flex-col items-center min-h-screen pt-6 sm:pt-8 md:pt-10">
        <LottieAnimation />
        <ElegantText />
        <CTASection />
      </div>

      {mounted && <Particles />}
    </section>
  );
}

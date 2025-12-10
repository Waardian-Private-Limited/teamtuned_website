"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function WalletSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const punchlineRef = useRef<HTMLParagraphElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* ------------------------------
        GSAP SCROLL 
  ------------------------------ */
  /* ------------------------------
        GSAP SCROLL 
  ------------------------------ */
  useEffect(() => {
    if (!mounted) return;

    const mm = gsap.matchMedia();

    // Changed breakpoint to 1024px (lg) to handle tablets better
    mm.add("(min-width: 1024px)", () => {
      // DESKTOP ANIMATION
      gsap.set(headingRef.current, { y: 0, scale: 1.25, opacity: 1 });
      gsap.set(punchlineRef.current, { y: 10, opacity: 0 });
      gsap.set(cardsRef.current, { y: 120, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2100",
          scrub: 1.2,
          pin: true,
        },
      });

      tl.to(headingRef.current, {
        y: -160,
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        duration: 1.8,
      });

      tl.to(
        punchlineRef.current,
        {
          y: -135,
          opacity: 1,
          ease: "power3.out",
          duration: 1.2,
        },
        "-=1.2"
      );

      tl.to(
        cardsRef.current,
        {
          y: -20,
          opacity: 1,
          ease: "power3.out",
          duration: 1.8,
        },
        "-=0.8"
      );
    });

    mm.add("(max-width: 1023px)", () => {
      // MOBILE/TABLET ANIMATION
      gsap.set([headingRef.current, punchlineRef.current], { opacity: 0, y: 30 });
      gsap.set(cardsRef.current?.children || [], { opacity: 0, y: 50 });

      // Heading & Punchline
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to([headingRef.current, punchlineRef.current], {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
          });
        },
      });

      // Cards staggered animation
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(cardsRef.current?.children || [], {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)",
          });
        },
      });
    });

    return () => mm.revert();
  }, [mounted]);

  /* ------------------------------
        WALLET FEATURES
  ------------------------------ */

  const cards = [
    {
      title: "Income Tracker",
      desc: "Track all client payments, deposits & income sources.",
      vector: "/wallet_1.png",
      bg: "from-blue-500 to-blue-700",
    },
    {
      title: "Expense Logging",
      desc: "Record expenses, bills, receipts & categorize by site.",
      vector: "/wallet_2.png",
      bg: "from-purple-500 to-purple-700",
    },
    {
      title: "Approval Flow",
      desc: "Multi-level workflow: manager → head → finance.",
      vector: "/wallet_3.png",
      bg: "from-emerald-500 to-emerald-700",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden min-h-screen flex flex-col items-center justify-center py-20 lg:h-screen lg:py-0 lg:block"
    >
      {/* HEADING */}
      <div className="w-full px-4 text-center z-20 mb-10 lg:absolute lg:left-1/2 lg:top-[45%] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mb-0 lg:w-auto">
        <h1
          ref={headingRef}
          className="text-blue-700 font-black tracking-tight text-5xl lg:text-8xl"
        >
          Finance Wallet
        </h1>

        <p
          ref={punchlineRef}
          className="text-black/60 mt-4 font-medium tracking-tight text-lg lg:mt-1 lg:text-2xl"
        >
          Manage site expenses, approvals, invoices & budgets — all in one place.
        </p>
      </div>

      {/* CARDS */}
      <div
        ref={cardsRef}
        className="w-[92%] max-w-7xl z-30 grid grid-cols-1 gap-6 lg:absolute lg:top-[50%] lg:left-1/2 lg:-translate-x-1/2 lg:grid-cols-3 lg:gap-8"
      >
        {cards.map((c, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl text-white shadow-xl bg-gradient-to-br ${c.bg} transform hover:scale-[1.03] transition-all duration-300`}
          >
            <img
              src={c.vector}
              alt={c.title}
              className="w-28 h-28 object-contain mb-4 mx-auto"
            />

            <h3 className="text-2xl font-bold text-center">{c.title}</h3>
            <p className="text-white/80 mt-1 text-center">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

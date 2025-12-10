"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AttendanceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const punchlineRef = useRef<HTMLParagraphElement>(null);
  const vectorRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const pointsHeadingRef = useRef<HTMLHeadingElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      /* ---------------------- */
      /*    INITIAL STATES      */
      /* ---------------------- */
      gsap.set([headingRef.current, vectorRef.current, punchlineRef.current], {
        opacity: 0,
        y: 180,
      });

      gsap.set(mockupRef.current, { opacity: 0, x: -500, scale: 0.8 });
      gsap.set([pointsHeadingRef.current, pointsRef.current], {
        opacity: 0,
        x: 200,
      });

      /* ----------------------------------- */
      /*         SCROLL TRIGGER TIMELINE      */
      /* ----------------------------------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          scrub: 1.3,
          pin: true,
          anticipatePin: 1,
        },
      });

      /* ---------------------------- */
      /*       PHASE 1 – HERO IN      */
      /* ---------------------------- */
      tl.to(
        [headingRef.current, punchlineRef.current, vectorRef.current],
        {
          opacity: 1,
          y: 0,
          duration: 3,
          ease: "power3.out",
          stagger: 0.15,
        },
        0
      );

      /* ----------------------------- */
      /*     PHASE 2 – HERO OUT        */
      /* ----------------------------- */
      tl.to(
        [headingRef.current, punchlineRef.current, vectorRef.current],
        {
          opacity: 0,
          y: -200,
          duration: 3,
          ease: "power2.inOut",
        },
        2.4
      );

      /* ----------------------------- */
      /*     PHASE 3 – MOCKUP IN       */
      /* ----------------------------- */
      tl.to(
        mockupRef.current,
        {
          opacity: 1,
          x: -150,
          scale: 1.05,
          duration: 4,
          ease: "power3.out",
        },
        3.8
      );

      /* ----------------------------- */
      /*     PHASE 4 – TEXT IN         */
      /* ----------------------------- */
      tl.to(
        pointsHeadingRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 2,
          ease: "power2.out",
        },
        5.2
      );

      tl.to(
        pointsRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 2.5,
          stagger: 0.15,
          ease: "power2.out",
        },
        5.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const features = [
    "AI-powered facial recognition for accurate attendance",
    "Geofence-based automatic check-ins",
    "Real-time analytics and reporting dashboard",
    "Seamless payroll system integration",
    "Fraud-proof digital audit trails",
    "Mobile check-in capability",
  ];

  return (
    <div className="relative bg-black">
      <section
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-black"
      >
        {/* -------------------------- */}
        {/*   🔥 CARDS TEXTURE BG      */}
        {/* -------------------------- */}
        <div
          className="absolute inset-0 opacity-20 bg-repeat bg-[length:140px] pointer-events-none"
          style={{
            backgroundImage:
              'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
          }}
        />

        {/* -------------------------- */}
        {/*   🔥 VIGNETTE OVERLAY       */}
        {/* -------------------------- */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* -------------------------- */}
        {/*        HERO SECTION         */}
        {/* -------------------------- */}
        <div className="relative h-full flex items-center justify-between px-20">
          <div className="flex-1 flex items-center justify-start">
            <div>
              <h1
                ref={headingRef}
                className="text-7xl md:text-9xl font-black text-white tracking-tighter leading-none"
              >
                Attendance
              </h1>

              {/* ⭐ Punchline */}
              <p
                ref={punchlineRef}
                className="mt-5 text-white/70 text-xl md:text-2xl font-light tracking-tight"
              >
                Effortless tracking. Intelligent insights.
              </p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-end">
            <div ref={vectorRef} className="relative w-[620px] h-[380px]">
              <Image
                src="/FirstMockupAttendance3d.png"
                alt="Attendance Vector"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        {/* -------------------------- */}
        {/*         MOCKUP             */}
        {/* -------------------------- */}
        <div
          ref={mockupRef}
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-[34rem] z-30 pointer-events-none"
          style={{ transformOrigin: "center center" }}
        >
          <Image
            src="/mockup.png"
            alt="Mobile Mockup"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* -------------------------- */}
        {/*     FEATURES LIST           */}
        {/* -------------------------- */}
        <div className="absolute top-1/2 right-[25%] -translate-y-1/2 w-96 z-40">
          <h2
            ref={pointsHeadingRef}
            className="text-5xl font-black text-white mb-10 tracking-tight"
          >
            Smart Features
          </h2>

          <div ref={pointsRef} className="space-y-5">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 opacity-90"
              >
                <div className="w-2.5 h-2.5 bg-white rounded-full mt-2.5 flex-shrink-0 shadow-lg" />
                <p className="text-white/85 text-lg leading-relaxed font-light">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

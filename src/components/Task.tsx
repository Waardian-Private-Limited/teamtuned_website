"use client";

import { useEffect, useRef, useState, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------------------
   CARD COMPONENT — hydration safe (single-line className)
------------------------------------------------------------- */
const Card = forwardRef(function Card(
  { style, image, title, subtitle, description, className }: any,
  ref: any
) {
  return (
    <div
      ref={ref}
      style={style}
      className={`bg-white/85 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-200/60 w-full max-w-[360px] transform-gpu ${className || ""}`}
    >
      <h3 className="font-bold text-gray-900 text-xl">{title}</h3>
      <p className="text-gray-600 text-sm mt-1">{subtitle}</p>

      {image && (
        <div className="my-4 rounded-xl overflow-hidden">
          <img src={image} className="w-full h-44 object-contain" alt={title} />
        </div>
      )}

      <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
    </div>
  );
});

/* -------------------------------------------------------------
   WORKFLOW PREMIUM V2 — FIXED STAIRCASE
------------------------------------------------------------- */
export default function WorkflowPremiumV2() {
  const containerRef = useRef<HTMLDivElement>(null);

  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const mm = gsap.matchMedia();

    // DESKTOP/LAPTOP ANIMATION (Original)
    mm.add("(min-width: 1024px)", () => {
      gsap.set([s1.current, s2.current, s3.current, s4.current], {
        opacity: 0,
        y: 80,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2300",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(s1.current, { opacity: 1, y: 0, duration: 1 });
      tl.to(s2.current, { opacity: 1, y: 0, duration: 1 }, "-=0.7");
      tl.to(s3.current, { opacity: 1, y: 0, duration: 1 }, "-=0.7");
      tl.to(s4.current, { opacity: 1, y: 0, duration: 1.1 }, "-=0.7");
    });

    // MOBILE/TABLET ANIMATION (Slide from Left/Right)
    mm.add("(max-width: 1023px)", () => {
      // Initial states: s1/s3 left (-100px), s2/s4 right (100px)
      gsap.set([s1.current, s3.current], { opacity: 0, x: -50 });
      gsap.set([s2.current, s4.current], { opacity: 0, x: 50 });

      const cards = [s1.current, s2.current, s3.current, s4.current];

      cards.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 85%", // Trigger earlier for visibility
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            });
          },
        });
      });
    });

    return () => mm.revert();
  }, [mounted]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white min-h-screen py-24 lg:h-screen lg:py-0"
    >
      {/* Heading */}
      <div className="w-full px-4 text-center z-[200] mb-12 mt-8 lg:mt-0 lg:absolute lg:top-10 lg:left-1/2 lg:-translate-x-1/2 lg:mb-0">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-700">Task Management</h1>
        <p className="text-gray-700 text-lg font-semibold mt-2">Build. Assign. Automate.</p>
      </div>

      {/* Dot Background */}
      <div
        className="absolute inset-0 z-[0]"
        style={{
          backgroundImage: "radial-gradient(#e5e5e5 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* ---------------------------------------------------------
           SPACED STAIRCASE LAYOUT (clean + non-overlapping)
         --------------------------------------------------------- */}
      <div className="relative w-full z-[120] flex flex-col items-center gap-6 px-4 pb-20 lg:block lg:h-full lg:px-0 lg:pb-0">

        {/* STEP 1 */}
        <Card
          ref={s1}
          className="lg:absolute lg:top-[16%] lg:left-[4%]"
          image="/task_1.png"
          title="Drag & Drop Builder"
          subtitle="Create without coding"
          description="Generate checklists, audits, and forms with ease using a visual drag & drop system."
        />

        {/* STEP 2 */}
        <Card
          ref={s2}
          className="lg:absolute lg:top-[22%] lg:left-[27%]"
          image="/task_2.png"
          title="Assign & Template"
          subtitle="Distribute efficiently"
          description="Assign tasks instantly across teams, departments, or sites using ready templates."
        />

        {/* STEP 3 */}
        <Card
          ref={s3}
          className="lg:absolute lg:top-[28%] lg:left-[50%]"
          image="/task_3.png"
          title="Multi-Stage Approvals"
          subtitle="Streamline validation"
          description="Set up multi-level approval chains with full audit logs and granular control."
        />

        {/* STEP 4 */}
        <Card
          ref={s4}
          className="lg:absolute lg:top-[34%] lg:left-[74%]"
          image="/task_4.png"
          title="Live Dashboard"
          subtitle="Monitor in real-time"
          description="Track performance with analytics, exports, and live insights across your entire organization."
        />
      </div>
    </section>
  );
}

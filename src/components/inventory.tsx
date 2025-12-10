"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function InventorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Feature list refs
  const listItemsRef = useRef<HTMLLIElement[]>([]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Initial fade-in animations
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 0,
        y: 60,
      });

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.to(subheadingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.35,
      });

      // Scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
          pin: true,
        },
      });

      tl.to({}, { duration: 0.3 });

      // Heading shrinks + shifts upward
      tl.to(
        headingRef.current,
        {
          fontSize: "clamp(2rem, 5vw, 3rem)",
          top: "2rem",
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=1"
      );

      tl.to(
        subheadingRef.current,
        {
          fontSize: "clamp(1rem, 3vw, 1.2rem)",
          top: "5rem",
          duration: 1.4,
          ease: "power2.inOut",
        },
        "-=1"
      );

      // Fade out center text
      tl.to(
        textContainerRef.current,
        {
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      );

      // Slide card upward
      tl.to(
        cardRef.current,
        {
          y: 0,
          duration: 1.5,
          ease: "power4.out",
        },
        "-=0.5"
      );

      // Hide list + image before animating in
      gsap.set([...listItemsRef.current, imageRef.current], {
        opacity: 0,
        y: 30,
      });

      const baseDelay = tl.duration() - 0.6;

      // Stagger list items
      listItemsRef.current.forEach((li, i) => {
        tl.to(
          li,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          baseDelay + i * 0.08
        );
      });

      // Fade in image
      tl.to(
        imageRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        baseDelay + 0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const features = [
    { icon: "📋", label: "Quotation Request" },
    { icon: "📝", label: "PR Request" },
    { icon: "✓", label: "Approvals" },
    { icon: "📦", label: "Distribution" },
    { icon: "💰", label: "Finance" },
    { icon: "📊", label: "Reports" },
    { icon: "✨", label: "And much more!" },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50"
    >
      {/* Floating Heading + Subheading */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1
          ref={headingRef}
          className="text-[2.5rem] md:text-6xl lg:text-7xl font-black text-blue-700 text-center tracking-tight"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Smart Inventory
        </h1>

        <p
          ref={subheadingRef}
          className="text-xl md:text-2xl font-semibold text-blue-600 text-center tracking-tight"
          style={{
            position: "absolute",
            top: "calc(50% + 100px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Automate, Track & Control
        </p>
      </div>

      {/* Blue Card Section */}
      <div
        ref={cardRef}
        className="absolute inset-0 z-40 translate-y-full bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/5"></div>

        <div className="relative h-full flex flex-col px-6 py-10 md:px-12 lg:px-20 text-white">
          {/* Header */}
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              Inventory Management
            </h2>
            <p className="mt-3 text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed">
              Complete control over your inventory — request, approve, distribute & analyze everything in one unified platform.
            </p>
          </div>

          {/* Content */}
          <div className="mt-12 flex flex-col lg:flex-row items-center justify-between gap-12 flex-1">
            {/* Features List */}
            <ul className="space-y-4 flex-1 w-full">
              {features.map((feature, i) => (
                <li
                  key={i}
                  ref={(el) => {
                    if (el) listItemsRef.current[i] = el;
                  }}
                  className="flex items-center gap-4 text-lg md:text-xl font-semibold opacity-0 group transition-all"
                >
                  <span className="text-2xl md:text-3xl group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Image */}
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                ref={imageRef}
                src="/inventory.png"
                alt="Inventory"
                className="w-52 sm:w-64 md:w-72 lg:w-96 xl:w-[420px] drop-shadow-2xl opacity-0 transition-transform hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

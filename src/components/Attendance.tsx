"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type RectCardProps = {
  refBox: React.RefObject<HTMLDivElement | null>;
  refTitle: React.RefObject<HTMLHeadingElement | null>;
  refImg: React.RefObject<HTMLDivElement | null>;
  refDesc: React.RefObject<HTMLParagraphElement | null>;
  style: React.CSSProperties;
  title: string;
  image: string;
  desc: string;
};

function RectCard({ refBox, refTitle, refImg, refDesc, style, title, image, desc }: RectCardProps) {
  return (
    <div
      ref={refBox}
      style={style}
      className={cn(
        "absolute bg-white/85 dark:bg-neutral-900/85 backdrop-blur-lg p-6 rounded-2xl shadow-lg",
        "border border-gray-200/60 dark:border-white/10 opacity-0 transform-gpu flex gap-5",
        "w-72 h-48 max-sm:static max-sm:w-full max-sm:h-auto"
      )}
    >
      <div ref={refImg} className="w-28 h-28 relative opacity-0 max-sm:w-20 max-sm:h-20">
        <Image src={image} alt={title} fill className="object-contain rounded-lg" />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 ref={refTitle} className="text-lg font-bold text-gray-800 dark:text-white opacity-0">
          {title}
        </h3>
        <p ref={refDesc} className="text-sm text-gray-600 dark:text-gray-400 leading-snug opacity-0">
          {desc}
        </p>
      </div>
    </div>
  );
}

export default function AttendanceFlowSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mainCardRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  const c1 = useRef<HTMLDivElement | null>(null);
  const c1Title = useRef<HTMLHeadingElement | null>(null);
  const c1Img = useRef<HTMLDivElement | null>(null);
  const c1Desc = useRef<HTMLParagraphElement | null>(null);

  const c2 = useRef<HTMLDivElement | null>(null);
  const c2Title = useRef<HTMLHeadingElement | null>(null);
  const c2Img = useRef<HTMLDivElement | null>(null);
  const c2Desc = useRef<HTMLParagraphElement | null>(null);

  const c3 = useRef<HTMLDivElement | null>(null);
  const c3Title = useRef<HTMLHeadingElement | null>(null);
  const c3Img = useRef<HTMLDivElement | null>(null);
  const c3Desc = useRef<HTMLParagraphElement | null>(null);

  const c4 = useRef<HTMLDivElement | null>(null);
  const c4Title = useRef<HTMLHeadingElement | null>(null);
  const c4Img = useRef<HTMLDivElement | null>(null);
  const c4Desc = useRef<HTMLParagraphElement | null>(null);

  const arrowRef1 = useRef<SVGPathElement | null>(null);
  const arrowRef2 = useRef<SVGPathElement | null>(null);
  const arrowRef3 = useRef<SVGPathElement | null>(null);
  const arrowRef4 = useRef<SVGPathElement | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;

    const cards = [c1.current, c2.current, c3.current, c4.current].filter(Boolean) as HTMLElement[];
    const textItems = [
      c1Title.current, c1Img.current, c1Desc.current,
      c2Title.current, c2Img.current, c2Desc.current,
      c3Title.current, c3Img.current, c3Desc.current,
      c4Title.current, c4Img.current, c4Desc.current,
    ].filter(Boolean) as HTMLElement[];

    const arrows = [
      arrowRef1.current,
      arrowRef2.current,
      arrowRef3.current,
      arrowRef4.current,
    ].filter(Boolean) as SVGPathElement[];

    const ctx = gsap.context(() => {
      gsap.set(mainCardRef.current, { opacity: 0, y: 80, scale: 0.9 });
      gsap.set(cards, { opacity: 0, scale: 0.8, y: 40 });
      gsap.set(textItems, { opacity: 0, y: 15 });

      // hide arrows initially
      arrows.forEach((arrow) => {
        const len = arrow.getTotalLength();
        gsap.set(arrow, {
          strokeDasharray: len,
          strokeDashoffset: len,
          opacity: 0,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2400",
          scrub: 1.4,
          pin: true,
        },
      });

      tl.to(mainCardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.3,
        ease: "power3.out",
      });

      tl.to(cards, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.15,
        ease: "power2.out",
      });

      // reveal text content
      textItems.forEach((el, index) => {
        tl.to(el, { opacity: 1, y: 0, duration: 0.7 }, 1.2 + index * 0.1);
      });

      arrows.forEach((arrow, index) => {
        tl.to(
          arrow,
          {
            strokeDashoffset: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power2.inOut",
          },
          1.5 + index * 0.25
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="relative bg-white dark:bg-black transition-all duration-500">
      <section
        ref={containerRef}
        className="relative h-screen overflow-hidden max-sm:h-auto max-sm:pb-16 max-sm:pt-24"
      >
        {/* Main center card */}
        <div
          ref={mainCardRef}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 max-sm:w-[92%]",
            "rounded-3xl shadow-2xl bg-white dark:bg-neutral-900 border border-gray-200/60 dark:border-white/10",
            "overflow-hidden opacity-0"
          )}
        >
          <div className="flex items-center gap-2 p-4 bg-gray-100 dark:bg-neutral-800 border-b border-gray-200/70 dark:border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <p className="text-green-700 font-bold">on-Time</p>
          </div>

          <div className="p-12 text-center">
            <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-3 max-sm:text-4xl">
              Attendance
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-sm:text-base">
              Track • Record • Monitor
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <RectCard
          refBox={c1}
          refTitle={c1Title}
          refImg={c1Img}
          refDesc={c1Desc}
          style={{ top: "10%", left: "6%" }}
          title="QR Based"
          image="/qr_based.png"
          desc="Efficient check-in & check-out with QR scanning."
        />

        <RectCard
          refBox={c2}
          refTitle={c2Title}
          refImg={c2Img}
          refDesc={c2Desc}
          style={{ top: "10%", right: "6%" }}
          title="Face Recognition"
          image="/face_based.png"
          desc="Seamless check-in with AI-powered facial recognition."
        />

        <RectCard
          refBox={c3}
          refTitle={c3Title}
          refImg={c3Img}
          refDesc={c3Desc}
          style={{ bottom: "10%", left: "6%" }}
          title="Geo Attendance"
          image="/geo_based.png"
          desc="Geofenced tracking with precise location."
        />

        <RectCard
          refBox={c4}
          refTitle={c4Title}
          refImg={c4Img}
          refDesc={c4Desc}
          style={{ bottom: "10%", right: "6%" }}
          title="Reports"
          image="/payroll.png"
          desc="Accurate payroll calculations."
        />

        {/* Arrows */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none -z-10"
          preserveAspectRatio="none"
          viewBox="0 0 1400 900"
        >
          <path ref={arrowRef1} d="M 150 200 Q 450 180 600 320" stroke="#d1d5db" strokeWidth="2.5" fill="none" />
          <path ref={arrowRef2} d="M 1250 200 Q 950 180 800 320" stroke="#d1d5db" strokeWidth="2.5" fill="none" />
          <path ref={arrowRef3} d="M 150 700 Q 450 720 600 580" stroke="#d1d5db" strokeWidth="2.5" fill="none" />
          <path ref={arrowRef4} d="M 1250 700 Q 950 720 800 580" stroke="#d1d5db" strokeWidth="2.5" fill="none" />
        </svg>
      </section>
    </div>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Calendar02Icon,
  MoneyBag01Icon,
  TaskDone01Icon,
  HouseSolarPanelIcon,
} from "hugeicons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || cardsRef.current.length < 4) return;

    const ctx = gsap.context(() => {
      gsap.set(heroTextRef.current, { opacity: 1, scale: 1, y: 0 });
      gsap.set(cardsRef.current, { opacity: 0, scale: 0.7, rotationY: 180 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=5500",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Hero fade out – slow & elegant
      tl.to(heroTextRef.current, {
        opacity: 0,
        scale: 0.68,
        y: -220,
        duration: 4,
        ease: "power2.inOut",
      }).to({}, { duration: 0.5 });

      // Cards fly in – cinematic and staggered
      const fromPositions = [
        { x: -1200, y: -700, rot: -60 },
        { x: -800, y: -900, rot: -35 },
        { x: 800, y: -900, rot: 35 },
        { x: 1200, y: -700, rot: 60 },
      ];

      cardsRef.current.forEach((card, i) => {
        tl.fromTo(
          card,
          {
            x: fromPositions[i].x,
            y: fromPositions[i].y,
            rotation: fromPositions[i].rot,
            rotationY: 180,
            opacity: 0,
            scale: 0.5,
          },
          {
            x: 0,
            y: 0,
            rotation: 0,
            rotationY: 0,
            opacity: 1,
            scale: 1,
            duration: 3.5,
            ease: "back.out(1.7)",
          },
          i === 0 ? "-=0.4" : `-=${2.2 - i * 0.4}`
        );
      });

      // Subtle depth tilt
      tl.to(cardsRef.current, {
        rotation: (i) => [-10, -4, 4, 10][i],
        duration: 2.5,
        ease: "power2.out",
      }, "+=0.8");

      // Final horizontal layout
      tl.to(cardsRef.current, {
        x: (i) => (i - 1.5) * 340,
        rotation: 0,
        duration: 3.5,
        ease: "power4.out",
      }, "-=1.8");
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Fixed function name
  const addToCardsRef = (el: HTMLDivElement | null) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  const cards = [
    {
      bg: "bg-zinc-900",
      title: "Attendance",
      desc: "Real-time tracking, insights & automated reports",
      icon: <Calendar02Icon size={20} strokeWidth={2.5} />,
    },
    {
      bg: "bg-blue-600",
      title: "Wallet",
      desc: "Secure payments, instant payouts & full control",
      icon: <MoneyBag01Icon size={20} strokeWidth={2.5} />,
    },
    {
      bg: "bg-red-600",
      title: "Task",
      desc: "Smart workflows, deadlines & team sync",
      icon: <TaskDone01Icon size={20} strokeWidth={2.5} />,
    },
    {
      bg: "bg-white",
      title: "Inventory",
      desc: "Live stock, alerts & predictive ordering",
      icon: <HouseSolarPanelIcon size={20} strokeWidth={2.5} />,
    },
  ];

  return (
    <div className="relative bg-black">
      <section
        ref={containerRef}
        className="relative h-screen overflow-hidden bg-white flex items-center justify-center"
      >
        {/* Hero Text */}
        <div
          ref={heroTextRef}
          className="absolute z-20 text-center pointer-events-none select-none"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight leading-[0.9]">
            Our Features
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-black/70 font-light tracking-wide">
            Scroll down to discover
          </p>
        </div>

        {/* Cards */}
        <div className="relative w-full h-full flex items-center justify-center">
          {cards.map((card, i) => (
            <div
              key={i}
              ref={addToCardsRef}
              className="absolute w-[300px] h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
            >
              <div className={`absolute inset-0 ${card.bg}`} />

              <div
                className="absolute inset-0 opacity-10 bg-repeat bg-[length:140px]"
                style={{
                  backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
                }}
              />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.25) 80%, rgba(0,0,0,0.45) 100%)",
                }}
              />

              <div className="relative h-full p-10 flex flex-col justify-between text-right">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-xl">
                    <div className={card.bg === "bg-white" ? "text-black" : "text-white"}>
                      {card.icon}
                    </div>
                  </div>

                  <h3 className={`text-3xl font-light leading-tight ${card.bg === "bg-white" ? "text-black" : "text-white"}`}>
                    {card.title}
                  </h3>
                </div>

                <p className={`text-sm max-w-[210px] ml-auto leading-relaxed ${card.bg === "bg-white" ? "text-black/80" : "text-white/70"}`}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
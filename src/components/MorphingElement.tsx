"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * STAGE TRANSITIONS BASED ON PAGE SCROLL PROGRESS
 *
 * 0.00 → 0.25   = ORB (Hero)
 * 0.25 → 0.55   = HOLOGRAM CARD (Features)
 * 0.55 → 0.80   = COIN (Pricing)
 * 0.80 → 1.00   = CTA PILL (Call to Action)
 */

export default function MorphingElement() {
  const pageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  // SIZE TRANSFORM
  const width = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ["130px", "260px", "110px", "240px", "310px"]
  );

  const height = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ["130px", "170px", "110px", "75px", "70px"]
  );

  // SHAPE BORDER RADIUS
  const radius = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    ["50%", "25px", "50%", "40px", "999px"]
  );

  // ROTATION
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    ["0deg", "7deg", "360deg", "0deg"]
  );

  // OPACITY SLIGHT VARIATION
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.92]
  );

  // GRADIENT COLOR MORPHING
  const background = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.8, 1],
    [
      // ORB
      "linear-gradient(135deg,#9C4DFF,#4AF2FF)",
      // HOLOGRAM CARD
      "linear-gradient(155deg,rgba(255,255,255,0.15),rgba(255,255,255,0.08))",
      // COIN
      "linear-gradient(135deg,#FFD44A,#FF9F0A)",
      // CTA PILL
      "linear-gradient(135deg,#00FFA3,#00E0FF)",
      // END — Hyper Glow
      "linear-gradient(135deg,#5CE1E6,#B87CFF)"
    ]
  );

  // BLUR EFFECT
  const blur = useTransform(scrollYProgress, [0, 1], ["10px", "24px"]);

  return (
    <div ref={pageRef} className="relative w-full h-[700vh] select-none">
      <motion.div
        style={{
          position: "fixed",
          top: "48%",
          left: "50%",
          translateX: "-50%",
          translateY: "-50%",
          width,
          height,
          borderRadius: radius,
          rotate,
          opacity,
          background,
          backdropFilter: "blur(18px)",
          transition: "all 0.3s linear",
          zIndex: 999,
          pointerEvents: "none",
          boxShadow: "0 0 70px rgba(140,70,255,0.4)"
        }}
        className="transition-all ease-out shadow-2xl"
      />
    </div>
  );
}

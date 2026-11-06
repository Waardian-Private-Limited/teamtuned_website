'use client';

import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/** True from `query` matching; false on the server and first paint. */
export function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, [query]);
  return match;
}

/**
 * Pinned scroll scene: a tall wrapper with a sticky one-screen stage, like a GSAP pin + scrub.
 * Children get a smoothed 0..1 progress. With reduced motion the scene sits at its end state, unpinned.
 */
export function PinnedScene({
  length,
  className,
  stageClassName,
  children,
  label,
  id,
}: {
  /** Scroll distance in screens, including the pinned screen itself. */
  length: number;
  className?: string;
  stageClassName?: string;
  children: (progress: MotionValue<number>) => React.ReactNode;
  label: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });
  const done = useMotionValue(1);
  const progress = reduce ? done : smooth;

  return (
    <section ref={ref} id={id} aria-labelledby={label} className={className} style={{ height: reduce ? undefined : `${length * 100}svh` }}>
      <div className={`${reduce ? 'relative min-h-svh' : 'sticky top-0 h-svh'} overflow-hidden ${stageClassName ?? ''}`}>{children(progress)}</div>
    </section>
  );
}

/** Mouse-follow 3D tilt for a product shot. Fine pointers only; resets on leave. */
export function Tilt({ children, className, max = 10 }: { children: React.ReactNode; className?: string; max?: number }) {
  const fine = useMedia('(hover: hover) and (pointer: fine)');
  const rx = useSpring(0, { stiffness: 150, damping: 15 });
  const ry = useSpring(0, { stiffness: 150, damping: 15 });
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glare = useTransform([glareX, glareY], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.22), transparent 55%)`);

  return (
    <m.div
      className={className}
      style={{ perspective: 1200 }}
      onMouseMove={(e) => {
        if (!fine) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry.set((px - 0.5) * 2 * max);
        rx.set(-(py - 0.5) * 2 * max);
        glareX.set(px * 100);
        glareY.set(py * 100);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <m.div className="relative h-full w-full" style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}>
        {children}
        {fine && <m.div aria-hidden className="pointer-events-none absolute inset-0 rounded-[2rem] mix-blend-overlay" style={{ background: glare }} />}
      </m.div>
    </m.div>
  );
}

/** Sets --mx/--my on every `.spot` element inside as the pointer moves, for a cursor spotlight. */
export function SpotlightGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        for (const el of Array.from(ref.current?.querySelectorAll<HTMLElement>('.spot') ?? [])) {
          const r = el.getBoundingClientRect();
          el.style.setProperty('--mx', `${e.clientX - r.left}px`);
          el.style.setProperty('--my', `${e.clientY - r.top}px`);
        }
      }}
    >
      {children}
    </div>
  );
}

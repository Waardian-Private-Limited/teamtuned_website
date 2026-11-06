'use client';

import { m, useReducedMotion, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { PinnedScene, useMedia } from './scroll';

/*
 * Swarm: every particle is one employee.
 * Scroll walks them through four formations:
 *   0 scattered everywhere -> 1 gathered at sites (geofence rings) -> 2 the live "42/50" count -> 3 the TeamTuned mark.
 * The cursor pushes particles away and they spring back.
 */

type Pt = { x: number; y: number };
const STOPS = [0, 0.3, 0.58, 0.86];
const SITES = [
  [0.18, 0.38], [0.38, 0.66], [0.55, 0.3], [0.76, 0.62], [0.86, 0.3],
] as const;

const rand = (seed: number) => {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
};
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Picks exactly n points from a pool (repeats if short), shuffled with a fixed seed. */
function fit(pool: Pt[], n: number, r: () => number): Pt[] {
  if (!pool.length) return Array.from({ length: n }, () => ({ x: 0, y: 0 }));
  const out: Pt[] = [];
  for (let i = 0; i < n; i++) out.push(pool[Math.floor(r() * pool.length)]);
  return out;
}

/** Points inside drawn text or image, sampled on a grid from an offscreen canvas. */
function sample(draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number, step: number): Pt[] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d');
  if (!ctx) return [];
  draw(ctx, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  const pts: Pt[] = [];
  for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) if (data[(y * w + x) * 4 + 3] > 128) pts.push({ x, y });
  return pts;
}

function Canvas({ p, count }: { p: MotionValue<number>; count: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let W = 0;
    let H = 0;
    let forms: Pt[][] = [];
    let tint: number[] = []; // 1 = "checked in" green in the count formation
    const N = count;
    const r = rand(7);
    const delay = Array.from({ length: N }, () => r() * 0.35);
    const phase = Array.from({ length: N }, () => r() * Math.PI * 2);
    const size = Array.from({ length: N }, () => 1 + r() * 1.6);
    const off = new Float32Array(N * 2);
    const mouse = { x: -9999, y: -9999 };
    const logo = new Image();
    logo.src = '/brand/mark-white-128.webp';
    const font = getComputedStyle(document.body).fontFamily;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rr = rand(11);

      const scatter = Array.from({ length: N }, () => ({ x: rr() * W, y: rr() * H }));

      const rad = Math.min(W, H) * 0.075;
      const sites = Array.from({ length: N }, (_, i) => {
        const [cx, cy] = SITES[i % SITES.length];
        const a = rr() * Math.PI * 2;
        const d = Math.sqrt(rr()) * rad;
        return { x: cx * W + Math.cos(a) * d, y: cy * H + Math.sin(a) * d };
      });

      // "42/50": draw both parts, remember which points belong to the green "42".
      const fs = Math.min(W * 0.27, H * 0.42);
      let split = 0;
      const countPts = sample(
        (c, w, h) => {
          c.font = `800 ${fs}px ${font}`;
          c.textBaseline = 'middle';
          const a = c.measureText('42').width;
          const b = c.measureText('/50').width;
          const x0 = (w - a - b) / 2;
          split = x0 + a;
          c.fillStyle = '#fff';
          c.fillText('42', x0, h * 0.5);
          c.fillText('/50', x0 + a, h * 0.5);
        },
        Math.round(W),
        Math.round(H),
        Math.max(3, Math.round(fs / 55))
      );
      const count = fit(countPts, N, rr);
      tint = count.map((pt) => (pt.x < split ? 1 : 0));

      const ls = Math.min(W, H) * 0.62;
      const logoPts = logo.complete && logo.naturalWidth
        ? sample((c, w, h) => c.drawImage(logo, (w - ls) / 2, (h - ls) / 2 - H * 0.03, ls, ls), Math.round(W), Math.round(H), Math.max(3, Math.round(ls / 110)))
        : sites;
      forms = [scatter, sites, count, fit(logoPts, N, rr)];
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!forms.length) return;
      const prog = reduce ? 1 : p.get();
      // Which two formations are we between, and how far.
      let k = 0;
      while (k < STOPS.length - 2 && prog > STOPS[k + 1]) k++;
      const span = STOPS[k + 1] - STOPS[k];
      const local = Math.min(1, Math.max(0, (prog - STOPS[k]) / (span * 0.75)));
      const A = forms[k];
      const B = forms[k + 1];

      ctx.clearRect(0, 0, W, H);

      // Geofence rings fade in while particles sit at sites.
      const ringA = k === 0 ? local : k === 1 ? 1 - local : 0;
      if (ringA > 0.01) {
        const rad = Math.min(W, H) * 0.11;
        ctx.setLineDash([4, 6]);
        ctx.lineWidth = 1;
        for (const [cx, cy] of SITES) {
          ctx.strokeStyle = `rgba(255,255,255,${0.35 * ringA})`;
          ctx.beginPath();
          ctx.arc(cx * W, cy * H, rad, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      for (let i = 0; i < N; i++) {
        const t = ease(Math.min(1, Math.max(0, (local - delay[i]) / (1 - 0.35))));
        let x = A[i].x + (B[i].x - A[i].x) * t;
        let y = A[i].y + (B[i].y - A[i].y) * t;
        // breathing drift so the swarm never looks frozen
        x += Math.sin(now * 0.0009 + phase[i]) * 1.6;
        y += Math.cos(now * 0.0011 + phase[i]) * 1.6;

        // cursor repulsion with spring-back
        const dx = x + off[i * 2] - mouse.x;
        const dy = y + off[i * 2 + 1] - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 110 * 110) {
          const d = Math.sqrt(d2) || 1;
          const f = (110 - d) / 110;
          off[i * 2] += (dx / d) * f * 7;
          off[i * 2 + 1] += (dy / d) * f * 7;
        }
        off[i * 2] *= 0.9;
        off[i * 2 + 1] *= 0.9;
        x += off[i * 2];
        y += off[i * 2 + 1];

        // colour: grey when scattered, white at sites, green for the checked-in "42", white logo
        const g = k === 1 ? t * tint[i] : k === 2 ? (1 - t) * tint[i] : 0;
        const a = k === 0 ? 0.45 + 0.5 * t : 0.95;
        ctx.fillStyle = g > 0.02 ? `rgba(${255 - 233 * g},${255 - 92 * g},${255 - 181 * g},${a})` : `rgba(255,255,255,${a})`;
        ctx.fillRect(x, y, size[i], size[i]);
      }
    };

    const onMove = (e: PointerEvent) => {
      const b = canvas.getBoundingClientRect();
      mouse.x = e.clientX - b.left;
      mouse.y = e.clientY - b.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };

    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    document.fonts.ready.then(build);
    logo.onload = build;
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [p, count, reduce]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full touch-pan-y" aria-hidden />;
}

const captions = [
  { t: 'Your people are everywhere.', s: 'Offices, homes, client visits, the road. Move your cursor through them.' },
  { t: 'TeamTuned knows every place they work.', s: 'Geofences turn any location into a check-in zone.' },
  { t: 'Know who’s in. Instantly.', s: 'For example, 42 of 50 checked in, each one verified by face and location.' },
  { t: 'One team. Finally in tune.', s: 'Every check-in, request and payslip, connected.' },
];

function Caption({ i, p }: { i: number; p: MotionValue<number> }) {
  const c = [0.06, 0.34, 0.62, 0.9][i];
  const isLast = i === captions.length - 1;
  const opacity = useTransform(p, isLast ? [c - 0.08, c] : i === 0 ? [0, c + 0.12, c + 0.18] : [c - 0.08, c, c + 0.14, c + 0.2], isLast ? [0, 1] : i === 0 ? [1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(p, [c - 0.08, c], [24, 0]);
  return (
    <m.div className="absolute inset-x-0 bottom-0 px-4 text-center" style={{ opacity, y: i === 0 ? 0 : y }}>
      {i === 0 ? (
        <h2 id="swarm-title" className="text-balance text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
          {captions[i].t}
        </h2>
      ) : (
        <p className="text-balance text-3xl font-extrabold tracking-[-0.035em] text-white sm:text-5xl">{captions[i].t}</p>
      )}
      <p className="mx-auto mt-3 max-w-lg text-sm text-white/55 sm:text-lg">{captions[i].s}</p>
    </m.div>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const wide = useMedia('(min-width: 768px)');
  const counter = useTransform(p, [0.56, 0.62], [0, 1]);
  return (
    <>
      <div className="absolute inset-x-0 bottom-[22svh] top-[12svh] sm:bottom-[24svh] sm:top-[14svh]">
        <Canvas p={p} count={wide ? 1600 : 800} />
      </div>
      <m.div style={{ opacity: counter }} className="absolute left-1/2 top-[11svh] -translate-x-1/2 whitespace-nowrap rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-semibold text-white/80">
        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-live" /> Example: 42 in · 3 late · 4 on leave
      </m.div>
      <div className="absolute inset-x-0 bottom-[6svh] h-[16svh]">
        {captions.map((_, i) => (
          <Caption key={i} i={i} p={p} />
        ))}
      </div>
    </>
  );
}

export function Swarm() {
  return (
    <PinnedScene length={4} label="swarm-title" className="relative bg-ink" stageClassName="bg-ink">
      {(p) => <Stage p={p} />}
    </PinnedScene>
  );
}

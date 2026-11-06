'use client';

import Image from 'next/image';
import { m, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion';
import { useState } from 'react';
import { Check, Moon, Sun } from 'lucide-react';
import { stories } from '@/lib/content';
import { PinnedScene } from './scroll';

/*
 * The Day: scrolling winds a 24-hour clock. The time ticks minute by minute, a sun travels the dial
 * around the phone, and each moment of the working day lights up one feature.
 */

const EASE = [0.16, 1, 0.3, 1] as const;
const DAY_START = 7 * 60 + 30;
const DAY_END = 24 * 60 - 1;
// Scroll share per moment is equal, whatever the clock gap between them.
const KEYS = stories.map((_, i) => 0.1 + i * (0.8 / (stories.length - 1)));

// Noon at the top, midnight at the bottom: the sun rises at 06 (left), peaks at 12, sets at 18 (right).
const r2 = (n: number) => Math.round(n * 100) / 100;
const angleOf = (m: number) => ((m - 720) / 1440) * Math.PI * 2 - Math.PI / 2;
const fmt = (m: number) => {
  const h = Math.floor(m / 60) % 24;
  const mm = Math.floor(m % 60);
  return `${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
};

/** One odometer digit: a 0–9 strip that slides to the value. Nothing mounts or unmounts, so fast scrolling can't strand it. */
function Digit({ ch }: { ch: string }) {
  const n = Number(ch);
  return (
    <span className="relative inline-block h-[1.08em] w-[0.62em] overflow-hidden align-top" aria-hidden>
      <m.span className="absolute inset-x-0 top-0 flex flex-col" animate={{ y: `${-n * 10}%` }} transition={{ duration: 0.3, ease: EASE }}>
        {Array.from({ length: 10 }, (_, d) => (
          <span key={d} className="block h-[1.08em] text-center leading-[1.08em]">
            {d}
          </span>
        ))}
      </m.span>
    </span>
  );
}

function Clock({ time }: { time: string }) {
  return (
    <div className="font-extrabold leading-none tracking-[-0.04em] text-ink tabular-nums" aria-label={`Time ${time}`}>
      {time.split('').map((c, i) => (c === ':' ? <span key={i} className="inline-block w-[0.3em] text-center leading-[1.08em] text-ink/30">:</span> : <Digit key={i} ch={c} />))}
    </div>
  );
}

function Dial({ minutes, idx }: { minutes: MotionValue<number>; idx: number }) {
  const R = 180;
  const C = 200;
  const arc = useTransform(minutes, (m) => m / 1440);
  const sx = useTransform(minutes, (m) => C + Math.cos(angleOf(m)) * R);
  const sy = useTransform(minutes, (m) => C + Math.sin(angleOf(m)) * R);
  const left = useTransform(sx, (v) => `${v / 4}%`);
  const top = useTransform(sy, (v) => `${v / 4}%`);
  const [night, setNight] = useState(false);
  useMotionValueEvent(minutes, 'change', (m) => setNight(m < 6 * 60 || m > 19 * 60));
  return (
    <div className="relative aspect-square h-full max-h-full">
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" aria-hidden>
        <circle cx={C} cy={C} r={R} fill="none" stroke="#e4e4e7" strokeWidth="2" />
        {Array.from({ length: 96 }, (_, i) => {
          const a = angleOf(i * 15);
          const major = i % 24 === 0;
          const hour = i % 4 === 0;
          const r1 = R - (major ? 16 : hour ? 10 : 5);
          return (
            <line
              key={i}
              x1={r2(C + Math.cos(a) * r1)}
              y1={r2(C + Math.sin(a) * r1)}
              x2={r2(C + Math.cos(a) * (R - 1))}
              y2={r2(C + Math.sin(a) * (R - 1))}
              stroke={major ? '#0a0a0a' : '#a1a1aa'}
              strokeWidth={major ? 2 : 1}
            />
          );
        })}
        {['00', '06', '12', '18'].map((t, i) => {
          const a = angleOf(i * 360);
          return (
            <text key={t} x={r2(C + Math.cos(a) * (R - 30))} y={r2(C + Math.sin(a) * (R - 30) + 4)} textAnchor="middle" fontSize="11" fontWeight="700" fill="#71717a">
              {t}
            </text>
          );
        })}
        {/* elapsed day */}
        <m.circle
          cx={C}
          cy={C}
          r={R}
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(90 ${C} ${C})`}
          style={{ pathLength: arc }}
        />
        {/* moments on the ring */}
        {stories.map((s, i) => {
          const a = angleOf(s.at);
          const done = i <= idx;
          return (
            <g key={s.key}>
              <circle cx={r2(C + Math.cos(a) * R)} cy={r2(C + Math.sin(a) * R)} r={done ? 7 : 5} fill={done ? '#0a0a0a' : '#fff'} stroke="#0a0a0a" strokeWidth="2" />
            </g>
          );
        })}
      </svg>

      {/* the sun (or moon) riding the ring */}
      <m.div className="absolute z-20 -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] sm:h-11 sm:w-11">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink/40" />
          {night ? <Moon className="relative h-4 w-4 sm:h-5 sm:w-5" /> : <Sun className="relative h-4 w-4 sm:h-5 sm:w-5" />}
        </span>
      </m.div>

      {/* phone in the middle of the dial */}
      <div className="absolute left-1/2 top-1/2 h-[66%] -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-full" style={{ aspectRatio: '838 / 1756' }}>
          {stories.map((st, i) => (
            <m.div
              key={st.key}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, rotateY: i === idx ? 0 : i < idx ? 70 : -70, scale: i === idx ? 1 : 0.9 }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ transformPerspective: 1200 }}
              aria-hidden={i !== idx}
            >
              <Image src={st.screen} alt={st.alt} width={838} height={1756} sizes="(min-width: 1024px) 300px, 30vw" className="h-full w-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]" />
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stage({ p }: { p: MotionValue<number> }) {
  const minutes = useTransform(p, [0, ...KEYS, 1], [DAY_START, ...stories.map((s) => s.at), DAY_END]);
  const [time, setTime] = useState(fmt(DAY_START));
  const [idx, setIdx] = useState(0);
  useMotionValueEvent(minutes, 'change', (m) => {
    setTime(fmt(m));
    let i = 0;
    for (let k = 0; k < stories.length; k++) if (m >= stories[k].at - 25) i = k;
    setIdx(i);
  });
  return (
    <div className="relative mx-auto flex h-full max-w-7xl flex-col gap-4 px-4 pb-6 pt-24 sm:px-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16 lg:px-8 lg:pb-8 lg:pt-24">
      <div className="order-2 min-h-0 lg:order-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
          <span id="features-title">A day with TeamTuned</span> · {String(idx + 1).padStart(2, '0')}/{String(stories.length).padStart(2, '0')}
        </p>
        <div className="mt-2 text-[3.4rem] sm:text-7xl lg:text-[clamp(5rem,13svh,8.5rem)]">
          <Clock time={time} />
        </div>
        <div className="grid">
          {stories.map((story, i) => (
            <m.div
              key={story.key}
              className="[grid-area:1/1]"
              initial={false}
              animate={{ opacity: i === idx ? 1 : 0, y: i === idx ? 0 : i < idx ? -14 : 18 }}
              transition={{ duration: 0.45, ease: EASE }}
              aria-hidden={i !== idx}
              style={{ pointerEvents: i === idx ? 'auto' : 'none' }}
            >
              <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-ink lg:mt-6">{story.eyebrow}</p>
              <h3 className="mt-2 text-balance text-2xl font-extrabold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl lg:text-5xl">{story.title}</h3>
              <p className="mt-3 line-clamp-3 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:text-base lg:mt-4 lg:line-clamp-none lg:text-lg">{story.body}</p>
              <ul className="mt-5 hidden space-y-2.5 lg:block">
                {story.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-3 font-semibold text-ink">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </m.div>
          ))}
        </div>
      </div>
      <div className="order-1 flex h-[40svh] justify-center lg:order-2 lg:h-[min(66svh,44vw)]">
        <Dial minutes={minutes} idx={idx} />
      </div>
    </div>
  );
}

export function TheDay() {
  return (
    <PinnedScene id="features" length={7} label="features-title" className="relative bg-white" stageClassName="bg-white">
      {(p) => (
        <>
          <div className="grid-light mask-radial pointer-events-none absolute inset-0 opacity-60" aria-hidden />
          <Stage p={p} />
        </>
      )}
    </PinnedScene>
  );
}

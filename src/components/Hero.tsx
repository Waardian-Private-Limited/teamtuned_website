'use client';

import Image from 'next/image';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useDemo } from './DemoDialog';
import { Container, LiveDot, cx } from './ui';

const POINTS = ['Live demo on your setup', 'Free trial with your team', 'Web, Android & iOS'];

/** Work email in, popup out: the email carries into the full form so the visitor never types it twice. */
function EmailStart() {
  const openDemo = useDemo();
  const [email, setEmail] = useState('');
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        openDemo({ source: 'hero', email: email.trim() });
      }}
      aria-label="Book a demo"
      className="flex w-full max-w-xl flex-col gap-2 rounded-[1.4rem] border border-white/15 bg-white/[0.06] p-2 backdrop-blur transition-colors focus-within:border-white/35 sm:flex-row sm:items-center sm:rounded-full"
    >
      <label htmlFor="hero-email" className="sr-only">
        Work email
      </label>
      <input
        id="hero-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your work email"
        className="h-12 min-w-0 rounded-full bg-transparent px-4 sm:flex-1 text-[15px] text-white outline-none placeholder:text-white/40"
      />
      <button
        type="submit"
        className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-ink transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Book a demo
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      </button>
    </form>
  );
}

const PROOF = [
  ['Face matched', 'Liveness passed'],
  ['Inside geofence', 'Main site · 24 m from centre'],
  ['Registered phone', 'Device verified'],
  ['Hours to payroll', 'Checked in at 09:24'],
] as const;

/**
 * The product in one card: a check-in being verified line by line, then counted for pay. It loops so the
 * visitor sees the proof happen; with reduced motion it simply shows the finished check.
 */
function ProofCard() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(reduce ? PROOF.length : 0);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setStep((s) => (s >= PROOF.length ? 0 : s + 1)), step === 0 ? 700 : step >= PROOF.length ? 3200 : 850);
    return () => clearTimeout(t);
  }, [step, reduce]);

  const done = step >= PROOF.length;
  return (
    <div className="w-[280px] rounded-3xl bg-white p-4 text-ink shadow-[0_40px_90px_-20px_rgba(0,0,0,0.7)] ring-1 ring-black/5 sm:w-[300px] sm:p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">AM</span>
        <span className="min-w-0 flex-1 leading-tight">
          <b className="block text-[15px] font-bold">Alex Morgan</b>
          <small className="block text-xs text-muted">Example · Field team · Main site</small>
        </span>
        <span className={cx('rounded-full px-2.5 py-1 text-xs font-bold transition-colors duration-500', done ? 'bg-ink text-white' : 'bg-mist text-muted')}>
          {done ? 'Verified' : 'Checking'}
        </span>
      </div>
      <ul className="mt-4 space-y-2.5">
        {PROOF.map(([title, sub], i) => {
          const ok = step > i;
          const active = step === i;
          return (
            <li key={title} className="flex items-center gap-3">
              <span
                className={cx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300',
                  ok ? 'bg-ink text-white' : 'bg-mist text-subtle'
                )}
              >
                {ok ? <Check className="h-4 w-4" strokeWidth={3} aria-hidden /> : active ? <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
              </span>
              <span className={cx('min-w-0 leading-tight transition-opacity duration-300', ok || active ? 'opacity-100' : 'opacity-40')}>
                <b className="block text-sm font-bold">{title}</b>
                <small className="block truncate text-xs text-muted">{sub}</small>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-mist">
        <div className="h-full rounded-full bg-ink transition-[width] duration-700 ease-out" style={{ width: `${(Math.min(step, PROOF.length) / PROOF.length) * 100}%` }} />
      </div>
    </div>
  );
}

/** Geofence rings behind the phone: the site the check-in has to happen inside. */
function Rings() {
  return (
    <div className="pointer-events-none absolute left-[58%] top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2" aria-hidden>
      {[0.28, 0.46, 0.64, 0.82, 1].map((s, i) => (
        <span
          key={s}
          className={cx('absolute inset-0 m-auto rounded-full border', i % 2 ? 'border-dashed border-white/[0.07]' : 'border-white/[0.09]')}
          style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
        />
      ))}
      <span className="absolute inset-0 m-auto h-[28%] w-[28%] animate-pulse-ring rounded-full border border-white/20 [animation-duration:3.2s]" />
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const cardY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative overflow-hidden bg-ink pb-16 pt-28 text-white sm:pb-20 sm:pt-36 lg:flex lg:h-svh lg:min-h-[660px] lg:items-center lg:py-0 lg:pt-16">
      <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-10 xl:gap-16">
          {/* Copy and the one action. */}
          <m.div style={{ opacity: copyOpacity }} className="relative z-10 text-center lg:text-left">
            <div className="rise" style={{ '--rise-y': '12px' } as React.CSSProperties}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-xs font-semibold text-white/80">
                <LiveDot /> The proof-of-work HRMS
              </span>
            </div>

            <h1 id="hero-title" className="mt-6 text-balance text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[clamp(2.6rem,min(3.7vw,7svh),4rem)]">
              {['They say they’re on site.', 'TeamTuned proves it.'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  {/* CSS, not JS: the headline slides up on first paint, before the page's scripts load. */}
                  <span
                    className={cx('rise block', i ? '' : 'text-white/55')}
                    style={{ '--rise-y': '105%', '--rise-o': 1, '--d': `${0.1 + i * 0.12}s` } as React.CSSProperties}
                  >
                    {line}
                    {i === 0 && ' '}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="rise mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/60 sm:text-lg lg:mx-0"
              style={{ '--rise-y': '16px', '--rise-o': 1, '--d': '0.35s' } as React.CSSProperties}
            >
              TeamTuned is the proof-of-work HRMS: every check-in, task and site visit comes with proof of face, location and time, and
              attendance, leave and payroll run on that same verified data.
            </p>

            <div className="rise mt-8 flex flex-col items-center gap-4 lg:items-start" style={{ '--rise-y': '16px', '--d': '0.5s' } as React.CSSProperties}>
              <EmailStart />
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:justify-start">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-sm font-medium text-white/60">
                    <Check className="h-4 w-4 text-white" aria-hidden /> {p}
                  </li>
                ))}
              </ul>
            </div>
          </m.div>

          {/* One story: the check-in on the phone, verified line by line inside the site's geofence. */}
          <div className="relative mx-auto aspect-[1/1] w-full max-w-[520px] lg:max-h-[calc(100svh-150px)] lg:max-w-none">
            <Rings />
            <m.div style={{ y: phoneY }} className="absolute right-[6%] top-[2%] w-[48%] sm:right-[10%]">
              {/* The largest element on first load: it must paint at once, so it moves in but never starts invisible. */}
              {/* Fades in just after the text: the headline copy, not this picture, is what paints first (and counts as LCP). */}
              <div className="rise rotate-[4deg]" style={{ '--rise-y': '40px', '--d': '0.15s' } as React.CSSProperties}>
                <Image
                  src="/screens/phone-checkin.webp"
                  alt="Face check-in on the TeamTuned app with face match, geofence and registered device checks"
                  width={838}
                  height={1756}
                  priority
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 260px, 48vw"
                  className="h-auto w-full drop-shadow-[0_50px_80px_rgba(0,0,0,0.7)]"
                />
              </div>
            </m.div>
            <m.div style={{ y: cardY }} className="absolute bottom-[6%] left-0 z-10 origin-bottom-left scale-[0.86] sm:scale-100 lg:bottom-[10%]">
              <div className="rise" style={{ '--rise-y': '30px', '--d': '0.7s' } as React.CSSProperties}>
                <ProofCard />
              </div>
            </m.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

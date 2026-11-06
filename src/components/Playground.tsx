'use client';

import { animate, AnimatePresence, m, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Check, Hand, MapPin, RotateCcw, ScanFace, X } from 'lucide-react';
import { Reveal } from './motion';
import { Container, SectionHead, cx } from './ui';

const EASE = [0.16, 1, 0.3, 1] as const;
const FENCE_M = 150; // geofence radius in metres

/* ───────────────────────── Geofence check-in ───────────────────────── */

function GeofenceDemo() {
  const box = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [meters, setMeters] = useState(999);
  const [moved, setMoved] = useState(false);
  const [checked, setChecked] = useState<string | null>(null);
  const inside = meters <= FENCE_M;

  // Start the avatar outside the fence, bottom right.
  useEffect(() => {
    const b = box.current;
    if (!b) return;
    x.set(b.clientWidth * 0.3);
    y.set(b.clientHeight * 0.28);
  }, [x, y]);

  const measure = () => {
    const b = box.current;
    if (!b) return;
    const rPx = b.clientWidth * 0.2;
    const d = Math.hypot(x.get(), y.get());
    setMeters(Math.round((d / rPx) * FENCE_M));
  };
  useMotionValueEvent(x, 'change', measure);
  useMotionValueEvent(y, 'change', measure);

  useEffect(() => {
    if (!inside) setChecked(null);
  }, [inside]);

  const nudge = (dx: number, dy: number) => {
    const b = box.current;
    if (!b) return;
    const mx = b.clientWidth / 2 - 24;
    const my = b.clientHeight / 2 - 24;
    animate(x, Math.max(-mx, Math.min(mx, x.get() + dx)), { duration: 0.2 });
    animate(y, Math.max(-my, Math.min(my, y.get() + dy)), { duration: 0.2 });
    setMoved(true);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Try it · Geofence</p>
          <h3 className="text-lg font-bold tracking-tight text-ink">Walk into the site to check in</h3>
        </div>
        <span className={cx('rounded-full px-3 py-1 text-xs font-bold transition-colors', inside ? 'bg-live/10 text-live' : 'bg-alert/10 text-alert')}>
          {inside ? 'Inside' : 'Outside'}
        </span>
      </div>

      <div ref={box} className="relative min-h-[220px] flex-1 touch-none overflow-hidden bg-[#ececee]">
        {/* city blocks */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <pattern id="blocks" width="70" height="70" patternUnits="userSpaceOnUse">
              <rect x="7" y="7" width="56" height="56" rx="8" fill="#e0e0e3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blocks)" />
        </svg>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path d="M-5 80 Q 40 60, 105 75" stroke="#fff" strokeWidth="16" fill="none" vectorEffect="non-scaling-stroke" />
          <path d="M65 -5 L 55 105" stroke="#fff" strokeWidth="12" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* the fence */}
        <m.div
          className="absolute left-1/2 top-1/2 aspect-square w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed"
          animate={{ borderColor: inside ? '#16a34a' : '#0a0a0a', backgroundColor: inside ? 'rgba(22,163,74,0.12)' : 'rgba(10,10,10,0.05)', scale: inside ? 1.04 : 1 }}
          transition={{ duration: 0.4 }}
          aria-hidden
        />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center" aria-hidden>
          <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold text-white">Head Office</span>
          <MapPin className="h-5 w-5 fill-ink text-white" />
        </div>

        {/* you */}
        <m.button
          type="button"
          drag
          dragConstraints={box}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={() => setMoved(true)}
          onKeyDown={(e) => {
            const s = 24;
            if (e.key === 'ArrowLeft') nudge(-s, 0);
            else if (e.key === 'ArrowRight') nudge(s, 0);
            else if (e.key === 'ArrowUp') nudge(0, -s);
            else if (e.key === 'ArrowDown') nudge(0, s);
            else return;
            e.preventDefault();
          }}
          aria-label={`You, ${meters} metres from Head Office. Drag, or use arrow keys to move.`}
          className="absolute left-1/2 top-1/2 z-10 -ml-6 -mt-6 flex h-12 w-12 cursor-grab items-center justify-center rounded-full bg-ink text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-4 ring-white active:cursor-grabbing"
          style={{ x, y }}
          whileDrag={{ scale: 1.12 }}
        >
          You
          {!moved && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-ink/50" aria-hidden />}
        </m.button>

        {!moved && (
          <m.span
            className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-ink shadow"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <Hand className="h-3.5 w-3.5" aria-hidden /> Drag “You” into the circle
          </m.span>
        )}
      </div>

      {/* phone-style check-in panel */}
      <div className="border-t border-line p-4" aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          {checked ? (
            <m.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 14 }} className="flex h-11 w-11 items-center justify-center rounded-full bg-live text-white">
                <Check className="h-5 w-5" strokeWidth={3} />
              </m.span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-ink">Checked in at {checked}</p>
                <p className="text-xs text-muted">Face matched · inside geofence · registered phone</p>
              </div>
              <button type="button" onClick={() => setChecked(null)} className="rounded-full p-2 text-muted hover:bg-mist hover:text-ink" aria-label="Reset demo">
                <RotateCcw className="h-4 w-4" />
              </button>
            </m.div>
          ) : (
            <m.div key="cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className={cx('font-bold', inside ? 'text-ink' : 'text-alert')}>{inside ? 'You’re on site' : 'Outside the site'}</p>
                <p className="truncate text-xs text-muted">
                  {meters < 999 ? `${meters} m from Head Office · fence ${FENCE_M} m` : 'Locating…'}
                </p>
              </div>
              <button
                type="button"
                disabled={!inside}
                onClick={() => setChecked(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-all enabled:hover:bg-ink-2 disabled:bg-line disabled:text-subtle"
              >
                <ScanFace className="h-4 w-4" aria-hidden /> Check in
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── Swipe to approve ───────────────────────── */

const REQUESTS = [
  { id: 1, who: 'Maya Chen', initials: 'MC', kind: 'Leave', what: 'Annual leave · 2 days', when: 'Wed 18 – Thu 19 Nov · family event' },
  { id: 2, who: 'Leo Martins', initials: 'LM', kind: 'Attendance', what: 'Missed check-out', when: 'Out at 6:42 PM · client visit ran late' },
  { id: 3, who: 'Aisha Khan', initials: 'AK', kind: 'Expense', what: 'Travel claim', when: 'Cab to client site · 2 bills attached' },
  { id: 4, who: 'Daniel Okafor', initials: 'DO', kind: 'Advance', what: 'Salary advance', when: 'Recover in 3 instalments' },
  { id: 5, who: 'Sofia Rossi', initials: 'SR', kind: 'Shift swap', what: 'Night → General shift', when: 'Mon 2 Nov · swap with Leo' },
];
type Req = (typeof REQUESTS)[number];

function SwipeCard({ req, depth, onDone, force }: { req: Req; depth: number; onDone: (ok: boolean) => void; force: number }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-18, 18]);
  const yes = useTransform(x, [30, 120], [0, 1]);
  const no = useTransform(x, [-120, -30], [1, 0]);
  const top = depth === 0;
  const gone = useRef(false);

  const fly = (dir: 1 | -1) => {
    if (gone.current) return;
    gone.current = true;
    animate(x, dir * 700, { duration: 0.35, ease: 'easeIn' }).then(() => onDone(dir === 1));
  };

  // Buttons below the deck send the top card off too.
  useEffect(() => {
    if (top && force !== 0) fly(force > 0 ? 1 : -1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [force]);

  return (
    <m.div
      className={cx('absolute inset-0 rounded-3xl border border-line bg-white p-5 shadow-[0_24px_50px_-24px_rgba(0,0,0,0.35)]', top ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none')}
      style={{ x, rotate, zIndex: 10 - depth }}
      initial={false}
      animate={{ scale: 1 - depth * 0.05, y: depth * 14, opacity: depth > 2 ? 0 : 1 }}
      transition={{ duration: 0.35, ease: EASE }}
      drag={top ? 'x' : false}
      onDragEnd={(_, info) => {
        if (info.offset.x > 110 || info.velocity.x > 600) fly(1);
        else if (info.offset.x < -110 || info.velocity.x < -600) fly(-1);
        else animate(x, 0, { type: 'spring', stiffness: 400, damping: 30 });
      }}
      aria-hidden={!top}
    >
      <m.span style={{ opacity: yes }} className="absolute right-5 top-5 rotate-12 rounded-lg border-2 border-live px-2 py-0.5 text-sm font-extrabold tracking-wider text-live">APPROVED</m.span>
      <m.span style={{ opacity: no }} className="absolute left-5 top-5 -rotate-12 rounded-lg border-2 border-alert px-2 py-0.5 text-sm font-extrabold tracking-wider text-alert">REJECTED</m.span>
      <div className="mt-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-sm font-bold text-white">{req.initials}</span>
        <div className="min-w-0">
          <p className="font-bold text-ink">{req.who}</p>
          <p className="text-xs text-muted">Level 1 of 2 · just now</p>
        </div>
        <span className="ml-auto rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink">{req.kind}</span>
      </div>
      <p className="mt-5 text-xl font-bold tracking-tight text-ink">{req.what}</p>
      <p className="mt-1 text-sm text-muted">{req.when}</p>
    </m.div>
  );
}

function SwipeDeck() {
  const [queue, setQueue] = useState<Req[]>(REQUESTS);
  const [log, setLog] = useState<Array<{ id: number; ok: boolean; who: string }>>([]);
  const [force, setForce] = useState(0);
  const logSeq = useRef(0);

  /* Side effects stay out of state updaters: StrictMode runs updaters twice. */
  const done = (ok: boolean) => {
    const first = queue[0];
    if (!first) return;
    setQueue((q) => (q[0]?.id === first.id ? q.slice(1) : q));
    setLog((l) => [{ id: ++logSeq.current, ok, who: first.who.split(' ')[0] }, ...l].slice(0, 5));
    setForce(0);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">Try it · Approvals</p>
          <h3 className="text-lg font-bold tracking-tight text-ink">Swipe right to approve</h3>
        </div>
        <m.span key={queue.length} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">
          {queue.length} waiting
        </m.span>
      </div>

      <div className="relative min-h-[220px] flex-1 bg-mist p-5 sm:p-6">
        <div className="relative mx-auto h-full max-w-sm">
          <AnimatePresence>
            {queue.length === 0 && (
              <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <m.span initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 15 }} className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
                  <Check className="h-7 w-7" strokeWidth={3} />
                </m.span>
                <p className="mt-4 text-xl font-extrabold text-ink">Inbox zero.</p>
                <p className="text-sm text-muted">That took you seconds, not a morning.</p>
                <button type="button" onClick={() => { setQueue(REQUESTS); setLog([]); }} className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink hover:bg-mist">
                  <RotateCcw className="h-4 w-4" /> Again
                </button>
              </m.div>
            )}
          </AnimatePresence>
          {queue.slice(0, 3).map((r, i) => (
            <SwipeCard key={r.id} req={r} depth={i} onDone={done} force={i === 0 ? force : 0} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 border-t border-line p-4">
        <button type="button" disabled={!queue.length} onClick={() => setForce(-1)} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full border border-line font-bold text-ink transition-colors hover:border-alert hover:text-alert disabled:opacity-40">
          <X className="h-4 w-4" /> Reject
        </button>
        <button type="button" disabled={!queue.length} onClick={() => setForce(1)} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-ink font-bold text-white transition-colors hover:bg-ink-2 disabled:opacity-40">
          <Check className="h-4 w-4" /> Approve
        </button>
      </div>
      <div className="flex h-9 items-center gap-1.5 overflow-hidden px-4 pb-3" aria-live="polite">
        <AnimatePresence initial={false}>
          {log.map((l) => (
            <m.span key={l.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={cx('shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold', l.ok ? 'bg-live/10 text-live' : 'bg-alert/10 text-alert')}>
              {l.ok ? '✓' : '✕'} {l.who}
            </m.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Playground() {
  return (
    <section id="playground" aria-labelledby="playground-title" className="screen-fit relative bg-white py-24 sm:py-32">
      <Container>
        <SectionHead id="playground-title" eyebrow="Hands on" title="Don’t take our word for it. Try it." sub="Two real TeamTuned moments, right here, with example data. No sign-up." />
        <Reveal className="mt-10 grid gap-4 lg:mt-10 lg:h-[min(560px,calc(100svh-330px))] lg:min-h-[440px] lg:grid-cols-2">
          <div className="h-[460px] lg:h-full">
            <GeofenceDemo />
          </div>
          <div className="h-[500px] lg:h-full">
            <SwipeDeck />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

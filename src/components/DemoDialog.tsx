'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
import { DemoForm, rememberUtm } from './DemoForm';
import { LiveDot } from './ui';

type Open = (opts?: { source?: string; email?: string }) => void;
const DemoContext = createContext<Open>(() => {});

/** Opens the demo popup from any component: `const openDemo = useDemo(); openDemo({ source: 'hero', email })`. */
export const useDemo = () => useContext(DemoContext);

const POINTS = ['A live demo on your own setup', 'A free trial with your team', 'Employee import and onboarding help'];

/**
 * Every "Book a demo" opens one popup instead of scrolling to the bottom, so the visitor keeps their place.
 * Links to "#demo" anywhere (header, footer, other pages, the QR on the business card) open it too; the
 * link's `data-demo-source` says which button it was. Must sit inside Providers so this click handler runs
 * before the in-page scroll handler.
 */
export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ source: string; email: string; key: number } | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openDemo = useCallback<Open>((opts = {}) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setState({ source: opts.source || 'link', email: opts.email || '', key: Date.now() });
  }, []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    rememberUtm();
    // Arriving on /#demo (a shared link or the business card QR): open the popup over the top of the page,
    // not over the last section the browser would jump to.
    if (location.hash === '#demo') {
      history.replaceState(null, '', location.pathname + location.search);
      requestAnimationFrame(() => window.scrollTo(0, 0));
      openDemo({ source: 'direct_link' });
    }
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || !/^\/?#demo$/.test(a.getAttribute('href') || '')) return;
      e.preventDefault();
      openDemo({ source: a.dataset.demoSource || 'link' });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [openDemo]);

  // Esc closes; the page behind does not scroll; focus goes back to the button that opened it.
  useEffect(() => {
    if (!state) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    // Touch screens: put focus on the dialog itself (the form does not autofocus there).
    if (!window.matchMedia('(pointer: fine)').matches) dialogRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
      returnFocus.current?.focus?.({ preventScroll: true });
    };
  }, [state, close]);

  return (
    <DemoContext.Provider value={openDemo}>
      {/* While the popup is open the page behind is inert: Tab stays inside the dialog and screen readers skip the page. */}
      <div className="contents" inert={!!state}>
        {children}
      </div>
      <AnimatePresence>
        {state && (
          <m.div
            key="demo-dialog"
            className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} aria-hidden />
            <m.div
              ref={dialogRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-dialog-title"
              className="relative flex max-h-[100svh] w-full max-w-4xl flex-col overflow-hidden outline-none rounded-t-[1.75rem] bg-ink text-white shadow-[0_40px_120px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 sm:max-h-[min(92svh,820px)] sm:rounded-[1.75rem] md:flex-row"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Why book: a short side panel on wide screens, a single line on phones. */}
              <div className="relative hidden w-[38%] shrink-0 overflow-hidden border-r border-white/10 p-8 md:flex md:flex-col">
                <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
                <span className="relative inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-semibold text-white/80">
                  <LiveDot /> Book a demo
                </span>
                <p className="relative mt-6 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">See TeamTuned on your own team.</p>
                <ul className="relative mt-8 space-y-3.5">
                  {POINTS.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm font-semibold text-white/80">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden /> {p}
                    </li>
                  ))}
                </ul>
                <p className="relative mt-auto pt-8 text-xs leading-relaxed text-white/45">Face check-in, geofencing, photo-proof tasks, tracking, leave and payroll in one app.</p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto p-6 pt-7 sm:p-8">
                <h2 id="demo-dialog-title" className="pr-10 text-2xl font-extrabold tracking-[-0.02em]">
                  Book your demo
                </h2>
                <p className="mt-1.5 text-sm text-white/55">Tell us a little about your team. We’ll reply within one working day.</p>
                <div className="mt-6">
                  <DemoForm key={state.key} source={state.source} initialEmail={state.email} idPrefix="dlg" autoFocus />
                </div>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </DemoContext.Provider>
  );
}

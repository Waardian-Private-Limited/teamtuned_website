'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { APP_URL, nav } from '@/lib/site';
import { Logo, cx } from './ui';

/** Sticky header. Starts transparent over the dark hero, turns into a white glass bar once scrolled. */
export function Header({ overDark = true }: { overDark?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();

  // Scroll spy: the section crossing the middle of the screen decides the active nav item.
  // Sections outside the nav (hero, managers, demo…) clear it.
  useEffect(() => {
    if (pathname !== '/') return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      const sec = Array.from(document.querySelectorAll<HTMLElement>('main > section, main > div')).find((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= mid && r.bottom > mid;
      });
      setActive(sec?.id || null);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const dark = overDark && !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cx(
          'mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500 sm:h-16 sm:pl-6',
          dark ? 'bg-transparent' : 'bg-white/80 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5 backdrop-blur-xl'
        )}
      >
        <Link href="/" aria-label="TeamTuned home" onClick={() => setOpen(false)}>
          <Logo dark={dark} className="h-6 sm:h-7" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => {
            // Section links are active while their section is on screen (home only); page links on their own page.
            const hash = n.href.split('#')[1];
            const current = hash ? active === hash : pathname === n.href;
            return (
              <Link
                key={n.href}
                href={n.href}
                aria-current={current ? (hash ? 'location' : 'page') : undefined}
                className={cx(
                  'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                  dark ? 'text-white/75 hover:bg-white/10 hover:text-white' : 'text-muted hover:bg-mist hover:text-ink',
                  current && (dark ? 'bg-white/10 text-white' : 'bg-ink text-white hover:bg-ink hover:text-white')
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={`${APP_URL}/login`}
            className={cx(
              'hidden rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:inline-flex',
              dark ? 'text-white/80 hover:text-white' : 'text-ink hover:bg-mist'
            )}
          >
            Log in
          </a>
          <Link
            href="/#demo"
            data-demo-source="header"
            className={cx(
              'inline-flex h-11 items-center rounded-full px-4 text-sm font-semibold transition-colors sm:px-5',
              dark ? 'bg-white text-ink hover:bg-white/90' : 'bg-ink text-white hover:bg-ink-2'
            )}
          >
            Book a demo
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className={cx(
              'flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
              dark ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-mist'
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl bg-white p-3 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5 lg:hidden"
          >
            {nav.map((n, i) => (
              <m.div key={n.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                <Link href={n.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3.5 text-lg font-bold text-ink hover:bg-mist">
                  {n.label}
                </Link>
              </m.div>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
              <a href={`${APP_URL}/login`} className="flex h-12 items-center justify-center rounded-full border border-line font-semibold text-ink">
                Log in
              </a>
              <Link href="/#demo" data-demo-source="mobile_menu" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center rounded-full bg-ink font-semibold text-white">
                Book a demo
              </Link>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

'use client';

import { animate, LazyMotion, m, MotionConfig, useInView, useMotionValue, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { DemoProvider } from './DemoDialog';

// Every animated element uses `m.*`; the animation engine itself arrives in a separate chunk after first paint.
const loadMotionFeatures = () => import('./motion-features').then((r) => r.default);

export function Providers({ children }: { children: React.ReactNode }) {
  useHashLinks();
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <DemoProvider>{children}</DemoProvider>
      </MotionConfig>
    </LazyMotion>
  );
}

/**
 * Every in-page link ("/#modules", "#demo") on the home page scrolls so the section's top meets the top of
 * the screen. Sections pad themselves for the floating header, so no offset is needed. Handled once here
 * for header, footer and buttons alike; on other pages the link navigates home normally.
 */
function useHashLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]');
      const href = a?.getAttribute('href') ?? '';
      const m = href.match(/^\/?#([\w-]+)$/);
      if (!m || location.pathname !== '/') return;
      const el = document.getElementById(m[1]);
      if (!el) return;
      e.preventDefault();
      // A just-closed mobile menu may still be holding the page scroll lock.
      document.documentElement.style.overflow = '';
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      requestAnimationFrame(() => {
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: smooth ? 'smooth' : 'auto' });
        history.replaceState(null, '', `#${m[1]}`);
      });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);
}

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its child in once, when it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

const group: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/** A list whose children stagger in. Children must be <StaggerItem>. */
export function Stagger({ children, className, as = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'ul' }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={group} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -10% 0px' }}>
      {children}
    </Tag>
  );
}

export function StaggerItem({ children, className, as = 'div' }: { children: React.ReactNode; className?: string; as?: 'div' | 'li' }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}

/** Headline that rises word by word. */
export function WordsUp({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <m.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.06 }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </m.span>
        </span>
      ))}
    </span>
  );
}

/** Counts up to `to` when it enters view. */
export function CountUp({ to, suffix = '', className }: { to: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  // Starts at the final number, so the page HTML (and anyone without JavaScript) reads "18+", not "0+".
  const value = useMotionValue(to);
  const text = useTransform(value, (v) => `${Math.round(v)}${suffix}`);
  useEffect(() => {
    if (!inView || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    value.set(0);
    const c = animate(value, to, { duration: 1.6, ease: EASE });
    return () => c.stop();
  }, [inView, to, value]);
  return (
    <m.span ref={ref} className={className}>
      {text}
    </m.span>
  );
}

/** Red strike that draws across its parent text once in view. */
export function StrikeLine({ delay = 0 }: { delay?: number }) {
  return (
    <m.span
      aria-hidden
      className="absolute left-0 top-1/2 h-[2px] w-full origin-left -translate-y-1/2 bg-alert/70"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    />
  );
}

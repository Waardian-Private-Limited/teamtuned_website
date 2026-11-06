import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';

export const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ');

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={cx(
        'inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]',
        dark ? 'border border-white/15 bg-white/[0.06] text-white/80' : 'border border-line bg-mist text-ink'
      )}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  dark,
  align = 'center',
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
  /** 'split' centres on small screens and aligns left from lg, for two-column bands. */
  align?: 'center' | 'left' | 'split';
  id?: string;
}) {
  return (
    <div className={cx('max-w-3xl', align === 'center' && 'mx-auto text-center', align === 'split' && 'mx-auto text-center lg:mx-0 lg:text-left')}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className={cx(
          'mt-4 text-balance text-[2rem] font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.25rem]',
          dark ? 'text-white' : 'text-ink'
        )}
      >
        {title}
      </h2>
      {sub && <p className={cx('mt-4 text-pretty text-base leading-relaxed sm:text-lg', dark ? 'text-white/60' : 'text-muted')}>{sub}</p>}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  dark,
  className,
  arrow,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'ghost';
  dark?: boolean;
  className?: string;
  arrow?: boolean;
  external?: boolean;
}) {
  const base =
    'group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';
  const style =
    variant === 'primary'
      ? dark
        ? 'bg-white text-ink hover:bg-white/90 focus-visible:outline-white'
        : 'bg-ink text-white hover:bg-ink-2 focus-visible:outline-ink'
      : dark
        ? 'border border-white/20 text-white hover:border-white/40 hover:bg-white/[0.06] focus-visible:outline-white'
        : 'border border-line text-ink hover:border-ink/30 hover:bg-mist focus-visible:outline-ink';
  const content = (
    <>
      {children}
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />}
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cx(base, style, className)}>
      {content}
    </a>
  ) : (
    <Link href={href} className={cx(base, style, className)}>
      {content}
    </Link>
  );
}

export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    <Image
      src={dark ? '/brand/logo-white.png' : '/brand/logo-black.png'}
      alt="TeamTuned"
      width={640}
      height={128}
      // Loaded eagerly but not preloaded, so it never competes with the hero image for bandwidth.
      loading="eager"
      sizes="160px"
      className={cx('h-7 w-auto sm:h-8', className)}
    />
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
      <path d="M16.37 12.62c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.27-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.96-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.66zM14.1 5.86c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path d="M3.6 2.3 13.4 12l-9.8 9.7c-.35-.2-.6-.6-.6-1.1V3.4c0-.5.25-.9.6-1.1z" fill="currentColor" opacity=".9" />
      <path d="m16.6 8.8-3.2 3.2 3.2 3.2 3.7-2.1c.9-.5.9-1.7 0-2.2z" fill="currentColor" opacity=".7" />
      <path d="M3.6 2.3c.3-.2.8-.2 1.2 0l11.8 6.5-3.2 3.2z" fill="currentColor" />
      <path d="M13.4 12l3.2 3.2-11.8 6.5c-.4.2-.9.2-1.2 0z" fill="currentColor" opacity=".8" />
    </svg>
  );
}

export function StoreBadges({ dark, className }: { dark?: boolean; className?: string }) {
  const cls = cx(
    'inline-flex h-12 items-center gap-2.5 rounded-xl px-4 transition-colors duration-300',
    dark ? 'border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1]' : 'border border-line bg-white text-ink hover:bg-mist'
  );
  return (
    <div className={cx('flex flex-wrap gap-3', className)}>
      <a href={site.appStore} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Download TeamTuned on the App Store">
        <AppleIcon />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-medium opacity-70">Download on the</span>
          <span className="mt-0.5 text-[15px] font-bold">App Store</span>
        </span>
      </a>
      <a href={site.playStore} target="_blank" rel="noopener noreferrer" className={cls} aria-label="Get TeamTuned on Google Play">
        <PlayIcon />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] font-medium opacity-70">Get it on</span>
          <span className="mt-0.5 text-[15px] font-bold">Google Play</span>
        </span>
      </a>
    </div>
  );
}

/** Floating status card, the same shape as the app's in-store callouts. */
export function Callout({ icon, title, sub, className }: { icon: React.ReactNode; title: string; sub: string; className?: string }) {
  return (
    <div className={cx('flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/5', className)}>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white">{icon}</span>
      <span className="flex flex-col leading-tight">
        <b className="whitespace-nowrap text-[15px] font-bold">{title}</b>
        <small className="whitespace-nowrap text-xs text-muted">{sub}</small>
      </span>
    </div>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cx('relative inline-flex h-2 w-2', className)} aria-hidden>
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-live" />
      <span className="relative h-2 w-2 rounded-full bg-live" />
    </span>
  );
}

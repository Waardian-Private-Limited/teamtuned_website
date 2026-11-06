'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { API_BASE, site } from '@/lib/site';
import { cx } from './ui';

const SIZES = ['1–25', '26–100', '101–500', '501–2000', '2000+'];
const UTM_KEY = 'tt_utm';

type Form = { full_name: string; company_name: string; email: string; phone: string; company_size: string; message: string };
const EMPTY: Form = { full_name: '', company_name: '', email: '', phone: '', company_size: '', message: '' };

function validate(f: Form): Partial<Record<keyof Form, string>> {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!f.full_name.trim()) e.full_name = 'Enter your name';
  if (!f.company_name.trim()) e.company_name = 'Enter your company';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = 'Enter a valid work email';
  if (f.phone && !/^[+\d][\d\s()-]{6,19}$/.test(f.phone.trim())) e.phone = 'Enter a valid phone number';
  return e;
}

/** Remembers the ad that brought the visitor (utm_* on the landing URL) for the rest of the visit. */
export function rememberUtm() {
  try {
    const q = new URLSearchParams(location.search);
    const utm = { source: q.get('utm_source'), medium: q.get('utm_medium'), campaign: q.get('utm_campaign') };
    if (utm.source || utm.medium || utm.campaign) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {
    /* storage blocked: attribution is best effort */
  }
}

function storedUtm() {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || 'null');
  } catch {
    return null;
  }
}

function Field({ label, name, error, children }: { label: string; name: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={name} className="block">
        <span className="text-xs font-bold uppercase tracking-[0.12em] text-white/60">{label}</span>
        {children}
      </label>
      {/* Outside the label, so the field's name stays clean; role=alert announces it when it appears. */}
      {error && (
        <span id={`${name}-error`} role="alert" className="mt-1.5 block text-xs font-semibold text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}

const inputCls = (err?: string) =>
  cx(
    'mt-2 h-12 w-full rounded-xl border bg-white/[0.04] px-4 text-[15px] text-white placeholder:text-white/30 outline-none transition-colors focus:bg-white/[0.07]',
    err ? 'border-red-400' : 'border-white/15 focus:border-white/50'
  );

/**
 * The demo request form, used by the popup and the last section. Posts to the backend's public endpoint,
 * which saves the lead, tells the team and emails the visitor what happens next.
 * `idPrefix` keeps field ids unique when the popup and the section are both on the page.
 */
export function DemoForm({ source, initialEmail = '', idPrefix, autoFocus }: { source: string; initialEmail?: string; idPrefix: string; autoFocus?: boolean }) {
  const [form, setForm] = useState<Form>({ ...EMPTY, email: initialEmail });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [firstName, setFirstName] = useState('');
  const firstRef = useRef<HTMLInputElement>(null);
  const id = (k: keyof Form) => `${idPrefix}-${k}`;

  useEffect(() => {
    // Only with a mouse or trackpad: on phones a focused field pops the keyboard over the form before it is read.
    if (autoFocus && window.matchMedia('(pointer: fine)').matches) firstRef.current?.focus({ preventScroll: true });
  }, [autoFocus]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) {
      document.getElementById(id(Object.keys(v)[0] as keyof Form))?.focus();
      return;
    }
    setState('sending');
    setServerError('');
    try {
      const body = {
        ...Object.fromEntries(Object.entries(form).map(([k, val]) => [k, val.trim()])),
        source,
        page_url: location.href.slice(0, 500),
        utm: storedUtm(),
      };
      const res = await fetch(`${API_BASE}/demo/submit`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.field && data.field in EMPTY) setErrors({ [data.field]: data.message });
        throw new Error(data?.message || 'Something went wrong.');
      }
      setFirstName(form.full_name.trim().split(/\s+/)[0] || '');
      setState('done');
      setForm(EMPTY);
    } catch (err) {
      setServerError(err instanceof Error && err.message !== 'Failed to fetch' ? err.message : 'Could not reach us right now.');
      setState('error');
    }
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {state === 'done' ? (
        <m.div key="done" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[420px] flex-col items-center justify-center text-center" role="status">
          <m.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-ink"
          >
            <CheckCircle2 className="h-8 w-8" aria-hidden />
          </m.span>
          <h3 className="mt-6 text-2xl font-bold">Thanks{firstName ? `, ${firstName}` : ''}. You’re on our list.</h3>
          <p className="mt-2 max-w-sm text-white/60">Our team will get in touch within one working day to book your demo. We’ve also sent a confirmation to your inbox.</p>
          <button type="button" onClick={() => setState('idle')} className="mt-8 text-sm font-semibold text-white/70 underline underline-offset-4 hover:text-white">
            Send another request
          </button>
        </m.div>
      ) : (
        <m.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" name={id('full_name')} error={errors.full_name}>
              <input ref={firstRef} id={id('full_name')} autoComplete="name" value={form.full_name} onChange={set('full_name')} aria-invalid={!!errors.full_name} aria-describedby={errors.full_name ? `${id('full_name')}-error` : undefined} className={inputCls(errors.full_name)} placeholder="Alex Morgan" required aria-required="true" />
            </Field>
            <Field label="Company" name={id('company_name')} error={errors.company_name}>
              <input id={id('company_name')} autoComplete="organization" value={form.company_name} onChange={set('company_name')} aria-invalid={!!errors.company_name} aria-describedby={errors.company_name ? `${id('company_name')}-error` : undefined} className={inputCls(errors.company_name)} placeholder="Empire Projects" required aria-required="true" />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Work email" name={id('email')} error={errors.email}>
              <input id={id('email')} type="email" autoComplete="email" inputMode="email" value={form.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${id('email')}-error` : undefined} className={inputCls(errors.email)} placeholder="you@company.com" required aria-required="true" />
            </Field>
            <Field label="Phone" name={id('phone')} error={errors.phone}>
              <input id={id('phone')} type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? `${id('phone')}-error` : undefined} className={inputCls(errors.phone)} placeholder="+1 555 000 0000" />
            </Field>
          </div>
          <fieldset>
            <legend className="text-xs font-bold uppercase tracking-[0.12em] text-white/60">Team size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <label key={s} className="cursor-pointer">
                  <input type="radio" name={id('company_size')} value={s} checked={form.company_size === s} onChange={set('company_size')} className="peer sr-only" />
                  <span className="inline-flex h-10 items-center rounded-full border border-white/15 px-4 text-sm font-semibold text-white/75 transition-colors hover:border-white/40 peer-checked:border-white peer-checked:bg-white peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white">
                    {s}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <Field label="What do you want to fix first? (optional)" name={id('message')}>
            <textarea id={id('message')} rows={2} value={form.message} onChange={set('message')} className={cx(inputCls(), 'h-auto resize-none py-3')} placeholder="e.g. attendance across 6 sites and payroll" maxLength={1000} />
          </Field>

          {state === 'error' && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              {serverError} You can also email{' '}
              <a className="font-semibold underline" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'sending'}
            className="group flex h-13 w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-base font-bold text-ink transition-all hover:bg-white/90 disabled:opacity-70"
          >
            {state === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
            {state === 'sending' ? 'Sending…' : 'Book my demo'}
            {state !== 'sending' && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
          </button>
          <p className="text-center text-xs text-white/40">
            By submitting you agree to our{' '}
            <a href="/privacy" className="underline underline-offset-2 hover:text-white/70">
              privacy policy
            </a>
            . We use your details only to contact you about TeamTuned.
          </p>
        </m.form>
      )}
    </AnimatePresence>
  );
}

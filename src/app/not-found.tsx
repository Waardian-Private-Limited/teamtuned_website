import { Header } from '@/components/Header';
import { ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink px-4 text-center text-white">
        <div className="grid-dark mask-radial pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative">
          <p className="text-[28vw] font-extrabold leading-none tracking-[-0.06em] text-white/10 sm:text-[12rem]">404</p>
          <h1 className="-mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">This page clocked out.</h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">The page you are looking for does not exist or has moved.</p>
          <ButtonLink href="/" dark arrow className="mt-8">
            Back to home
          </ButtonLink>
        </div>
      </main>
    </>
  );
}

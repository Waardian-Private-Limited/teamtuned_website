import { modules } from '@/lib/content';
import { Icon } from './Icon';

/** Endless strip of module names under the hero. Pure CSS, pauses on hover. */
export function ModuleMarquee() {
  const row = [...modules, ...modules];
  return (
    <div className="relative border-y border-white/10 bg-ink py-5 text-white" aria-label="TeamTuned modules">
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {row.map((m, i) => (
            <li
              key={i}
              aria-hidden={i >= modules.length}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/80"
            >
              <Icon name={m.icon} className="h-4 w-4 text-white/60" />
              {m.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

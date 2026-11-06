import { OG_SIZE, ogCard } from '@/lib/og';

export const alt = 'TeamTuned, the proof-of-work HRMS: They say they’re on site. TeamTuned proves it.';
export const size = OG_SIZE;
export const contentType = 'image/png';

/** Homepage social card. Other pages get theirs from app/og/[slug]. */
export default function OpengraphImage() {
  return ogCard({
    dim: 'They say they’re on site.',
    title: 'TeamTuned proves it.',
    sub: 'The proof-of-work HRMS: face check-in, geofencing, live tracking, leave and payroll.',
  });
}

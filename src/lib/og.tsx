import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * The social card shared by every page: brand mark, an optional pill, the headline (with an optional dimmed
 * first line), one supporting line and the product screen. Built at build time from the real brand font.
 */
export async function ogCard({ eyebrow, dim, title, sub }: { eyebrow?: string; dim?: string; title: string; sub: string }) {
  const pub = join(process.cwd(), 'public');
  const [bold, phone, mark] = await Promise.all([
    readFile(join(pub, 'fonts/Exo-ExtraBold.ttf')),
    readFile(join(pub, 'screens/og-phone.png')),
    readFile(join(pub, 'brand/mark-white.png')),
  ]);
  const src = (b: Buffer) => `data:image/png;base64,${b.toString('base64')}`;
  // Long headlines step down so they stay within three lines.
  const size = title.length + (dim?.length ?? 0) > 46 ? 54 : 64;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0a0a', color: '#fff', fontFamily: 'Exo', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -120, top: -80, width: 760, height: 760, borderRadius: 760, background: 'radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0))', display: 'flex' }} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 0 0 80px', width: 740 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 34 }}>
            <img src={src(mark)} width={44} height={44} alt="" />
            TeamTuned
          </div>
          {eyebrow && (
            <div style={{ display: 'flex', marginTop: 34 }}>
              <div style={{ display: 'flex', fontSize: 22, padding: '8px 20px', borderRadius: 40, border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.8)' }}>{eyebrow}</div>
            </div>
          )}
          <div style={{ fontSize: size, lineHeight: 1.04, letterSpacing: -2.5, marginTop: eyebrow ? 22 : 34, display: 'flex', flexDirection: 'column' }}>
            {dim && <span style={{ color: 'rgba(255,255,255,0.5)' }}>{dim}</span>}
            <span>{title}</span>
          </div>
          <div style={{ fontSize: 26, color: 'rgba(255,255,255,0.6)', marginTop: 28, lineHeight: 1.35 }}>{sub}</div>
        </div>
        <img src={src(phone)} width={300} height={629} alt="" style={{ position: 'absolute', right: 110, top: 60 }} />
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: 'Exo', data: bold, weight: 800, style: 'normal' }] }
  );
}

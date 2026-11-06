# TeamTuned website

Marketing site for teamtuned.com. Next.js 15 (App Router, static), Tailwind 4, Framer Motion, Exo.

```bash
npm install
cp .env.example .env.local   # set site, app and API origins
npm run dev                  # http://localhost:3100
npm run build && npm start
```

## Product screenshots
`public/screens/*.webp` are rendered from the store-mockup source (`../Assest/store-mockups/_source`, via its
`device.html`), so the site always shows the same screens as the App Store and Play Store listings.
Change a screen there, then run `npm run screens` (needs Google Chrome, Pillow and `cwebp`).

## Where things live
- Copy: `src/lib/content.ts` (features, modules, industries, FAQ); brand facts and links: `src/lib/site.ts`.
- Sections: `src/components/*`, assembled in `src/app/page.tsx`.
- SEO: metadata in `src/app/layout.tsx`, JSON-LD in `src/components/JsonLd.tsx`, plus `sitemap.ts`, `robots.ts`,
  `manifest.ts` and a generated `opengraph-image.tsx`.
- Demo form posts to `${NEXT_PUBLIC_API_BASE}/demo/submit` (backend `demoRoutes`). The site origin must be in the
  backend's `FRONTEND_URL` CORS list.

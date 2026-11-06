// Tells Bing, Yandex and other IndexNow engines that the site's pages changed. Run after each production deploy:
//   npm run indexnow
// The key file public/2f6cef16919de54b304c3f4d7d36bcbf.txt must be live at https://teamtuned.com/2f6cef16919de54b304c3f4d7d36bcbf.txt first.
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://teamtuned.com').replace(/\/$/, '');
const KEY = '2f6cef16919de54b304c3f4d7d36bcbf';

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('No URLs found in the sitemap');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) process.exit(1);

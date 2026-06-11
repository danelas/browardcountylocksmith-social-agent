// One-off local check: composes a flyer from a plain gradient background (no
// OpenAI call) so the logo card / phone bar / badge can be eyeballed.
// Run with: npx tsx scripts/test-flyer.mts
import sharp from "sharp";
import { composeFlyer } from "../src/lib/flyer.ts";
import { BRAND, SERVICES } from "../src/content/services.ts";

const bg = `<svg width="1080" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#23303f"/><stop offset="100%" stop-color="#5a6e84"/>
  </linearGradient></defs>
  <rect width="1080" height="1080" fill="url(#g)"/>
</svg>`;

await sharp(Buffer.from(bg)).jpeg().toFile("preview/test-bg.jpg");

for (const id of ["access-control", "door-hardware", "property-management"]) {
  const s = SERVICES.find((x) => x.id === id)!;
  await composeFlyer("preview/test-bg.jpg", `preview/test-flyer-${id}.jpg`, {
    headline: s.headline,
    subhead: s.subhead,
    bullets: s.bullets,
    area: BRAND.area,
    phone: BRAND.phone,
    tagline: BRAND.tagline,
  });
  console.log(`wrote preview/test-flyer-${id}.jpg`);
}

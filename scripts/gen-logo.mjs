// One-off: renders the Broward County Locksmith logo (recreated as SVG) to
// assets/logo.jpg — orange "BROWARD" with a blue keyhole standing in for the
// O, blue "COUNTY", and an orange letterspaced "LOCKSMITH" with a blue key
// shaft. Laid out wide (single line + sub-line) so the flyer's logo card
// stays short.
// Run with: node scripts/gen-logo.mjs
// If Dan supplies the real logo file, just overwrite assets/logo.jpg instead.
import sharp from "sharp";

const W = 3300;
const H = 700;

const ORANGE = "#f6a126";
const BLUE = "#1f7cb4";

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#ffffff"/>

  <!-- BR -->
  <text x="60" y="360" font-family="'Arial Black', Arial, sans-serif" font-size="300" font-weight="900" fill="${ORANGE}">BR</text>

  <!-- keyhole O -->
  <circle cx="643" cy="250" r="118" fill="${BLUE}"/>
  <circle cx="643" cy="218" r="46" fill="#ffffff"/>
  <path d="M 622 250 L 664 250 L 678 332 L 608 332 Z" fill="#ffffff"/>

  <!-- WARD -->
  <text x="772" y="360" font-family="'Arial Black', Arial, sans-serif" font-size="300" font-weight="900" fill="${ORANGE}">WARD</text>

  <!-- COUNTY -->
  <text x="1850" y="360" font-family="'Arial Black', Arial, sans-serif" font-size="300" font-weight="900" fill="${BLUE}">COUNTY</text>

  <!-- LOCKSMITH -->
  <text x="60" y="630" font-family="Arial, sans-serif" font-size="150" font-weight="600" letter-spacing="62" fill="${ORANGE}">LOCKSMITH</text>

  <!-- blue key shaft with skyline teeth (right side of sub-line) -->
  <rect x="1750" y="555" width="1480" height="34" rx="17" fill="${BLUE}"/>
  <rect x="3060" y="500" width="34" height="60" fill="${BLUE}"/>
  <rect x="3120" y="475" width="34" height="85" fill="${BLUE}"/>
  <rect x="3180" y="515" width="34" height="45" fill="${BLUE}"/>
</svg>`;

await sharp(Buffer.from(svg))
  .flatten({ background: "#ffffff" })
  .jpeg({ quality: 95, mozjpeg: true })
  .toFile("assets/logo.jpg");

console.log("wrote assets/logo.jpg");

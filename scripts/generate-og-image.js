// Generates images/og-image.jpg (1200x630) for Miss Olympia social previews.
// Brand: pink #C8567A, deep pink #8B2252, gold #C9A96E, cream #FDF6F9.

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const W = 1200;
const H = 630;
const OUT = path.resolve(__dirname, '..', 'images', 'og-image.jpg');

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FDF6F9"/>
      <stop offset="50%" stop-color="#F8E4EC"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- decorative pink circle, top-right -->
  <circle cx="1080" cy="90" r="280" fill="#C8567A" opacity="0.15"/>
  <!-- decorative gold circle, bottom-left -->
  <circle cx="120" cy="560" r="240" fill="#C9A96E" opacity="0.12"/>

  <!-- crown watermark, very subtle, centered -->
  <text x="${W/2}" y="${H/2 + 30}" font-family="Georgia, serif" font-size="420"
        fill="#8B2252" opacity="0.05" text-anchor="middle" dominant-baseline="middle">♛</text>

  <!-- top + bottom gold accent lines -->
  <rect x="0" y="0" width="${W}" height="4" fill="#C9A96E"/>
  <rect x="0" y="${H-4}" width="${W}" height="4" fill="#C9A96E"/>

  <!-- left vertical deep-pink bar -->
  <rect x="0" y="0" width="8" height="${H}" fill="#8B2252"/>

  <!-- title -->
  <text x="${W/2}" y="290" font-family="Playfair Display, Georgia, serif" font-size="110"
        font-weight="700" fill="#8B2252" text-anchor="middle" letter-spacing="6">MISS OLYMPIA</text>

  <!-- gold divider under title -->
  <rect x="${(W-150)/2}" y="335" width="150" height="2" fill="#C9A96E"/>

  <!-- subtitle -->
  <text x="${W/2}" y="395" font-family="Lato, Helvetica, Arial, sans-serif" font-size="22"
        fill="#C9A96E" text-anchor="middle" letter-spacing="8" font-weight="400">PARFUMERI ME MBUSHJE  ·  TIRANË</text>

  <!-- handle -->
  <text x="${W/2}" y="${H-50}" font-family="Lato, Helvetica, Arial, sans-serif" font-size="18"
        fill="#8B2252" text-anchor="middle" letter-spacing="3" font-weight="700">@miss_olympia_tirane1</text>
</svg>
`;

(async () => {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OUT);

  const { size } = fs.statSync(OUT);
  console.log(`og-image.jpg written: ${OUT} (${(size/1024).toFixed(1)} KB)`);
})().catch(e => { console.error(e); process.exit(1); });

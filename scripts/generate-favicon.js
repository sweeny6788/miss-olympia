// Generates favicon.png (512x512) and apple-touch-icon.png (180x180).

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const ROOT = path.resolve(__dirname, '..');

function svgFor(size) {
  const r = size / 2;
  const ring = Math.round(size * 0.0156); // 8px at 512
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <circle cx="${r}" cy="${r}" r="${r - ring/2}" fill="#8B2252" stroke="#C9A96E" stroke-width="${ring}"/>
  <text x="${r}" y="${r + size*0.075}" font-family="Playfair Display, Georgia, serif"
        font-size="${size*0.45}" font-weight="700" fill="#FFFFFF"
        text-anchor="middle" dominant-baseline="middle" letter-spacing="2">MO</text>
</svg>
`;
}

async function render(size, outName) {
  const out = path.join(ROOT, outName);
  await sharp(Buffer.from(svgFor(size)))
    .png({ compressionLevel: 9 })
    .toFile(out);
  const { size: bytes } = fs.statSync(out);
  console.log(`${outName} written (${(bytes/1024).toFixed(1)} KB)`);
}

(async () => {
  await render(512, 'favicon.png');
  await render(180, 'apple-touch-icon.png');
})().catch(e => { console.error(e); process.exit(1); });

// Erzeugt responsive WebP- und JPEG-Varianten aus images-src/ nach assets/img/.
// Neue Fotos (z. B. aus Instagram) einfach unter gleichem Namen in images-src/
// ablegen und `npm run images` ausführen.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'images-src';
const OUT = 'assets/img';

// name → gewünschte Breiten (werden nie über die Originalbreite hinaus skaliert)
const IMAGES = {
  'hero-garten': [480, 750, 1200],
  'team-kollektiv': [640, 1024, 1600],
  'insta-garten-schubkarre': [512],
  'insta-team-shirt': [512],
  'person-lohmann': [200],
  'person-c-schwingel': [200],
  'person-bonkamp': [200],
  'team-lachen': [480, 720, 1080],
  'leistung-planung': [480, 800],
  'leistung-pflasterungen': [480, 800],
  'leistung-bepflanzungen': [480, 800],
  'leistung-teich': [480, 800],
  'leistung-einfriedung': [480, 800],
  'leistung-baumschnitt': [480, 800],
  // Altseite hat hierfür nur 600×220-Banner → werden unbeschnitten gezeigt
  'leistung-baumfaellung': [600],
  'leistung-grab': [600],
};

await mkdir(OUT, { recursive: true });

for (const [name, widths] of Object.entries(IMAGES)) {
  const input = sharp(`${SRC}/${name}.jpg`).rotate();
  const { width: max } = await input.metadata();
  const sizes = [...new Set(widths.map((w) => Math.min(w, max)))];
  for (const w of sizes) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true });
    await base.clone().webp({ quality: 74, effort: 5 }).toFile(`${OUT}/${name}-${w}.webp`);
    await base.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true }).toFile(`${OUT}/${name}-${w}.jpg`);
  }
  console.log(`${name}: ${sizes.join(', ')} (max ${max}px)`);
}

// Logo: Original ist nur 199 px breit – verlustfrei als PNG übernehmen.
await sharp(`${SRC}/logo.png`).png({ compressionLevel: 9 }).toFile(`${OUT}/logo.png`);
console.log('logo: ok');

// One-off asset pipeline. Reads the read-only originals in docs/source-audit/original-assets
// and writes resized WebP variants to public/images plus a dimensions manifest used by <Picture>.
// Run with: npm run images
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'docs/source-audit/original-assets');
const OUT = path.join(ROOT, 'public/images');
const WIDTHS = [480, 800, 1200, 1800];
// Only photos shown at full screen width need a 2400px version; everything else stops at 1800px.
const FULL_BLEED = new Set(['yin-mandala', 'breath-alicia', 'breath-rest']);

// key -> source file (relative to original-assets/images). Only assets with a clear purpose.
const IMAGES = {
  'hero-corridor': 'home__DSC05854.jpg',
  'breath-group': 'breathwork-instructor-training-bali-ubud-__DSC06137.jpg',
  'breath-alicia': 'breathwork-instructor-training-bali-ubud-__DSC06096.jpg',
  'teacher-brendan': 'breathwork-instructor-training-bali-ubud-__IMG-20240904-WA0008.jpg',
  'teacher-andrea': 'breathwork-instructor-training-bali-ubud-__Andrea.jpg',
  'online-graduates': 'online-trainings__IMG_20241214_174058_285.jpg',
  'founders-circle': 'about-us__DSC03390.jpg',
  'yin-mandala': 'yin-yoga-teacher-training-bali__DSC06865.jpg',
  'yin-petals': 'yin-yoga-teacher-training-bali__DSC03104.jpg',
  'yin-class': 'yin-yoga-teacher-training-bali__1.jpeg',
  'yin-assist': 'yin-yoga-teacher-training-bali__DSC01753.jpg',
  'reiki-session': 'reiki-courses__DSC06635.jpg',
  'reiki-table': 'reiki-courses__DSC06557.jpg',
  'circle-fire': 'mens-circles__SAK00241.jpg',
  'circle-embrace': 'mens-circles__Samurai-Brotherhood.jpg',
  'centre-corridor': 'philosophy__DSC00275-HDR.jpg',
  'centre-spring': 'sustainability__DSC00383.jpg',
  'centre-showers': 'sustainability__DSC00205-HDR.jpg',
  'centre-pond': 'sustainability__Natural-Pool-Lets-Get-Lost.jpg',
  'centre-land': 'sustainability__Lets-Get-Lost-Ubud.jpg',
  'reiki-tattoo': 'reiki-courses__Personalized-Yoga-Wellness-Program-(10).png',
  'reiki-crystals': 'reiki-courses__Personalized-Yoga-Wellness-Program-(11).png',
  'bodywork-grass': 'blog__Personalized-Yoga-Wellness-Program-(12).png',
  'meditate-buddha': 'reiki-courses__Personalized-Yoga-Wellness-Program-(2).png',
  'reiki-face': 'reiki-courses__Personalized-Yoga-Wellness-Program-(3).png',
  'reiki-hands': 'blog__DSC06780.jpg',
  'reiki-scan': 'reiki-courses__DSC06607.jpg',
  'students-shala': 'blog__IMG-20241220-WA0029.jpg',
  'breath-rest': 'blog__DSC03476.jpg',
  'breath-hall': 'blog__DSC03497.jpg',
  'breath-hug': 'blog__DSC03610.jpg',
  'mentor-anthony': 'breathwork-instructor-training-bali-ubud-__DSC06807.jpg',
  'online-certificate': 'online-trainings__IMG_20241214_174119_250.jpg',
  'yin-lunge': 'yin-yoga-teacher-training-bali__DSC03069.jpg',
  'yin-porch': 'yin-yoga-teacher-training-bali__DSC09321.jpg',
  'circle-huddle': 'mens-circles__SAK00074.jpg',
  'circle-hands': 'contact__SAK00111.jpg',
  'centre-koi': 'blog__DSC00312.jpg',
  'portrait-anthony': 'our-teachers__Instagram-Post---Empowering-men-through-connection-and-accountability-(8).png',
  'portrait-alicia': 'our-teachers__Instagram-Post---Empowering-men-through-connection-and-accountability-(9).png',
  'portrait-rena': 'our-teachers__Instagram-Post---Empowering-men-through-connection-and-accountability-(7).png',
};

async function run() {
  await mkdir(OUT, { recursive: true });
  const manifest = {};

  for (const [key, file] of Object.entries(IMAGES)) {
    const input = path.join(SRC, 'images', file);
    const { width, height } = await sharp(input).metadata();
    const cap = FULL_BLEED.has(key) ? 2400 : 1800;
    const widths = WIDTHS.filter((w) => w < Math.min(width, cap)).concat(Math.min(width, cap));
    const unique = [...new Set(widths)];
    for (const w of unique) {
      await sharp(input)
        .resize({ width: w })
        .webp({ quality: 72, effort: 5 })
        .toFile(path.join(OUT, `${key}-${w}.webp`));
    }
    manifest[key] = { width, height, widths: unique };
    console.log(`${key}: ${width}x${height} -> ${unique.join(', ')}`);
  }

  await writeFile(
    path.join(ROOT, 'data/image-manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
  );

  // Logo: the only available logo is a white PNG with wide transparent padding. Trim it, keep it white.
  await mkdir(path.join(ROOT, 'public/brand'), { recursive: true });
  const logo = sharp(path.join(SRC, 'brand/ALL__in-the-nature-(14).png')).trim();
  await logo.clone().resize({ height: 400 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'public/brand/logo-white.png'));

  // Favicon: the black tree mark (served as .ico on the original, actually a PNG), trimmed and padded square.
  const mark = await sharp(path.join(SRC, 'brand/ALL__favicon.ico')).trim().resize({ height: 400 }).toBuffer();
  await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: mark, gravity: 'center' }])
    .png()
    .toFile(path.join(ROOT, 'app/icon.png'));

  // Default social share image from the home hero photograph.
  await sharp(path.join(SRC, 'images', IMAGES['hero-corridor']))
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'centre' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(ROOT, 'app/opengraph-image.jpg'));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

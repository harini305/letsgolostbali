import manifest from '@/data/image-manifest.json';

// Responsive <img> for the pre-generated WebP variants in public/images.
// next/image is not used for these because `images.unoptimized` disables its srcset generation.
export default function Picture({
  name,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  style,
}) {
  const entry = manifest[name];
  if (!entry) throw new Error(`Unknown image "${name}". Add it to scripts/optimize-images.mjs.`);

  const srcSet = entry.widths.map((w) => `/images/${name}-${w}.webp ${w}w`).join(', ');
  const fallback = entry.widths.find((w) => w >= 1200) ?? entry.widths.at(-1);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/images/${name}-${fallback}.webp`}
      srcSet={srcSet}
      sizes={sizes}
      width={entry.width}
      height={entry.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding={priority ? 'sync' : 'async'}
      className={className}
      style={style}
    />
  );
}

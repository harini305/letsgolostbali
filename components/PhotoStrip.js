import manifest from '@/data/image-manifest.json';
import Picture from './Picture';
import styles from './PhotoStrip.module.css';

// A row of photographs at one shared height. On wide screens each photo's width follows its own
// aspect ratio, so nothing is cropped; on small screens they fall into a two-column grid of squares.
export default function PhotoStrip({ items, className = '' }) {
  return (
    <ul className={`${styles.strip} ${items.length % 2 ? styles.odd : ''} ${className}`}>
      {items.map(({ name, alt }) => {
        const { width, height } = manifest[name];
        return (
          <li key={name} style={{ '--r': (width / height).toFixed(3) }} data-reveal>
            <Picture name={name} alt={alt} sizes="(min-width: 768px) 30vw, 50vw" />
          </li>
        );
      })}
    </ul>
  );
}

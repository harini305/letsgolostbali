import { tornPolygon } from '@/lib/torn';
import styles from './TornFrame.module.css';

// A photograph mounted on a torn piece of paper: a ragged paper rim with a ragged photo inside it.
export default function TornFrame({ seed = 1, className = '', style, children, ...rest }) {
  return (
    <div className={`${styles.paper} ${className}`} style={{ ...style, clipPath: tornPolygon(seed, 2.4) }} {...rest}>
      <div className={styles.photo} style={{ clipPath: tornPolygon(seed + 100, 1.8) }}>
        {children}
      </div>
    </div>
  );
}

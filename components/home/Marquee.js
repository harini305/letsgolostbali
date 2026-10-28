import styles from './Marquee.module.css';

const items = [
  'Breathwork Instructor Training',
  'Somatic Yin Yoga',
  'Reiki Level I, II and Master',
  'Men’s circles',
  'Mentorship',
  'Ubud, Bali',
];

// A slow ribbon of the offerings. Decorative (the same content is on the page), so it is hidden from
// assistive technology. It pauses on hover and stops entirely under reduced motion.
export default function Marquee() {
  const run = items.map((item) => (
    <span key={item} className={styles.item}>
      {item}
    </span>
  ));
  return (
    <div className={styles.band} aria-hidden="true">
      <div className={styles.track}>
        {/* Three identical runs so the loop never shows a gap, even on very wide screens. */}
        <div className={styles.group}>{run}</div>
        <div className={styles.group}>{run}</div>
        <div className={styles.group}>{run}</div>
      </div>
    </div>
  );
}

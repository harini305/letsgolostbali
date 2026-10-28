'use client';

import { useState } from 'react';
import VideoFacade from '../VideoFacade';
import styles from './VideoSwitcher.module.css';

// One featured film and a playlist beside it. Choosing an item swaps the featured film
// (it does not autoplay; the visitor presses play).
export default function VideoSwitcher({ videos }) {
  const [active, setActive] = useState(0);
  const current = videos[active];

  return (
    <div className={styles.switcher}>
      <div className={styles.main}>
        <VideoFacade key={current.id} id={current.id} title={current.title} caption={current.title} />
      </div>
      <ul className={styles.list}>
        {videos.map((v, i) => (
          <li key={v.id}>
            <button
              type="button"
              className={styles.item}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className={styles.thumb}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${v.id}/mqdefault.jpg`} alt="" width="320" height="180" loading="lazy" />
              </span>
              <span className={styles.label}>{v.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

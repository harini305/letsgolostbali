'use client';

import { useState } from 'react';
import styles from './VideoFacade.module.css';

// Shows the YouTube thumbnail and only loads the player (youtube-nocookie) after a click.
export default function VideoFacade({ id, title, caption }) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" className={styles.play} onClick={() => setPlaying(true)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" width="480" height="360" />
            <span className={styles.icon} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="visually-hidden">Play video: {title}</span>
          </button>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

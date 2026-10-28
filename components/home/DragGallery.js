'use client';

import { useEffect, useRef, useState } from 'react';
import Picture from '../Picture';
import TornFrame from '../TornFrame';
import styles from './DragGallery.module.css';

// Horizontal photo track. It is a normal scroll container (touch, trackpad, Shift+wheel and arrow keys
// all work); a mouse can also drag it, and the buttons step by roughly one screen.
export default function DragGallery({ photos }) {
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
      setAtStart(track.scrollLeft < 4);
      setAtEnd(track.scrollLeft > max - 4);
    };
    update();
    track.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    // Mouse drag-to-scroll. Touch and pen keep native scrolling.
    let startX = 0;
    let startLeft = 0;
    let dragging = false;
    let moved = false;
    const down = (e) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add(styles.grabbing);
    };
    const move = (e) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    };
    const up = () => {
      dragging = false;
      track.classList.remove(styles.grabbing);
    };
    const click = (e) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    track.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    track.addEventListener('click', click, true);
    return () => {
      track.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      track.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      track.removeEventListener('click', click, true);
    };
  }, []);

  const step = (dir) => {
    const track = trackRef.current;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div className={styles.gallery}>
      <div
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        role="region"
        aria-label="Photo gallery, scroll sideways"
      >
        {photos.map(({ name, alt }, i) => {
          return (
            <figure key={name} className={styles.item}>
              <TornFrame seed={40 + i} className={styles.paper}>
                <Picture name={name} alt={alt} sizes="(min-width: 1024px) 32vw, (min-width: 768px) 260px, 78vw" />
              </TornFrame>
            </figure>
          );
        })}
      </div>

      <div className={`container ${styles.controls}`}>
        <div className={styles.bar} aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.04)})` }} />
        </div>
        <div className={styles.buttons}>
          <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous photos">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M20 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
          <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next photos">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Picture from '../Picture';
import TornFrame from '../TornFrame';
import styles from './PathExplorer.module.css';

// Tabbed explorer of the four practices. Tabs follow the ARIA tabs pattern (arrow keys, Home, End).
// Switching wipes the new photograph in over the old one; under reduced motion it simply swaps.
export default function PathExplorer({ paths }) {
  const [active, setActive] = useState(0);
  // Only the first photo loads up front; others load when their tab is hovered, focused or chosen.
  const [wanted, setWanted] = useState(() => new Set([0]));
  const want = (i) => setWanted((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
  const select = (i) => {
    want(i);
    setActive(i);
  };
  const tabsRef = useRef([]);
  const stageRef = useRef(null);
  const panelRef = useRef(null);
  const firstRun = useRef(true);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const layers = stageRef.current.querySelectorAll('[data-layer]');
    const current = layers[active];
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.killTweensOf(layers);
    layers.forEach((l, i) => gsap.set(l, { zIndex: i === active ? 2 : 1 }));
    if (reduce) {
      layers.forEach((l, i) => gsap.set(l, { autoAlpha: i === active ? 1 : 0, clipPath: 'inset(0 0 0 0)' }));
      return;
    }
    gsap.fromTo(
      current,
      { autoAlpha: 1, clipPath: 'inset(0 0 0 100%)' },
      {
        clipPath: 'inset(0 0 0 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        // Read the latest selection: a quick second click must not hide the newly chosen image.
        onComplete: () =>
          layers.forEach((l, i) => gsap.set(l, { autoAlpha: i === activeRef.current ? 1 : 0 })),
      },
    );
    const img = current.querySelector('img');
    if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.3, ease: 'power3.out' });
    gsap.fromTo(
      panelRef.current.querySelectorAll('[data-copy] > *'),
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out', delay: 0.15 },
    );
  }, [active]);

  const onKeyDown = (e) => {
    const last = paths.length - 1;
    const next = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + paths.length) % paths.length;
    select(i);
    tabsRef.current[i]?.focus();
  };

  const path = paths[active];

  return (
    <div ref={panelRef} className={styles.explorer}>
      {/* Left column on desktop: the tabs with the selected course's details directly beneath them.
          On small screens this wrapper dissolves so the photo can sit between tabs and details. */}
      <div className={styles.side}>
        <div
          role="tablist"
          aria-label="Practices"
          aria-orientation="vertical"
          className={styles.tabs}
          onKeyDown={onKeyDown}
        >
          {paths.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (tabsRef.current[i] = el)}
              role="tab"
              type="button"
              id={`tab-${p.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${p.id}`}
              tabIndex={i === active ? 0 : -1}
              className={styles.tab}
              onClick={() => select(i)}
              onPointerEnter={() => want(i)}
              onFocus={() => want(i)}
            >
              <span>{p.label}</span>
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${path.id}`}
          aria-labelledby={`tab-${path.id}`}
          className={styles.copy}
          data-copy
        >
          <h3>{path.title}</h3>
          <p className={styles.meta}>{path.meta}</p>
          <p className={styles.text}>{path.text}</p>
          {path.links && (
            <ul className={styles.links}>
              {path.links.map((l) => (
                <li key={l.href}>
                  <Link prefetch={false} href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          )}
          <Link prefetch={false} href={path.href} className="btn btn-primary">
            {path.cta}
          </Link>
        </div>
      </div>

      <TornFrame seed={21} className={styles.stage}>
        <div ref={stageRef} className={styles.stageInner}>
          {paths.map((p, i) => (
            <div
              key={p.id}
              data-layer
              className={styles.layer}
              style={i === 0 ? { zIndex: 2 } : { opacity: 0, visibility: 'hidden' }}
            >
              {wanted.has(i) && <Picture name={p.image} alt={p.alt} sizes="(min-width: 1024px) 56vw, 100vw" />}
            </div>
          ))}
        </div>
      </TornFrame>
    </div>
  );
}

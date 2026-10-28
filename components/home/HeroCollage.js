'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Picture from '../Picture';
import TornFrame from '../TornFrame';
import styles from './HeroCollage.module.css';

const photos = [
  { name: 'yin-petals', alt: 'Alicia Casillas seated in meditation on a deck scattered with flower petals', depth: 0.8, seed: 3, className: 'a', priority: true },
  { name: 'hero-corridor', alt: 'A bamboo walkway beside a long reflecting pond, surrounded by tropical plants', depth: 1.3, seed: 8, className: 'b' },
  { name: 'circle-fire', alt: 'Men standing in a circle around a fire at night', depth: 1.8, seed: 14, className: 'c' },
  { name: 'reiki-hands', alt: 'Hands held above crystals during a Reiki treatment', depth: 2.2, seed: 19, className: 'd' },
];

// Dark hero with a torn-paper photo collage. With a fine pointer, each piece drifts toward the cursor
// by its own depth; on scroll the pieces separate slightly. Both are skipped under reduced motion, and
// everything is visible without JavaScript.
export default function HeroCollage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover) and (min-width: 1024px)', () => {
      const layers = [...root.querySelectorAll('[data-depth]')].map((el) => ({
        depth: Number(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      }));
      const onMove = (e) => {
        const r = root.getBoundingClientRect();
        const dx = (e.clientX - r.left) / r.width - 0.5;
        const dy = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => {
          l.x(dx * 26 * l.depth);
          l.y(dy * 18 * l.depth);
        });
      };
      const onLeave = () => layers.forEach((l) => (l.x(0), l.y(0)));
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerleave', onLeave);
      return () => {
        root.removeEventListener('pointermove', onMove);
        root.removeEventListener('pointerleave', onLeave);
      };
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.querySelectorAll('[data-layer]').forEach((el) => {
        gsap.to(el, {
          yPercent: -Number(el.dataset.layer) * 8,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className={`on-dark torn-bottom ${styles.hero}`} style={{ '--next': 'var(--paper)' }}>
      <p className={styles.vertical} aria-hidden="true">
        Let’s Get Lost
      </p>

      <div className={`container ${styles.grid}`}>
        <div className={styles.text}>
          <h1 className={styles.title}>
            <span className="enter-rise">Come home</span>
            <span className="enter-rise">to your body</span>
            <em className="enter-rise-2">and silence your mind.</em>
          </h1>
          <p className={`${styles.sub} enter-rise-3`}>
            Breathwork, yoga, Reiki and men’s circles in Ubud, Bali. Teacher trainings and courses in small
            groups, in person and online.
          </p>
          <div className="btn-row enter-rise-3">
            <a href="#paths" className="btn btn-primary">
              Find your path
            </a>
            <Link prefetch={false} href="/about" className="btn btn-secondary">
              Our story
            </Link>
          </div>
        </div>

        <div className={styles.collage}>
          {photos.map((p, i) => (
            <div key={p.name} className={`${styles.piece} ${styles[p.className]}`} data-layer={p.depth}>
              {/* Pointer drift (data-depth) and the CSS entrance animate transform on separate wrappers. */}
              <div data-depth={p.depth}>
                <div className="enter-rise" style={{ animationDelay: `${0.15 + i * 0.15}s` }}>
                  <TornFrame seed={p.seed} className={styles.frame}>
                    <Picture
                      name={p.name}
                      alt={p.alt}
                      sizes={p.className === 'd' ? '(min-width: 1024px) 18vw, 36vw' : '(min-width: 1024px) 32vw, 60vw'}
                      priority={p.priority}
                    />
                  </TornFrame>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

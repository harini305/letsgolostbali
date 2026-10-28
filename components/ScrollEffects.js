'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Two restrained scroll effects, both skipped under prefers-reduced-motion:
//  [data-reveal]   – a short rise-in for blocks that start below the fold. Blocks already in view
//                    on load are left alone, so nothing visible is ever hidden.
//  [data-parallax] – a slight vertical drift of an image inside its cropped frame.
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const fold = window.innerHeight;
      const pending = gsap.utils
        .toArray('[data-reveal]')
        .filter((el) => el.getBoundingClientRect().top > fold * 0.92);

      // Opacity only (not visibility), so hidden blocks stay focusable; focusing one scrolls it into view.
      gsap.set(pending, { opacity: 0, y: 28 });
      ScrollTrigger.batch(pending, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true,
          }),
      });

      // [data-speed]: whole elements drift at different rates (e.g. overlapping portraits).
      gsap.utils.toArray('[data-speed]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: () => Number(el.dataset.speed) * 60 },
          {
            y: () => Number(el.dataset.speed) * -60,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          },
        );
      });

      gsap.utils.toArray('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -5 },
          {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      });
    });

    // Lazy images and fonts can shift trigger positions slightly after load.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);

    return () => {
      window.removeEventListener('load', refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}

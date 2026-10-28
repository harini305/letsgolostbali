'use client';

import { useEffect, useRef } from 'react';

// Publishes the footer's rendered height as --footer-h on <html>, so a page's final section can be
// sized to fill the screen together with the footer.
export default function FooterMeasure() {
  const ref = useRef(null);

  useEffect(() => {
    const footer = ref.current?.parentElement;
    if (!footer) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty('--footer-h', `${Math.round(footer.getBoundingClientRect().height)}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}

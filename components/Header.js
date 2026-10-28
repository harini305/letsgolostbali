'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav } from '@/data/site';
import styles from './Header.module.css';

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DesktopItem({ item, pathname, openKey, setOpenKey, canHover }) {
  const isOpen = openKey === item.href;
  const current = pathname === item.href;
  const panelId = `menu-${item.href.slice(1)}`;
  const buttonRef = useRef(null);

  if (!item.children) {
    return (
      <li className={styles.item}>
        <Link prefetch={false} href={item.href} className={styles.link} aria-current={current ? 'page' : undefined}>
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className={styles.item}
      onMouseEnter={canHover ? () => setOpenKey(item.href) : undefined}
      onMouseLeave={canHover ? () => setOpenKey(null) : undefined}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && isOpen) {
          setOpenKey(null);
          buttonRef.current?.focus({ preventScroll: true });
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpenKey(null);
      }}
    >
      <span className={styles.split}>
        <Link prefetch={false} href={item.href} className={styles.link} aria-current={current ? 'page' : undefined}>
          {item.label}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className={styles.toggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-label={`${isOpen ? 'Hide' : 'Show'} ${item.label} sections`}
          onClick={() => setOpenKey(isOpen ? null : item.href)}
        >
          <Chevron />
        </button>
      </span>
      <ul id={panelId} className={styles.panel} hidden={!isOpen}>
        {item.children.map((child) => (
          <li key={child.href}>
            <Link prefetch={false} href={child.href} className={styles.panelLink} onClick={() => setOpenKey(null)}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openKey, setOpenKey] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

  // Unlock scrolling synchronously so a same-page #hash link can scroll before React re-renders.
  const closeMenu = useCallback(() => {
    document.documentElement.classList.remove('menu-open');
    setMenuOpen(false);
  }, []);

  // Close menus whenever the route changes (state reset during render, not in an effect).
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenKey(null);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onHover = () => setCanHover(mq.matches);
    onHover();
    mq.addEventListener('change', onHover);
    return () => {
      window.removeEventListener('scroll', onScroll);
      mq.removeEventListener('change', onHover);
    };
  }, []);

  // Close an open dropdown on an outside click or tap.
  useEffect(() => {
    if (!openKey) return;
    const onPointer = (e) => {
      if (!e.target.closest(`.${styles.item}`)) setOpenKey(null);
    };
    document.addEventListener('pointerdown', onPointer);
    return () => document.removeEventListener('pointerdown', onPointer);
  }, [openKey]);

  // Mobile drawer: lock page scroll, close on Escape, keep focus inside, close if resized to desktop.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    html.classList.add('menu-open');
    drawerRef.current?.querySelector('a')?.focus({ preventScroll: true });
    const button = menuButtonRef.current;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        button?.focus({ preventScroll: true });
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = [button, ...drawerRef.current.querySelectorAll('a')];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onWide = () => mq.matches && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    return () => {
      html.classList.remove('menu-open');
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
    };
  }, [menuOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#main" className={styles.skip}>
        Skip to content
      </a>
      <div className={styles.bar}>
        <Link prefetch={false} href="/" className={styles.logo} aria-label="Let's Get Lost Bali, home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-white.png" alt="" width="302" height="400" />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.list}>
            {nav.map((item) => (
              <DesktopItem
                key={item.href}
                item={item}
                pathname={pathname}
                openKey={openKey}
                setOpenKey={setOpenKey}
                canHover={canHover}
              />
            ))}
          </ul>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span>{menuOpen ? 'Close' : 'Menu'}</span>
          <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={drawerRef}
        className={styles.drawer}
        hidden={!menuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <nav aria-label="Main">
          <ul className={styles.drawerList}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false}
                  href={item.href}
                  className={styles.drawerLink}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className={styles.drawerSub}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link prefetch={false} href={child.href} onClick={closeMenu}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

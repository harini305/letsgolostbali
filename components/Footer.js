import Link from 'next/link';
import { contact, nav, social } from '@/data/site';
import FooterMeasure from './FooterMeasure';
import styles from './Footer.module.css';

// Compact footer: brand and pages on one line, contact and the small print on the next.
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <FooterMeasure />
      <div className={`container ${styles.top}`}>
        <div className={styles.brand}>
          <p className={styles.name}>Let&rsquo;s Get Lost Bali</p>
          <address className={styles.address}>{contact.addressLines.join(', ')}</address>
        </div>
        <nav aria-label="Footer">
          <ul className={styles.links}>
            {nav.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.base}`}>
        <ul className={styles.links}>
          <li>
            <a href={`mailto:${contact.emailInfo}`}>{contact.emailInfo}</a>
          </li>
          <li>
            <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
          </li>
          <li>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </li>
          {social.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className={styles.small}>
          © {new Date().getFullYear()} Let&rsquo;s Get Lost Bali · <Link prefetch={false} href="/privacy-policy">Privacy Policy</Link>
        </p>
      </div>
    </footer>
  );
}

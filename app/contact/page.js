import Picture from '@/components/Picture';
import TornFrame from '@/components/TornFrame';
import { contact, links, social } from '@/data/site';
import styles from './contact.module.css';

export const metadata = {
  title: 'Contact and Location',
  description:
    "Contact Let's Get Lost Bali by email, phone or WhatsApp, book a free discovery call, or find us in Petulu, north of Ubud.",
  alternates: { canonical: '/contact' },
};

const calls = [
  { label: 'Breathwork Instructor Training', href: links.discoveryBreathwork },
  { label: 'Breathwork Mentorship', href: links.discoveryMentorship },
  { label: 'Yin Yoga Teacher Training', href: links.discoveryYin },
  { label: 'Reiki courses', href: links.discoveryReiki },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-start page-intro on-dark torn-bottom" style={{ '--next': 'var(--paper)' }}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.main}>
            <h1 className="enter-rise">Contact</h1>
            <p className="lead enter-rise-2">
              Ask us what you want to know. We are here for you.
            </p>

            <dl className={`${styles.channels} enter-rise-3`}>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${contact.emailInfo}`}>{contact.emailInfo}</a>
                  <a href={`mailto:${contact.emailManager}`}>{contact.emailManager}</a>
                </dd>
              </div>
              <div>
                <dt>Phone and WhatsApp</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phoneDisplay}</a>
                  <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className={styles.small}>
                    Message us on WhatsApp
                  </a>
                </dd>
              </div>
              <div>
                <dt>Find us</dt>
                <dd>
                  <address>
                    {contact.addressLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                  <span className={styles.note}>{contact.locationNote}</span>
                  <a href={contact.mapHref} target="_blank" rel="noopener noreferrer" className={styles.small}>
                    Open in Google Maps
                  </a>
                </dd>
              </div>
              <div>
                <dt>Follow</dt>
                <dd className={styles.inline}>
                  {social.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.small}>
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <a href={links.general} className="btn btn-primary">
              Write to us
            </a>
          </div>

          <figure className={styles.figure}>
            <TornFrame seed={77} className={styles.image}>
              <Picture
                name="centre-land"
                alt="Green fields and palm trees around small huts at Let’s Get Lost Ubud"
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
              />
            </TornFrame>
            <figcaption>
              Let’s Get Lost Ubud in Petulu, home of the Tuesday men’s circle. Our 2027 trainings are held at The
              In Movement Studio in Ubud.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className={`section-tight ${styles.callsBand}`}>
        <div className={`container ${styles.calls}`}>
          <div>
            <h2>Book a free discovery call</h2>
            <p className="muted">
              Talk through a training with us and find out whether it is right for you.
            </p>
          </div>
          <ul>
            {calls.map((c) => (
              <li key={c.href}>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  <span>{c.label}</span>
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

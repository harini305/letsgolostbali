import Link from 'next/link';
import Picture from '@/components/Picture';
import PhotoStrip from '@/components/PhotoStrip';
import { links } from '@/data/site';
import styles from './reiki.module.css';

export const metadata = {
  title: "Reiki Courses & Men's Circles in Ubud, Bali",
  description:
    "Reiki Level I, II and Master/Teacher courses in Ubud with Reiki Master Alicia Casillas, online Reiki courses, and committed men's circles in Petulu and online with Solis Brotherhood.",
  alternates: { canonical: '/reiki-and-circles' },
};

const levels = [
  {
    title: 'Level I',
    text: 'The introduction for beginners. You finish certified to give Reiki to yourself and others.',
    date: '7 March 2027, In Movement, Ubud',
    certificate: 'First Degree Reiki Certificate',
    items: [
      'History, lineage and principles of Reiki',
      'Chakra theory',
      'Hand positions for self-treatment and treating others',
      'The 21-day cleansing process',
      'Grounding, cleansing and meditation techniques',
      'Hands-on practice, manual and Q&A',
    ],
  },
  {
    title: 'Level II',
    text: 'Go deeper, with a broader range of techniques and enhanced healing abilities.',
    date: '8 March 2027, In Movement, Ubud',
    certificate: 'Second Degree Reiki Certificate',
    items: [
      'Reiki 2 attunements',
      'Drawing and using the Reiki 2 symbols',
      'Distant healing techniques',
      'Healing past and future events',
      'Practising Reiki professionally',
      'Hands-on practice, manual and Q&A',
    ],
  },
  {
    title: 'Master/Teacher',
    text: 'A profound understanding of Reiki, and how to teach and run trainings of your own.',
    date: 'On request',
    certificate: 'Master/Teacher Degree Reiki Certificate',
    items: [
      'An individual Reiki Master attunement',
      'The Reiki Master symbols',
      'Advanced Reiki techniques',
      'Giving attunements, with guided practice',
      'Teaching all levels of the Usui Reiki system',
      'Designing a training programme, manual and Q&A',
    ],
  },
];

const online = [
  { title: 'Reiki Level 1 online', text: 'Learn Reiki for yourself or to become a practitioner.', href: links.reikiOnline1 },
  { title: 'Reiki Level 2 online', text: 'Symbols, distant healing, emotional and mental healing.', href: links.reikiOnline2 },
  { title: 'Master & Teacher online', text: 'Deepen your abilities and learn to pass Reiki on.', href: links.reikiOnlineMaster },
];

export default function ReikiAndCirclesPage() {
  return (
    <>
      <section className="page-start page-intro on-dark torn-bottom" style={{ '--next': 'var(--mist)' }}>
        <div className={`container ${styles.intro}`}>
          <h1 className="enter-rise">Reiki courses and men’s circles</h1>
          <div className="enter-rise-2">
            <p className="lead">
              Learn Reiki in small groups in Ubud with Reiki Master Alicia Casillas, or online. Or join a
              committed men’s circle, in Petulu or online.
            </p>
            <p className={styles.jump}>
              <a href="#reiki">Reiki in Ubud</a>
              <a href="#online-reiki">Online Reiki</a>
              <a href="#mens-circles">Men’s circles</a>
            </p>
          </div>
        </div>
      </section>

      <section id="reiki" className={`section ${styles.reiki}`}>
        <div className={`container ${styles.reikiHead}`}>
          <div className={styles.reikiText}>
            <h2>Become a certified Reiki practitioner and Master/Teacher</h2>
            <p>
              Reiki is a universal energy used to heal physical, emotional and energetic imbalances. Anyone can
              learn this simple yet powerful practice to calm the mind, deepen spiritual connection and support
              the wellbeing of others.
            </p>
            <blockquote className={styles.quote}>
              <p>
                “Within all of my training, I offer 1-on-1 initiations, creating a more powerful experience
                compared with a group setting initiation.”
              </p>
              <footer>Alicia Casillas</footer>
            </blockquote>
          </div>
          <div className={styles.reikiImages}>
            <div className="frame">
              <Picture
                name="reiki-table"
                alt="A Reiki treatment in the open-air shala at Let’s Get Lost Ubud"
                sizes="(min-width: 1024px) 26vw, 50vw"
              />
            </div>
            <div className="frame">
              <Picture
                name="reiki-tattoo"
                alt="A practitioner resting her hands over a man’s eyes during a Reiki treatment"
                sizes="(min-width: 1024px) 18vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className={`container ${styles.levels}`}>
          {levels.map((level) => (
            <article key={level.title} className={styles.level} data-reveal>
              <h3>Reiki {level.title}</h3>
              <p>{level.text}</p>
              <dl className={styles.levelFacts}>
                <div>
                  <dt>Next date</dt>
                  <dd>{level.date}</dd>
                </div>
                <div>
                  <dt>On completion</dt>
                  <dd>{level.certificate} and ongoing support</dd>
                </div>
              </dl>
              <details className="disclosure">
                <summary>What’s included</summary>
                <div>
                  <ul className="list">
                    {level.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </article>
          ))}
        </div>

        <div className={`container ${styles.booking}`}>
          <p>
            Book one level or a package of two or three. Classes, materials and certification are included;
            accommodation is not, but we can help you find somewhere nearby. Private one-to-one courses are
            available if the dates don’t suit you.
          </p>
          <div className={styles.bookingActions}>
            <a href={links.reikiRegister} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Register for a course
            </a>
            <a href={links.reikiPackage} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Book a package
            </a>
            <a href={links.discoveryReiki} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Discovery call
            </a>
            <a href={links.privateReiki} className="btn btn-secondary">
              Private course
            </a>
          </div>
        </div>
      </section>

      <section id="online-reiki" className="section">
        <div className="container pin">
          <div className="pin-text">
            <h2>Online Reiki courses</h2>
            <p className="muted">Taught by Alicia through her online school, yogaliciacasillas.com.</p>
          </div>
          <div className="pin-body">
            <ul className={styles.onlineList}>
              {online.map((course) => (
                <li key={course.href} data-reveal>
                  <a href={course.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.onlineTitle}>{course.title}</span>
                    <span className={styles.onlineText}>{course.text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <PhotoStrip
              items={[
                { name: 'reiki-hands', alt: 'Hands held above crystals during a Reiki treatment' },
                { name: 'reiki-crystals', alt: 'Crystals placed along a woman’s body during a healing session' },
                { name: 'reiki-scan', alt: 'A practitioner holding her hands above a client lying on a treatment table' },
                { name: 'reiki-face', alt: 'Hands resting gently on a man’s face during a treatment' },
              ]}
            />
          </div>
        </div>
      </section>

      <section
        id="mens-circles"
        className="section on-dark torn-top torn-bottom"
        style={{ '--prev': 'var(--white)', '--next': 'var(--paper)' }}
      >
        <div className="container pin">
          <div className="pin-text">
            <h2>Men’s circles</h2>
            <p className="lead">
              A space for men to connect and grow with other men, in partnership with Solis Brotherhood.
            </p>
            <p className="muted">
              Circles require a minimum commitment, to create a strong container for men to show up. They run
              within 11 guiding principles designed by our founder Anthony Ball.{' '}
              <a href={links.solis} target="_blank" rel="noopener noreferrer">
                Read the code
              </a>
              .
            </p>
          </div>

          <div className="pin-body">
            <div className={`frame ${styles.circlesImage}`}>
              <Picture
                name="circle-fire"
                alt="Men standing in a circle around a fire at night"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>

            <div className={styles.circles}>
              <div data-reveal>
                <h3>Committed Tuesday Circle</h3>
                <dl className="facts">
                  <div>
                    <dt>Where</dt>
                    <dd>Let’s Get Lost Ubud, Petulu</dd>
                  </div>
                  <div>
                    <dt>Length</dt>
                    <dd>2 hours, minimum two months</dd>
                  </div>
                </dl>
                <a href={links.circleInPerson} className="btn btn-secondary">
                  Email to join
                </a>
              </div>
              <div data-reveal>
                <h3>Weekly Online Men’s Group</h3>
                <dl className="facts">
                  <div>
                    <dt>When</dt>
                    <dd>Mondays, 6 – 8 pm Bali time, on Zoom</dd>
                  </div>
                  <div>
                    <dt>Length</dt>
                    <dd>2 hours, minimum two months</dd>
                  </div>
                </dl>
                <a href={links.circleOnline} className="btn btn-secondary">
                  Email to join
                </a>
              </div>
            </div>
            <p className="muted">
              Both start with a one-to-one meeting with the captain, to make sure the circle is right for you.
            </p>

            <PhotoStrip
              items={[
                { name: 'circle-huddle', alt: 'A men’s circle gathered with hands on each other’s shoulders' },
                { name: 'circle-hands', alt: 'Men laughing together with hands on each other’s shoulders' },
                { name: 'circle-embrace', alt: 'Two men embracing' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className={`section-tight ${styles.private}`}>
        <div className={`container ${styles.privateGrid}`}>
          <div className={`frame ${styles.privateImage}`}>
            <Picture
              name="bodywork-grass"
              alt="A practitioner giving bodywork to a woman lying on a mat on the grass"
              sizes="(min-width: 768px) 25vw, 100vw"
            />
          </div>
          <div>
            <h2>Private sessions and treatments</h2>
            <p>
              Massage, breathwork, Reiki and craniosacral treatments can be arranged by pre-booking. Not in Bali?
              Book an online Reiki, breathwork or yoga session with Anthony or Alicia.
            </p>
            <div className="btn-row">
              <a href={links.onlineSession} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Book an online session
              </a>
              <Link prefetch={false} href="/contact" className="btn btn-secondary">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

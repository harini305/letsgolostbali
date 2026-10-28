import Link from 'next/link';
import Picture from '@/components/Picture';
import { links } from '@/data/site';
import { teachers } from '@/data/teachers';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us, Our Philosophy & Teachers',
  description:
    "Let's Get Lost was founded by Alicia Casillas Ramos and Anthony Ball: an academy for embodied transformation in Ubud, Bali. Our story, values, philosophy and teachers.",
  alternates: { canonical: '/about' },
};

const values = [
  ['Embodiment', 'We teach from the body, not just the mind.'],
  ['Safety first', 'Spaces that are psychologically, emotionally and somatically secure.'],
  ['Integrity', 'We share only what we live.'],
  ['Presence over performance', 'Showing up, again and again, with honesty and attention.'],
  ['Accessibility and inclusion', 'Trauma-informed, inclusive and accessible work.'],
  ['Community and connection', 'We heal in relationship, with each other and the living world.'],
];

const pillars = [
  [
    'Founded with purpose',
    'After years of burnout, Anthony “Ant” Ball found his way back through men’s circles, somatic practice and breath. In 2020, after five years of falling in love with Bali, he began building Let’s Get Lost in Ubud, not as a business but as an offering.',
  ],
  [
    'Rooted in community',
    'Built with Bali, not just in it: local contractors shaped the space, local healers guide sessions, and the land is held in trust with the Balinese family who have cared for it for generations.',
  ],
  [
    'Eco-friendly by design',
    'The centre is semi off-grid, powered by sun, wind and rain, built from recycled and reclaimed materials chosen to return to the Earth.',
  ],
];

const land = [
  { image: 'centre-spring', alt: 'Water spilling into a stone pool beside a bamboo wall', caption: 'Spring water from 70 metres below ground, filtered for drinking' },
  { image: 'centre-showers', alt: 'Open-air bamboo shower cubicles at Let’s Get Lost Ubud', caption: 'Showers and baths heated by the sun' },
  { image: 'centre-pond', alt: 'Koi swimming in the natural pond', caption: 'Greywater filtered through reed beds back to the ponds' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page-start page-intro on-dark torn-bottom">
        <div className={`container ${styles.intro}`}>
          <h1 className="enter-rise">About Let’s Get Lost</h1>
          <p className="lead enter-rise-2">
            Founded by Alicia Casillas Ramos and Anthony Ball, a husband-and-wife team united by a shared calling:
            to guide others back into their bodies, where true healing begins.
          </p>
        </div>
      </section>

      <div className={`container ${styles.mosaic}`}>
        <div className="frame">
          <Picture
            name="founders-circle"
            alt="A teaching circle on a woven rug in the bamboo shala"
            sizes="(min-width: 768px) 62vw, 100vw"
            priority
          />
        </div>
        <div className="frame">
          <Picture name="centre-corridor" alt="A long bamboo walkway beside a reflecting pond" sizes="(min-width: 768px) 30vw, 50vw" />
        </div>
        <div className="frame">
          <Picture name="centre-koi" alt="Orange koi swimming in a dark green pond" sizes="(min-width: 768px) 30vw, 50vw" />
        </div>
      </div>

      <section className="section">
        <div className={`container ${styles.story}`}>
          <div className={styles.storyText}>
            <p>
              What started as a sanctuary in Ubud has grown into an academy for embodied transformation, rooted
              in years of practice in breathwork, trauma-informed facilitation, Reiki, men’s work and holistic
              embodiment, and soon extending to southern Spain.
            </p>
            <p className="muted">
              Here, science meets spirit, the nervous system is honoured, and healing is understood as a
              full-body experience. Whether you are a therapist, coach, yoga teacher, or simply feeling the pull
              toward deeper work, you are welcome here.
            </p>
          </div>
          <blockquote className={styles.pull}>
            <p>The body holds the stories the mind cannot explain, and through it we can heal what words cannot reach.</p>
          </blockquote>
        </div>
      </section>

      <section id="values" className={`section ${styles.valuesBand}`}>
        <div className="container pin">
          <div className="pin-text">
            <h2>Our values</h2>
            <p className="muted">Lived commitments that shape how we teach, hold space and show up in our own lives.</p>
          </div>
          <dl className={`pin-body ${styles.values}`}>
            {values.map(([term, desc]) => (
              <div key={term} data-reveal>
                <dt>{term}</dt>
                <dd>{desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section
        id="purpose"
        className="section on-dark torn-top torn-bottom"
        style={{ '--prev': 'var(--paper)', '--next': 'var(--white)' }}
      >
        <div className={`container ${styles.purpose}`}>
          <div>
            <h2>Our purpose</h2>
            <p className="muted">
              To reconnect people with the innate intelligence of the body, the quiet guide that knows how to
              heal, regulate and restore.
            </p>
          </div>
          <ul className={styles.truths}>
            <li>The body holds what the mind cannot process.</li>
            <li>Trauma unwinds through presence, not pressure.</li>
            <li>Healing begins when we learn to feel, not when we try to figure it out.</li>
          </ul>
        </div>
      </section>

      <section id="philosophy" className="section">
        <div className="container pin">
          <div className="pin-text">
            <h2>A centre for connection</h2>
            <p className="muted">
              Healing doesn’t happen in isolation. It unfolds in relationship: with ourselves, with each other,
              and with the living Earth.
            </p>
          </div>
          <div className="pin-body">
            <div className={styles.pillars}>
              {pillars.map(([title, text]) => (
                <div key={title} data-reveal>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
            <div id="the-land" className={styles.land}>
              {land.map((item) => (
                <figure key={item.image} data-reveal>
                  <div className="frame">
                    <Picture name={item.image} alt={item.alt} sizes="(min-width: 640px) 30vw, 100vw" />
                  </div>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="teachers" className={`section ${styles.teachersBand}`}>
        <div className="container pin">
          <div className="pin-text">
            <h2>Our teachers</h2>
            <p className="muted">The people who teach and hold space at Let’s Get Lost, in Bali and online.</p>
          </div>
          <div className="pin-body">
            <div className={styles.founders}>
              {['anthony', 'alicia'].map((id) => {
                const t = teachers[id];
                return (
                  <article key={id} className={styles.founder} data-reveal>
                    <div className={`frame ${styles.founderPhoto}`}>
                      <Picture name={t.image} alt={t.alt} sizes="(min-width: 1024px) 18vw, 40vw" />
                    </div>
                    <div>
                      <h3>{t.name}</h3>
                      <p className={styles.role}>{t.roles}</p>
                      <p>{t.bio[0]}</p>
                      {t.links && (
                        <p className={styles.bioLinks}>
                          {t.links.map((l) => (
                            <a key={l.key} href={links[l.key]} target="_blank" rel="noopener noreferrer">
                              {l.label}
                            </a>
                          ))}
                        </p>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            <div className={styles.guests}>
              {['andrea', 'brendan', 'rena'].map((id) => {
                const t = teachers[id];
                return (
                  <article key={id} className={styles.guest} data-reveal>
                    <div className={`frame ${styles.guestPhoto}`}>
                      <Picture name={t.image} alt={t.alt} sizes="96px" />
                    </div>
                    <div>
                      <h3>{t.name}</h3>
                      <p className={styles.role}>{t.roles}</p>
                    </div>
                    <p className={styles.guestBio}>{t.bio[0]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={`section-tight ${styles.closing}`}>
        <div className={`container ${styles.closingInner}`}>
          <p>Questions about a training, a circle or a private session?</p>
          <Link prefetch={false} href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
        </div>
      </section>
    </>
  );
}

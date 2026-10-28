import Picture from '@/components/Picture';
import PhotoStrip from '@/components/PhotoStrip';
import TeacherStrip from '@/components/TeacherStrip';
import { links } from '@/data/site';
import styles from './yoga.module.css';

export const metadata = {
  title: 'Somatic Yin Yoga Teacher Training in Ubud, Bali',
  description:
    '65-hour Somatic Yin Yoga Teacher Training in Ubud, Bali, with lead teacher Alicia Casillas. Yoga Alliance Continuing Education (YACEP), March 2027 at The In Movement Studio.',
  alternates: { canonical: '/yoga' },
};

const curriculum = [
  ['Yin Yoga foundations', 'Philosophy and principles, functional anatomy and fascia, Yin–Yang balance, supportive use of props.'],
  ['Somatics and the nervous system', 'Embodied awareness and interoception, trauma-aware language, practices for relaxation and stress release.'],
  ['Energetics', 'Subtle body awareness, breath, attention and energy flow, meditation and self-regulation.'],
  ['Teaching methodology', 'Sequencing with care, clear and compassionate cueing, teaching with confidence and authenticity.'],
];

const schedule = [
  ['8:00 – 10:00', 'Morning sadhana'],
  ['10:00 – 11:30', 'Breakfast break'],
  ['11:30 – 13:30', 'Theory'],
  ['13:30 – 15:00', 'Lunch break'],
  ['15:00 – 16:30', 'Methodology'],
  ['16:30 – 17:30', 'Afternoon sadhana'],
];

export default function YogaPage() {
  return (
    <>
      <section className={`torn-bottom ${styles.hero}`}>
        <Picture
          name="yin-mandala"
          alt="Students kneeling around a yin-yang mandala made of flower petals"
          sizes="100vw"
          priority
        />
        <div className={`container ${styles.heroText}`}>
          <h1 className="enter-rise">Somatic Yin Yoga Teacher Training</h1>
          <p className="enter-rise-2">65 hours · Ubud, Bali · March 2027 · with Alicia Casillas</p>
        </div>
      </section>

      <section className="section">
        <div className={`container ${styles.intro}`}>
          <p className={styles.statement}>
            For those who feel called to slow down, reconnect with the body, and guide others into deep rest
            and gentle awareness.
          </p>
          <div className={styles.introBody}>
            <p>
              Yin Yoga, somatic practice, breathwork, meditation, fascia education and energetic awareness,
              taught through long-held postures and mindful attention. It is both a professional certification
              and a meaningful personal journey, and no advanced experience is required, only curiosity and
              openness.
            </p>
            <a href={links.discoveryYin} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Book a discovery call with Alicia
            </a>
          </div>
        </div>
      </section>

      <section className={styles.detailsBand}>
        <div className={`container ${styles.detailsGrid}`}>
          <div className="pin-text">
            <h2>Training details</h2>
            <dl className={`facts ${styles.facts}`}>
              <div>
                <dt>Dates</dt>
                <dd>March 2027</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>The In Movement Studio, Ubud, Bali</dd>
              </div>
              <div>
                <dt>Certification</dt>
                <dd>65-hour Yoga Alliance Continuing Education (YACEP), also open as a personal immersion</dd>
              </div>
              <div>
                <dt>Tuition</dt>
                <dd>€950</dd>
              </div>
              <div>
                <dt>Meals</dt>
                <dd>Light breakfast and lunch each training day</dd>
              </div>
              <div>
                <dt>Accommodation</dt>
                <dd>Not included; we can recommend places within a five-minute walk</dd>
              </div>
            </dl>
          </div>
          <div className={styles.detailsImages}>
            <div className="frame">
              <Picture
                name="yin-class"
                alt="Alicia Casillas teaching a group seated on mats in a wooden shala"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="frame">
              <Picture
                name="yin-assist"
                alt="Alicia Casillas guiding a student resting on a bolster"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
            <div className="frame">
              <Picture
                name="yin-petals"
                alt="Alicia Casillas seated in meditation on a deck scattered with flower petals"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container pin">
          <div className="pin-text">
            <h2>What you’ll learn</h2>
            <p className="muted">
              Yin Yoga through a somatic and energetic lens, so you can create classes that feel safe, accessible
              and deeply restorative. Open to yoga teachers, dedicated students, wellness practitioners and anyone
              longing for rest and reconnection.
            </p>
          </div>
          <div className="pin-body">
            <dl className={styles.curriculum}>
              {curriculum.map(([term, desc]) => (
                <div key={term} data-reveal>
                  <dt>{term}</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>
            <PhotoStrip
              items={[
                { name: 'yin-lunge', alt: 'A low lunge on a petal-strewn deck facing the jungle' },
                { name: 'meditate-buddha', alt: 'A woman seated in meditation in front of a Buddha statue' },
                { name: 'yin-porch', alt: 'A woman and a man smiling at each other on a porch' },
              ]}
            />
          </div>
        </div>
      </section>

      <section className={`section ${styles.dayBand}`}>
        <div className={`container ${styles.dayGrid}`}>
          <div>
            <h2 className={styles.dayTitle}>A training day</h2>
            <dl className={styles.schedule}>
              {schedule.map(([time, what]) => (
                <div key={time}>
                  <dt>{time}</dt>
                  <dd>{what}</dd>
                </div>
              ))}
            </dl>
            <p className={`muted ${styles.note}`}>
              A sample schedule; it may vary from day to day. Treatments can be pre-booked, and students get a
              discounted rate on the sauna and cold plunge.
            </p>
          </div>
          <TeacherStrip
            people={[
              { key: 'alicia', role: 'Yin Yoga lead teacher' },
              { key: 'andrea', role: 'Anatomy teacher' },
            ]}
          />
        </div>
      </section>

      <section className="section-tight on-dark torn-top" style={{ '--prev': 'var(--paper)' }}>
        <div className={`container ${styles.closing}`}>
          <div>
            <h2>Questions before you join?</h2>
            <p className="muted">Talk through the training with Alicia and whether it is right for you.</p>
          </div>
          <a href={links.discoveryYin} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            Book a discovery call
          </a>
        </div>
      </section>
    </>
  );
}

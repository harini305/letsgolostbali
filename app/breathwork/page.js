import Picture from '@/components/Picture';
import PhotoStrip from '@/components/PhotoStrip';
import TeacherStrip from '@/components/TeacherStrip';
import VideoFacade from '@/components/VideoFacade';
import { links, videos } from '@/data/site';
import styles from './breathwork.module.css';

export const metadata = {
  title: 'Breathwork Instructor Training in Ubud, Bali & Online',
  description:
    '100-hour Yoga Alliance accredited breathwork instructor training in Ubud, Bali, an online 100-hour certification filmed live in Bali, and one-to-one or group breathwork mentorship with Anthony Ball.',
  alternates: { canonical: '/breathwork' },
};

const programmes = [
  { href: '#in-person', title: '100-hour Instructor Training', meta: 'In person in Ubud · April 2027' },
  { href: '#online', title: 'Online Instructor Training', meta: '100 hours · filmed live in Bali · €499' },
  { href: '#mentorship', title: 'Mentorship', meta: 'One-to-one or biweekly group' },
];

const included = [
  '100 hours of practice, lectures and integration',
  'Course manual and materials',
  'Six 1:1 online mentorship sessions with Anthony',
  'Six months of teacher and business support',
  '100-hour Yoga Alliance continuing education',
  'Certificate and the instructor network',
];

const learn = [
  'The art of teaching and holding space',
  'Group classes and one-to-one sessions',
  'Science and anatomy of breathing',
  'Mental health and breathwork',
  'Shadow work and healing touch',
  'Business and marketing in breathwork',
];

const mentorship = [
  ['3-month intensive', 'Focused skill-building, or preparing for a specific goal.'],
  ['6-month deep dive', 'Several modalities and real facilitation confidence.'],
  ['12-month mastery path', 'Advanced technique, teaching methodology and business integration.'],
  ['Biweekly group', '90-minute sessions, a maximum of eight people, three-month minimum.'],
];

export default function BreathworkPage() {
  return (
    <>
      <section className="page-start page-intro on-dark">
        <div className={`container ${styles.intro}`}>
          <div className={styles.introText}>
            <h1 className="enter-rise">Breathwork training</h1>
            <p className="lead enter-rise-2">
              Master the science of the breath, the art of holding space, and the business of healing, in Ubud,
              online, or through mentorship with Anthony Ball.
            </p>
          </div>
          <nav aria-label="Breathwork programmes" className={`${styles.programmes} enter-rise-3`}>
            <ul>
              {programmes.map((p) => (
                <li key={p.href}>
                  <a href={p.href}>
                    <span className={styles.programmeTitle}>{p.title}</span>
                    <span className={styles.programmeMeta}>{p.meta}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className={`frame torn-top torn-bottom ${styles.band}`} style={{ '--prev': 'var(--ink)', '--next': 'var(--white)' }}>
        <Picture
          name="breath-alicia"
          alt="Alicia Casillas seated in meditation while students lie on mats in the open-air shala"
          sizes="100vw"
          priority
        />
      </div>

      {/* In person */}
      <section id="in-person" className="section">
        <div className="container pin">
          <div className="pin-text">
            <h2>100-hour Breathwork Instructor Training</h2>
            <dl className="facts">
              <div>
                <dt>Next training</dt>
                <dd>April 2027, new enrolment</dd>
              </div>
              <div>
                <dt>Venue</dt>
                <dd>In Movement Studio, Ubud: sauna, cold plunge, mineral pool, restaurant</dd>
              </div>
              <div>
                <dt>Food</dt>
                <dd>Light breakfast and lunch each day</dd>
              </div>
              <div>
                <dt>Accommodation</dt>
                <dd>Not included</dd>
              </div>
            </dl>
            <div className="btn-row">
              <a href={links.discoveryBreathwork} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Book a discovery call
              </a>
              <a href={links.privateBreathwork} className="btn btn-secondary">
                Ask about a private course
              </a>
            </div>
          </div>

          <div className="pin-body">
            <div>
              <p className={styles.pull}>A lifelong teacher for regulation, healing and profound stillness.</p>
              <p>
                Modern life drives the nervous system into chronic dysregulation, and the breath is the body’s
                most accessible anchor. This Yoga Alliance accredited journey helps you release energetic blocks,
                find clearer vision, and master the tools to guide others, whether you are a beginner or ready
                to build your own practice.
              </p>
            </div>
            <div className={styles.columns}>
              <div>
                <h3 className={styles.listTitle}>What’s included</h3>
                <ul className="list">
                  {included.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.listTitle}>What you’ll learn</h3>
                <ul className="list">
                  {learn.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="muted">
              Styles include Rebirthing, SOMA, Wim Hof, Buteyko, Holotropic, Conscious Connected Breath, 3-Part
              Breath and pranayama. Students attend every training day, arrive on time and stay off their phones
              in class.
            </p>
            <div className={styles.meet}>
              <div data-reveal>
                <VideoFacade {...videos.trainingFilm} caption={videos.trainingFilm.title} />
              </div>
              <TeacherStrip
                people={[
                  { key: 'anthony', role: 'Lead teacher' },
                  { key: 'alicia', role: 'Pranayama' },
                  { key: 'brendan', role: 'Mental health' },
                  { key: 'andrea', role: 'Anatomy' },
                ]}
              />
            </div>
            <PhotoStrip
              items={[
                { name: 'breath-rest', alt: 'Students resting on red bolsters during a breathwork session' },
                { name: 'breath-hall', alt: 'Students standing in the bamboo shala during a session' },
                { name: 'students-shala', alt: 'Students sitting on their mats in the open-air shala' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Online */}
      <section id="online" className={`section ${styles.online}`}>
        <div className={`container ${styles.onlineGrid}`}>
          <div className={styles.onlineText}>
            <h2>Online Breathwork Instructor Training</h2>
            <p className="lead">Become a certified breathwork facilitator from anywhere in the world.</p>
            <p>
              A real, live-recorded 100-hour training filmed during an in-person course in Ubud, with over 50
              hours of Anthony’s teaching. It covers the techniques, the science, the art of teaching, holding
              space, shadow work, healing touch and the business of breathwork.
            </p>
            <dl className="facts">
              <div>
                <dt>Certification</dt>
                <dd>100 hours through Yoga Alliance, trauma-informed</dd>
              </div>
              <div>
                <dt>Built for</dt>
                <dd>Yoga teachers, coaches and healers</dd>
              </div>
              <div>
                <dt>Tuition</dt>
                <dd>€499, through our partner platform Sevaluz</dd>
              </div>
            </dl>
            <div className="btn-row">
              <a href={links.onlineEnrol} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                Enrol online · €499
              </a>
              <a href={links.onlineSyllabus} className="btn btn-secondary" download>
                Syllabus (PDF, 130 KB)
              </a>
            </div>
          </div>
          <div className={styles.onlineImages}>
            <div className={`frame ${styles.onlineMain}`}>
              <Picture
                name="online-graduates"
                alt="A group of graduates holding certificates in the bamboo shala"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <div className="frame">
              <Picture
                name="online-certificate"
                alt="Two men smiling, one holding a training certificate"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
            <div className="frame">
              <Picture
                name="breath-hug"
                alt="Two people embracing in the bamboo shala"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mentorship */}
      <section id="mentorship" className="section on-dark torn-top" style={{ '--prev': 'var(--linen)' }}>
        <div className="container pin">
          <div className="pin-text">
            <h2>Breathwork Mentorship</h2>
            <p className="muted">
              Structure, feedback and accountability to refine your technique, deepen your embodiment and trust
              your ability to hold space, whether you are new to breathwork or already facilitating.
            </p>
            <a href={links.discoveryMentorship} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Book a mentorship discovery call
            </a>
          </div>
          <div className="pin-body">
            <div className={`frame ${styles.mentorImage}`}>
              <Picture
                name="mentor-anthony"
                alt="A teacher in conversation with a student in the shala"
                sizes="(min-width: 1024px) 60vw, 100vw"
              />
            </div>

            <dl className={styles.options}>
              {mentorship.map(([term, desc]) => (
                <div key={term} data-reveal>
                  <dt>{term}</dt>
                  <dd>{desc}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h3 className={styles.listTitle}>Every one-to-one package includes</h3>
              <ul className="list list-2">
                <li>Weekly 60-minute sessions, online or in person</li>
                <li>Personal practice plans and technique breakdowns</li>
                <li>Video review of your facilitation</li>
                <li>Direct access to Anthony between sessions</li>
                <li>Progress tracking and milestone reviews</li>
                <li>Certification on the practitioner path</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

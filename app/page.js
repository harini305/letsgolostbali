import Link from 'next/link';
import Picture from '@/components/Picture';
import TornFrame from '@/components/TornFrame';
import HeroCollage from '@/components/home/HeroCollage';
import Marquee from '@/components/home/Marquee';
import PathExplorer from '@/components/home/PathExplorer';
import DragGallery from '@/components/home/DragGallery';
import VideoSwitcher from '@/components/home/VideoSwitcher';
import { links, videos } from '@/data/site';
import styles from './home.module.css';

export const metadata = {
  title: { absolute: "Let's Get Lost Bali | Breathwork, Yoga & Reiki Trainings in Ubud" },
  description:
    "Let's Get Lost Bali: breathwork instructor training, Yin Yoga teacher training, Reiki courses and men's circles in Ubud, Bali, in person and online.",
  alternates: { canonical: '/' },
};

const paths = [
  {
    id: 'breathwork',
    label: 'Breathwork',
    title: '100-hour Breathwork Instructor Training',
    meta: 'In person in Ubud · April 2027 · Yoga Alliance accredited',
    text: 'Master the science of the breath, the art of holding space, and the business of healing.',
    image: 'breath-group',
    alt: 'Students lying on mats during a breathwork session in the shala',
    links: [
      { label: 'In person in Ubud', href: '/breathwork#in-person' },
      { label: 'Online training · €499', href: '/breathwork#online' },
      { label: 'One-to-one and group mentorship', href: '/breathwork#mentorship' },
    ],
    href: '/breathwork',
    cta: 'Explore breathwork',
  },
  {
    id: 'yin',
    label: 'Yin Yoga',
    title: 'Somatic Yin Yoga Teacher Training',
    meta: '65 hours · Ubud · March 2027 · €950',
    text: 'For those who feel called to slow down, reconnect with the body, and guide others into deep rest. Led by Alicia Casillas.',
    image: 'yin-petals',
    alt: 'Alicia Casillas seated in meditation on a deck scattered with flower petals',
    href: '/yoga',
    cta: 'Explore the training',
  },
  {
    id: 'reiki',
    label: 'Reiki',
    title: 'Reiki Level I, II and Master/Teacher',
    meta: 'Ubud · March 2027 · and online',
    text: 'Learn a universal energy used to heal physical, emotional and energetic imbalances, with one-to-one initiations.',
    image: 'reiki-session',
    alt: 'A Reiki treatment on a massage table in the open-air shala',
    links: [
      { label: 'Courses in Ubud', href: '/reiki-and-circles#reiki' },
      { label: 'Online Reiki courses', href: '/reiki-and-circles#online-reiki' },
    ],
    href: '/reiki-and-circles',
    cta: 'Explore Reiki',
  },
  {
    id: 'circles',
    label: 'Men’s circles',
    title: 'Men’s circles with Solis Brotherhood',
    meta: 'In person in Petulu · Weekly online',
    text: 'Committed circles for men to connect and grow with other men, within 11 guiding principles designed by Anthony Ball.',
    image: 'circle-huddle',
    alt: 'A men’s circle gathered with hands on each other’s shoulders',
    href: '/reiki-and-circles#mens-circles',
    cta: 'Join a circle',
  },
];

const gallery = [
  { name: 'yin-mandala', alt: 'Students kneeling around a yin-yang mandala made of flower petals' },
  { name: 'reiki-tattoo', alt: 'A practitioner resting her hands over a man’s eyes during a Reiki treatment' },
  { name: 'breath-hug', alt: 'Two people embracing in the bamboo shala' },
  { name: 'centre-koi', alt: 'Orange koi swimming in a dark green pond' },
  { name: 'meditate-buddha', alt: 'A woman seated in meditation in front of a Buddha statue' },
  { name: 'circle-hands', alt: 'Men laughing together with hands on each other’s shoulders' },
  { name: 'students-shala', alt: 'Students sitting on their mats in the open-air shala' },
  { name: 'mentor-anthony', alt: 'A teacher in conversation with a student in the shala' },
  { name: 'yin-porch', alt: 'A woman and a man smiling at each other on a porch' },
  { name: 'breath-hall', alt: 'Students standing in the bamboo shala during a session' },
];

export default function Home() {
  return (
    <>
      <HeroCollage />
      <Marquee />

      <section id="paths" className="section">
        <div className="container">
          <div className="section-head">
            <h2>Find your path</h2>
            <p className="muted">
              Small groups and experienced teachers, in Ubud and online. Choose a practice to see what’s coming
              up.
            </p>
          </div>
          <PathExplorer paths={paths} />
        </div>
      </section>

      <section className="section on-dark torn-top torn-bottom" style={{ '--prev': 'var(--white)', '--next': 'var(--paper)' }}>
        <div className="container">
          <div className="section-head">
            <h2>In their words</h2>
            <p className="muted">Graduates of the breathwork instructor training, in Ubud and online.</p>
          </div>
          <VideoSwitcher
            videos={[videos.testimonialTraining, videos.testimonialOnline, videos.testimonial100hr, videos.trainingFilm]}
          />
        </div>
      </section>

      <section className={`section ${styles.life}`}>
        <div className="container">
          <div className="section-head">
            <h2>Life at Let’s Get Lost</h2>
            <p className="muted">Moments from our trainings, circles and sessions in Bali. Drag or scroll sideways.</p>
          </div>
        </div>
        <DragGallery photos={gallery} />
      </section>

      <section className="section">
        <div className={`container ${styles.founders}`}>
          <div className={styles.portraits}>
            <div className={styles.portraitWide} data-speed="0.3">
              <TornFrame seed={58} className={styles.portraitPaper}>
                <Picture
                  name="founders-circle"
                  alt="A teaching circle on a woven rug in the bamboo shala"
                  sizes="(min-width: 1024px) 42vw, 85vw"
                />
              </TornFrame>
            </div>
            <div className={styles.portraitA} data-speed="0.7">
              <TornFrame seed={61} className={styles.portraitPaper}>
                <Picture
                  name="portrait-anthony"
                  alt="Anthony Ball kneeling on grass scattered with marigold petals"
                  sizes="(min-width: 1024px) 22vw, 46vw"
                />
              </TornFrame>
            </div>
            <div className={styles.portraitB} data-speed="-0.5">
              <TornFrame seed={67} className={styles.portraitPaper}>
                <Picture
                  name="portrait-alicia"
                  alt="Alicia Casillas smiling, leaning on a wooden railing in the forest"
                  sizes="(min-width: 1024px) 22vw, 46vw"
                />
              </TornFrame>
            </div>
          </div>
          <div className={styles.foundersText} data-reveal>
            <h2>
              Founded by Alicia <em>and</em> Anthony
            </h2>
            <p>
              A husband-and-wife team united by a shared calling: to guide others back into their bodies, where
              true healing begins. What started as a sanctuary in Ubud has grown into an academy for embodied
              transformation.
            </p>
            <blockquote className={styles.quote}>
              <p>
                The body holds the stories the mind cannot explain, and through it we can heal what words cannot
                reach.
              </p>
            </blockquote>
            <dl className={styles.people}>
              <div>
                <dt>Anthony Ball</dt>
                <dd>Lead breathwork teacher and mentor. Embodiment, trauma-informed breathwork and men’s work.</dd>
              </div>
              <div>
                <dt>Alicia Casillas</dt>
                <dd>Yin Yoga lead and Reiki Master. E-RYT 500, leading teacher trainings since 2015.</dd>
              </div>
            </dl>
            <Link prefetch={false} href="/about" className="btn btn-secondary">
              Our story, values and teachers
            </Link>
          </div>
        </div>
      </section>

      <section className={`on-dark torn-top ${styles.online}`} style={{ '--prev': 'var(--white)' }}>
        <Picture name="breath-rest" alt="" sizes="100vw" />
        <div className={`container ${styles.onlineInner}`}>
          <h2>Not in Bali? Practise with us online.</h2>
          <p>
            Book an online Reiki, breathwork or yoga session with Anthony or Alicia, train as an instructor
            online, or listen to Anthony’s podcast.
          </p>
          <div className="btn-row">
            <a href={links.onlineSession} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Book an online session
            </a>
            <Link prefetch={false} href="/breathwork#online" className="btn btn-secondary">
              Online training · €499
            </Link>
            <a href={links.podcast} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              Listen on Spotify
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

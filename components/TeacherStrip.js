import Link from 'next/link';
import Picture from './Picture';
import { teachers } from '@/data/teachers';
import styles from './TeacherStrip.module.css';

// Compact teacher list for course pages: small portrait, name and role. Full bios live on /about#teachers.
export default function TeacherStrip({ people, title = 'Your teachers' }) {
  return (
    <div>
      <div className={styles.head}>
        <h3>{title}</h3>
        <Link prefetch={false} href="/about#teachers" className="text-link">
          Full biographies
        </Link>
      </div>
      <ul className={styles.list}>
        {people.map(({ key, role }) => {
          const t = teachers[key];
          return (
            <li key={key}>
              <div className={`frame ${styles.photo}`}>
                <Picture name={t.image} alt={t.alt} sizes="96px" />
              </div>
              <div>
                <p className={styles.name}>{t.name}</p>
                <p className={styles.role}>{role}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

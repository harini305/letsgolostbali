import blocks from '@/data/privacy-policy.json';
import styles from './privacy.module.css';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy. We value your privacy.',
  alternates: { canonical: '/privacy-policy' },
};

// Published text carried over verbatim from the original site, pending the business's legal review.
function render(list) {
  const out = [];
  let items = [];
  const flush = () => {
    if (items.length) {
      out.push(
        <ul key={`ul-${out.length}`} className="list">
          {items}
        </ul>,
      );
      items = [];
    }
  };
  list.forEach((b, i) => {
    if (b.type === 'li') {
      items.push(<li key={i}>{b.text}</li>);
      return;
    }
    flush();
    out.push(b.type === 'h2' ? <h2 key={i}>{b.text}</h2> : <p key={i}>{b.text}</p>);
  });
  flush();
  return out;
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-start page-intro on-dark torn-bottom">
        <div className="container">
          <h1>Privacy Policy</h1>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className={styles.body}>{render(blocks)}</div>
        </div>
      </section>
    </>
  );
}

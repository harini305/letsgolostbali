import Link from 'next/link';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <section className="page-start section">
      <div className="container" style={{ display: 'grid', gap: '1.25rem', justifyItems: 'start', maxWidth: 'calc(40rem + var(--gutter) * 2)', marginInline: 0 }}>
        <h1>This page has wandered off.</h1>
        <p className="lead">The page you were looking for doesn’t exist or has moved.</p>
        <div className="btn-row">
          <Link prefetch={false} href="/" className="btn btn-primary">
            Go to the home page
          </Link>
          <Link prefetch={false} href="/contact" className="btn btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}

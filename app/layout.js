import { Fraunces, Albert_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollEffects from '@/components/ScrollEffects';
import { site } from '@/data/site';
import './globals.css';

// Exactly two families: Fraunces (headings, with its italic) and Albert Sans (everything else).
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-fraunces',
  display: 'swap',
});

const albert = Albert_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-albert',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Let's Get Lost Bali | Breathwork, Yoga & Reiki Trainings in Ubud",
    template: "%s | Let's Get Lost Bali",
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  themeColor: '#13110e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${albert.variable}`} data-scroll-behavior="smooth">
      <body>
        <Header />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ScrollEffects />
      </body>
    </html>
  );
}

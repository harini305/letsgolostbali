/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve pre-generated images as-is (see scripts/optimize-images.mjs) instead of using
  // Vercel's Image Optimization quota.
  images: {
    unoptimized: true,
  },

  // Long browser caching for static assets, so repeat visits don't re-request them from the CDN.
  // If an image's content ever changes, regenerate it under a new name (see scripts/optimize-images.mjs).
  async headers() {
    const year = 'public, max-age=31536000, immutable';
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: year }] },
      { source: '/textures/:path*', headers: [{ key: 'Cache-Control', value: year }] },
      { source: '/brand/:path*', headers: [{ key: 'Cache-Control', value: year }] },
      { source: '/docs/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=604800' }] },
    ];
  },

  // Old Squarespace URLs → the compact page structure.
  // permanent: true  = the content now lives at the destination.
  // permanent: false = the page was not rebuilt yet; the destination is a holding choice
  //                    pending a business decision (see docs/IMPLEMENTATION-REPORT.md).
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/breathwork-instructor-training-bali-ubud-', destination: '/breathwork', permanent: true },
      { source: '/teacher-trainings', destination: '/breathwork', permanent: true },
      { source: '/online-trainings', destination: '/breathwork#online', permanent: true },
      { source: '/online', destination: '/breathwork#online', permanent: true },
      { source: '/practitioner/mentorship-training', destination: '/breathwork#mentorship', permanent: true },
      { source: '/yin-yoga-teacher-training-bali', destination: '/yoga', permanent: true },
      { source: '/reiki-courses', destination: '/reiki-and-circles', permanent: true },
      { source: '/mens-circles', destination: '/reiki-and-circles#mens-circles', permanent: true },
      { source: '/offerings', destination: '/reiki-and-circles', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/philosophy', destination: '/about#philosophy', permanent: true },
      { source: '/sustainability', destination: '/about#the-land', permanent: true },
      { source: '/our-teachers', destination: '/about#teachers', permanent: true },

      { source: '/spain', destination: '/about', permanent: false },
      { source: '/meditations', destination: '/', permanent: false },
      { source: '/faqs', destination: '/contact', permanent: false },
      { source: '/blog', destination: '/', permanent: false },
      { source: '/blog/:path*', destination: '/', permanent: false },
      { source: '/store', destination: '/', permanent: false },
      { source: '/store/:path*', destination: '/', permanent: false },
      { source: '/cart', destination: '/', permanent: false },
      { source: '/terms-and-conditions', destination: '/contact', permanent: false },
    ];
  },
};

export default nextConfig;

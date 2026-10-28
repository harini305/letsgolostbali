import { site } from '@/data/site';

const routes = ['', '/breathwork', '/yoga', '/reiki-and-circles', '/about', '/contact', '/privacy-policy'];

export default function sitemap() {
  return routes.map((route) => ({ url: `${site.url}${route}` }));
}

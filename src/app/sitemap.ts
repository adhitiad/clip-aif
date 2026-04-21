import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://clipaif.com';

  // Public routes
  const routes = [
    '',
    '/harga',
    '/kontak',
    '/niche',
    '/perusahaan',
    '/privacy-policy',
    '/terms-of-service',
    '/tentang-kami',
    '/tools',
    '/signin',
    '/signup',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}

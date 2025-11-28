import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openredaction.com';

  const routes = [
    '',
    '/playground',
    '/docs',
    '/blog',
    '/contact',
    '/pricing',
  ];

  // Blog posts - add your actual blog slugs here
  const blogPosts = [
    '/blog/getting-started-with-openredaction',
    '/blog/understanding-pii-detection',
    '/blog/privacy-compliance-made-simple',
    '/blog/building-secure-chat-application',
    '/blog/api-presets-gdpr-hipaa',
    '/blog/self-hosting-openredaction',
  ];

  const allRoutes = [...routes, ...blogPosts];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : route.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route.startsWith('/blog') ? 0.7 : 0.8,
  }));
}


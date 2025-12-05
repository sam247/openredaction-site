// Blog posts data - shared between blog pages and sitemap
export const blogPosts: { [key: string]: any } = {
  'building-openredaction-developer-journey': {
    title: 'From Regex Library to Real API: Building OpenRedaction\'s Developer Journey',
    date: '2025-12-04',
    category: 'Guide',
    excerpt: 'How OpenRedaction evolved from a simple regex-based redaction library into a hosted API with AI-assist, billing and product-grade infrastructure.',
    slug: 'building-openredaction-developer-journey',
  },
  'understanding-pii-detection': {
    title: 'Understanding PII Detection',
    date: '2025-01-15',
    category: 'Guide',
    excerpt: 'Learn what PII is, why detecting it is challenging, and how pattern-based and AI-assisted approaches combine for robust redaction pipelines.',
    slug: 'understanding-pii-detection',
  },
};

// Get all blog post slugs for sitemap
export function getAllBlogPostSlugs(): string[] {
  return Object.keys(blogPosts);
}


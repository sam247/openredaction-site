import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog - PII Detection Guides & Updates',
  description: 'Read guides, tutorials, and updates on PII detection, privacy compliance, and OpenRedaction. Learn about GDPR, HIPAA, CCPA, and data protection.',
  path: '/blog',
});

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Understanding PII Detection',
    excerpt: 'Learn what PII is, why detecting it is challenging, and how pattern-based and AI-assisted approaches combine for robust redaction pipelines.',
    date: '2025-01-15',
    category: 'Guide',
    slug: 'understanding-pii-detection',
  },
  {
    id: 2,
    title: 'From Regex Library to Real API: Building OpenRedaction\'s Developer Journey',
    excerpt: 'How OpenRedaction evolved from a simple regex-based redaction library into a hosted API with AI-assist, billing and product-grade infrastructure.',
    date: '2025-12-04',
    category: 'Guide',
    slug: 'building-openredaction-developer-journey',
  },
];

const categories = ['Latest', 'Guide'];

export default function Blog() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Guides, tutorials, and updates on PII detection, privacy compliance, and OpenRedaction
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 sticky top-24">
                <h2 className="text-white font-semibold mb-4">Categories</h2>
                <nav className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${category.toLowerCase()}`}
                      className="block text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {category}
                    </Link>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content - Blog Posts */}
            <div className="flex-1">
              <div className="grid md:grid-cols-2 gap-6">
                {blogPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">
                          {post.category}
                        </span>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar size={14} className="mr-1" />
                          {new Date(post.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                        Read More
                        <ArrowRight size={16} className="ml-2" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


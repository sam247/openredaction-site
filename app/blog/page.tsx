import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

// Blog posts data - placeholder content
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with OpenRedaction: A Complete Guide',
    excerpt: 'Learn how to integrate OpenRedaction into your application and start detecting PII in minutes. This guide covers installation, basic usage, and best practices.',
    date: '2024-11-15',
    category: 'Tutorial',
    slug: 'getting-started-with-openredaction',
  },
  {
    id: 2,
    title: 'Understanding PII Detection: What You Need to Know',
    excerpt: 'Explore the different types of personally identifiable information and how OpenRedaction detects them. Learn about email addresses, phone numbers, SSNs, and more.',
    date: '2024-11-10',
    category: 'Guide',
    slug: 'understanding-pii-detection',
  },
  {
    id: 3,
    title: 'Privacy Compliance Made Simple with OpenRedaction',
    excerpt: 'Discover how OpenRedaction helps you meet GDPR, HIPAA, and CCPA requirements. Learn about automatic PII detection and redaction for compliance.',
    date: '2024-11-05',
    category: 'Compliance',
    slug: 'privacy-compliance-made-simple',
  },
  {
    id: 4,
    title: 'Building a Secure Chat Application with PII Protection',
    excerpt: 'Step-by-step tutorial on building a chat application that automatically redacts PII before storing messages. Includes code examples and implementation details.',
    date: '2024-10-28',
    category: 'Tutorial',
    slug: 'building-secure-chat-application',
  },
  {
    id: 5,
    title: 'OpenRedaction API Presets: GDPR, HIPAA, and More',
    excerpt: 'Learn about OpenRedaction\'s API presets for different compliance requirements. Understand how to use GDPR, HIPAA, CCPA, and sector-specific presets.',
    date: '2024-10-20',
    category: 'Guide',
    slug: 'api-presets-gdpr-hipaa',
  },
  {
    id: 6,
    title: 'Self-Hosting OpenRedaction: A Complete Setup Guide',
    excerpt: 'Complete guide to self-hosting OpenRedaction for maximum control and privacy. Includes deployment options, configuration, and security considerations.',
    date: '2024-10-15',
    category: 'Tutorial',
    slug: 'self-hosting-openredaction',
  },
];

const categories = ['Latest', 'Tutorial', 'Guide', 'Compliance'];

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


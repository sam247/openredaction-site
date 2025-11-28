import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

// Blog posts data - in a real app, this would come from a CMS or database
const blogPosts: { [key: string]: any } = {
  'getting-started-with-openredaction': {
    title: 'Getting Started with OpenRedaction: A Complete Guide',
    date: '2024-11-15',
    category: 'Tutorial',
    content: `
      <p>OpenRedaction is a powerful open-source tool for automatically detecting and redacting personally identifiable information (PII) from text. This guide will walk you through getting started.</p>
      
      <h2>Installation</h2>
      <p>You can install OpenRedaction via npm:</p>
      <pre><code>npm install openredaction</code></pre>
      
      <h2>Basic Usage</h2>
      <p>Here's a simple example of how to use OpenRedaction:</p>
      <pre><code>import { redact } from 'openredaction';

const text = "Contact John Doe at john@example.com or call 555-123-4567";
const result = await redact(text);
console.log(result.redacted_text);</code></pre>
      
      <h2>Next Steps</h2>
      <p>Check out our documentation for more advanced features and API options.</p>
    `,
  },
  'understanding-pii-detection': {
    title: 'Understanding PII Detection: What You Need to Know',
    date: '2024-11-10',
    category: 'Guide',
    content: `
      <p>Personally Identifiable Information (PII) comes in many forms. Understanding what constitutes PII is crucial for protecting user privacy.</p>
      
      <h2>Types of PII</h2>
      <ul>
        <li>Email addresses</li>
        <li>Phone numbers</li>
        <li>Social Security Numbers</li>
        <li>Credit card numbers</li>
        <li>Physical addresses</li>
        <li>IP addresses</li>
        <li>Names and dates of birth</li>
      </ul>
      
      <h2>How OpenRedaction Detects PII</h2>
      <p>OpenRedaction uses advanced pattern matching and AI models to identify PII with high accuracy.</p>
    `,
  },
  // Add more posts as needed
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return {};
  }

  const excerpt = post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || post.excerpt || '';

  return generatePageMetadata({
    title: post.title,
    description: excerpt,
    path: `/blog/${params.slug}`,
  });
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>

          <article>
            <div className="mb-6">
              <span className="text-xs font-medium text-gray-400 bg-gray-800 px-2 py-1 rounded">
                {post.category}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-gray-400 text-sm mb-8">
              <Calendar size={16} className="mr-2" />
              {new Date(post.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>

            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white
                prose-p:text-gray-300
                prose-a:text-white prose-a:underline
                prose-strong:text-white
                prose-code:text-green-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                prose-ul:text-gray-300
                prose-li:text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Calendar, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

// Blog posts data
const blogPosts: { [key: string]: any } = {
  'building-openredaction-developer-journey': {
    title: 'From Regex Library to Real API: Building OpenRedaction\'s Developer Journey',
    date: '2025-12-04',
    category: 'Guide',
    excerpt: 'How OpenRedaction evolved from a simple regex-based redaction library into a hosted API with AI-assist, billing and product-grade infrastructure.',
    content: `
      <p>You know that feeling when you build something small, open-source… then suddenly people star it, fork it, and ask: <em>"How much for the API?"</em></p>
      
      <p>That's where we found ourselves with OpenRedaction. What began as a deterministic regex-based redaction library — simple, local, dependable — has now become something bigger: a hosted AI-assist proxy, Stripe payments, API keys, and a real product behind it.</p>
      
      <p>In this post I walk you through that journey: why we built each piece, what worked, what we learned — and how you can use the same blueprint for your own dev tools.</p>
      
      <hr />
      
      <h2>1. The beginning: an open-source library for privacy-first redaction</h2>
      
      <ul>
        <li><strong>Origins</strong> — OpenRedaction started as a personal tool: a regex-based engine to strip out names, emails, phone numbers, addresses, etc. from text. It was simple, deterministic, fast, and local.</li>
        <li><strong>Why regex-first?</strong> Regex gives control: no external calls, no hidden AI, no data leaks. That's important for privacy, security, and compliance.</li>
        <li><strong>Open-sourcing</strong> — I made it MIT, published on GitHub, added many patterns, tests, and documentation. People liked it: devs could trust its transparency and deterministic behaviour.</li>
      </ul>
      
      <p><strong>Value delivered:</strong> a lean, dependable redaction engine for anyone who needs PII-safe output — logs, disclosures, transcripts, and more.</p>
      
      <hr />
      
      <h2>2. The gap: real-world data isn't neat — regex wasn't enough</h2>
      
      <p>Real world isn't clean. Names are lowercase, uppercase, mixed case; people combine first/last names incorrectly; addresses vary; phone numbers have weird formats; blobs of unstructured text with noise.</p>
      
      <p>Regex did a great job — but still missed messy, ambiguous, or unusual cases.</p>
      
      <p>So I asked: <em>What if we layer an AI-powered detection pass over regex?</em></p>
      
      <p>But I also wanted to stay true to the original values: privacy, transparency, and optionality.</p>
      
      <hr />
      
      <h2>3. The hybrid solution: regex-first + optional AI-assist</h2>
      
      <p>We designed the architecture to be hybrid:</p>
      
      <ul>
        <li><strong>Regex-first core</strong> — still default, local, open-source.</li>
        <li><strong>Optional AI-assist via hosted proxy</strong> — when you need extra detection power.</li>
        <li><strong>User decides</strong> — you can stay 100% local, or use hosted API.</li>
      </ul>
      
      <p>That balance preserves trust while giving flexibility.</p>
      
      <hr />
      
      <h2>4. From library to product: building the API, proxy, billing</h2>
      
      <p>A few big steps:</p>
      
      <ul>
        <li>Built a <strong>hosted AI proxy</strong> — accepts text, passes it to a model provider, returns structured entity spans.</li>
        <li>Wrapped with <strong>rate-limiting, API keys, quota checks</strong> — using Upstash + KV storage.</li>
        <li>Integrated <strong>payment handling</strong> (via Stripe) → after checkout, generate API key + email to user.</li>
        <li>Updated docs + README + site messaging — made clear what's free, what's paid, and how to use.</li>
        <li>Added <strong>free tier + pro tier</strong> — free tier for experimentation; pro tier for real usage (e.g. 50,000 AI-assisted requests/month).</li>
      </ul>
      
      <p>This turned OpenRedaction from a hobby-library to a <strong>real dev-tool product</strong>.</p>
      
      <hr />
      
      <h2>5. What we learned (the hard and the good)</h2>
      
      <h3>Good</h3>
      <ul>
        <li>Open source brings visibility and trust.</li>
        <li>Hybrid model satisfies both "privacy-first" and "power-when-needed" communities.</li>
        <li>Simple billing + API key logic is enough at early stage.</li>
        <li>Transparent docs + clear messaging convert interested devs quickly.</li>
        <li>Hosting under your own proxy lets you control quota, avoid vendor friction, and shield users from complexity.</li>
      </ul>
      
      <h3>Challenges & trade-offs</h3>
      <ul>
        <li>You must explain clearly when AI-assist sends data externally — honesty builds trust.</li>
        <li>Edge cases: very long inputs, abuse, rate-limiting — had to harden API accordingly.</li>
        <li>Documentation & UX must stay rock-solid to avoid confusion.</li>
        <li>You lose the "fully local only" claim when users choose AI mode — needs clear communication.</li>
      </ul>
      
      <hr />
      
      <h2>6. The result: a tool devs can trust — with flexibility</h2>
      
      <p>OpenRedaction today:</p>
      
      <ul>
        <li>Is still free and open-source at its core.</li>
        <li>Lets you redact with pure regex quickly and privately.</li>
        <li>Offers optional AI-assist for messy or unstructured text.</li>
        <li>Provides a hosted API, billing, and key-based access — ideal for production.</li>
        <li>Gives community & enterprise users flexibility: local vs hosted; free vs paid; DIY vs plug-and-play.</li>
      </ul>
      
      <p>It's become a <strong>full-featured redaction platform</strong>, but with developer values and transparency intact.</p>
      
      <hr />
      
      <h2>7. Advice for other dev-tool creators</h2>
      
      <p>If you're building a developer library and thinking of turning it into a product:</p>
      
      <ul>
        <li>Start with <strong>deterministic core functionality</strong> — something reliable, open-source, and trustable.</li>
        <li>Expose a clear switch — "core library only" vs "hosted service" — let users choose.</li>
        <li>Build incremental — library → self-hosted → hosted API → billing.</li>
        <li>Keep docs simple, honest, and upfront about trade-offs (privacy, cost, limits).</li>
        <li>Don't over-engineer early. A simple API key + rate limiting + small quota is enough to test demand.</li>
        <li>Use a hosted proxy rather than exposing vendor complexity — shield users from underlying dependencies.</li>
      </ul>
      
      <hr />
      
      <h2>Conclusion</h2>
      
      <p>OpenRedaction's journey — from small regex library to hosted API product — is a classic developer-tool growth arc. Because we stayed grounded in simplicity, transparency and dev-values, we haven't lost flexibility or trust — and unlocked real usage and revenue potential.</p>
      
      <p>If you're building a tool, library or small SaaS: treat your users as developers, give them control, stay honest — and build slowly.</p>
      
      <p>Want to see the live code or try it? Check out <a href="https://github.com/sam247/openredaction" target="_blank" rel="noopener noreferrer">GitHub → OpenRedaction</a> or visit <a href="https://openredaction.com">openredaction.com</a>.</p>
      
      <div style="margin-top: 3rem; padding: 1.5rem; background-color: #111827; border: 1px solid #374151; border-radius: 0.5rem;">
        <h3 style="margin-top: 0; margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #fff;">Ready to get started?</h3>
        <ul style="margin-bottom: 1rem; padding-left: 1.5rem; list-style-type: disc; color: #d1d5db;">
          <li style="margin-bottom: 0.5rem;"><a href="/pricing" style="color: #fff; text-decoration: underline;">View pricing and get an API key</a> for the Pro tier</li>
          <li style="margin-bottom: 0.5rem;"><a href="/playground" style="color: #fff; text-decoration: underline;">Try the playground</a> to test redaction in your browser</li>
          <li style="margin-bottom: 0.5rem;"><a href="/docs" style="color: #fff; text-decoration: underline;">Read the documentation</a> for integration guides and API details</li>
        </ul>
      </div>
    `,
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];

  if (!post) {
    return {};
  }

  const excerpt = post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

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

  // Process content - ensure links have proper styling
  const processedContent = post.content
    .replace(/<a href="([^"]+)">/g, (_match: string, href: string) => {
      if (href.startsWith('/') || href.startsWith('https://openredaction.com')) {
        return `<a href="${href}" style="color: #fff; text-decoration: underline; hover:color: #d1d5db;">`;
      }
      return `<a href="${href}" target="_blank" rel="noopener noreferrer" style="color: #fff; text-decoration: underline;">`;
    })
    .trim();

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
              className="blog-content prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-semibold
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mt-8 prose-h1:mb-4
                prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-6 prose-h2:leading-tight
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-4 prose-h3:leading-tight
                prose-p:text-gray-300 prose-p:mb-6 prose-p:leading-7 prose-p:text-base
                prose-a:text-white prose-a:underline prose-a:hover:text-gray-300
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-green-400 prose-code:bg-gray-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800 prose-pre:rounded prose-pre:p-4
                prose-ul:text-gray-300 prose-ul:my-6 prose-ul:pl-6 prose-ul:space-y-2
                prose-li:text-gray-300 prose-li:my-1 prose-li:leading-7 prose-li:text-base
                prose-hr:border-gray-800 prose-hr:my-10 prose-hr:border-t
                prose-blockquote:border-l-gray-800 prose-blockquote:text-gray-400"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
            <style dangerouslySetInnerHTML={{ __html: `
              .blog-content p {
                margin-bottom: 1.5rem !important;
                line-height: 1.75 !important;
              }
              .blog-content ul {
                margin-top: 1.5rem !important;
                margin-bottom: 1.5rem !important;
              }
              .blog-content li {
                margin-top: 0.5rem !important;
                margin-bottom: 0.5rem !important;
                line-height: 1.75 !important;
              }
              .blog-content h2 {
                margin-top: 2.5rem !important;
                margin-bottom: 1.5rem !important;
              }
              .blog-content h3 {
                margin-top: 2rem !important;
                margin-bottom: 1rem !important;
              }
              .blog-content hr {
                margin-top: 2.5rem !important;
                margin-bottom: 2.5rem !important;
              }
            `}} />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}

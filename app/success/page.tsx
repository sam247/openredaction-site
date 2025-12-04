import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check, ArrowRight, Key, Code, Play } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Thank You - API Key Sent | OpenRedaction',
  description: 'Thank you for subscribing to OpenRedaction Pro. Check your email for your API key and start using the API.',
  path: '/success',
});

export default function Success() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/20 rounded-full mb-6">
              <Check className="text-green-400" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your subscription to OpenRedaction Pro is active. Check your email for your API key.
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
            <div className="flex items-start space-x-4 mb-6">
              <Key className="text-white mt-1 flex-shrink-0" size={24} />
              <div>
                <h2 className="text-2xl font-semibold mb-2">Your API Key</h2>
                <p className="text-gray-300">
                  We&apos;ve sent your API key to your email address. Please check your inbox (and spam folder) for the email containing your key.
                </p>
              </div>
            </div>

            <div className="bg-black rounded-lg p-6 border border-gray-800 mb-6">
              <h3 className="text-lg font-semibold mb-4">What&apos;s Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-white">Check your email</strong> for your API key
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-white">Use your API key</strong> in the playground or in your code
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <p className="text-gray-300">
                      <strong className="text-white">Start making requests</strong> with your 50,000 monthly AI-assist quota
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Link
              href="/playground"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Play className="text-white group-hover:text-green-400 transition-colors" size={32} />
                <h3 className="text-xl font-semibold">Try in Playground</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Test your API key in our interactive playground. Enter your key and start redacting text with AI assist.
              </p>
              <div className="flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                Open Playground
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>

            <Link
              href="/docs"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Code className="text-white group-hover:text-green-400 transition-colors" size={32} />
                <h3 className="text-xl font-semibold">View API Docs</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Learn how to integrate the API into your application. See code examples, endpoint details, and usage limits.
              </p>
              <div className="flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform">
                Read Documentation
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Quick Start Code Example</h3>
            <div className="bg-black rounded-lg p-4 border border-gray-800 font-mono text-sm overflow-x-auto">
              <pre className="text-green-400">
{`const response = await fetch(
  'https://openredaction-api.onrender.com/ai-detect',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_API_KEY_HERE'
    },
    body: JSON.stringify({
      text: 'Your text to redact here'
    })
  }
);

const data = await response.json();
console.log(data);`}
              </pre>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Replace <code className="bg-gray-800 px-1 py-0.5 rounded">YOUR_API_KEY_HERE</code> with the API key from your email.
            </p>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Need help? Check out our{' '}
              <Link href="/docs" className="text-white hover:text-gray-300 underline">
                documentation
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-white hover:text-gray-300 underline">
                contact support
              </Link>.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm"
            >
              View Pricing Details
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing - Free & Pro API Tiers | OpenRedaction',
  description: 'Free regex-only redaction and Pro API with AI assist. Open-source library always free. Hosted API with optional AI assist for higher limits.',
  path: '/pricing',
});

export default function Pricing() {
  const stripeCheckoutUrl = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_URL || '#';

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300">
              Regex-only redaction is always free and open-source. Upgrade to Pro for higher AI-assist limits.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {/* Free Tier */}
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Free</h2>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">£0</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Unlimited regex-only redaction (self-hosted)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Hosted playground access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">AI assist with fair-use limits (anonymous, IP-based)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Open-source library</span>
                </li>
              </ul>

              <Link
                href="/playground"
                className="block w-full bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors text-center border border-gray-700"
              >
                Try Playground
              </Link>
            </div>

            {/* Pro API Tier */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 border-2 border-white relative">
              <div className="absolute top-4 right-4">
                <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
                  PRO
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">Pro API</h2>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold">£9</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">50,000 AI-assist requests/month</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">API key for use from your own backend</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">Priority rate limiting</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">Everything in Free tier</span>
                </li>
              </ul>

              <a
                href={stripeCheckoutUrl}
                className="block w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Get API Key
              </a>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-xl font-semibold mb-3">Privacy & Usage</h3>
              <p className="text-gray-300 mb-3">
                Regex-only redaction is always free and open-source. You can use it locally without any external services.
              </p>
              <p className="text-gray-300">
                AI assist is optional. When enabled, your text is sent to our stateless hosted proxy and then to our model provider for PII detection. We do not store your text.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">What is the difference between Free and Pro?</h3>
                <p className="text-gray-400">
                  Free = anonymous AI assist with IP-based limits + self-hosted regex. Pro = dedicated API key with higher monthly AI limits (50,000 requests/month) and priority rate limiting.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Do you store my data?</h3>
                <p className="text-gray-400">
                  No, the hosted API is stateless and does not store raw text in databases. Minimal metadata may be logged for rate limiting and abuse prevention. See our{' '}
                  <Link href="/privacy" className="text-white hover:text-gray-300 underline">
                    Privacy Policy
                  </Link>{' '}
                  for details.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is AI required?</h3>
                <p className="text-gray-400">
                  No. Regex-only use via the library is fully local and free. AI assist is optional via the hosted API for better detection on messy or unstructured text.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I self-host everything?</h3>
                <p className="text-gray-400">
                  Yes! The entire system is open source. You can run it on your own server or infrastructure, with or without AI assist. See our{' '}
                  <Link href="/docs" className="text-white hover:text-gray-300 underline">
                    documentation
                  </Link>{' '}
                  for self-hosting instructions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How do I use an API key?</h3>
                <p className="text-gray-400">
                  After subscribing to Pro, you&apos;ll receive an API key. Include it in the <code className="bg-gray-800 px-1 py-0.5 rounded">x-api-key</code> header when calling the hosted API. You can also use it in the playground by entering it in the API key field.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

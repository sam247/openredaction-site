  import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check } from 'lucide-react';
import CodeExamples from '@/components/CodeExamples';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';
import PricingPageTracker from '@/components/PricingPageTracker';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing - Free & Pro API Tiers | OpenRedaction',
  description: 'Free regex-only redaction and Pro API with AI assist. Open-source library always free. Hosted API with optional AI assist for higher limits.',
  path: '/pricing',
});

export default function Pricing() {
  // For metered billing, we use the base price ID
  // The checkout session will automatically include both base + metered prices
  const basePriceId = process.env.NEXT_PUBLIC_STRIPE_BASE_PRICE_ID || '';

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <PricingPageTracker />
      
      <main className="pt-[148px] pb-20">
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
                  <span className="text-white">50,000 AI-assist requests/month included</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-white">Overage: £0.20 per 1,000 requests above 50k</span>
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

              {basePriceId ? (
                <StripeCheckoutButton priceId={basePriceId} />
              ) : (
                <div className="bg-gray-800 text-gray-400 px-6 py-3 rounded-md text-center text-sm">
                  Stripe pricing not configured. Please set NEXT_PUBLIC_STRIPE_BASE_PRICE_ID.
                </div>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="max-w-7xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Free vs Pro Comparison</h2>
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="text-left py-4 px-4 sm:px-6 text-white font-semibold text-sm sm:text-base">Feature</th>
                        <th className="text-center py-4 px-4 sm:px-6 text-white font-semibold text-sm sm:text-base">Free</th>
                        <th className="text-center py-4 px-4 sm:px-6 text-white font-semibold text-sm sm:text-base">Pro</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-4 sm:px-6 text-gray-300 text-sm sm:text-base">Regex-only redaction</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓ unlimited</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓ unlimited</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-4 sm:px-6 text-gray-300 text-sm sm:text-base">AI-assist</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-gray-400 text-sm sm:text-base">200/day (IP-based)</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-white font-semibold text-sm sm:text-base">50,000/month</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-4 sm:px-6 text-gray-300 text-sm sm:text-base">API key</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-gray-500 text-sm sm:text-base">✗</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-4 px-4 sm:px-6 text-gray-300 text-sm sm:text-base">Priority limits</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-gray-500 text-sm sm:text-base">✗</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓</td>
                      </tr>
                      <tr>
                        <td className="py-4 px-4 sm:px-6 text-gray-300 text-sm sm:text-base">Commercial use</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓</td>
                        <td className="py-4 px-4 sm:px-6 text-center text-green-400 text-sm sm:text-base">✓</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="max-w-7xl mx-auto mb-16">
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

          {/* Code Examples */}
          <div className="max-w-7xl mx-auto mb-16">
            <CodeExamples />
          </div>

          {/* Rate Limits */}
          <div className="max-w-7xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Rate Limits & Usage</h2>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Free Tier</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li>IP-based rate limiting (fair-use limits apply)</li>
                    <li>Anonymous usage — API key optional for higher limits</li>
                    <li>Lower priority during high traffic periods</li>
                    <li>Usage information not provided in response headers</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Pro Tier</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-2">
                    <li><strong>50,000 AI-assist requests per month included</strong> in base subscription</li>
                    <li><strong>Overage billing:</strong> £0.20 per 1,000 requests above 50,000 (billed monthly)</li>
                    <li>API key required for authentication</li>
                    <li>Priority rate limiting</li>
                    <li>Usage tracked and provided in response headers:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li><code className="bg-gray-800 px-1 py-0.5 rounded text-xs">X-Usage-Count</code>: Current usage count</li>
                        <li><code className="bg-gray-800 px-1 py-0.5 rounded text-xs">X-Usage-Limit</code>: Monthly limit (50,000)</li>
                        <li><code className="bg-gray-800 px-1 py-0.5 rounded text-xs">X-Usage-Reset</code>: Reset date (ISO 8601)</li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-gray-400 text-sm">
                    <strong>Note:</strong> Rate limits apply only to AI-assist requests. Regex-only redaction via the open-source library has no limits and works completely offline.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Can I self-host everything?</h3>
                  <p className="text-gray-400">
                    Yes! The entire system is open source. You can run it on your own server or infrastructure, with or without AI assist. See our{' '}
                    <Link href="/docs" prefetch={false} className="text-white hover:text-gray-300 underline">
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
        </div>
      </main>

      <Footer />
    </div>
  );
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import StripeCheckoutButton from '@/components/StripeCheckoutButton';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-300">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Free Tier */}
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Free</h2>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 mt-2">Perfect for testing and development</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>100 requests/day</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>All PII detection types</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Community support</span>
                </li>
              </ul>

              <Link
                href="/dashboard"
                className="block w-full bg-gray-800 text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-white text-black rounded-lg p-8 border-2 border-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Pro</h2>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mt-2">For growing applications</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>1,000 requests/day</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>All PII detection types</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Priority API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Email support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Usage analytics</span>
                </li>
              </ul>

              {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY && process.env.NEXT_PUBLIC_STRIPE_PRICE_ID ? (
                <StripeCheckoutButton 
                  priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID} 
                />
              ) : (
                <a
                  href="/dashboard?plan=pro"
                  className="block w-full bg-black text-white text-center px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
                >
                  Start Pro Trial
                </a>
              )}
            </div>

            {/* Enterprise/Unlimited Tier */}
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Enterprise</h2>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-gray-400 mt-2">For production at scale</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>10,000 requests/day</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>All PII detection types</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Priority API access</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span>SLA guarantee</span>
                </li>
              </ul>

              <Link
                href="/contact"
                className="block w-full bg-white text-black text-center px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>


          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">How does rate limiting work?</h3>
                <p className="text-gray-400">
                  Free tier keys (prefixed with `free_`) have a limit of 100 requests per day. 
                  Pro tier keys (prefixed with `paid_`) have a limit of 1,000 requests per day. 
                  Enterprise tier keys have a limit of 10,000 requests per day. 
                  Limits reset at midnight UTC.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can I upgrade or downgrade?</h3>
                <p className="text-gray-400">
                  Yes! You can change your plan at any time. When you upgrade, your API key 
                  will be updated to the paid tier format and limits will increase immediately.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What happens if I exceed my limit?</h3>
                <p className="text-gray-400">
                  You&apos;ll receive a 429 Too Many Requests error. You can either wait for the 
                  limit to reset or upgrade to the Pro plan for higher limits.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Is my data stored?</h3>
                <p className="text-gray-400">
                  No. We process your text in real-time and don&apos;t store any of your data. 
                  We only track usage metrics for billing purposes.
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


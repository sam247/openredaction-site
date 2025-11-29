import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { Check, Shield, Headphones, Server } from 'lucide-react';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Self-Hosted Deployment & Support',
  description: 'Self-hosted deployment instructions and support for OpenRedaction. Open-source library usage, community support, and self-hosting options.',
  path: '/pricing',
});

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Self-Hosted Deployment & Support
            </h1>
            <p className="text-xl text-gray-300">
              Deploy OpenRedaction on your infrastructure for complete privacy and control. 
              Open-source library with community support.
            </p>
          </div>

          {/* Free Tier Info */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 text-center">
              <h2 className="text-2xl font-bold mb-2">Try it Free First</h2>
              <p className="text-gray-300 mb-4">
                Test OpenRedaction with our free playground. No credit card required.
              </p>
              <Link
                href="/playground"
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
              >
                Try Playground Free
              </Link>
            </div>
          </div>

          {/* Self-Hosted Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Server className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Self-Hosted Control</h3>
              <p className="text-gray-400">
                Deploy on your infrastructure for complete data control and privacy
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Shield className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Open Source</h3>
              <p className="text-gray-400">
                Transparent, auditable code. Contribute and customize to your needs
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Headphones className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-400">
                Get help from the community via GitHub issues and discussions
              </p>
            </div>
          </div>

          {/* Self-Hosted Features */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Self-Hosted Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Complete Data Control</h4>
                  <p className="text-gray-400 text-sm">Your data never leaves your environment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Custom Pattern Configurations</h4>
                  <p className="text-gray-400 text-sm">Customize regex patterns for your specific needs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Compliance Ready</h4>
                  <p className="text-gray-400 text-sm">Architecture helps meet GDPR, HIPAA, and CCPA requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Zero Variable Costs</h4>
                  <p className="text-gray-400 text-sm">No per-request fees, only infrastructure costs</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Full Audit Control</h4>
                  <p className="text-gray-400 text-sm">You manage all audit logs and reporting</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Open Source</h4>
                  <p className="text-gray-400 text-sm">Transparent, auditable, and customizable</p>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Getting Started</h2>
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Installation</h3>
                  <div className="bg-black rounded-lg p-4 border border-gray-800">
                    <pre className="text-green-400 font-mono text-sm">
{`npm install openredaction`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Basic Usage</h3>
                  <div className="bg-black rounded-lg p-4 border border-gray-800">
                    <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`import { redact } from 'openredaction';

const result = await redact('Your text here');
console.log(result.redacted_text);`}
                    </pre>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3">Deployment</h3>
                  <p className="text-gray-300 mb-3">
                    Deploy on your own infrastructure using Node.js, Docker, or any container platform. 
                    See our documentation for detailed deployment instructions.
                  </p>
                  <Link
                    href="/docs"
                    className="text-white hover:text-gray-300 underline"
                  >
                    View Documentation →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-800">
              <h2 className="text-3xl font-bold text-center mb-4">Get Self-Hosted Support</h2>
              <p className="text-gray-300 text-center mb-4">
                Need help with self-hosted deployment? Have questions about the library?
              </p>
              <p className="text-yellow-400 text-sm text-center mb-8">
                Note: For self-hosted support only. We do not provide cloud-hosted API service.
              </p>
              <ContactForm />
            </div>
          </div>

          {/* Disclosurely Cross-sell */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-black rounded-lg p-8 md:p-12 border border-gray-800">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-4">Need Secure Reporting?</h2>
              <p className="text-xl text-gray-300 mb-6">
                Disclosurely.com is an AI-powered whistleblowing platform that uses OpenRedaction 
                to protect reporter privacy and ensure compliance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://disclosurely.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Learn About Disclosurely.com →
                </a>
                <Link
                  href="/contact"
                  className="bg-gray-800 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">How do I self-host OpenRedaction?</h3>
                <p className="text-gray-400">
                  Install the library via npm: <code className="bg-gray-800 px-1 py-0.5 rounded">npm install openredaction</code>. 
                  Use it directly in your Node.js application. Deploy on your own infrastructure using Docker, 
                  Node.js server, or any container platform. See our documentation for detailed instructions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What support is available?</h3>
                <p className="text-gray-400">
                  Community support is available via GitHub issues and discussions. For self-hosted deployment 
                  questions, you can contact us. We do not provide cloud-hosted API service or enterprise SLAs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How does OpenRedaction help with compliance?</h3>
                <p className="text-gray-400">
                  OpenRedaction helps you meet GDPR, HIPAA, and CCPA requirements through regex transparency, 
                  self-hosting, and zero data retention. The architecture is designed to help you achieve compliance, 
                  but you are responsible for your own compliance certifications.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why not just use AWS services?</h3>
                <p className="text-gray-400">
                  OpenRedaction is open source and self-hostable, so your data never leaves your environment. 
                  Unlike AWS/Google, we require no account, log no data, and offer predictable costs (no per-token 
                  pricing). Our regex-first approach is faster, more transparent, and easier to audit.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What are the costs?</h3>
                <p className="text-gray-400">
                  The library is free and open source. When self-hosted, you only pay for your infrastructure costs. 
                  There are no per-request fees or variable costs. You maintain full control over your deployment.
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

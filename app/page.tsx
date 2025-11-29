import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import TestimonialCard from '@/components/TestimonialCard';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Open Source PII Detection & Redaction | OpenRedaction',
  description: 'Open source, privacy-first PII redaction for modern developers. Built on 500+ tested regex patterns for speed and accuracy. Optional AI layer for messy, unstructured text. GDPR, HIPAA, CCPA compliant.',
  path: '/',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <main className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-full mb-8">
              <span className="text-sm text-gray-300">500+ Tested Patterns • Fast & Deterministic</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Open Source Redaction.
              <br />
              <span className="text-gray-400">Protect Privacy.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Open source, privacy-first PII redaction for modern developers. Built on 500+ tested 
              regex patterns for speed and accuracy. Optional AI layer for messy, unstructured text.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/playground"
                className="bg-white text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                Try Playground
              </Link>
              <Link
                href="/contact"
                className="bg-gray-900 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors border border-gray-800 w-full sm:w-auto"
              >
                Contact Enterprise
              </Link>
            </div>

            {/* Demo Section */}
            <div className="mt-20 bg-gray-900 rounded-lg p-8 border border-gray-800">
              <div className="text-left max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4">Try it out</h2>
                <div className="bg-black rounded-lg p-4 border border-gray-800 font-mono text-sm">
                  <div className="text-gray-400 mb-2">Input:</div>
                  <div className="text-white mb-4">
                    &quot;Hi, my name is John Doe and my email is john@example.com. 
                    My SSN is 123-45-6789.&quot;
                  </div>
                  <div className="text-gray-400 mb-2">Output:</div>
                  <div className="text-green-400">
                    &quot;Hi, my name is [REDACTED] and my email is [REDACTED]. 
                    My SSN is [REDACTED].&quot;
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/playground"
                    className="inline-block bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Open Playground →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Partners/Trust Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400 text-sm mb-8">Trusted by employees at:</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-gray-900 border border-gray-800 rounded-lg aspect-square flex items-center justify-center p-4"
              >
                <span className="text-gray-600 text-xs text-center">Company {i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section - Bento Box Layout */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose OpenRedaction?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Focus on what matters - we handle the complexity of PII detection
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 md:col-span-2">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-semibold mb-2">Comply with GDPR Instantly</h3>
              <p className="text-gray-400">
                Automatically detect and redact PII to meet GDPR, HIPAA, and CCPA requirements. 
                Our 500+ tested regex patterns handle it all with deterministic, transparent results.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Protect Customer Data Automatically</h3>
              <p className="text-gray-400">
                Real-time PII detection ensures sensitive information never leaves your system unprotected.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Deploy in Minutes</h3>
              <p className="text-gray-400">
                Simple REST API integration. Get started in minutes, not weeks.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 md:col-span-2">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Complete Audit Trails</h3>
              <p className="text-gray-400">
                Complete audit trails and detection logs. Track all PII detections with detailed 
                reporting for compliance and security reviews.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">High Accuracy Pattern Detection</h3>
              <p className="text-gray-400">
                Industry-leading accuracy using 500+ tested regex patterns for detecting names, emails, SSNs, phone numbers, and more.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Zero Data Retention</h3>
              <p className="text-gray-400">
                Your data is processed in-memory and never stored. No persistent databases. Complete privacy guaranteed.
              </p>
            </div>
          </div>
        </div>

        {/* Why Pattern-Based Detection Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Pattern-Based Detection?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Fast, transparent, and privacy-preserving PII detection built for developers
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Deterministic & Transparent</h3>
              <p className="text-gray-400">
                Same input always produces the same output. Patterns are visible and testable - no black box AI.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Processing</h3>
              <p className="text-gray-400">
                Processes in milliseconds with no external API calls. No waiting for third-party AI services.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Runs Locally</h3>
              <p className="text-gray-400">
                No data leaves your environment. Process everything on your infrastructure for maximum privacy.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Privacy-Preserving</h3>
              <p className="text-gray-400">
                No third-party AI models. No data sent to external services. Complete control over your data.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Easy to Audit</h3>
              <p className="text-gray-400">
                Patterns are visible and testable. Perfect for compliance reviews and security audits.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Predictable Costs</h3>
              <p className="text-gray-400">
                No per-token pricing. Self-hosted version has zero variable costs. Predictable and affordable.
              </p>
            </div>
          </div>
        </div>

        {/* Optional AI Layer Section */}
        <div className="mt-32 bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">AI Layer (Optional)</h2>
              <p className="text-xl text-gray-300 mb-8">
                For messy, unstructured text, we offer an optional AI/NER layer that can improve detection accuracy
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4">When AI Helps</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Messy chat logs and transcripts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Unstructured text with typos</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>Context-dependent entity detection</span>
                  </li>
                </ul>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <h3 className="text-2xl font-semibold mb-4">Trade-offs</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⚠</span>
                    <span>Higher latency (seconds vs milliseconds)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⚠</span>
                    <span>Increased cost per request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">⚠</span>
                    <span>Less predictable results</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg text-gray-300 mb-4">
                <strong>Use AI layer only when necessary.</strong> For most structured data, regex patterns are faster, cheaper, and more reliable.
              </p>
            </div>
          </div>
        </div>

        {/* Regex vs AI Trade-offs Table */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Regex vs AI: Choose the Right Tool</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Each approach has strengths. Pick what works best for your use case.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">Regex Patterns</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Fast - processes in milliseconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Deterministic - same input, same output</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Easy to audit - patterns are visible</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Transparent - no black box</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Predictable costs - no per-token fees</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">Local processing - no external APIs</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">AI/NER Layer</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      <span className="text-gray-300">More powerful on messy data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-300">Slower - seconds vs milliseconds</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-300">Less predictable - may vary by run</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-300">Higher cost - per-token pricing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-300">May require external API calls</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-yellow-400 mr-2">⚠</span>
                      <span className="text-gray-300">Harder to audit - black box model</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Get started in 3 simple steps</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Try the Playground</h3>
              <p className="text-gray-400">
                Test OpenRedaction with our free playground. No signup required - see how it works instantly.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrate the API</h3>
              <p className="text-gray-400">
                Add one line of code to your application. Works with any language or framework.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Scale with Enterprise</h3>
              <p className="text-gray-400">
                Contact us for enterprise solutions with custom deployments, SLAs, and dedicated support.
              </p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Use Cases</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/use-cases/healthcare"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Healthcare</h3>
              <p className="text-gray-400 text-sm">
                Protect patient data in medical records and communications
              </p>
            </Link>
            <Link
              href="/use-cases/legal"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <p className="text-gray-400 text-sm">
                Redact sensitive information from legal documents
              </p>
            </Link>
            <Link
              href="/use-cases/finance"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Finance</h3>
              <p className="text-gray-400 text-sm">
                Secure financial documents and customer communications
              </p>
            </Link>
            <Link
              href="/use-cases/education"
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <p className="text-gray-400 text-sm">
                Protect student privacy in educational records
              </p>
            </Link>
          </div>
        </div>

        {/* One-Line Integration Section */}
        <div className="mt-32 bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">One-Line Integration</h2>
              <p className="text-xl text-gray-300 mb-8">
                Start detecting and redacting PII in minutes, not days
              </p>
              <div className="bg-black rounded-lg p-6 border border-gray-800 text-left">
                <div className="text-gray-400 text-sm mb-2">JavaScript / TypeScript</div>
                <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`const response = await fetch('https://openredaction-api.onrender.com/v1/redact', {
  method: 'POST',
  headers: {
    'x-api-key': 'your-api-key',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ text: 'Your text here' })
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Compliance Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Secure PII Detection That Passes Audits
            </h2>
            <p className="text-xl text-gray-300">
              Enterprise-grade security with zero data retention
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔐</div>
              <h3 className="text-xl font-semibold mb-2">Zero-Trust Security</h3>
              <p className="text-gray-400">
                All data is encrypted in transit. Processes text in memory, never stores raw input. 
                No persistent databases by default. Users retain full control - can self-host. 
                Designed to reduce compliance burden by never persisting data.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Deploy Anywhere</h3>
              <p className="text-gray-400">
                RESTful API that works with any language or framework. 
                Deploy in minutes, scale to millions of requests.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Full Audit Trail</h3>
              <p className="text-gray-400">
                Complete detection logs with entity types, positions, and timestamps. 
                Perfect for compliance reporting.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Developers Worldwide</h2>
            <p className="text-xl text-gray-300">See what our users are saying</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              name="Sarah Chen"
              role="Lead Developer"
              company="TechCorp"
              content="OpenRedaction saved us weeks of development time. The API is incredibly accurate and easy to integrate. Our compliance team loves the audit trails."
              rating={5}
            />
            <TestimonialCard
              name="Michael Rodriguez"
              role="CTO"
              company="HealthData Inc"
              content="We needed HIPAA-compliant PII detection and OpenRedaction delivered. The enterprise support has been exceptional, and the self-hosted option gives us complete control."
              rating={5}
            />
            <TestimonialCard
              name="Emily Johnson"
              role="Privacy Officer"
              company="FinanceSecure"
              content="The accuracy is outstanding - we've processed millions of documents with zero false positives. The GDPR compliance features are exactly what we needed."
              rating={5}
            />
          </div>
        </div>

        {/* Enterprise Solutions Section */}
        <div className="mt-32 bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Enterprise Solutions</h2>
              <p className="text-xl text-gray-300 mb-8">
                Custom pricing and solutions tailored to your organization&apos;s needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Enterprise API</h3>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li>• Unlimited requests</li>
                  <li>• SLA guarantee</li>
                  <li>• Priority support</li>
                  <li>• Custom deployments</li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Sales
                </Link>
              </div>
              <div className="bg-black rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Self-Hosted</h3>
                <ul className="space-y-2 text-gray-300 mb-6">
                  <li>• On-premise deployment</li>
                  <li>• Full data control</li>
                  <li>• Custom configurations</li>
                  <li>• Enterprise license</li>
                </ul>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-300 mb-4">Need secure reporting? Check out Disclosurely.com</p>
              <a
                href="https://disclosurely.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 underline"
              >
                Learn About Disclosurely.com →
              </a>
            </div>
          </div>
        </div>

        {/* Product Differentiation Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              OpenRedaction offers multiple solutions to fit your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-3">OpenRedaction (npm library)</h3>
              <p className="text-gray-300 mb-4">
                Open source regex library, developer-friendly, available via NPM. Use directly in your applications.
              </p>
              <a
                href="https://github.com/sam247/openredaction"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 underline text-sm"
              >
                View on GitHub →
              </a>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-3">OpenRedaction-site (this site)</h3>
              <p className="text-gray-300 mb-4">
                Playground where users can try redaction in the browser, with no storage. Free demo of the API.
              </p>
              <Link
                href="/playground"
                className="text-white hover:text-gray-300 underline text-sm"
              >
                Try Playground →
              </Link>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-3">OpenRedaction-api</h3>
              <p className="text-gray-300 mb-4">
                Private API that wraps the library and optionally adds AI/NLP detection, but retains privacy by not logging input.
              </p>
              <Link
                href="/contact"
                className="text-white hover:text-gray-300 underline text-sm"
              >
                Contact for API Access →
              </Link>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-2xl font-semibold mb-3">Disclosurely.com</h3>
              <p className="text-gray-300 mb-4">
                Enterprise-grade whistleblowing platform with compliance features (ISO/SOC ready) and advanced auditing.
              </p>
              <a
                href="https://disclosurely.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 underline text-sm"
              >
                Visit Disclosurely.com →
              </a>
            </div>
          </div>
        </div>

        {/* Cost Comparison Section */}
        <div className="mt-32 bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Cost-Effective Redaction</h2>
              <p className="text-xl text-gray-300 mb-8">
                Free/low-cost API using local compute vs. expensive per-token pricing from cloud providers
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-black rounded-lg border border-gray-800 overflow-hidden">
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-800">
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-4">OpenRedaction API</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">Free/Low-Cost</div>
                    <p className="text-gray-300 text-sm mb-4">Uses local compute</p>
                    <ul className="text-left space-y-2 text-gray-400 text-sm">
                      <li>• No per-token fees</li>
                      <li>• Predictable pricing</li>
                      <li>• Self-hosted = $0 variable costs</li>
                    </ul>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-4">AWS/Google Cloud</h3>
                    <div className="text-3xl font-bold text-yellow-400 mb-2">Per-Token</div>
                    <p className="text-gray-300 text-sm mb-4">Variable pricing</p>
                    <ul className="text-left space-y-2 text-gray-400 text-sm">
                      <li>• Pay per character/token</li>
                      <li>• Costs scale with usage</li>
                      <li>• 1M requests: $100s-$1000s</li>
                    </ul>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold mb-4">Self-Hosted</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">$0 Variable</div>
                    <p className="text-gray-300 text-sm mb-4">One-time setup</p>
                    <ul className="text-left space-y-2 text-gray-400 text-sm">
                      <li>• No per-request fees</li>
                      <li>• Only infrastructure costs</li>
                      <li>• Unlimited usage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Not AWS/Google Comparison */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why OpenRedaction vs. AWS/Google?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Open source, self-hostable, and privacy-first - data never leaves your environment
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left p-4 text-gray-300 font-semibold">Feature</th>
                    <th className="text-center p-4 text-gray-300 font-semibold">OpenRedaction</th>
                    <th className="text-center p-4 text-gray-300 font-semibold">AWS/Google</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="p-4 text-gray-300">Open Source</td>
                    <td className="p-4 text-center text-green-400">✓ Yes</td>
                    <td className="p-4 text-center text-gray-500">✗ Proprietary</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Self-Hostable</td>
                    <td className="p-4 text-center text-green-400">✓ Yes</td>
                    <td className="p-4 text-center text-gray-500">✗ Cloud-only</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Data Retention</td>
                    <td className="p-4 text-center text-green-400">✓ None</td>
                    <td className="p-4 text-center text-yellow-400">⚠ May log data</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Account Required</td>
                    <td className="p-4 text-center text-green-400">✓ No</td>
                    <td className="p-4 text-center text-gray-500">✗ Yes</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Pricing Model</td>
                    <td className="p-4 text-center text-green-400">✓ Predictable</td>
                    <td className="p-4 text-center text-yellow-400">⚠ Per-token</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Compliance Setup</td>
                    <td className="p-4 text-center text-green-400">✓ Simple</td>
                    <td className="p-4 text-center text-yellow-400">⚠ Complex</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-300">Data Control</td>
                    <td className="p-4 text-center text-green-400">✓ Full control</td>
                    <td className="p-4 text-center text-gray-500">✗ Vendor-dependent</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-lg">
                <strong>With self-hosted OpenRedaction, your data never leaves your environment.</strong> 
                Complete privacy and control.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Do you store my data?</h3>
              <p className="text-gray-400">
                No. We process your text in memory and never persist it. No data is stored or logged. 
                Processes run in real-time with zero data retention. Enterprise customers can opt for 
                complete data isolation with self-hosted deployments.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Is this ISO/SOC compliant?</h3>
              <p className="text-gray-400">
                The basic OpenRedaction service is designed to reduce compliance burden by never persisting data. 
                This makes compliance simpler since there&apos;s no data storage to audit. For enterprise needs, 
                Disclosurely.com offers ISO/SOC ready features with advanced auditing and compliance certifications.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How is this different from other redaction tools?</h3>
              <p className="text-gray-400">
                OpenRedaction is open source, self-hostable, and regex-first. Unlike proprietary solutions, 
                you can audit the code, deploy on your infrastructure, and maintain full control. We use 
                500+ tested patterns for deterministic, transparent detection with zero data retention.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What&apos;s the difference between regex and AI detection?</h3>
              <p className="text-gray-400">
                Regex patterns are fast (milliseconds), deterministic, transparent, and easy to audit. 
                They work great for structured data. The optional AI layer helps with messy, unstructured 
                text but is slower, costlier, and less predictable. See our comparison table above for details.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can I use this without sending data to third parties?</h3>
              <p className="text-gray-400">
                Yes! With the self-hosted option, your data never leaves your environment. You can deploy 
                OpenRedaction on your own infrastructure for complete data control and privacy. Contact us 
                to discuss self-hosted deployment options.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Why not just use AWS/Google services?</h3>
              <p className="text-gray-400">
                OpenRedaction is open source and self-hostable, so your data never leaves your environment. 
                Unlike AWS/Google, we require no account, log no data, and offer predictable costs (no per-token 
                pricing). Our regex-first approach is faster, more transparent, and easier to audit than 
                proprietary AI services.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How does OpenRedaction help with compliance?</h3>
              <p className="text-gray-400">
                OpenRedaction helps you meet GDPR, HIPAA, and CCPA requirements through regex transparency, 
                self-hosting options, and zero data retention. The deterministic nature of pattern-based 
                detection makes audits easier, and self-hosting gives you complete control over your data 
                and infrastructure.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Can we self-host the solution?</h3>
              <p className="text-gray-400">
                Yes! We offer self-hosted and on-premise deployment options for enterprise customers. 
                This gives you full control over your infrastructure and data. Contact us to discuss 
                your requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">What if there&apos;s a compliance issue?</h3>
              <p className="text-gray-400">
                As an open-source tool, you maintain full control and responsibility over your 
                infrastructure and data. Enterprise customers can work with us for custom deployments 
                and support. We provide the tools and documentation to help you meet compliance requirements.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How accurate is the detection?</h3>
              <p className="text-gray-400">
                OpenRedaction achieves high accuracy using 500+ tested regex patterns for detecting names, emails, SSNs, 
                phone numbers, addresses, and more. Enterprise customers can work with us for custom pattern 
                configurations tailored to their specific data patterns.
              </p>
            </div>
          </div>
        </div>

        {/* GitHub Contribution Section */}
        <div className="mt-32 bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Open Source & Transparent</h2>
              <p className="text-xl text-gray-300 mb-8">
                OpenRedaction is open source. Audit the code, contribute patterns, and help improve accuracy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <a
                  href="https://github.com/sam247/openredaction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                >
                  <span>View on GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
                <div className="bg-black rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-3">Report Issues</h3>
                  <p className="text-gray-400 text-sm">
                    Found a bug or have a suggestion? Open an issue on GitHub and help us improve.
                  </p>
                </div>
                <div className="bg-black rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-3">Contribute Patterns</h3>
                  <p className="text-gray-400 text-sm">
                    Share new regex patterns or improve existing ones. The community helps maintain accuracy.
                  </p>
                </div>
                <div className="bg-black rounded-lg p-6 border border-gray-800">
                  <h3 className="text-xl font-semibold mb-3">Suggest Improvements</h3>
                  <p className="text-gray-400 text-sm">
                    Have ideas for new features? We welcome contributions and pull requests from the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 bg-gradient-to-r from-gray-900 to-black py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Protect Your Data?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get started with our free playground or contact us for enterprise solutions
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                Contact Enterprise Team
              </Link>
              <Link
                href="/playground"
                className="bg-gray-800 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-700 transition-colors border border-gray-700 w-full sm:w-auto"
              >
                Try Free Playground
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


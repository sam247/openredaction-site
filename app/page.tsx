import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import GitHubBadge from '@/components/GitHubBadge';
import TestimonialCard from '@/components/TestimonialCard';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Open Source PII Detection & Redaction | OpenRedaction',
  description: 'Open source AI-powered tool for automatically detecting and redacting personally identifiable information (PII) from text. 99.9% accuracy. GDPR, HIPAA, CCPA compliant.',
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
              <span className="text-sm text-gray-300">Powered by Advanced AI Models</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Open Source Redaction.
              <br />
              <span className="text-gray-400">Protect Privacy.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
              OpenRedaction is a powerful API for automatically detecting and redacting 
              personally identifiable information (PII) from text, ensuring compliance 
              and protecting user privacy.
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
                No manual review needed - our AI handles it all.
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
              <h3 className="text-xl font-semibold mb-2">99.9% Accuracy</h3>
              <p className="text-gray-400">
                Industry-leading accuracy in detecting names, emails, SSNs, phone numbers, and more.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Zero Data Retention</h3>
              <p className="text-gray-400">
                Your data is processed in real-time and never stored. Complete privacy guaranteed.
              </p>
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
                All data is encrypted in transit. No data is stored or logged. 
                Helps meet GDPR, HIPAA, and CCPA requirements.
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

        {/* FAQ Section */}
        <div className="mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Is my data stored?</h3>
              <p className="text-gray-400">
                No. We process your text in real-time and don&apos;t store any of your data. 
                We only track usage metrics for billing purposes. Enterprise customers can opt for 
                complete data isolation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Why not just use AWS services?</h3>
              <p className="text-gray-400">
                OpenRedaction is purpose-built for PII detection with 99.9% accuracy. Unlike generic 
                AWS services, we specialize in privacy compliance and offer dedicated support, custom 
                models, and enterprise-grade SLAs. We&apos;re focused solely on PII detection, not a 
                general-purpose service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">How does OpenRedaction help with compliance?</h3>
              <p className="text-gray-400">
                OpenRedaction helps you meet GDPR, HIPAA, and CCPA requirements by automatically 
                detecting and redacting PII. As an open-source tool, you maintain full control over 
                your data and infrastructure. Our zero data retention approach ensures complete privacy.
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
                OpenRedaction achieves 99.9% accuracy in detecting PII including names, emails, SSNs, 
                phone numbers, addresses, and more. Enterprise customers can work with us to train custom 
                models for their specific data patterns.
              </p>
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


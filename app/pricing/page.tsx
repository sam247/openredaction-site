import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import { Check, Shield, Headphones, Server } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Enterprise Solutions
            </h1>
            <p className="text-xl text-gray-300">
              Custom pricing and solutions tailored to your organization&apos;s needs. 
              Get enterprise-grade PII detection with dedicated support.
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

          {/* Enterprise Benefits */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Shield className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">SLA Guarantee</h3>
              <p className="text-gray-400">
                99.9% uptime guarantee with dedicated infrastructure and monitoring
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Headphones className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Priority Support</h3>
              <p className="text-gray-400">
                Dedicated support team with guaranteed response times and direct access
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <Server className="text-white mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Custom Deployment</h3>
              <p className="text-gray-400">
                Self-hosted options, custom integrations, and tailored configurations
              </p>
            </div>
          </div>

          {/* Enterprise Features */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Enterprise Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Unlimited Requests</h4>
                  <p className="text-gray-400 text-sm">Scale to millions of requests per day</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Custom PII Types</h4>
                  <p className="text-gray-400 text-sm">Train models for your specific data patterns</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Compliance Certifications</h4>
                  <p className="text-gray-400 text-sm">GDPR, HIPAA, SOC 2, and ISO 27001 ready</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Dedicated Infrastructure</h4>
                  <p className="text-gray-400 text-sm">Isolated environments for maximum security</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Advanced Analytics</h4>
                  <p className="text-gray-400 text-sm">Detailed usage reports and audit trails</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="text-green-400 mt-1 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">On-Premise Options</h4>
                  <p className="text-gray-400 text-sm">Deploy on your own infrastructure</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-800">
              <h2 className="text-3xl font-bold text-center mb-4">Get Custom Pricing</h2>
              <p className="text-gray-300 text-center mb-8">
                Tell us about your needs and we&apos;ll provide a tailored solution
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
                <h3 className="text-xl font-semibold mb-2">What&apos;s included in enterprise pricing?</h3>
                <p className="text-gray-400">
                  Enterprise pricing is custom-tailored to your needs. It includes unlimited requests, 
                  dedicated support, SLA guarantees, custom deployments, and compliance certifications. 
                  Contact us for a detailed quote.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Can we self-host the solution?</h3>
                <p className="text-gray-400">
                  Yes! We offer self-hosted and on-premise deployment options for enterprise customers. 
                  This gives you full control over your infrastructure and data.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">What compliance certifications do you have?</h3>
                <p className="text-gray-400">
                  We&apos;re compliant with GDPR, HIPAA, SOC 2, and ISO 27001. Enterprise customers 
                  receive detailed compliance documentation and audit support.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Why not just use AWS services?</h3>
                <p className="text-gray-400">
                  OpenRedaction is purpose-built for PII detection with 99.9% accuracy. Unlike generic 
                  AWS services, we specialize in privacy compliance and offer dedicated support, custom 
                  models, and enterprise-grade SLAs.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How quickly can we get started?</h3>
                <p className="text-gray-400">
                  Most enterprise implementations can be set up within 1-2 weeks. Self-hosted deployments 
                  may take 2-4 weeks depending on your infrastructure requirements.
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

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Announcement Banner */}
      <div className="pt-20 bg-black border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-sm text-white">
              🎉 Now live: AI-powered PII detection with 99.9% accuracy
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <main className="pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gray-900 px-4 py-2 rounded-full mb-8">
              <span className="text-sm text-gray-300">Powered by Advanced AI Models</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Protect Privacy.
              <br />
              <span className="text-gray-400">OpenRedaction Detects.</span>
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
                href="/dashboard"
                className="bg-gray-900 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-800 transition-colors border border-gray-800 w-full sm:w-auto"
              >
                Get Started
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

        {/* Features Section */}
        <div className="mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
              <p className="text-gray-400">
                All data is processed securely with enterprise-grade encryption. 
                No data is stored or logged.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Scalable</h3>
              <p className="text-gray-400">
                Process thousands of requests per second with our optimized API. 
                Built for production workloads.
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Highly Accurate</h3>
              <p className="text-gray-400">
                99.9% accuracy in detecting PII including names, emails, SSNs, 
                phone numbers, and more.
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
                100% compliant with GDPR, HIPAA, and SOC 2.
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

        {/* Final CTA */}
        <div className="mt-32 bg-gradient-to-r from-gray-900 to-black py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Protect Privacy. Automate Compliance.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start redacting PII in seconds with our powerful API
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/playground"
                className="bg-white text-black px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                Try Playground
              </Link>
              <Link
                href="/dashboard"
                className="bg-gray-800 text-white px-8 py-4 rounded-md font-semibold text-lg hover:bg-gray-700 transition-colors border border-gray-700 w-full sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


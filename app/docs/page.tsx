import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import CodeExamples from '@/components/CodeExamples';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Documentation - Open-Source Library',
  description: 'Complete documentation for OpenRedaction open-source library. Learn how to install and use the npm package for PII detection and redaction in your Node.js applications.',
  path: '/docs',
});

export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8">Library Documentation</h1>

          <div className="space-y-12">
            {/* Installation */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Installation</h2>
              <p className="text-gray-300 mb-4">
                Install OpenRedaction via npm:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 font-mono text-sm">
                <code className="text-green-400">
                  npm install openredaction
                </code>
              </div>
            </section>

            {/* Basic Usage */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Basic Usage</h2>
              <p className="text-gray-300 mb-4">
                Import and use the redact function to detect and redact PII from text.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-4">
                <div className="text-sm text-gray-400 mb-2">Example:</div>
                <pre className="text-sm text-green-400 overflow-x-auto">
{`import { redact } from 'openredaction';

const text = "My name is John Doe and my email is john@example.com";
const result = await redact(text);

console.log(result.redacted_text);
// "My name is [REDACTED] and my email is [REDACTED]"

console.log(result.detections);
// [
//   {
//     type: "PERSON",
//     text: "John Doe",
//     start: 11,
//     end: 19
//   },
//   {
//     type: "EMAIL",
//     text: "john@example.com",
//     start: 38,
//     end: 55
//   }
// ]`}
                </pre>
              </div>
            </section>

            {/* Regex vs AI */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Regex Patterns vs AI Layer</h2>
              <p className="text-gray-300 mb-4">
                OpenRedaction uses regex patterns by default for fast, deterministic detection. An optional AI/NER layer is available for messy, unstructured text.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
                <h3 className="text-xl font-semibold mb-4">When to Use Regex (Default)</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Structured data (forms, databases, JSON)</li>
                  <li>When you need fast processing (milliseconds)</li>
                  <li>When you need deterministic results</li>
                  <li>When cost and transparency matter</li>
                </ul>
                <p className="text-gray-400 text-sm">
                  Regex patterns are fast, transparent, and easy to audit. They work great for most use cases.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
                <h3 className="text-xl font-semibold mb-4">When to Use AI Layer (Optional)</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li>Messy chat logs and transcripts</li>
                  <li>Unstructured text with typos</li>
                  <li>Context-dependent entity detection</li>
                </ul>
                <p className="text-yellow-400 text-sm mb-4">
                  ⚠ Note: AI layer increases latency (seconds vs milliseconds) and cost. Use only when necessary.
                </p>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-4">
                <div className="text-sm text-gray-400 mb-2">Enable AI Layer:</div>
                <pre className="text-sm text-green-400 overflow-x-auto">
{`import { redact } from 'openredaction';

const result = await redact(text, {
  useAI: true  // Optional: enable AI layer for messy text
});`}
                </pre>
              </div>

              <p className="text-gray-300 text-sm">
                By default, <code className="bg-gray-800 px-1 py-0.5 rounded">useAI</code> is <code className="bg-gray-800 px-1 py-0.5 rounded">false</code>. 
                Set it to <code className="bg-gray-800 px-1 py-0.5 rounded">true</code> to enable the optional AI/NER layer for improved detection on messy text. 
                Note: AI layer increases latency and cost. Use only when necessary.
              </p>
            </section>

            {/* Self-Hosting */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Self-Hosting</h2>
              <p className="text-gray-300 mb-4">
                OpenRedaction is designed to be self-hosted. Deploy on your own infrastructure for complete privacy and control.
              </p>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-4">
                <h3 className="text-xl font-semibold mb-3">Deployment Options</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                  <li><strong>Node.js Server:</strong> Run directly in your Node.js application</li>
                  <li><strong>Docker:</strong> Containerize and deploy on any infrastructure</li>
                  <li><strong>On-Premise:</strong> Deploy on your own servers for maximum control</li>
                </ul>
                <p className="text-gray-400 text-sm">
                  When self-hosted, you maintain complete control over your data. No data leaves your environment.
                </p>
              </div>
            </section>

            {/* Error Handling */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="text-red-400 font-semibold mb-2">Invalid Input</div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`try {
  const result = await redact(null);
} catch (error) {
  console.error('Error:', error.message);
  // "Invalid input: text must be a non-empty string"
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Advanced Usage */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Advanced Usage</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom Options</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`import { redact } from 'openredaction';

const result = await redact(text, {
  useAI: false,           // Enable optional AI layer
  patterns: ['email', 'phone'],  // Custom pattern selection
  redactionChar: '[REDACTED]'    // Custom redaction string
});`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`import { redact } from 'openredaction';

const texts = [
  "Contact John at john@example.com",
  "Call 555-123-4567 for support"
];

const results = await Promise.all(
  texts.map(text => redact(text))
);

results.forEach((result, index) => {
  console.log(\`Text \${index + 1}:\`, result.redacted_text);
});`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Hosted API Usage */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Hosted API Usage</h2>
              <p className="text-gray-300 mb-6">
                Use the hosted API for AI-assist functionality. The API provides optional AI-powered detection on top of regex patterns for better detection on messy or unstructured text.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Endpoint</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 font-mono text-sm">
                    <div className="text-gray-400 mb-1">POST</div>
                    <div className="text-green-400">https://openredaction-api.onrender.com/ai-detect</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Request Format</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-4">
                    <div className="text-sm text-gray-400 mb-2">Headers:</div>
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`Content-Type: application/json
x-api-key: YOUR_API_KEY_HERE (optional)`}
                    </pre>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <div className="text-sm text-gray-400 mb-2">Body (JSON):</div>
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`{
  "text": "Your text to redact here"
}`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Response Format</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-green-400 overflow-x-auto">
{`{
  "entities": [
    {
      "type": "PERSON",
      "value": "John Doe",
      "start": 0,
      "end": 8
    }
  ],
  "aiUsed": true
}`}
                    </pre>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    Response headers include usage information: <code className="bg-gray-800 px-1 py-0.5 rounded">X-Usage-Count</code>, <code className="bg-gray-800 px-1 py-0.5 rounded">X-Usage-Limit</code>, <code className="bg-gray-800 px-1 py-0.5 rounded">X-Usage-Reset</code>
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Code Examples</h3>
                  <CodeExamples />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Error Codes</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                      <div className="text-red-400 font-semibold mb-1">401 - Invalid API Key</div>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "code": "INVALID_KEY",
  "message": "Invalid or missing API key"
}`}
                      </pre>
                      <p className="text-gray-400 text-sm mt-2">Check your API key or subscribe to Pro tier</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                      <div className="text-red-400 font-semibold mb-1">429 - Rate Limit Exceeded</div>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "code": "RATE_LIMIT",
  "message": "Rate limit exceeded"
}`}
                      </pre>
                      <p className="text-gray-400 text-sm mt-2">Wait before retrying or upgrade to Pro tier for higher limits</p>
                    </div>
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                      <div className="text-red-400 font-semibold mb-1">400 - Text Too Long</div>
                      <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "code": "TEXT_TOO_LONG",
  "message": "Input text exceeds maximum length"
}`}
                      </pre>
                      <p className="text-gray-400 text-sm mt-2">Maximum input length is 50,000 characters for AI-assist mode</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Rate Limits</h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Free Tier</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>IP-based rate limiting (fair-use limits)</li>
                          <li>Anonymous usage (API key optional for higher limits)</li>
                          <li>Lower priority during high traffic</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Pro Tier</h4>
                        <ul className="list-disc list-inside text-gray-300 space-y-1">
                          <li>50,000 AI-assist requests per month</li>
                          <li>API key required</li>
                          <li>Priority rate limiting</li>
                          <li>Usage tracked via response headers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Getting an API Key</h3>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <p className="text-gray-300 mb-4">
                      To get a Pro API key:
                    </p>
                    <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-4">
                      <li>Visit the <Link href="/pricing" className="text-white hover:text-gray-300 underline">pricing page</Link></li>
                      <li>Subscribe to the Pro tier (£9/month)</li>
                      <li>Check your email for your API key</li>
                      <li>Include the key in the <code className="bg-gray-800 px-1 py-0.5 rounded">x-api-key</code> header</li>
                    </ol>
                    <Link
                      href="/pricing"
                      className="inline-block bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                    >
                      View Pricing →
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* GitHub & Resources */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Resources</h2>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <ul className="space-y-3 text-gray-300">
                  <li>
                    <a href="https://github.com/sam247/openredaction" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline">
                      View on GitHub →
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Browse the source code, report issues, and contribute</p>
                  </li>
                  <li>
                    <a href="https://github.com/sam247/openredaction/issues" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 underline">
                      Report Issues →
                    </a>
                    <p className="text-gray-400 text-sm mt-1">Found a bug? Have a feature request? Open an issue</p>
                  </li>
                  <li>
                    <Link href="/playground" className="text-white hover:text-gray-300 underline">
                      Try Playground →
                    </Link>
                    <p className="text-gray-400 text-sm mt-1">Test OpenRedaction in your browser</p>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Documentation - API Reference & Guides',
  description: 'Complete documentation for OpenRedaction API. Learn how to integrate PII detection and redaction into your application with code examples and guides.',
  path: '/docs',
});

export default function Docs() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-8">API Documentation</h1>

          <div className="space-y-12">
            {/* Authentication */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Authentication</h2>
              <p className="text-gray-300 mb-4">
                All API requests require an API key in the request header. Get your API key from the dashboard.
              </p>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 font-mono text-sm">
                <code className="text-gray-300">
                  x-api-key: free_your-api-key-here
                </code>
              </div>
            </section>

            {/* Redact Endpoint */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Redact Text</h2>
              <p className="text-gray-300 mb-4">
                Detect and redact PII from text.
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 mb-4">
                <div className="text-sm text-gray-400 mb-2">POST /v1/redact</div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "text": "My name is John Doe and my email is john@example.com"
}`}
                </pre>
              </div>

              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="text-sm text-gray-400 mb-2">Response:</div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "redacted_text": "My name is [REDACTED] and my email is [REDACTED]",
  "detections": [
    {
      "type": "PERSON",
      "text": "John Doe",
      "start": 11,
      "end": 19
    },
    {
      "type": "EMAIL",
      "text": "john@example.com",
      "start": 38,
      "end": 55
    }
  ]
}`}
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
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "text": "My name is John Doe and my email is john@example.com",
  "use_ai": true
}`}
                </pre>
              </div>

              <p className="text-gray-300 text-sm">
                By default, <code className="bg-gray-800 px-1 py-0.5 rounded">use_ai</code> is <code className="bg-gray-800 px-1 py-0.5 rounded">false</code>. 
                Set it to <code className="bg-gray-800 px-1 py-0.5 rounded">true</code> to enable the optional AI/NER layer for improved detection on messy text.
              </p>
            </section>

            {/* Rate Limiting */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Rate Limiting</h2>
              <p className="text-gray-300 mb-4">
                Rate limits are based on your plan tier:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li><strong>Free tier:</strong> 100 requests/day</li>
                <li><strong>Pro tier:</strong> 10,000 requests/day</li>
              </ul>
              <p className="text-gray-300 mb-4">
                Rate limit information is included in response headers:
              </p>
              <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 font-mono text-sm">
                <code className="text-gray-300">
                  x-ratelimit-limit: 100<br />
                  x-ratelimit-remaining: 95<br />
                  x-ratelimit-reset: 1732656000
                </code>
              </div>
            </section>

            {/* Error Handling */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Error Handling</h2>
              <div className="space-y-4">
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="text-red-400 font-semibold mb-2">429 Too Many Requests</div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "error": "Rate limit exceeded",
  "message": "You have exceeded your daily rate limit of 100 requests"
}`}
                  </pre>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                  <div className="text-red-400 font-semibold mb-2">401 Unauthorized</div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`{
  "error": "Invalid API key"
}`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Code Examples */}
            <section>
              <h2 className="text-3xl font-semibold mb-4">Code Examples</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">JavaScript/TypeScript</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`const response = await fetch('https://openredaction-api.onrender.com/v1/redact', {
  method: 'POST',
  headers: {
    'x-api-key': 'free_your-api-key-here',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    text: 'My email is john@example.com'
  })
});

const data = await response.json();
console.log(data.redacted_text);`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">Python</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`import requests

response = requests.post(
    'https://openredaction-api.onrender.com/v1/redact',
    headers={
        'x-api-key': 'free_your-api-key-here',
        'Content-Type': 'application/json'
    },
    json={'text': 'My email is john@example.com'}
)

data = response.json()
print(data['redacted_text'])`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">cURL</h3>
                  <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
{`curl -X POST https://openredaction-api.onrender.com/v1/redact \\
  -H "x-api-key: free_your-api-key-here" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "My email is john@example.com"}'`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


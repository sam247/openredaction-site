'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Check, ArrowRight, Key, Code, Play, Copy, CheckCircle } from 'lucide-react';

export default function Success() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'python'>('curl');

  useEffect(() => {
    // Check for API key in URL query params
    const params = new URLSearchParams(window.location.search);
    const key = params.get('api_key');
    if (key) {
      setApiKey(key);
    }
  }, []);

  const handleCopyKey = async () => {
    if (apiKey) {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyCode = async (code: string) => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExamples = {
    curl: `curl -X POST https://openredaction-api.onrender.com/v1/ai-detect \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey || 'YOUR_API_KEY_HERE'}" \\
  -d '{"text": "John Smith lives at 10 Downing Street"}'`,
    node: `const res = await fetch("https://openredaction-api.onrender.com/v1/ai-detect", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.OPENREDACTION_API_KEY || "${apiKey || 'YOUR_API_KEY_HERE'}",
  },
  body: JSON.stringify({ 
    text: "John Smith lives at 10 Downing Street" 
  }),
});

const data = await res.json();
console.log(data);`,
    python: `import requests

r = requests.post(
    "https://openredaction-api.onrender.com/v1/ai-detect",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "${apiKey || 'YOUR_API_KEY_HERE'}"
    },
    json={"text": "John Smith lives at 10 Downing Street"}
)

print(r.json())`,
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-900/20 rounded-full mb-6">
              <Check className="text-green-400" size={48} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Thank You!</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your subscription to OpenRedaction Pro is active. {apiKey ? 'Your API key is ready to use.' : 'Check your email for your API key.'}
            </p>
          </div>

          {/* API Key Display */}
          {apiKey && (
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
              <div className="flex items-start space-x-4 mb-4">
                <Key className="text-white mt-1 flex-shrink-0" size={24} />
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-2">Your API Key</h2>
                  <div className="bg-black rounded-lg p-4 border border-gray-800 flex items-center justify-between gap-4">
                    <code className="text-green-400 font-mono text-sm break-all flex-1">{apiKey}</code>
                    <button
                      onClick={handleCopyKey}
                      className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md transition-colors flex-shrink-0 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={16} className="text-green-400" />
                          <span className="text-sm">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-3">
                    Keep this key secure. You can use it in the playground or in your code.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!apiKey && (
            <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
              <div className="flex items-start space-x-4 mb-6">
                <Key className="text-white mt-1 flex-shrink-0" size={24} />
                <div>
                  <h2 className="text-2xl font-semibold mb-2">Your API Key</h2>
                  <p className="text-gray-300">
                    We&apos;ve sent your API key to your email address. Please check your inbox (and spam folder) for the email containing your key.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Code Examples */}
          <div className="bg-gray-900 rounded-lg p-8 border border-gray-800 mb-8">
            <h3 className="text-2xl font-semibold mb-6">Code Examples</h3>
            
            {/* Tabs */}
            <div className="flex space-x-2 mb-4 border-b border-gray-800">
              {(['curl', 'node', 'python'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                    activeTab === tab
                      ? 'border-white text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab === 'curl' ? 'cURL' : tab === 'node' ? 'Node.js' : 'Python'}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="relative">
              <div className="bg-black rounded-lg p-4 border border-gray-800 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400 whitespace-pre-wrap">{codeExamples[activeTab]}</pre>
              </div>
              <button
                onClick={() => handleCopyCode(codeExamples[activeTab])}
                className="absolute top-4 right-4 flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-md transition-colors text-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle size={14} className="text-green-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link
              href={`/playground${apiKey ? `?api_key=${encodeURIComponent(apiKey)}` : ''}`}
              className="bg-white text-black rounded-lg p-6 border-2 border-white hover:bg-gray-100 transition-colors group flex flex-col"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Play className="text-black group-hover:text-green-600 transition-colors" size={32} />
                <h3 className="text-xl font-semibold">Test Your Key Now</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Try your API key in our interactive playground. {apiKey ? 'Your key will be pre-filled.' : 'Enter your key and start redacting text with AI assist.'}
              </p>
              <div className="flex items-center text-black text-sm font-medium group-hover:translate-x-1 transition-transform mt-auto">
                Open Playground
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>

            <Link
              href="/docs"
              prefetch={false}
              className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-colors group flex flex-col"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Code className="text-white group-hover:text-green-400 transition-colors" size={32} />
                <h3 className="text-xl font-semibold">View API Docs</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Learn how to integrate the API into your application. See code examples, endpoint details, and usage limits.
              </p>
              <div className="flex items-center text-white text-sm font-medium group-hover:translate-x-1 transition-transform mt-auto">
                Read Documentation
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 mb-4">
              Need help? Check out our{' '}
              <Link href="/docs" prefetch={false} className="text-white hover:text-gray-300 underline">
                documentation
              </Link>{' '}
              or{' '}
              <Link href="/contact" className="text-white hover:text-gray-300 underline">
                contact support
              </Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

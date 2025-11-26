'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Copy, Check, RefreshCw, Eye, EyeOff, Trash2 } from 'lucide-react';

function DashboardContent() {
  const searchParams = useSearchParams();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [usage, setUsage] = useState({
    today: 0,
    limit: 100,
    tier: 'free' as 'free' | 'pro' | 'enterprise',
  });
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  useEffect(() => {
    // Check for Stripe session callback
    const sessionId = searchParams.get('session_id');
    if (sessionId) {
      // Upgrade tier based on plan
      const storedKey = localStorage.getItem('openredaction_api_key');
      const plan = searchParams.get('plan');
      if (storedKey && storedKey.startsWith('free_')) {
        if (plan === 'pro') {
          const proKey = storedKey.replace('free_', 'pro_');
          setApiKey(proKey);
          localStorage.setItem('openredaction_api_key', proKey);
          setUsage(prev => ({ ...prev, tier: 'pro', limit: 1000 }));
        } else if (plan === 'enterprise') {
          const paidKey = storedKey.replace('free_', 'paid_');
          setApiKey(paidKey);
          localStorage.setItem('openredaction_api_key', paidKey);
          setUsage(prev => ({ ...prev, tier: 'enterprise', limit: 10000 }));
        }
      }
    }

    // Load API key from localStorage or generate new one
    const storedKey = localStorage.getItem('openredaction_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      // Determine tier from key prefix
      let tier: 'free' | 'pro' | 'enterprise' = 'free';
      let limit = 100;
      if (storedKey.startsWith('paid_')) {
        tier = 'enterprise';
        limit = 10000;
      } else if (storedKey.startsWith('pro_')) {
        tier = 'pro';
        limit = 1000;
      }
      setUsage(prev => ({ ...prev, tier, limit }));
    } else {
      // Generate a new free tier key
      const newKey = `free_${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      localStorage.setItem('openredaction_api_key', newKey);
    }
    setLoading(false);
  }, [searchParams]);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    if (confirm('Are you sure you want to regenerate your API key? The old key will stop working.')) {
      let prefix = 'free_';
      if (apiKey?.startsWith('paid_')) prefix = 'paid_';
      else if (apiKey?.startsWith('pro_')) prefix = 'pro_';
      const newKey = `${prefix}${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      localStorage.setItem('openredaction_api_key', newKey);
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your API key? This action cannot be undone.')) {
      localStorage.removeItem('openredaction_api_key');
      setApiKey(null);
      const newKey = `free_${Math.random().toString(36).substring(2, 15)}-${Math.random().toString(36).substring(2, 15)}`;
      setApiKey(newKey);
      localStorage.setItem('openredaction_api_key', newKey);
      setUsage(prev => ({ ...prev, tier: 'free', limit: 100 }));
    }
  };

  const handleTestAPI = async () => {
    if (!apiKey) return;
    
    setTesting(true);
    setTestResult(null);
    
    try {
      const response = await fetch('https://openredaction-api.onrender.com/v1/redact', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: 'My name is John Doe and my email is john@example.com. My phone number is 555-1234.',
        }),
      });

      const data = await response.json();
      
      // Update usage from headers
      const remaining = response.headers.get('x-ratelimit-remaining');
      if (remaining) {
        const limit = usage.tier === 'enterprise' ? 10000 : usage.tier === 'pro' ? 1000 : 100;
        setUsage(prev => ({ ...prev, today: limit - parseInt(remaining) }));
      }

      if (response.ok) {
        setTestResult({ success: true, data });
      } else {
        setTestResult({ success: false, error: data });
      }
    } catch (error: any) {
      setTestResult({ success: false, error: { message: error.message } });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

          {/* API Key Section */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">API Key</h2>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  usage.tier === 'enterprise' 
                    ? 'bg-purple-900 text-purple-300'
                    : usage.tier === 'pro'
                    ? 'bg-green-900 text-green-300' 
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {usage.tier === 'enterprise' ? 'Enterprise' : usage.tier === 'pro' ? 'Pro' : 'Free'}
                </span>
              </div>
            </div>

            {apiKey && (
              <div className="space-y-4">
                <div className="flex items-center space-x-2 bg-black rounded-lg p-4 border border-gray-800">
                  <code className="flex-1 font-mono text-sm break-all">
                    {showKey ? apiKey : '•'.repeat(apiKey.length)}
                  </code>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copied ? <Check size={20} className="text-green-400" /> : <Copy size={20} />}
                  </button>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleRegenerate}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors text-sm font-medium"
                  >
                    <RefreshCw size={16} className="inline mr-2" />
                    Regenerate
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-900 hover:bg-red-800 rounded-md transition-colors text-sm font-medium"
                  >
                    <Trash2 size={16} className="inline mr-2" />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Usage Today</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Requests</span>
                  <span className="font-semibold">{usage.today} / {usage.limit}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      usage.today / usage.limit > 0.9 ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((usage.today / usage.limit) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Resets at midnight UTC
                </p>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-2xl font-bold mb-1">
                    {usage.tier === 'enterprise' ? 'Enterprise' : usage.tier === 'pro' ? 'Pro' : 'Free'}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {usage.tier === 'enterprise' ? '$99/month' : usage.tier === 'pro' ? '$29/month' : '$0/month'}
                  </p>
                </div>
                {usage.tier === 'free' && (
                  <a
                    href="/pricing"
                    className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Upgrade to Pro
                  </a>
                )}
                {usage.tier === 'pro' && (
                  <a
                    href="/pricing"
                    className="inline-block bg-white text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Upgrade to Enterprise
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-semibold mb-4">Quick Start</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400 mb-2">Test your API key:</p>
                <button
                  onClick={handleTestAPI}
                  disabled={testing || !apiKey}
                  className="mb-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-md text-sm font-medium transition-colors"
                >
                  {testing ? 'Testing...' : 'Test API'}
                </button>
                {testResult && (
                  <div className={`mt-3 p-4 rounded-lg border ${
                    testResult.success 
                      ? 'bg-green-900 border-green-800' 
                      : 'bg-red-900 border-red-800'
                  }`}>
                    {testResult.success ? (
                      <div>
                        <p className="text-green-300 font-semibold mb-2">✓ Success!</p>
                        <pre className="text-xs text-green-200 overflow-x-auto">
                          {JSON.stringify(testResult.data, null, 2)}
                        </pre>
                      </div>
                    ) : (
                      <div>
                        <p className="text-red-300 font-semibold mb-2">✗ Error</p>
                        <pre className="text-xs text-red-200 overflow-x-auto">
                          {JSON.stringify(testResult.error, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
                <div className="bg-black rounded-lg p-4 border border-gray-800 font-mono text-sm overflow-x-auto mt-4">
                  <code className="text-gray-300 whitespace-pre">
{`curl -X POST https://openredaction-api.onrender.com/v1/redact \\
  -H "x-api-key: ${apiKey?.substring(0, 20)}..." \\
  -H "Content-Type: application/json" \\
  -d '{"text": "My email is john@example.com"}'`}
                  </code>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-2">View full documentation:</p>
                <a
                  href="/docs"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  API Documentation →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={32} />
          <p>Loading...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}


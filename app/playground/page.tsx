'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2, Copy, Check, Settings } from 'lucide-react';

interface Detection {
  type: string;
  text: string;
  start: number;
  end: number;
  severity?: string;
}

interface RedactResponse {
  redacted_text: string;
  detections: Detection[];
}

export default function Playground() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<RedactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'redacted' | 'entities' | 'json'>('redacted');
  const [copied, setCopied] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  // Settings
  const [entityTypes, setEntityTypes] = useState({
    email: true,
    phone: true,
    name: true,
    ssn: true,
    ip: true,
    address: true,
    creditCard: true,
    dateOfBirth: true,
  });
  const [redactionMode, setRedactionMode] = useState<'mask' | 'token' | 'remove'>('mask');
  const [configProfile, setConfigProfile] = useState<'strict' | 'balanced' | 'minimal'>('balanced');

  const presets = {
    'General chat input': 'Hi, my name is John Doe and my email is john.doe@example.com. You can reach me at 555-123-4567.',
    'Customer support log': 'Customer: Sarah Johnson\nEmail: sarah.j@company.com\nPhone: (555) 987-6543\nIssue: Account access problem\nSSN: 123-45-6789',
    'System log with IDs': 'User ID: 12345\nIP Address: 192.168.1.100\nEmail: admin@system.com\nPhone: +1-555-000-1234\nTimestamp: 2024-01-15',
    'JSON API payload': JSON.stringify({
      user: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '555-111-2222',
        address: '123 Main St, City, State 12345',
      },
      metadata: {
        ip: '10.0.0.1',
        ssn: '987-65-4321',
      },
    }, null, 2),
  };


  const handlePreset = (presetName: string) => {
    setInputText(presets[presetName as keyof typeof presets]);
  };

  const handleRedact = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to redact');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      // Playground always uses the demo API key - it's free and works out of the box
      const keyToUse = 'free_demo-playground';
      
      const response = await fetch('https://openredaction-api.onrender.com/v1/redact', {
        method: 'POST',
        headers: {
          'x-api-key': keyToUse,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized: Invalid API key. Please check your API key in settings.');
        }
        throw new Error(errorData.error || `Failed to redact text (${response.status})`);
      }

      const data = await response.json();
      
      // Transform API response to match expected format
      if (!data.redacted && !data.redacted_text) {
        throw new Error('Invalid API response: missing redacted text');
      }
      
      const transformedData: RedactResponse = {
        redacted_text: data.redacted || data.redacted_text || '',
        detections: (data.detections || []).map((det: any) => ({
          type: det.type || '',
          text: det.value || det.text || '',
          start: Array.isArray(det.position) ? det.position[0] : (det.start || 0),
          end: Array.isArray(det.position) ? det.position[1] : (det.end || 0),
          severity: det.severity,
        })),
      };
      
      setOutput(transformedData);
    } catch (err: any) {
      setError(err.message || 'An error occurred while redacting text');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getRedactedDisplay = (redactedText: string, detections: Detection[]) => {
    // For now, just return the redacted text from API
    // In the future, we can apply client-side transformations based on mode
    return redactedText;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24">
        {/* Top Bar */}
        <div className="border-b border-gray-800 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">
                  Paste text. We&apos;ll detect and redact PII in real time.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Nothing is logged or stored. Free demo API key enabled.
                </p>
              </div>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
              >
                <Settings size={16} />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex h-[calc(100vh-120px)]">
          {/* Left Side - Input */}
          <div className="flex-1 border-r border-gray-800 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <div className="flex flex-wrap gap-2">
                {Object.keys(presets).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handlePreset(preset)}
                    className="px-3 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste chat logs, emails, or JSON here…"
                className="w-full h-full bg-black border border-gray-800 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-700 resize-none"
              />
            </div>
            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleRedact}
                disabled={loading || !inputText.trim()}
                className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    <span>Redacting...</span>
                  </>
                ) : (
                  <span>Detect & Redact PII</span>
                )}
              </button>
            </div>
          </div>

          {/* Right Side - Output */}
          <div className="flex-1 flex flex-col">
            {error && (
              <div className="p-4 bg-red-900 border-b border-red-800">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {output && (
              <>
                {/* Tabs */}
                <div className="flex border-b border-gray-800">
                  {(['redacted', 'entities', 'json'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-white text-white'
                          : 'border-transparent text-gray-400 hover:text-gray-300'
                      }`}
                    >
                      {tab === 'redacted' ? 'Redacted Text' : tab === 'entities' ? 'Detected Entities' : 'JSON Diff'}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-auto">
                  {activeTab === 'redacted' && (
                    <div className="p-4 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-400">Redacted Output</h3>
                        <button
                          onClick={() => handleCopy(output.redacted_text)}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-black border border-gray-800 rounded-lg p-4 h-[calc(100%-60px)] overflow-auto">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                          {output.redacted_text}
                        </pre>
                      </div>
                    </div>
                  )}

                  {activeTab === 'entities' && (
                    <div className="p-4 h-full">
                      <div className="mb-4">
                        <h3 className="text-sm font-semibold text-gray-400 mb-4">Detected Entities</h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-gray-800">
                                <th className="text-left py-2 px-4 text-gray-400 font-semibold">Type</th>
                                <th className="text-left py-2 px-4 text-gray-400 font-semibold">Original</th>
                                <th className="text-left py-2 px-4 text-gray-400 font-semibold">Position</th>
                              </tr>
                            </thead>
                            <tbody>
                              {output.detections.map((det, idx) => (
                                <tr key={idx} className="border-b border-gray-900 hover:bg-gray-900 transition-colors">
                                  <td className="py-2 px-4">
                                    <span className="px-2 py-1 bg-blue-900 text-blue-300 rounded text-xs font-medium">
                                      {det.type}
                                    </span>
                                  </td>
                                  <td className="py-2 px-4 text-gray-300 font-mono text-xs">
                                    {det.text.length > 30 ? `${det.text.substring(0, 30)}...` : det.text}
                                  </td>
                                  <td className="py-2 px-4 text-gray-400 text-xs">
                                    {det.start}-{det.end}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'json' && (
                    <div className="p-4 h-full">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-gray-400">Raw JSON Response</h3>
                        <button
                          onClick={() => handleCopy(JSON.stringify(output, null, 2))}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-black border border-gray-800 rounded-lg p-4 h-[calc(100%-60px)] overflow-auto">
                        <pre className="text-sm text-gray-300 font-mono">
                          {JSON.stringify(output, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {!output && !loading && !error && (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <p className="text-lg mb-2">Ready to redact</p>
                  <p className="text-sm">Enter text on the left and click &quot;Detect & Redact PII&quot;</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Drawer */}
        {showSettings && (
          <div className="fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-800 z-50 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Settings</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>

              {/* Entity Types */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Entity Types</h3>
                <div className="space-y-2">
                  {Object.entries(entityTypes).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between cursor-pointer">
                      <span className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setEntityTypes({ ...entityTypes, [key]: e.target.checked })}
                        className="w-4 h-4 rounded bg-gray-800 border-gray-700"
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* Redaction Mode */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Redaction Mode</h3>
                <div className="space-y-2">
                  {(['mask', 'token', 'remove'] as const).map((mode) => (
                    <label key={mode} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="mode"
                        value={mode}
                        checked={redactionMode === mode}
                        onChange={() => setRedactionMode(mode)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-300 capitalize">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Config Profiles */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-3">Config Profile</h3>
                <div className="space-y-2">
                  {(['strict', 'balanced', 'minimal'] as const).map((profile) => (
                    <label key={profile} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="profile"
                        value={profile}
                        checked={configProfile === profile}
                        onChange={() => setConfigProfile(profile)}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-300 capitalize">{profile}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}


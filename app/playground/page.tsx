'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Loader2, Copy, Check, ArrowRight } from 'lucide-react';

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

interface UsageInfo {
  count: number | null;
  limit: number | null;
  reset: string | null;
}

const MAX_INPUT_AI = 500; // 500 characters for AI-assist mode (free demo limit)
const MAX_INPUT_REGEX = 500; // 500 characters for regex-only mode (free demo limit)

export default function Playground() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<RedactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'redacted' | 'entities' | 'json'>('redacted');
  const [copied, setCopied] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [useAI, setUseAI] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [usageInfo, setUsageInfo] = useState<UsageInfo>({ count: null, limit: null, reset: null });
  const detectorRef = useRef<any>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  // Lazy load OpenRedaction library only on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && !libraryLoaded) {
      const loadLibrary = async () => {
        try {
          // Load the CommonJS build from public folder at runtime
          const response = await fetch('/lib/openredaction.js');
          const code = await response.text();

          // Create a module-like environment
          const moduleObj = { exports: {} };
          const exports = moduleObj.exports;

          // Wrap the code in a function that provides module/exports
          const fn = new Function('module', 'exports', 'require', code);
          fn(moduleObj, exports, () => {});

          // Get OpenRedaction from the loaded module
          const { OpenRedaction } = moduleObj.exports as any;

          detectorRef.current = new OpenRedaction({
            includeNames: true,
            includeEmails: true,
            includePhones: true,
            includeAddresses: true,
            includeSSN: true,
            includeCreditCards: true,
            redactionMode: 'placeholder' as any,
          } as any);
          setLibraryLoaded(true);
        } catch (err) {
          console.error('Failed to load OpenRedaction library:', err);
          setError('Failed to load OpenRedaction library. Please refresh the page and try again.');
        }
      };
      loadLibrary();
    }
  }, [selectedPreset, libraryLoaded]);

  // Update detector when preset changes
  useEffect(() => {
    if (libraryLoaded && detectorRef.current && typeof window !== 'undefined') {
      const updateDetector = async () => {
        try {
          const response = await fetch('/lib/openredaction.js');
          const code = await response.text();

          const moduleObj = { exports: {} };
          const exports = moduleObj.exports;
          const fn = new Function('module', 'exports', 'require', code);
          fn(moduleObj, exports, () => {});

          const { OpenRedaction } = moduleObj.exports as any;

          const presetValue = (selectedPreset === 'gdpr' || selectedPreset === 'hipaa' || selectedPreset === 'ccpa')
            ? selectedPreset as 'gdpr' | 'hipaa' | 'ccpa'
            : 'gdpr';

          detectorRef.current = new OpenRedaction({
            includeNames: true,
            includeEmails: true,
            includePhones: true,
            includeAddresses: true,
            includeSSN: true,
            includeCreditCards: true,
            redactionMode: 'placeholder' as any,
          } as any);
        } catch (err) {
          console.error('Failed to update detector:', err);
        }
      };
      updateDetector();
    }
  }, [selectedPreset]);

  // API presets: gdpr, hipaa, ccpa, finance, education, transportation
  const apiPresets = {
    'gdpr': 'GDPR - General Data Protection defaults',
    'hipaa': 'HIPAA - Health data emphasis',
    'ccpa': 'CCPA - Consumer privacy defaults',
    'finance': 'Finance - Sector-focused bundle',
    'education': 'Education - Sector-focused bundle',
    'transportation': 'Transportation - Sector-focused bundle',
  };

  // Sample text presets for quick testing
  const textPresets = {
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


  const handleTextPreset = (presetName: string) => {
    setInputText(textPresets[presetName as keyof typeof textPresets]);
  };

  const handleApiPreset = (presetName: string) => {
    setSelectedPreset(presetName);
  };

  const handleRedact = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to redact');
      return;
    }

    // Check input size limits
    const maxLength = useAI ? MAX_INPUT_AI : MAX_INPUT_REGEX;
    if (inputText.length > maxLength) {
      setError(`Text too long — please reduce input to ${maxLength.toLocaleString()} characters. Current: ${inputText.length.toLocaleString()} characters.`);
      return;
    }

    if (!libraryLoaded || !detectorRef.current) {
      setError('Library is still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      // First, run regex detection
      const regexResult = await detectorRef.current.detect(inputText);
      console.log('Regex result:', regexResult);

      let allDetections = [...(regexResult.detections || [])];
      console.log('Initial detections:', allDetections);
      
      // If AI is enabled, call the AI endpoint and merge results
      if (useAI) {
        try {
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          };
          
          // Add API key header if provided
          if (apiKey.trim()) {
            headers['x-api-key'] = apiKey.trim();
          }
          
          const aiResponse = await fetch('https://openredaction-api.onrender.com/v1/ai-detect', {
            method: 'POST',
            headers,
            body: JSON.stringify({ 
              text: inputText
            }),
          });
          
          console.log('AI response status:', aiResponse.status);
          
          // Extract usage info from headers
          const usageCount = aiResponse.headers.get('X-Usage-Count');
          const usageLimit = aiResponse.headers.get('X-Usage-Limit');
          const usageReset = aiResponse.headers.get('X-Usage-Reset');
          
          if (usageCount !== null || usageLimit !== null || usageReset !== null) {
            setUsageInfo({
              count: usageCount ? parseInt(usageCount, 10) : null,
              limit: usageLimit ? parseInt(usageLimit, 10) : null,
              reset: usageReset,
            });
          } else {
            setUsageInfo({ count: null, limit: null, reset: null });
          }
          
          // Handle error responses
          if (!aiResponse.ok) {
            const errorData = await aiResponse.json().catch(() => ({}));
            const errorCode = errorData.code || errorData.error || '';
            
            if (aiResponse.status === 401 && errorCode === 'INVALID_KEY') {
              setError('Invalid API key. Please check your key or upgrade.');
              setLoading(false);
              return;
            } else if (aiResponse.status === 429 && errorCode === 'RATE_LIMIT') {
              setError('Rate limit reached. Try again later or upgrade to a Pro key.');
              setLoading(false);
              return;
            } else if (aiResponse.status === 400 && errorCode === 'TEXT_TOO_LONG') {
              setError('Text too long. Please shorten your input.');
              setLoading(false);
              return;
            } else {
              setError(`AI detection failed: ${errorData.message || 'Unknown error'}`);
              setLoading(false);
              return;
            }
          }
          
          if (aiResponse.ok) {
            const aiData = await aiResponse.json();
            console.log('AI response data:', aiData);
            console.log('AI response full structure:', JSON.stringify(aiData, null, 2));
            
            // Check for entities in various possible response formats
            let entities = [];
            if (aiData.entities && Array.isArray(aiData.entities)) {
              entities = aiData.entities;
            } else if (aiData.detections && Array.isArray(aiData.detections)) {
              entities = aiData.detections;
            } else if (Array.isArray(aiData)) {
              entities = aiData;
            }
            
            console.log('Extracted entities:', entities);
            console.log('Number of entities:', entities.length);
            
            if (entities.length > 0) {
              console.log('AI entities found:', entities);
              
              // Merge AI detections with regex detections
              // Convert AI entities to the same format as regex detections
              const aiDetections = entities.map((entity: any, index: number) => {
                // Handle different possible entity formats
                const start = entity.start ?? entity.position?.[0] ?? 0;
                const end = entity.end ?? entity.position?.[1] ?? 0;
                const value = entity.value ?? entity.text ?? entity.entity ?? '';
                const type = entity.type ?? entity.label ?? 'PII';
                
                return {
                  type: type,
                  value: value,
                  position: [start, end],
                  placeholder: `[${type}_${index}]`,
                  severity: 'medium' as const,
                };
              });
              
              console.log('Converted AI detections:', aiDetections);
              
              // Merge detections, avoiding duplicates (same position)
              const existingPositions = new Set(
                allDetections.map((d: any) => 
                  `${Array.isArray(d.position) ? d.position[0] : d.start}-${Array.isArray(d.position) ? d.position[1] : d.end}`
                )
              );
              
              console.log('Existing positions:', Array.from(existingPositions));
              
              aiDetections.forEach((aiDet: any) => {
                const posKey = `${aiDet.position[0]}-${aiDet.position[1]}`;
                console.log(`Checking AI detection at ${posKey}, exists: ${existingPositions.has(posKey)}`);
                if (!existingPositions.has(posKey)) {
                  allDetections.push(aiDet);
                  existingPositions.add(posKey);
                }
              });
              
              console.log('All detections after merge:', allDetections);
            } else {
              console.warn('No entities found in AI response. Full response:', aiData);
              if (aiData.aiUsed === false) {
                console.warn('AI was not used by the API. This might indicate the API endpoint is not configured to use AI, or the useAI parameter is not being recognized.');
              }
            }
          }
        } catch (aiError) {
          console.error('AI detection failed:', aiError);
          setError('AI detection failed. Continuing with regex-only results.');
          // Continue with regex-only results if AI fails
        }
      }
      
      // Sort detections by start position
      allDetections.sort((a: any, b: any) => {
        const aStart = Array.isArray(a.position) ? a.position[0] : (a.start || 0);
        const bStart = Array.isArray(b.position) ? b.position[0] : (b.start || 0);
        return aStart - bStart;
      });
      
      // Apply redaction to the text with all detections
      let redactedText = inputText;
      // Apply redactions in reverse order to maintain positions
      for (let i = allDetections.length - 1; i >= 0; i--) {
        const det = allDetections[i];
        const start = Array.isArray(det.position) ? det.position[0] : (det.start || 0);
        const end = Array.isArray(det.position) ? det.position[1] : (det.end || 0);
        const placeholder = det.placeholder || `[${det.type || 'PII'}]`;
        redactedText = redactedText.slice(0, start) + placeholder + redactedText.slice(end);
      }
      
      // Transform to expected format
      const transformedData: RedactResponse = {
        redacted_text: redactedText,
        detections: allDetections.map((det: any) => ({
          type: det.type || '',
          text: det.value || '',
          start: Array.isArray(det.position) ? det.position[0] : (det.start || 0),
          end: Array.isArray(det.position) ? det.position[1] : (det.end || 0),
          severity: det.severity || 'medium',
        })),
      };
      
      setOutput(transformedData);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred while redacting text';
      setError(errorMessage);
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-4 flex-wrap">
                  <div>
                    <p className="text-sm text-gray-300">
                      Try the OpenRedaction library in your browser. This is a demo of the open-source library capabilities.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Nothing is logged or stored. Free demo API key enabled. Hosted AI assist available (optional).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[calc(100vh-200px)] border border-gray-800 rounded-lg overflow-hidden bg-black">
            {/* Left Side - Input */}
            <div className="flex-1 lg:border-r border-b lg:border-b-0 border-gray-800 flex flex-col bg-black">
            <div className="p-4 border-b border-gray-800 space-y-3 bg-gray-900/50">
              <div>
                <label className="block text-sm text-gray-400 mb-2">API Preset:</label>
                <select
                  value={selectedPreset}
                  onChange={(e) => handleApiPreset(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-600"
                >
                  <option value="">None (default)</option>
                  {Object.entries(apiPresets).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Load Sample Text:</label>
                <select
                  onChange={(e) => {
                    if (e.target.value) {
                      handleTextPreset(e.target.value);
                      e.target.value = ''; // Reset to placeholder
                    }
                  }}
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-gray-600"
                  defaultValue=""
                >
                  <option value="" disabled>Select sample text...</option>
                  {Object.keys(textPresets).map((preset) => (
                    <option key={preset} value={preset}>
                      {preset}
                    </option>
                  ))}
                </select>
              </div>
              {/* API Key Field */}
              <div className="pt-2 border-t border-gray-800">
                <label className="block text-sm text-gray-400 mb-2">API Key (optional)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use an API key to access higher AI-assist limits. Leave empty to use the free tier.
                </p>
              </div>
              
              {/* AI Toggle */}
              <div className="pt-2 border-t border-gray-800">
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useAI}
                    onChange={(e) => setUseAI(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded bg-gray-800 border-gray-700"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-gray-300">Use AI Assist (hosted)</span>
                      {useAI && (
                        <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                          apiKey.trim() 
                            ? 'bg-green-900/30 text-green-400 border border-green-800' 
                            : 'bg-gray-800 text-gray-400 border border-gray-700'
                        }`}>
                          {apiKey.trim() ? 'Pro' : 'Free tier'}
                        </span>
                      )}
                    </div>
                    {apiKey.trim() && (
                      <div className="mb-1">
                        <span className="text-xs text-green-400 font-medium">✓ Pro API mode enabled</span>
                      </div>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Sends your text to our hosted AI proxy for extra detection. Your text is not stored or logged.
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex-1 p-4 flex flex-col">
              <textarea
                value={inputText}
                onChange={(e) => {
                  const maxLength = useAI ? MAX_INPUT_AI : MAX_INPUT_REGEX;
                  if (e.target.value.length <= maxLength) {
                    setInputText(e.target.value);
                  }
                }}
                placeholder="Paste chat logs, emails, or JSON here…"
                className="w-full flex-1 bg-gray-900/50 border border-gray-800 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 resize-none transition-all"
              />
              <div className="mt-2 flex justify-between items-center text-xs">
                <span className={`${inputText.length > (useAI ? MAX_INPUT_AI : MAX_INPUT_REGEX) ? 'text-red-400' : 'text-gray-500'}`}>
                  {inputText.length.toLocaleString()} / {(useAI ? MAX_INPUT_AI : MAX_INPUT_REGEX).toLocaleString()} characters
                </span>
                {useAI && (
                  <span className="text-gray-500">AI-assist limit: {MAX_INPUT_AI.toLocaleString()} chars</span>
                )}
              </div>
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-900/50 space-y-3">
              {/* Usage Info Display */}
              {usageInfo.count !== null && usageInfo.limit !== null && (
                <div className="text-xs text-gray-400 text-center">
                  Usage: {usageInfo.count} / {usageInfo.limit.toLocaleString()}
                  {usageInfo.reset && ` (resets ${new Date(usageInfo.reset).toLocaleDateString()})`}
                </div>
              )}
              {usageInfo.count === null && usageInfo.limit === null && useAI && !apiKey.trim() && (
                <div className="text-xs text-gray-500 text-center">
                  Using free tier (IP-limited).{' '}
                  <Link href="/pricing" className="text-white hover:text-gray-300 underline">
                    Upgrade to Pro
                  </Link>{' '}
                  for higher limits.
                </div>
              )}
              {error && error.includes('Rate limit') && (
                <div className="text-xs text-red-400 text-center">
                  Rate limit reached.{' '}
                  <Link href="/pricing" className="text-white hover:text-gray-300 underline">
                    Upgrade to Pro
                  </Link>{' '}
                  for higher limits.
                </div>
              )}
              
              <button
                onClick={handleRedact}
                disabled={loading || !inputText.trim()}
                className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed cursor-pointer transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none"
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
          <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-0">
            {error && (
              <div className="p-4 bg-red-900 border-b border-red-800">
                <p className="text-red-200 text-sm break-words">{error}</p>
              </div>
            )}

            {output && (
              <>
                {/* Tabs */}
                <div className="flex border-b border-gray-800 bg-gray-900/50">
                  {(['redacted', 'entities', 'json'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                        activeTab === tab
                          ? 'border-white text-white bg-gray-900/30'
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-900/20'
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
                        <div className="flex items-center gap-2">
                          {output.detections.length > 0 && (
                            <span className="text-xs text-gray-500">
                              {output.detections.length} PII item{output.detections.length !== 1 ? 's' : ''} detected
                            </span>
                          )}
                          <button
                            onClick={() => handleCopy(output.redacted_text)}
                            className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors cursor-pointer"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            <span>{copied ? 'Copied!' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 h-[calc(100%-60px)] overflow-auto">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono leading-relaxed">
                          {output.redacted_text}
                        </pre>
                      </div>
                          {output.detections.length > 0 && (
                            <div className="mt-4 bg-gray-900 border border-gray-800 rounded-lg p-4">
                              <p className="text-sm text-gray-300 mb-3">
                                Want to use this in your application?
                              </p>
                              <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                  href="https://github.com/sam247/openredaction"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 text-white hover:text-gray-300 text-sm font-medium"
                                >
                                  <span>Install the library</span>
                                  <ArrowRight size={16} />
                                </a>
                                <span className="text-gray-600 hidden sm:inline">•</span>
                                <a
                                  href="https://github.com/sam247/openredaction-api"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center space-x-2 text-white hover:text-gray-300 text-sm font-medium"
                                >
                                  <span>View API docs</span>
                                  <ArrowRight size={16} />
                                </a>
                              </div>
                            </div>
                          )}
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
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors cursor-pointer"
                        >
                          {copied ? <Check size={16} /> : <Copy size={16} />}
                          <span>{copied ? 'Copied!' : 'Copy'}</span>
                        </button>
                      </div>
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 h-[calc(100%-60px)] overflow-auto">
                        <pre className="text-sm text-gray-300 font-mono leading-relaxed">
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
                <div className="text-center max-w-md px-4">
                  <p className="text-lg mb-2">Ready to redact</p>
                  <p className="text-sm">Enter text on the left and click &quot;Detect & Redact PII&quot;</p>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

        {/* Playground Guide Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">How to Use the Playground</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Getting Started</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>Paste or type text containing PII (emails, phone numbers, names, etc.) in the input field</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>Select an API preset (GDPR, HIPAA, CCPA) or use the default settings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>Optionally enable AI Assist for better detection on unstructured text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>Click &quot;Detect & Redact PII&quot; to process your text</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>View results in three tabs: Redacted Text, Detected Entities, or JSON Diff</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Limits & Restrictions</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span><strong>Regex-only mode:</strong> {MAX_INPUT_REGEX.toLocaleString()} characters per request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span><strong>AI-assist mode:</strong> {MAX_INPUT_AI.toLocaleString()} characters per request</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span><strong>Free tier:</strong> IP-based rate limiting (approximately 200 AI-assist requests per day)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span><strong>Pro tier:</strong> 50,000 AI-assist requests per month with API key</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">•</span>
                    <span>No data is logged or stored - all processing happens in real-time</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">What Gets Detected?</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Contact Information</h4>
                  <ul className="space-y-1">
                    <li>• Email addresses</li>
                    <li>• Phone numbers</li>
                    <li>• Physical addresses</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Identity & Financial</h4>
                  <ul className="space-y-1">
                    <li>• Names (first, last, full)</li>
                    <li>• Social Security Numbers</li>
                    <li>• Credit card numbers</li>
                    <li>• Bank account numbers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Other Identifiers</h4>
                  <ul className="space-y-1">
                    <li>• IP addresses</li>
                    <li>• Passport numbers</li>
                    <li>• Driver&apos;s license numbers</li>
                    <li>• Date of birth</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-4 text-white">Want to Use This in Your Application?</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/sam247/openredaction"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  <span>Install Library</span>
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/docs"
                  className="inline-flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <span>View Documentation</span>
                  <ArrowRight size={18} />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center justify-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <span>Get API Key</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

      </main>

      <div className="pb-16"></div>
      <Footer />
    </div>
  );
}


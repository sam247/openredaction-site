'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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

export default function Playground() {
  const [inputText, setInputText] = useState('');
  const [output, setOutput] = useState<RedactResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'redacted' | 'entities' | 'json'>('redacted');
  const [copied, setCopied] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [useAI, setUseAI] = useState(false);
  const detectorRef = useRef<any>(null);
  const [libraryLoaded, setLibraryLoaded] = useState(false);

  // Lazy load OpenRedaction library only on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && !libraryLoaded) {
      import('@openredaction/openredaction').then((module) => {
        const { OpenRedaction } = module;
        const presetValue = (selectedPreset === 'gdpr' || selectedPreset === 'hipaa' || selectedPreset === 'ccpa') 
          ? selectedPreset as 'gdpr' | 'hipaa' | 'ccpa'
          : 'gdpr';
        detectorRef.current = new OpenRedaction({
          preset: presetValue,
          redactionMode: 'placeholder' as any,
        } as any);
        setLibraryLoaded(true);
      }).catch((err) => {
        console.error('Failed to load OpenRedaction library:', err);
      });
    }
  }, [selectedPreset, libraryLoaded]);

  // Update detector when preset changes
  useEffect(() => {
    if (libraryLoaded && detectorRef.current && typeof window !== 'undefined') {
      import('@openredaction/openredaction').then((module) => {
        const { OpenRedaction } = module;
        const presetValue = (selectedPreset === 'gdpr' || selectedPreset === 'hipaa' || selectedPreset === 'ccpa') 
          ? selectedPreset as 'gdpr' | 'hipaa' | 'ccpa'
          : 'gdpr';
        detectorRef.current = new OpenRedaction({
          preset: presetValue,
          redactionMode: 'placeholder' as any,
        } as any);
      });
    }
  }, [selectedPreset, libraryLoaded]);

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

    if (!libraryLoaded || !detectorRef.current) {
      setError('Library is still loading. Please wait a moment and try again.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      // First, run regex detection
      const regexResult = detectorRef.current.detect(inputText);
      console.log('Regex result:', regexResult);
      
      let allDetections = [...(regexResult.detections || [])];
      console.log('Initial detections:', allDetections);
      
      // If AI is enabled, call the AI endpoint and merge results
      if (useAI) {
        try {
          const aiResponse = await fetch('https://openredaction-api.onrender.com/ai-detect', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: inputText }),
          });
          
          console.log('AI response status:', aiResponse.status);
          
          if (aiResponse.ok) {
            const aiData = await aiResponse.json();
            console.log('AI response data:', aiData);
            
            if (aiData.entities && Array.isArray(aiData.entities)) {
              console.log('AI entities found:', aiData.entities);
              
              // Merge AI detections with regex detections
              // Convert AI entities to the same format as regex detections
              const aiDetections = aiData.entities.map((entity: any, index: number) => ({
                type: entity.type || '',
                value: entity.value || '',
                position: [entity.start || 0, entity.end || 0],
                placeholder: `[${entity.type || 'PII'}_${index}]`,
                severity: 'medium' as const,
              }));
              
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
              console.warn('AI response missing entities array:', aiData);
            }
          } else {
            const errorText = await aiResponse.text();
            console.error('AI response not OK:', aiResponse.status, errorText);
          }
        } catch (aiError) {
          console.error('AI detection failed:', aiError);
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-[calc(100vh-200px)] border border-gray-800 rounded-lg overflow-hidden bg-black">
            {/* Left Side - Input */}
            <div className="flex-1 border-r border-gray-800 flex flex-col bg-black">
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
                    <span className="text-sm text-gray-300 block mb-1">Use AI Assist (hosted)</span>
                    <p className="text-xs text-gray-400 mt-1">
                      Sends your text to our hosted AI proxy for extra detection. Your text is not stored or logged.
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste chat logs, emails, or JSON here…"
                className="w-full h-full bg-gray-900/50 border border-gray-800 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 resize-none transition-all"
              />
            </div>
            <div className="p-4 border-t border-gray-800 bg-gray-900/50">
              <button
                onClick={handleRedact}
                disabled={loading || !inputText.trim()}
                className="w-full bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:shadow-none"
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
                <div className="flex border-b border-gray-800 bg-gray-900/50">
                  {(['redacted', 'entities', 'json'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-all ${
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
                            className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
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
                              <p className="text-sm text-gray-300 mb-2">
                                Want to use this in your application?
                              </p>
                              <a
                                href="https://github.com/sam247/openredaction"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center space-x-2 text-white hover:text-gray-300 text-sm font-medium"
                              >
                                <span>Install the library on GitHub</span>
                                <ArrowRight size={16} />
                              </a>
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
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-md text-sm transition-colors"
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
                  <p className="text-sm mb-6">Enter text on the left and click &quot;Detect & Redact PII&quot;</p>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mt-4">
                    <p className="text-white font-semibold mb-2">Want to use this in your app?</p>
                    <p className="text-sm text-gray-400 mb-4">
                      Install the open-source library and self-host on your infrastructure.
                    </p>
                    <a
                      href="https://github.com/sam247/openredaction"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm"
                    >
                      <span>View on GitHub</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}


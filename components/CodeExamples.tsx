'use client';

import { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CodeExamplesProps {
  apiKey?: string;
}

export default function CodeExamples({ apiKey = 'YOUR_API_KEY_HERE' }: CodeExamplesProps) {
  const [activeTab, setActiveTab] = useState<'curl' | 'node' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    curl: `curl -X POST https://openredaction-api.onrender.com/v1/ai-detect \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey}" \\
  -d '{"text": "John Smith lives at 10 Downing Street"}'`,
    node: `const res = await fetch("https://openredaction-api.onrender.com/v1/ai-detect", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.OPENREDACTION_API_KEY || "${apiKey}",
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
        "x-api-key": "${apiKey}"
    },
    json={"text": "John Smith lives at 10 Downing Street"}
)

print(r.json())`,
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h3 className="text-xl font-semibold mb-4">Code Examples</h3>
      
      {/* Tabs */}
      <div className="flex flex-wrap space-x-2 mb-4 border-b border-gray-800">
        {(['curl', 'node', 'python'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-colors cursor-pointer ${
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
        <div className="bg-black rounded-lg p-3 sm:p-4 border border-gray-800 font-mono text-xs sm:text-sm overflow-x-auto">
          <pre className="text-green-400 whitespace-pre-wrap break-words">{codeExamples[activeTab]}</pre>
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center space-x-1 sm:space-x-2 bg-gray-800 hover:bg-gray-700 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md transition-colors text-xs sm:text-sm cursor-pointer"
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
  );
}


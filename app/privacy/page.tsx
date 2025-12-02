import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy | OpenRedaction',
  description: 'Privacy policy for OpenRedaction. Learn about our data handling practices, zero data retention, and self-hosted options.',
  path: '/privacy',
});

export default function Privacy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="pt-24 pb-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-gray-300 mb-8">
              OpenRedaction is designed with privacy and data minimization at its core. This policy explains how we handle your data.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">No Data Storage</h2>
              <p className="text-gray-300 mb-4">
                We do not store or log your text. When you use OpenRedaction (whether via the playground, API, or library), your data is processed in memory and discarded immediately after processing.
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>No persistent databases</li>
                <li>No logs of your input text</li>
                <li>No retention of processed data</li>
                <li>All processing happens in memory</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Hosted AI Assist</h2>
              <p className="text-gray-300 mb-4">
                When AI assist is enabled, your text is sent to our hosted AI proxy for entity detection. Here&apos;s what happens:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Text is sent to our hosted AI proxy</li>
                <li>The proxy forwards it to our model provider strictly for entity detection</li>
                <li>We do not log or store your text</li>
                <li>Everything is processed in memory and discarded</li>
                <li>No persistent storage of any kind</li>
              </ul>
              <p className="text-gray-300">
                AI assist is optional. Regex-only mode works completely offline and requires no external services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Self-Hosted Option</h2>
              <p className="text-gray-300 mb-4">
                For complete privacy and control, you can self-host OpenRedaction on your own infrastructure:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Your data never leaves your environment</li>
                <li>You control all processing and logging</li>
                <li>You can configure your own AI endpoint if needed</li>
                <li>Complete control over data handling</li>
              </ul>
              <p className="text-gray-300">
                OpenRedaction is fully open source, so you can audit the code and deploy it on your own servers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Data Minimization Principles</h2>
              <p className="text-gray-300 mb-4">
                Our approach aligns with GDPR and UK-GDPR data minimization principles:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li><strong>Storage limitation:</strong> We don&apos;t store your data</li>
                <li><strong>Data minimization:</strong> We only process what you send, and only for the purpose of redaction</li>
                <li><strong>Purpose limitation:</strong> Data is used solely for PII detection and redaction</li>
                <li><strong>Transparency:</strong> All code is open source and auditable</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">User Data Discarded After Processing</h2>
              <p className="text-gray-300 mb-4">
                All user data is discarded immediately after processing:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-4">
                <li>Input text is processed and then discarded</li>
                <li>No intermediate storage</li>
                <li>No caching of results</li>
                <li>No analytics or tracking of your content</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">Contact</h2>
              <p className="text-gray-300">
                If you have questions about this privacy policy, please contact us through our support channels.
              </p>
            </section>

            <section className="mb-12">
              <p className="text-sm text-gray-400 italic">
                Last updated: January 2025
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


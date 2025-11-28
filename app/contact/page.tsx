import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact Us - Enterprise Solutions & Support',
  description: 'Get in touch with OpenRedaction for enterprise solutions, self-hosted deployments, or learn more about Disclosurely.com. Contact our team today.',
  path: '/contact',
});

export default function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Ready to protect your data? Contact us for enterprise solutions, 
              self-hosted deployments, or learn more about Disclosurely.com
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 md:p-12 border border-gray-800">
            <ContactForm />
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Prefer to schedule a call?</p>
            <a
              href="mailto:support@openredaction.com"
              className="text-white hover:text-gray-300 underline"
            >
              Email us at support@openredaction.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}


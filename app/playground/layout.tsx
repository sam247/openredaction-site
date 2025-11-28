import { generatePageMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = generatePageMetadata({
  title: 'Playground - Try PII Detection Free',
  description: 'Try OpenRedaction for free. Paste text and see how our AI detects and redacts personally identifiable information in real-time. No signup required.',
  path: '/playground',
});

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


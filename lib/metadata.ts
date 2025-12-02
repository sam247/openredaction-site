import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openredaction.com';
const siteName = 'OpenRedaction';
const siteDescription = 'Regex-first PII redaction. Open-source library with 500+ tested patterns. Optional hosted AI assist for messy, unstructured text. Self-host for complete privacy and control.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Open Source PII Detection & Redaction`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    'PII detection',
    'PII redaction',
    'privacy compliance',
    'GDPR',
    'HIPAA',
    'CCPA',
    'data privacy',
    'open source',
    'regex patterns',
    'pattern matching',
    'deterministic redaction',
    'personally identifiable information',
    'data protection',
    'npm package',
    'open-source library',
    'self-hosted redaction',
    'Node.js library',
  ],
  authors: [{ name: 'OpenRedaction' }],
  creator: 'OpenRedaction',
  publisher: 'OpenRedaction',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: `${siteName} - Open Source PII Detection & Redaction`,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} - Open Source PII Detection & Redaction`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: '@openredaction',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export function generatePageMetadata({
  title,
  description,
  path = '',
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : defaultMetadata.robots,
  };
}


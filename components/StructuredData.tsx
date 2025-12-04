export function StructuredData() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://openredaction.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OpenRedaction',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: 'Open source AI-powered PII detection and redaction tool',
    sameAs: [
      'https://github.com/sam247/openredaction',
    ],
  };

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OpenRedaction',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is OpenRedaction free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the regex-only library is free and open-source. You can use it locally without any external services. AI-assist via the hosted API has a free tier with IP-based limits, and a Pro tier with 50,000 requests/month for £9/month.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between regex mode and AI mode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Regex mode uses 500+ tested patterns for fast, deterministic PII detection. It works completely offline and is free. AI mode is optional and uses a hosted AI proxy for better detection on messy or unstructured text. AI mode requires the hosted API and has usage limits.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does OpenRedaction store my data?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, the hosted API is stateless and does not store raw text. Processing happens in memory and data is discarded after redaction. Minimal metadata may be logged for rate limiting. For complete privacy, you can self-host the open-source library.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the API limit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Free tier: IP-based rate limiting with fair-use limits (approximately 200 AI-assist requests per day). Pro tier: 50,000 AI-assist requests per month with an API key. Regex-only redaction has no limits and works completely offline.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}


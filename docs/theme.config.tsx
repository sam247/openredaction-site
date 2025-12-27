import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import Logo from './components/Logo'

const config: DocsThemeConfig = {
  logo: <Logo />,
  project: {
    link: 'https://github.com/sam247/openredaction',
  },
  chat: {
    link: 'https://openredaction.com/contact',
  },
  docsRepositoryBase: 'https://github.com/sam247/openredaction-site/tree/main/docs',
  footer: {
    component: () => <span>OpenRedaction Documentation © 2025</span>,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s | OpenRedaction',
      defaultTitle: 'OpenRedaction Documentation - PII Detection & Redaction',
      description: 'Complete documentation for OpenRedaction, an open-source PII detection and redaction library with 500+ regex patterns and optional AI assist.',
      openGraph: {
        siteName: 'OpenRedaction',
        type: 'website',
        locale: 'en_US',
      },
      twitter: {
        cardType: 'summary_large_image',
        site: '@openredaction',
      },
    }
  },
}

export default config

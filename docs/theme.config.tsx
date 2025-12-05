import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>OpenRedaction Docs</span>,
  project: {
    link: 'https://github.com/sam247/openredaction',
  },
  chat: {
    link: 'https://openredaction.com/contact',
  },
  docsRepositoryBase: 'https://github.com/sam247/openredaction-site/tree/main/docs',
  footer: {
    text: 'OpenRedaction Documentation © 2025',
  },
  primaryHue: 142, // Green color to match brand
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
}

export default config


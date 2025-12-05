# Deployment Guide

This documentation site is set up to deploy to `docs.openredaction.com` on Vercel.

## Vercel Deployment Setup

### Option 1: Deploy from /docs subdirectory (Recommended)

1. In Vercel dashboard, create a new project
2. Connect your GitHub repository
3. Configure the project:
   - **Root Directory**: Set to `docs`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (runs automatically in docs directory)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (runs automatically in docs directory)

4. Set environment variables if needed (none required for basic setup)

5. Deploy!

### Option 2: Deploy as separate repository

If you prefer to have the docs in a separate repository:

1. Create a new repository (e.g., `openredaction-docs`)
2. Copy the contents of `/docs` to the new repository
3. Deploy normally to Vercel

## Local Development

```bash
cd docs
npm install
npm run dev
```

Visit http://localhost:3000 to view the documentation.

## Building

```bash
cd docs
npm run build
npm start
```

## Custom Domain

In Vercel:
1. Go to Project Settings → Domains
2. Add `docs.openredaction.com`
3. Configure DNS records as instructed by Vercel

## Notes

- The docs site uses Next.js 14 and Nextra 3
- All documentation pages are in `/docs/pages/` as `.mdx` files
- The theme configuration is in `/docs/theme.config.tsx`
- Navigation is automatically generated from `_meta.json` files


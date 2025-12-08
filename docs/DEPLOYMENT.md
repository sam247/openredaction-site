# Deployment Guide

This documentation site is bundled and served from `https://openredaction.com/docs` (no subdomain). The docs are statically exported and copied into the main app's `public/docs` folder during the root build.

## Vercel Deployment Setup

### Path-based deployment (current setup)

The root project `npm run build` now runs `npm run docs:export`, which:
1. Installs docs dependencies (`npm ci` inside `/docs`)
2. Builds and exports the Nextra site with `basePath: /docs`
3. Copies the static export from `docs/out/docs` into the root `public/docs`

With the `app/docs` route removed, the main Next.js app serves the static docs at `/docs`.

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
npm run export
```

To verify the exported site locally:
```bash
cd docs
npm run export
npx serve out
```
Then open http://localhost:3000/docs (because of `basePath: /docs`).

## Notes

- The docs site uses Next.js 14 and Nextra 3 with `basePath: /docs`
- All documentation pages are in `/docs/pages/` as `.mdx` files
- The theme configuration is in `/docs/theme.config.tsx`
- Navigation is automatically generated from `_meta.ts` files


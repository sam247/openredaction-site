const { withBotId } = require('botid/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  // Transpile the openredaction package to handle ESM chunks
  transpilePackages: ['openredaction'],
  webpack: (config, { isServer }) => {
    // Ignore Node.js modules that aren't available in the browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        'fs/promises': false,
        worker_threads: false,
        path: false,
        crypto: false,
      };
      
      // Prefer CommonJS build over ESM to avoid chunk resolution issues
      config.resolve.mainFields = ['main', 'module'];
    }
    
    // Mark openredaction as external to prevent build-time analysis
    // It will be loaded at runtime via dynamic import/require
    config.externals = config.externals || [];
    if (Array.isArray(config.externals)) {
      config.externals.push('openredaction');
    } else {
      config.externals = [config.externals, 'openredaction'];
    }
    
    return config;
  },
}

module.exports = withBotId(nextConfig)


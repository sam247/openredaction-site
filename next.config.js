const { withBotId } = require('botid/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
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
    }
    return config;
  },
}

module.exports = withBotId(nextConfig)


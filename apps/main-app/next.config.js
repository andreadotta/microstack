/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {
          // Qui definisci il nome del modulo remoto e l'URL del suo remoteEntry.js
          users: 'notifications@http://localhost:3000/_next/static/chunks/remoteEntry.js',
        },
        exposes: {}
      })
    );

    return config;
  }
  
};

module.exports = nextConfig;
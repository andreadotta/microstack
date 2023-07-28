/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require("@module-federation/nextjs-mf");


const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [],
  //  experimental: {
  //    appDir: true,
  // },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        filename: 'static/chunks/remoteEntry.js',
        name: 'notifications',
        remotes: {},
        exposes: {
          './Notifications': './src/components/notifications.tsx',
        }
      })
    );

    return config;
  }
  
};

module.exports = nextConfig;

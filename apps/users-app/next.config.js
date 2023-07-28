/** @type {import('next').NextConfig} */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const deps = require('./package.json').dependencies;
const { ModuleFederationPlugin } = require('@module-federation/nextjs-mf');

const nextConfig = {
  transpilePackages: ['commons-api-client', 'users-api-client', 'notifications-api-client'],
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'users',
        filename: 'static/chunks/remoteEntry.js',
        remotes: {},
        exposes: {
          './UsersPage': './src/components/users.tsx',
        }
      })
    );
    return config;
  },
};

module.exports = nextConfig;

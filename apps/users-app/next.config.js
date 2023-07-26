/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [],
  experimental: {
    appDir: true
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'users',
        filename: 'static/chunks/userEntry.js',
        exposes: {
          // specifica il modulo che deve essere esportato
          './SomeComponent': './components/someComponent.js',
        },
      })
    );

    return config;
  },
  port: 3001,
}

module.exports = nextConfig

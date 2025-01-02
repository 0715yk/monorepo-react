import type { NextConfig } from 'next';
import path from 'path';

const rootDir = path.resolve(process.cwd(), '../../..');

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `
    @use '@myorg/assets/scss/mixin' as *;

    `
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@myorg/ui/*': path.join(rootDir, 'packages/ui/src/*'),
      '@myorg/assets/*': path.join(rootDir, 'packages/ui/assets/*'),
      '@myorg/utils': path.join(rootDir, 'packages/utils/src/*')
    };
    return config;
  }
};

export default nextConfig;

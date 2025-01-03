import type { NextConfig } from 'next';
import path from 'path';

const rootDir = path.resolve(process.cwd(), '../..');

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: "@use '@myorg/assets/scss/mixin' as *;"
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@myorg/ui': path.join(rootDir, 'packages/ui/src'),
      '@myorg/assets': path.join(rootDir, 'packages/ui/assets'),
      '@myorg/utils': path.join(rootDir, 'packages/utils/src')
    };

    // 폰트 파일을 위한 webpack 룰 추가 <--- 이부분
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      include: [path.join(rootDir, 'packages')],
      type: 'asset/resource'
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }
      ]
    });
    return config;
  }
  // experimental: {
  //   externalDir: true // 외부 디렉토리 접근 허용
  // }
};

export default nextConfig;

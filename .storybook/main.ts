import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../app/**/*.mdx',
    '../app/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      appDirectory: true,
      nextConfigPath: '../next.config.ts',
      nextImage: { unoptimized: true }
    }
  },
  // Ensure Storybook uses the project's Webpack v5 instance
  // instead of Next.js' compiled Webpack to avoid hook mismatches.
  webpackFinal: async (config) => {
    // Safeguard alias so any import of Next's compiled webpack resolves
    // to the actual webpack package installed at the root.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'next/dist/compiled/webpack/webpack': require.resolve('webpack')
    };

    return config;
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag'
  }
};

export default config;

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
  core: {
    builder: '@storybook/builder-webpack5',
  },
  // Ensure Storybook uses the project's Webpack v5 instance
  // instead of Next.js' compiled Webpack to avoid hook mismatches.
  webpackFinal: async (config) => {
    // Safeguard alias so any import of Next's compiled webpack resolves
    // to the actual webpack package installed at the root.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Force any reference to Next's compiled webpack to use the project's webpack
      'next/dist/compiled/webpack/webpack': require.resolve('webpack'),
      'next/dist/compiled/webpack': require.resolve('webpack'),
      webpack: require.resolve('webpack')
    };

    // Ensure Webpack cache API exists to avoid undefined hooks in builder
    config.cache = { type: 'filesystem' } as any;

    return config;
  },
  staticDirs: ['../public'],
  docs: {
    autodocs: 'tag'
  }
};

export default config;


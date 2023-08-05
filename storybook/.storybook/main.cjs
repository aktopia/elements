const path = require('path');
const { mergeConfig, searchForWorkspaceRoot } = require('vite');
module.exports = {
  stories: ['../src/**/*.story.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    '@storybook/addon-styling',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@elements': path.resolve(__dirname, '../../lib/src'),
          '@story': path.resolve(__dirname, '../src'),
        },
      }, // Add dependencies to pre-optimization
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
      server: {
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd()), '../../lib'],
        },
      },
    });
  },
};

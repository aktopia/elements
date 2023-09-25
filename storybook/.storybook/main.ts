import * as path from 'path';
import { mergeConfig, searchForWorkspaceRoot } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
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
      },
      server: {
        host: '127.0.0.1',
        port: 6007,
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd()), '../../lib'],
        },
      },
    });
  },
};

export default config;

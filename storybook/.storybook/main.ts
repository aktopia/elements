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
    '@storybook/addon-themes',
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
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd()), '../../lib'],
        },
      },
      build: {
        target: 'esnext',
      },
    });
  },
};

export default config;

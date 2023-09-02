import { BackIconButton as Component } from '@elements/components/back-icon-button';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/BackIconButton',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const BackIconButton: Story = {
  args: {
    size: 'xs',
  },
};

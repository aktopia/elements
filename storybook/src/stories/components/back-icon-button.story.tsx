import { BackIconButton as Component } from '@elements/components/back-icon-button';
import { StoryObj } from '@storybook/react';

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

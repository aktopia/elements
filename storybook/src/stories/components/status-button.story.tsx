import { StatusButton as Component } from '@elements/components/status-button';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/StatusButton',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const StatusButton: Story = {
  args: {
    name: 'In Progress',
    color: 'gray',
  },
};

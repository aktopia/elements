import { Spinner as Component } from '@elements/components/spinner';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Spinner',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Spinner: Story = {
  args: {
    show: true,
    kind: 'primary',
    size: 'sm',
  },
};

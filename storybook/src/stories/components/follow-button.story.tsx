import { FollowButton as Component } from '@elements/components/follow-button';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/FollowButton',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const FollowButton: Story = {
  args: {
    kind: 'tertiary',
    size: 'xs',
    count: 1230,
  },
};

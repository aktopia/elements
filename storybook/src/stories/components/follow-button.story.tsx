import { FollowButton } from '@elements/components/follow-button';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/FollowButton',
  component: FollowButton,
};

type Story = StoryObj<typeof FollowButton>;

export const Tertiary: Story = {
  args: {
    kind: 'tertiary',
    size: 'xs',
    count: 1230,
  },
};

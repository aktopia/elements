import { Voting as Component } from '@elements/components/voting';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/Vote',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const Vote: Story = {
  args: {
    count: 1000,
    onUpvote: action('onUpvote'),
    onDownvote: action('onDownvote'),
    kind: 'upvote',
    size: 'sm',
  },
};

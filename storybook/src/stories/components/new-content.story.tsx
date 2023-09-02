import { NewContent as Component } from '@elements/components/new-content';
import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

export default {
  title: 'Components/NewContent',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const NewContent: Story = {
  args: {
    placeholderText: 'What do you think?',
    postText: 'Post',
    onPost: action('onPost'),
    onChange: action('onChange'),
    creatorName: 'Krishna Sunil',
  },
};

import { NewComment as Component } from '@elements/components/new-comment';
import { action } from '@storybook/addon-actions';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Components/NewComment',
  component: Component,
};

type Story = StoryObj<typeof Component>;

export const NewComment: Story = {
  args: {
    placeholderText: 'What do you think?',
    postText: 'Post',
    onPost: action('onPost'),
    onChange: action('onChange'),
    authorName: 'Krishna Sunil',
  },
};

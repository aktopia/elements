import { ActionHeader } from '@elements/compositions/action/action-header';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Compositions/Action/Main',
  component: ActionHeader,
};

type Story = StoryObj<typeof ActionHeader>;

export const Main: Story = {
  args: {
    titleText: 'Clear large garbage dump on Vandipalayam road',
  },
};

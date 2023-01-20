import { ActionPage } from '@elements/compositions/action/action-page';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Compositions/Action/Main',
  component: ActionPage,
};

type Story = StoryObj<typeof ActionPage>;

export const Main: Story = {
  args: {
    titleText: 'Clear large garbage dump on Vandipalayam road',
  },
};

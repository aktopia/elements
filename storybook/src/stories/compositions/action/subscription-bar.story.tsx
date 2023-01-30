import { SubscriptionBar as Component } from '@elements/compositions/action/action-header';
import { MockStore } from '@story/utils/mock-store';
import { StoryObj } from '@storybook/react';

export default {
  title: 'Compositions/Action/SubscriptionBar',
  component: Component,
};

const store = {
  read: {
    'action/id': '1',
    'user/id': '2',
    'action.follow/count': 34000,
    'action/saved': true,
    'action/followed': false,
  },
  dispatch: ['action/follow', 'action/unfollow', 'action/save', 'action/unsave'],
};

type Story = StoryObj<typeof Component>;

export const SubscriptionBar: Story = {
  args: store.read,
  render: (args: any) => {
    return (
      <MockStore dispatch={store.dispatch} read={args}>
        <Component />
      </MockStore>
    );
  },
};

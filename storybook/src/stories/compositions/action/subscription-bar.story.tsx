import { SubscriptionBar } from '@elements/compositions/action/action-header';
import { StoryObj } from '@storybook/react';
import { MockStore } from '../../../utils/mock-store';

export default {
  title: 'Compositions/Action/SubscriptionBar',
  component: SubscriptionBar,
};

const values = {
  'action/id': '1',
  'user.me/id': '2',
  'action.follow/count': 34000,
  'action/saved': true,
  'action/followed': false,
};

const events = {
  'action/follow': (userId: string, actionId: string) =>
    console.log('action/follow', { userId, actionId }),
  'action/unfollow': (userId: string, actionId: string) =>
    console.log('action/unfollow', { userId, actionId }),
  'action/save': (userId: string, actionId: string) =>
    console.log('action/save', { userId, actionId }),
  'action/unsave': (userId: string, actionId: string) =>
    console.log('action/unsave', { userId, actionId }),
};

type Story = StoryObj<typeof SubscriptionBar>;

export const Main: Story = {
  render: () => {
    return (
      <MockStore dispatch={events} read={values}>
        <SubscriptionBar />
      </MockStore>
    );
  },
};

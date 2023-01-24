import { SubscriptionBar } from '@elements/compositions/action/action-header';
import { StoryObj } from '@storybook/react';
import { createActions, MockStore } from '../../../utils/mock-store';

export default {
  title: 'Compositions/Action/SubscriptionBar',
  component: SubscriptionBar,
};

const read = {
  'action/id': '1',
  'user/id': '2',
  'action.follow/count': 34000,
  'action/saved': true,
  'action/followed': false,
};

const dispatch = createActions([
  'action/follow',
  'action/unfollow',
  'action/save',
  'action/unsave',
]);

type Story = StoryObj<typeof SubscriptionBar>;

export const Main: Story = {
  args: read,
  render: (args: any) => {
    return (
      <MockStore dispatch={dispatch} read={args}>
        <SubscriptionBar />
      </MockStore>
    );
  },
};

import { ActionHeader as Component } from '@elements/compositions/action/action-header';
import { StoryObj } from '@storybook/react';
import { createActions, MockStore } from '../../../utils/mock-store';

export default {
  title: 'Compositions/Action/ActionHeader',
  component: Component,
};

const read = {
  'action/id': '1',
  'user/id': '2',
  'action.follow/count': 2600,
  'action/saved': false,
  'action/followed': false,
  'action/title': 'Clear large garbage dump on Vandipalayam road',
  'action/last-active': 'ADD-ME',
  'action/bumped': false,
  'action.bump/count': 10,
  'action.ui.progress-bar/active-switch-id': 'work',
  'action.work/percentage': 23,
  'action.funding/percentage': 24,
  'action.ui.progress-bar/switches': [
    { id: 'work', label: 'Work' },
    { id: 'funding', label: 'Funding' },
  ],
  'action.ui/tabs': [
    { id: 'home', label: 'Home' },
    { id: 'updates', label: 'Updates' },
    { id: 'funding', label: 'Funding' },
    { id: 'discussion', label: 'Discussion' },
    { id: 'team', label: 'Team' },
  ],
  'action.ui.tabs/active-tab-id': 'home',
};

const dispatch = createActions([
  'action/follow',
  'action/unfollow',
  'action/save',
  'action/unsave',
  'action/bump',
  'action/unbump',
  'action.navigate/funding',
  'action.ui.progress-bar/update',
  'action.ui.tabs/update',
]);

type Story = StoryObj<typeof Component>;

export const ActionHeader: Story = {
  args: read,
  render: (args: any) => {
    return (
      <MockStore dispatch={dispatch} read={args}>
        <Component />
      </MockStore>
    );
  },
};

import { Action as Component } from '@elements/compositions/action/action';
import { store as homeTabStore } from '@story/stores/action/home';
import { store as discussStore } from '@story/stores/discuss';
import { store as updateStore } from '@story/stores/updates';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/Action',
  component: Component,
};

const store = {
  read: {
    ...wrapPageStore.read,
    ...discussStore.read,
    ...updateStore.read,
    ...homeTabStore.read,
    'current.action/id': 'action-1',
    'current.user/id': '2',
    'user/name': 'Sunil KS',
    'action.follow/count': 2600,
    'action/saved': false,
    'action/followed': false,
    'action/title': 'Clear large garbage dump on Vandipalayam road',
    'action/last-active': 'ADD-ME',
    'action/bumped': false,
    'action.bump/count': 10,
    'action.progress-bar/active-switch-id': 'work',
    'action.work/percentage': 23,
    'action.funding/percentage': 24,
    'action.progress-bar/switches': [
      { id: 'work', label: 'Work' },
      { id: 'funding', label: 'Funding' },
    ],
    'action.tabs/active-tab-id': 'updates',
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...discussStore.dispatch,
    ...updateStore.dispatch,
    ...homeTabStore.dispatch,
    'action/follow',
    'action/unfollow',
    'action/save',
    'action/unsave',
    'action/bump',
    'action/unbump',
    'action/fund',
    'action.progress-bar/update',
    'action.tabs/update',
  ],
};

export const Action = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});

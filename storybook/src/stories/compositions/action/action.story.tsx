import { Action as Component } from '@elements/compositions/action/action';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { store as discussionStore } from '@story/stores/comments';
import { store as updateStore } from '@story/stores/updates';
import { store as relationshipStore } from '@story/stores/relationships';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Action/Action',
  component: Component,
};

const store = {
  read: {
    ...wrapPageStore.read,
    ...discussionStore.read,
    ...updateStore.read,
    ...relationshipStore.read,
    'current.action/id': 'action-1',
    'current.action.title/editing': false,
    'current.action.description/editing': false,
    'current.action.outcome/editing': false,
    'current.action.title/can-edit': true,
    'current.action.outcome/can-edit': true,
    'current.action.description/can-edit': true,
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
    'action/outcome': lorem.generateSentences(7),
    'action/description': lorem.generateSentences(8),
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...discussionStore.dispatch,
    ...updateStore.dispatch,
    ...relationshipStore.dispatch,
    'action/follow',
    'action/unfollow',
    'action/save',
    'action/unsave',
    'action/bump',
    'action/unbump',
    'action/fund',
    'action.progress-bar/update',
    'action.tabs/update',
    'current.action.description/edit',
    'current.action.description.edit/cancel',
    'current.action.description.edit/done',
    'current.action.description/update',
    'current.action.outcome/edit',
    'current.action.outcome.edit/cancel',
    'current.action.outcome.edit/done',
    'current.action.outcome/update',
    'current.action.title/edit',
    'current.action.title.edit/cancel',
    'current.action.title.edit/done',
    'current.action.title/update',
  ],
};

export const Action = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});

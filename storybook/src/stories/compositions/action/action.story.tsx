import { Action as Component } from '@elements/compositions/action/action';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { store as discussionStore } from '@story/stores/comments';
import { store as updateStore } from '@story/stores/updates';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Action/Action',
  component: Component,
};

const relations = {
  '1': {
    id: '1',
    type: 'issue',
    title: 'Large Garbage Dump on Vandipalayam Road.',
    relation: 'resolves',
    facing: 45,
    severity: { high: 987 },
  },
  '2': {
    id: '2',
    type: 'issue',
    title: 'Garbage being dumped on Narayan nagar.',
    relation: 'partially-resolves',
    facing: 22,
    severity: { high: 324 },
  },
  '3': {
    id: '3',
    type: 'action',
    title: 'Disinfect the stagnated water near Garbage dump in Vandipalayam road.',
    relation: 'relates',
    work: { percentage: 45 },
    funding: { percentage: 93 },
    bump: { count: 987 },
  },
};

function getRelation(params: any) {
  // @ts-ignore
  return relations[params['relation/id']];
}

const store = {
  read: {
    ...wrapPageStore.read,
    ...discussionStore.read,
    ...updateStore.read,
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
    'action.relation/ids': ['1', '2', '3'],
    'action/relation': getRelation,
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...discussionStore.dispatch,
    ...updateStore.dispatch,
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

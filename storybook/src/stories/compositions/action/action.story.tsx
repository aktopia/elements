import { Action as Component } from '@elements/compositions/action/action';
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

const discussionTabStore = {
  read: {
    'comment/comments-by-parent-id': ({ 'ref/id': id, 'ref/attribute': identifier }: any) => {
      if (identifier === 'action/id') {
        return ['comment-1', 'comment-5'];
      }
      if (identifier === 'comment/id') {
        switch (id) {
          case 'comment-1':
            return ['comment-2', 'comment-3'];
          case 'comment-2':
            return ['comment-4'];
          default:
            return [];
        }
      }
      return [];
    },
    'comment/author-name': ({ 'comment/id': id }: { 'comment/id': string }) => {
      switch (id) {
        case 'comment-1':
          return 'Sunil KS';
        case 'comment-2':
          return 'Madhumitha Sriram';
        case 'comment-3':
          return 'Krishna Sunil';
        case 'comment-4':
          return 'Krishna Sunil';
        case 'comment-5':
          return 'Meera Sunil';
        default:
          return 'Madhumitha Sriram';
      }
    },
    'comment/text': () => lorem.generateSentences(4),
    'comment/can-edit': true,
  },
  dispatch: [
    'new.comment/post',
    'new.comment.text/update',
    'ui.comment.edit/done',
    'ui.comment.edit/cancel',
    'inter.comment.text/update',
  ],
};

const store = {
  read: {
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
    'action.tabs/active-tab-id': 'discuss',
    'action/outcome': () => lorem.generateSentences(7),
    'action/description': () => lorem.generateSentences(8),
    'action.relation/ids': ['1', '2', '3'],
    'action/relation': getRelation,
    ...discussionTabStore.read,
  },
  dispatch: [
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
    ...discussionTabStore.dispatch,
  ],
};

export const Action = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});

import { Action as Component } from '@elements/compositions/action/action';
import { mockStory } from '@story/utils/mock-story';

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
    'current.action/id': '1',
    'current.action.title/editing': false,
    'current.action.description/editing': false,
    'current.action.outcome/editing': false,
    'current.action.title/can-edit': true,
    'current.action.outcome/can-edit': true,
    'current.action.description/can-edit': true,
    'current.user/id': '2',
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
    'action/tabs': [
      { id: 'home', label: 'Home' },
      { id: 'funding', label: 'Funding' },
      { id: 'updates', label: 'Updates' },
      { id: 'discussion', label: 'Discussion' },
      { id: 'team', label: 'Team' },
    ],
    'action.tabs/active-tab-id': 'home',
    'action/outcome':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet.',
    'action/description':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet. Fermentum vulputate faucibus commodo ut imperdiet nisl etiam ac augue. Odio id eget senectus et. Gravida arcu elementum arcu non. Vitae facilisi risus, ultricies cras feugiat duis semper enim. Odio fermentum ultricies rutrum diam.',
    'action.relation/ids': ['1', '2', '3'],
    'action/relation': getRelation,
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
  ],
};

export const Action = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});

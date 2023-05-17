import { HomeSection as Component } from '@elements/compositions/action/home-section';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Action/HomeSection',
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
    'current.action/id': '2',
    'action/outcome':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet.',
    'action/description':
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ultricies non euismod lectus blandit venenatis. Eget aenean faucibus netus arcu sed sed et amet. Venenatis arcu ipsum scelerisque sed ac luctus. Ornare id libero faucibus donec. Nunc magnis lacus pulvinar euismod egestas amet. Ornare at id cras imperdiet. Fermentum vulputate faucibus commodo ut imperdiet nisl etiam ac augue. Odio id eget senectus et. Gravida arcu elementum arcu non. Vitae facilisi risus, ultricies cras feugiat duis semper enim. Odio fermentum ultricies rutrum diam.',
    'action.relation/ids': ['1', '2', '3'],
    'action/relation': getRelation,
  },
  dispatch: [],
};

export const HomeSection = mockStory({
  store,
  render: () => {
    return <Component />;
  },
});

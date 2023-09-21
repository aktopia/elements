import { EntityType } from '@elements/types';
import { RelationType } from '@elements/logic/relationship';

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

export const store = {
  sub: {
    'relationship/ids': ['1', '2', '3'],
    'relationship.entity/title': 'Some title',
    'relationship.entity/type': EntityType.Action,
    'relationship/relation': RelationType.Relates,
    'relationship/adding': true,
  },
  evt: ['relationship.adding/set'],
};

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

export const store = {
  read: {
    'relationship/ids': ['1', '2', '3'],
    'relationship/data': getRelation,
  },
  dispatch: [],
};

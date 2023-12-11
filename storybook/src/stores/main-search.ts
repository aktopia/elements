export const store = {
  sub: {
    'main-search/query': '',
    'main-search/visible': true,
    'main-search/results': [
      {
        'entity/id': '1',
        'entity/type': 'entity.type/action',
        'match/snippet': '<mark>What</mark> <mark>is</mark> up?',
        'match/score': '2',
      },
      {
        'entity/id': '2',
        'entity/type': 'entity.type/issue',
        'match/snippet': 'Maybe <mark>what</mark> <mark>is</mark> I?',
        'match/score': '1',
      },
    ],
  },
  evt: ['main-search.query/set', 'main-search/close'],
};

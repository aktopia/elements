export const store = {
  read: {
    'main-search/visible': true,
    'main-search/results': [
      {
        id: '1',
        type: 'entity.type/action',
        text: '<mark>What</mark> <mark>is</mark> up?',
        subText: 'Action',
      },
      {
        id: '2',
        type: 'entity.type/issue',
        text: 'Maybe <mark>what</mark> <mark>is</mark> I?',
        subText: 'Action',
      },
    ],
  },
  dispatch: ['main-search.query/set', 'main-search/close'],
};

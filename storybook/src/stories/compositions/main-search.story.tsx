import { MainSearch as Component } from '@elements/compositions/main-search';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/MainSearch',
  component: Component,
};

const store = {
  read: {
    'main-search/visible': true,
    'main-search/results': [
      {
        id: '1',
        type: 'entity/action',
        text: '<mark>What</mark> <mark>is</mark> up?',
        subText: 'Action',
      },
      {
        id: '2',
        type: 'entity/issue',
        text: 'Maybe <mark>what</mark> <mark>is</mark> I?',
        subText: 'Action',
      },
    ],
  },
  dispatch: ['generic.state/set', 'main-search/close'],
};

const args = {
  suspense: { lines: 5 },
};

export const MainSearch = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});

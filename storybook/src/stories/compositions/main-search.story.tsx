import { MainSearch as Component } from '@elements/compositions/main-search';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/MainSearch',
  component: Component,
};

const store = {
  read: {
    'main-search/query': 'what is',
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
  dispatch: [],
};

const args = {
  refId: '5',
  content: lorem.generateSentences(5),
  refAttribute: 'entity/action',
  className: 'text-base text-gray-700',
  suspense: { lines: 5 },
};

export const MainSearch = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});
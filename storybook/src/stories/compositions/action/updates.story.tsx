import { Updates as Component } from '@elements/compositions/action/updates';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Action/Updates',
  component: Component,
};

const store = {
  read: {
    'current.action/id': '1',
    'user/name': 'Krishna Sunil',
    'updates/ids-by-reference': ['1', '2', '3'],
    'update/content': (_: any) => lorem.generateSentences(8),
    'update/creator-name': 'Sunil KS',
  },
  dispatch: ['new.content/update', 'new.content/post'],
};

const args = {
  refId: '1',
  refAttribute: 'action/id',
  suspense: { lines: 5 },
};

export const Updates = mockStory({
  store,
  args,
  render: (args) => {
    return <Component {...args} />;
  },
});

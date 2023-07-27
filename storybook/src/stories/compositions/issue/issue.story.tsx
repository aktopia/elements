import { Issue as Component } from '@elements/compositions/issue/issue';
import { store as discussStore } from '@story/stores/discuss';
import { store as headerStore } from '@story/stores/issue/header';
import { store as homeTabStore } from '@story/stores/issue/home';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';
import { lorem } from '@story/utils/string';

export default {
  title: 'Compositions/Issue/Issue',
  component: Component,
};

const locationsStore = {
  read: {
    'location/data': [
      { lng: 78.9629, lat: 20.5937, caption: lorem.generateSentences(1), id: '1' },
      { lng: 80.237617, lat: 13.067439, caption: lorem.generateSentences(1), id: '2' },
    ],
    'issue.location/center': { lng: 78.9629, lat: 20.5937 },
    'issue.location.slide-over/visible': false,
  },
  dispatch: [
    'issue.location.slide-over/open',
    'issue.location.slide-over/close',
    'issue.location/add',
    'issue.location.center/update',
    'issue.location.caption/update',
  ],
};

const store = {
  read: {
    ...wrapPageStore.read,
    ...headerStore.read,
    ...discussStore.read,
    ...homeTabStore.read,
    ...locationsStore.read,
    'current.issue/id': 'issue-1',
    'current.user/id': '2',
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...headerStore.dispatch,
    ...discussStore.dispatch,
    ...homeTabStore.dispatch,
    ...locationsStore.dispatch,
  ],
};

export const Issue = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});

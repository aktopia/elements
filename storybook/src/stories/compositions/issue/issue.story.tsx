import { Issue as Component } from '@elements/compositions/issue/issue';
import { store as discussStore } from '@story/stores/discuss';
import { store as headerStore } from '@story/stores/issue/header';
import { store as homeTabStore } from '@story/stores/issue/home';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { mockStory } from '@story/utils/mock-story';
import { randomTimestamp } from '@story/utils/time';

export default {
  title: 'Compositions/Issue/Issue',
  component: Component,
};

const store = {
  read: {
    ...wrapPageStore.read,
    ...headerStore.read,
    ...discussStore.read,
    ...homeTabStore.read,
    'current.issue/id': 'issue-1',
    'current.user/id': '2',
    'issue.tabs/active-tab-id': 'locations',
    'issue/last-active-at': randomTimestamp(),
  },
  dispatch: [
    ...wrapPageStore.dispatch,
    ...headerStore.dispatch,
    ...discussStore.dispatch,
    ...homeTabStore.dispatch,
  ],
};

export const Issue = mockStory({
  store,
  args: { suspense: { lines: 8 } },
  render: (args) => {
    return <Component {...args} />;
  },
});

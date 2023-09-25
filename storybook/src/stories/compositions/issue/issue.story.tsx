import { Issue as Component } from '@elements/compositions/issue/issue';
import { store as discussStore } from '@story/stores/discuss';
import { store as headerStore } from '@story/stores/issue/header';
import { store as homeTabStore } from '@story/stores/issue/home';
import { store as wrapPageStore } from '@story/stores/wrap-page';
import { store as locationsStore } from '@story/stores/issue/locations';
import { mockStory } from '@story/utils/mock-story';

export default {
  title: 'Compositions/Issue/Issue',
  component: Component,
};

const store = {
  sub: {
    ...wrapPageStore.sub,
    ...headerStore.sub,
    ...discussStore.sub,
    ...homeTabStore.sub,
    ...locationsStore.sub,
    'current.issue/id': 'issue-1',
    'current.user/id': '2',
  },
  evt: [
    ...wrapPageStore.evt,
    ...headerStore.evt,
    ...discussStore.evt,
    ...homeTabStore.evt,
    ...locationsStore.evt,
  ],
};

export const Issue = mockStory<typeof Component>({
  store,
  args: { suspenseLines: 8 },
  render: (args) => {
    return <Component {...args} />;
  },
  parameters: { layout: 'fullscreen' },
});
